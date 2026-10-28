import type * as MarketPicture from "../../requests/market-picture-request";
import { MAX_WEAPON_QUALITY } from "../../utils/damage";

/** Like the legacy calculator, the prices come from Poland's market. */
export const PRICES_COUNTRY_ID = 35;

/** Prices by quality, 1 to 7. Qualities without offers are missing. */
export type QualityPrices = Partial<Record<number, number>>;

export interface PriceCache {
  /** The day the prices were loaded on. */
  eDay: number;
  weapons: QualityPrices;
  aircraftWeapons: QualityPrices;
  cheapestFoodPerEnergy: number | undefined;
}

export function isPriceCacheFresh(
  cache: PriceCache | undefined,
  eDay: number,
): cache is PriceCache {
  return cache?.eDay === eDay;
}

export function buildPriceCache(
  response: MarketPicture.Response,
  eDay: number,
): PriceCache {
  const foodPrices = Object.values(
    readPrices(response.food, getFoodEnergy),
  ).filter((price) => price !== undefined);
  return {
    eDay,
    weapons: readPrices(response.weapons),
    aircraftWeapons: readPrices(response.aircraft),
    cheapestFoodPerEnergy:
      foodPrices.length > 0 ? Math.min(...foodPrices) : undefined,
  };
}

/** Q1 food gives 2 energy, every next quality 2 more, but Q7 gives 20. */
function getFoodEnergy(quality: number): number {
  return quality < MAX_WEAPON_QUALITY ? 2 * quality : 20;
}

function readPrices(
  offersByQuality: Record<string, MarketPicture.MarketOffer[]> | undefined,
  getUnits: (quality: number) => number = () => 1,
): QualityPrices {
  const prices: QualityPrices = {};
  for (let quality = 1; quality <= MAX_WEAPON_QUALITY; quality++) {
    const offers = offersByQuality?.[`q${quality}`];
    // Like the legacy calculator, the second cheapest offer, so that one tiny offer doesn't skew it
    const offer = offers?.[1] ?? offers?.[0];
    if (offer) {
      prices[quality] = offer.gross / getUnits(quality);
    }
  }
  return prices;
}

/** The weapon qualities that can be selected: without prices all of them, else those on sale and Q0. */
export function getSelectableQualities(
  prices: QualityPrices | undefined,
): number[] {
  const qualities = Array.from(
    { length: MAX_WEAPON_QUALITY + 1 },
    (_, quality) => quality,
  );
  return prices
    ? qualities.filter((quality) => quality === 0 || prices[quality])
    : qualities;
}
