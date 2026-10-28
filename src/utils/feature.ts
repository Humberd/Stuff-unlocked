import type { ReactNode } from "react";
import { error, toError } from "./utils";
import { mount, type Mounted, type MountOptions } from "./render";

export interface Feature {
  id: string;
  name: string;
  description?: string;
  canExecute: (url: Location) => boolean;
  isSettingEnabled?: () => boolean;
  execute: (context: FeatureContext) => Promise<void> | void;
}

/**
 * What a feature run adds to the page. Everything registered here is
 * cleaned up before the feature runs again after a navigation.
 */
export interface FeatureContext {
  /** Aborted on cleanup. Pass it to `addEventListener` to remove listeners then. */
  signal: AbortSignal;
  /** {@link mount}, unmounted on cleanup. */
  mount: (
    element: ReactNode,
    anchor: Element | null,
    options?: MountOptions,
  ) => Mounted;
  onCleanup: (callback: () => void) => void;
}

export function createFeature(feature: Feature): Feature {
  return {
    ...feature,
  };
}

export class FeatureScope implements FeatureContext {
  private readonly controller = new AbortController();
  private readonly cleanups: Array<() => void> = [];

  get signal() {
    return this.controller.signal;
  }

  mount = (
    element: ReactNode,
    anchor: Element | null,
    options?: MountOptions,
  ): Mounted => {
    const mounted = mount(element, anchor, options);
    this.onCleanup(mounted.unmount);
    return mounted;
  };

  /** Runs `callback` right away when already disposed, e.g. by a run that outlived its page. */
  onCleanup = (callback: () => void) => {
    if (this.signal.aborted) {
      runCleanup(callback);
      return;
    }
    this.cleanups.push(callback);
  };

  /** Runs the cleanups in reverse order of registration. */
  dispose() {
    if (this.signal.aborted) {
      return;
    }
    this.controller.abort();
    for (const cleanup of this.cleanups.reverse()) {
      runCleanup(cleanup);
    }
    this.cleanups.length = 0;
  }
}

function runCleanup(cleanup: () => void) {
  try {
    cleanup();
  } catch (e) {
    error("Feature cleanup failed", e);
  }
}

/**
 * Runs the independent parts of a feature at the same time, so that one
 * failing part doesn't stop the others. Rejects once all of them settled
 * if any of them failed.
 */
export async function runIndependently(
  parts: Array<() => unknown>,
): Promise<void> {
  const results = await Promise.allSettled(
    parts.map((part) => new Promise((resolve) => resolve(part()))),
  );
  const errors = results
    .filter((result) => result.status === "rejected")
    .map((result) => toError(result.reason));
  if (errors.length === 1) {
    throw errors[0];
  }
  if (errors.length > 1) {
    throw new AggregateError(errors, errors.map((e) => e.message).join("; "));
  }
}
