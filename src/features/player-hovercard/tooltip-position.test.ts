import { describe, expect, it } from "vitest";
import { computeTooltipPosition } from "./tooltip-position";

const viewport = { width: 1000, height: 800 };
const tooltip = { width: 400, height: 200 };

describe("computeTooltipPosition", () => {
  it("centers the tooltip above the anchor", () => {
    const anchor = { top: 400, left: 450, width: 100, height: 20 };

    expect(computeTooltipPosition(anchor, tooltip, viewport)).toEqual({
      left: 300,
      top: 195,
    });
  });

  it("puts the tooltip below the anchor when there is no room above", () => {
    const anchor = { top: 100, left: 450, width: 100, height: 20 };

    expect(computeTooltipPosition(anchor, tooltip, viewport).top).toBe(125);
  });

  it("keeps the tooltip inside the viewport horizontally", () => {
    const nearLeft = { top: 400, left: 0, width: 50, height: 20 };
    const nearRight = { top: 400, left: 980, width: 20, height: 20 };

    expect(computeTooltipPosition(nearLeft, tooltip, viewport).left).toBe(5);
    expect(computeTooltipPosition(nearRight, tooltip, viewport).left).toBe(595);
  });

  it("keeps the tooltip inside the viewport vertically", () => {
    const anchor = { top: 150, left: 450, width: 100, height: 20 };
    const short = { width: 1000, height: 300 };

    expect(computeTooltipPosition(anchor, tooltip, short).top).toBe(95);
  });
});
