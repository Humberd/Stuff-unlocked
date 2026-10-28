import type { ReactNode } from "react";
import { createRoot } from "react-dom/client";

export type MountPosition = "before" | "after" | "prepend" | "append";

const insertPositions: Record<MountPosition, InsertPosition> = {
  before: "beforebegin",
  after: "afterend",
  prepend: "afterbegin",
  append: "beforeend",
};

export interface MountOptions {
  /** Where the container goes relative to the anchor, `after` by default. */
  position?: MountPosition;
  /** Tag of the container element, `div` by default. */
  tagName?: keyof HTMLElementTagNameMap;
  className?: string;
}

export interface Mounted {
  container: HTMLElement;
  /** Replaces what is rendered in the container. */
  render: (element: ReactNode) => void;
  /** Unmounts the React tree and removes the container. */
  unmount: () => void;
}

/** Renders `element` into a new container inserted next to or inside `anchor`. */
export function mount(
  element: ReactNode,
  anchor: Element | null,
  options: MountOptions = {},
): Mounted {
  if (!anchor) {
    throw new Error("Can't find the element to mount next to");
  }
  const container = document.createElement(options.tagName ?? "div");
  if (options.className) {
    container.classList.add(options.className);
  }
  anchor.insertAdjacentElement(
    insertPositions[options.position ?? "after"],
    container,
  );

  const root = createRoot(container);
  root.render(element);

  return {
    container,
    render: (newElement) => root.render(newElement),
    unmount: () => {
      root.unmount();
      container.remove();
    },
  };
}
