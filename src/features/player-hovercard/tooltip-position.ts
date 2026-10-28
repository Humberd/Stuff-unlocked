export interface Rect {
  top: number;
  left: number;
  width: number;
  height: number;
}

export interface Size {
  width: number;
  height: number;
}

const GAP = 5;

/**
 * Places the tooltip centered above the anchor, or below it when there is
 * no room above, and keeps it inside the viewport.
 */
export function computeTooltipPosition(
  anchor: Rect,
  tooltip: Size,
  viewport: Size,
): { left: number; top: number } {
  const above = anchor.top - tooltip.height - GAP;
  const below = anchor.top + anchor.height + GAP;
  const top = above >= 0 ? above : below;
  const left = anchor.left + anchor.width / 2 - tooltip.width / 2;
  return {
    left: clamp(left, GAP, viewport.width - tooltip.width - GAP),
    top: clamp(top, GAP, viewport.height - tooltip.height - GAP),
  };
}

/** Prefers `min` when the range is empty, so the tooltip's top left corner stays visible. */
function clamp(value: number, min: number, max: number) {
  return Math.max(min, Math.min(value, max));
}
