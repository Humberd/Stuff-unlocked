import type { ReactNode } from "react";
import type { FeatureContext } from "../../utils/feature";
import { mount, type Mounted, type MountOptions } from "../../utils/render";

/**
 * Mounts that are replaced as a whole every time the game re-renders the
 * part of the page they decorate, e.g. after each of its requests.
 */
export class MountGroup {
  private readonly mounted: Mounted[] = [];
  private generation = 0;
  private readonly signal: AbortSignal;

  constructor({ signal, onCleanup }: FeatureContext) {
    this.signal = signal;
    onCleanup(() => this.clear());
  }

  /**
   * Unmounts everything mounted so far. The returned check tells whether
   * nothing cleared the group since, so that slow requests started before
   * don't render into containers that are gone.
   */
  clear(): () => boolean {
    for (const mounted of this.mounted.splice(0)) {
      mounted.unmount();
    }
    const generation = ++this.generation;
    return () => generation === this.generation && !this.signal.aborted;
  }

  mount(
    element: ReactNode,
    anchor: Element | null,
    options?: MountOptions,
  ): Mounted {
    const mounted = mount(element, anchor, options);
    this.mounted.push(mounted);
    return mounted;
  }
}
