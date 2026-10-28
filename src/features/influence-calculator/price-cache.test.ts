import { describe, expect, it } from "vitest";
import type * as MarketPicture from "../../requests/market-picture-request";
import {
  buildPriceCache,
  getSelectableQualities,
  isPriceCacheFresh,
} from "./price-cache";

function offers(...grossPrices: number[]): MarketPicture.MarketOffer[] {
  return grossPrices.map((gross, id) => ({
    id,
    amount: 10,
    gross,
    net: gross,
    vat: 0,
    import: 0,
  }));
}

const response = {
  food: { q1: offers(1, 2), q2: offers(3, 4), q7: offers(30) },
  weapons: { q1: offers(10, 11), q7: offers(100, 150) },
  aircraft: {},
} as unknown as MarketPicture.Response;

describe("buildPriceCache", () => {
  const cache = buildPriceCache(response, 5000);

  it("uses the second cheapest offer, or the only one", () => {
    expect(cache.weapons).toEqual({ 1: 11, 7: 150 });
    expect(cache.aircraftWeapons).toEqual({});
  });

  it("finds the cheapest food per energy", () => {
    // 2 for 2 energy, 4 for 4 energy, 30 for 20 energy
    expect(cache.cheapestFoodPerEnergy).toBe(1);
    expect(
      buildPriceCache(
        { food: { q7: offers(30) } } as unknown as MarketPicture.Response,
        1,
      ).cheapestFoodPerEnergy,
    ).toBe(1.5);
  });

  it("remembers the day", () => {
    expect(cache.eDay).toBe(5000);
    expect(isPriceCacheFresh(cache, 5000)).toBe(true);
    expect(isPriceCacheFresh(cache, 5001)).toBe(false);
    expect(isPriceCacheFresh(undefined, 5000)).toBe(false);
  });

  it("has no cheapest food without food offers", () => {
    expect(
      buildPriceCache({} as MarketPicture.Response, 1).cheapestFoodPerEnergy,
    ).toBeUndefined();
  });
});

describe("getSelectableQualities", () => {
  it("offers every quality until the prices are known", () => {
    expect(getSelectableQualities(undefined)).toEqual([0, 1, 2, 3, 4, 5, 6, 7]);
  });

  it("offers Q0 and the qualities on sale", () => {
    expect(getSelectableQualities({ 1: 11, 7: 150 })).toEqual([0, 1, 7]);
  });
});
