import { describe, expect, it } from "vitest";
import { shiftToClear } from "./unlocks-clearance";

const panel = { left: 549, right: 842, top: 136, bottom: 323 };

describe("shiftToClear", () => {
  it("leaves the panel in place when the unlocks end below it", () => {
    const unlocks = { left: 757, right: 842, top: 330, bottom: 560 };

    expect(shiftToClear(panel, unlocks)).toBe(0);
  });

  it("moves the panel left of the unlocks that grew over it", () => {
    const unlocks = { left: 757, right: 842, top: 235, bottom: 560 };

    expect(shiftToClear(panel, unlocks)).toBe(93);
  });

  it("leaves the panel in place when the unlocks stand beside it", () => {
    const unlocks = { left: 850, right: 935, top: 235, bottom: 560 };

    expect(shiftToClear(panel, unlocks)).toBe(0);
  });

  it("ignores hidden unlocks", () => {
    const unlocks = { left: 0, right: 0, top: 0, bottom: 0 };

    expect(
      shiftToClear({ left: -10, right: 10, top: -10, bottom: 10 }, unlocks),
    ).toBe(0);
  });
});
