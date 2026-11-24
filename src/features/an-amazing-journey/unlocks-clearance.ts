import { useLayoutEffect, type RefObject } from "react";

const UNLOCKS_SELECTOR = "#cityInfoRightPopup";
const MAP_CHILD_SELECTOR = "#cityInfoTopPopup";
const SHIFT_PROPERTY = "--unlocks-shift";
const GAP_PX = 8;

export interface Box {
  left: number;
  right: number;
  top: number;
  bottom: number;
}

/** How far left `box` has to move to stand clear of `obstacle`, 0 when they don't touch. */
export function shiftToClear(box: Box, obstacle: Box): number {
  const isObstacleHidden =
    obstacle.right <= obstacle.left || obstacle.bottom <= obstacle.top;
  const overlaps =
    box.left < obstacle.right &&
    box.right > obstacle.left &&
    box.top < obstacle.bottom &&
    box.bottom > obstacle.top;
  if (isObstacleHidden || !overlaps) {
    return 0;
  }
  return Math.round(box.right - obstacle.left + GAP_PX);
}

/**
 * The game's Unlocks panel grows upwards with every unlock slot, into the place
 * of our panels. Keeps `--unlocks-shift` on the container at the distance its
 * `[data-clears-unlocks]` panels have to move left to stay usable.
 */
export function useUnlocksClearance(
  containerRef: RefObject<HTMLElement | null>,
  isCollapsed: boolean,
) {
  useLayoutEffect(() => {
    const container = containerRef.current;
    const map = document.querySelector(MAP_CHILD_SELECTOR)?.parentElement;
    if (!container || !map) {
      return;
    }

    let shift = 0;
    let observedUnlocks: Element | null = null;
    const resizeObserver = new ResizeObserver(measure);
    const mutationObserver = new MutationObserver(measure);

    function measure() {
      const unlocks = document.querySelector(UNLOCKS_SELECTOR);
      if (unlocks !== observedUnlocks) {
        if (observedUnlocks) resizeObserver.unobserve(observedUnlocks);
        if (unlocks) resizeObserver.observe(unlocks);
        observedUnlocks = unlocks;
      }

      const obstacle = unlocks?.getBoundingClientRect();
      const panels = container!.querySelectorAll("[data-clears-unlocks]");
      const nextShift = obstacle
        ? Math.max(
            0,
            ...Array.from(panels, (panel) => {
              const rect = panel.getBoundingClientRect();
              const unshifted = {
                left: rect.left + shift,
                right: rect.right + shift,
                top: rect.top,
                bottom: rect.bottom,
              };
              return shiftToClear(unshifted, obstacle);
            }),
          )
        : 0;

      if (nextShift !== shift) {
        shift = nextShift;
        container!.style.setProperty(SHIFT_PROPERTY, `${shift}px`);
      }
    }

    resizeObserver.observe(map);
    mutationObserver.observe(map, { childList: true });
    measure();

    return () => {
      resizeObserver.disconnect();
      mutationObserver.disconnect();
      container.style.removeProperty(SHIFT_PROPERTY);
    };
  }, [containerRef, isCollapsed]);
}
