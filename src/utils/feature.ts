import { toError } from "./utils";

export interface Feature {
  id: string;
  name: string;
  description?: string;
  canExecute: (url: Location) => boolean;
  isSettingEnabled?: () => boolean;
  execute: () => Promise<void> | void;
}

export function createFeature(feature: Feature): Feature {
  return {
    ...feature,
  };
}

/**
 * Runs the independent parts of a feature at the same time, so that one
 * failing part doesn't stop the others. Rejects once all of them settled
 * if any of them failed.
 */
export async function runIndependently(
  parts: Array<() => unknown>,
): Promise<void> {
  const results = await Promise.allSettled(parts.map(async (part) => part()));
  const errors = results
    .filter((result) => result.status === "rejected")
    .map((result) => toError(result.reason));
  if (errors.length === 1) {
    throw errors[0];
  }
  if (errors.length > 1) {
    throw new AggregateError(
      errors,
      errors.map((error) => error.message).join("; "),
    );
  }
}
