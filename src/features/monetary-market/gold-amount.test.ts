import { describe, expect, it } from "vitest";
import { getMaxGoldAmount } from "./gold-amount";

describe("getMaxGoldAmount", () => {
  it("fills in as much gold as the citizen can afford, in hundredths", () => {
    expect(getMaxGoldAmount(50, 300, 1_000)).toBe(3.33);
  });

  it("fills in no more than the offer has", () => {
    expect(getMaxGoldAmount(2.5, 300, 100_000)).toBe(2.5);
  });

  it("fills in at most 10 gold", () => {
    expect(getMaxGoldAmount(50, 300, 100_000)).toBe(10);
  });

  it("fills in nothing without money", () => {
    expect(getMaxGoldAmount(50, 300, 0)).toBe(0);
  });
});
