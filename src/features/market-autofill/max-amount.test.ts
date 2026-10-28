import { describe, expect, it } from "vitest";
import { getMaxBuyAmount, isRawMaterial } from "./max-amount";

const limits = {
  currencyAmount: 100,
  pricePerUnit: 3,
  isRawMaterial: false,
};

describe("getMaxBuyAmount", () => {
  it("buys as much as the citizen can afford", () => {
    expect(getMaxBuyAmount(limits)).toBe(33);
  });

  it("buys no more than the offer has", () => {
    expect(getMaxBuyAmount({ ...limits, offerMaximum: 10 })).toBe(10);
  });

  it("buys no more than the storage takes", () => {
    expect(getMaxBuyAmount({ ...limits, freeStorage: 20 })).toBe(20);
    expect(getMaxBuyAmount({ ...limits, freeStorage: -5 })).toBe(0);
  });

  it("counts raw materials in hundreds of storage", () => {
    expect(
      getMaxBuyAmount({
        currencyAmount: 1_000,
        pricePerUnit: 0.01,
        isRawMaterial: true,
        freeStorage: 2_550,
      }),
    ).toBe(24);
  });

  it("buys nothing without money", () => {
    expect(getMaxBuyAmount({ ...limits, currencyAmount: 2 })).toBe(0);
  });
});

describe("isRawMaterial", () => {
  it("knows the raw material industries", () => {
    expect([7, 12, 17, 24].every(isRawMaterial)).toBe(true);
    expect(isRawMaterial(1)).toBe(false);
  });
});
