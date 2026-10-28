import * as GoldExchange from "../../requests/gold-exchange-offers-request";
import { getCsrfToken } from "../../utils/erep-global-info";
import { error } from "../../utils/utils";

const STORAGE_KEY = "STUFF_UNLOCKED.goldPrice";
const MAX_AGE_MS = 60 * 60 * 1000;

export interface CachedGoldPrice {
  price: number;
  /** When it was read, in ms. */
  timestamp: number;
}

export function isFresh(
  cached: CachedGoldPrice | undefined,
  now: number,
): cached is CachedGoldPrice {
  return (
    cached !== undefined &&
    cached.price > 0 &&
    now - cached.timestamp >= 0 &&
    now - cached.timestamp < MAX_AGE_MS
  );
}

/** The price of the cheapest gold in the monetary market, cached for an hour. */
export async function getGoldPrice(): Promise<number | undefined> {
  const cached = readCache();
  if (isFresh(cached, Date.now())) {
    return cached.price;
  }
  const price = GoldExchange.parseCheapestPrice(
    await GoldExchange.sendRequest({
      _token: getCsrfToken(),
      page: 1,
      currencyId: GoldExchange.GOLD_CURRENCY_ID,
    }),
  );
  if (price !== undefined) {
    writeCache({ price, timestamp: Date.now() });
  }
  return price;
}

function readCache(): CachedGoldPrice | undefined {
  try {
    const cached = localStorage.getItem(STORAGE_KEY);
    return cached ? (JSON.parse(cached) as CachedGoldPrice) : undefined;
  } catch (e) {
    error("Failed to read the cached gold price", e);
    return undefined;
  }
}

function writeCache(cached: CachedGoldPrice) {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(cached));
  } catch (e) {
    error("Failed to cache the gold price", e);
  }
}
