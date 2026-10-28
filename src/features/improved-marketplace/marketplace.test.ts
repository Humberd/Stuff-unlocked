import { describe, expect, it } from "vitest";
import {
  getComparedCountryId,
  getCostPerHealthPoint,
  getMarketSelection,
} from "./marketplace";

describe("getMarketSelection", () => {
  it("reads the market chosen in the filters", () => {
    expect(
      getMarketSelection({
        settings: {
          countryId: "35",
          industryId: "1",
          lastQuality: 7,
          can_buy: true,
        },
      }),
    ).toEqual({
      countryId: 35,
      industryId: 1,
      quality: 7,
      isSharedOffer: false,
      needsTravelToBuy: false,
    });
  });

  it("reads the country and quality of a shared offer from the offer", () => {
    expect(
      getMarketSelection({
        settings: {
          isSharedOffer: true,
          countryId: 35,
          industryId: 2,
          lastQuality: 1,
          my_offer: true,
        },
        marketplace: [{ country_id: 12, customization_level: 5 }],
      }),
    ).toEqual({
      countryId: 12,
      industryId: 2,
      quality: 5,
      isSharedOffer: true,
      needsTravelToBuy: false,
    });
  });

  it("needs travelling to buy unless the market allows buying", () => {
    expect(
      getMarketSelection({
        settings: { countryId: 12, industryId: 1, lastQuality: 1 },
      })?.needsTravelToBuy,
    ).toBe(true);
  });

  it("is undefined while the market isn't loaded", () => {
    expect(getMarketSelection(undefined)).toBeUndefined();
    expect(getMarketSelection({})).toBeUndefined();
    expect(
      getMarketSelection({ settings: { isSharedOffer: true, industryId: 1 } }),
    ).toBeUndefined();
    expect(
      getMarketSelection({ settings: { countryId: 35, industryId: 1 } }),
    ).toBeUndefined();
  });
});

describe("getComparedCountryId", () => {
  const atHome = { country: 35, countryLocationId: 35 };
  const abroad = { country: 35, countryLocationId: 12 };

  it("compares a foreign market with the home market", () => {
    expect(getComparedCountryId(12, atHome)).toBe(35);
    expect(getComparedCountryId(12, abroad)).toBe(35);
    expect(getComparedCountryId(40, abroad)).toBe(35);
  });

  it("compares the home market with the market of the current country", () => {
    expect(getComparedCountryId(35, abroad)).toBe(12);
  });

  it("compares nothing at home in the home market", () => {
    expect(getComparedCountryId(35, atHome)).toBeUndefined();
  });
});

describe("getCostPerHealthPoint", () => {
  it("divides the price by the energy the food restores", () => {
    expect(getCostPerHealthPoint(1.2, 2)).toBeCloseTo(0.6);
  });

  it("is undefined for missing values", () => {
    expect(getCostPerHealthPoint(NaN, 2)).toBeUndefined();
    expect(getCostPerHealthPoint(1, 0)).toBeUndefined();
  });
});
