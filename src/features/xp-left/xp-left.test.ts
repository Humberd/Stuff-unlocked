import { describe, expect, it } from "vitest";
import { isXpLeftLow, xpLeftToNextLevel } from "./xp-left";

describe("xpLeftToNextLevel", () => {
  it("counts the points left to the next multiple of 5000", () => {
    expect(xpLeftToNextLevel(123_456)).toBe(1_544);
  });

  it("needs a whole level right after a level up", () => {
    expect(xpLeftToNextLevel(125_000)).toBe(5_000);
  });

  it("needs one point right before a level up", () => {
    expect(xpLeftToNextLevel(124_999)).toBe(1);
  });
});

describe("isXpLeftLow", () => {
  it("is low from 500 points down", () => {
    expect(isXpLeftLow(500)).toBe(true);
    expect(isXpLeftLow(1)).toBe(true);
  });

  it("is not low above 500 points", () => {
    expect(isXpLeftLow(501)).toBe(false);
  });
});
