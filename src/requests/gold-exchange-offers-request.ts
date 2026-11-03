import { postForm } from "../utils/request";

export const GOLD_CURRENCY_ID = 62;

/** A page of the monetary market's offers. */
export interface Request {
  _token: string;
  page: number;
  currencyId: number;
}

/** The offers come as rendered HTML somewhere in the response. */
export type Response = Record<string, unknown>;

export function sendRequest(body: Request): Promise<Response> {
  return postForm("/economy/exchange/retrieve/", body);
}

/**
 * The price of the first offer, the cheapest one, read from the
 * `data-price` attribute of its buy button.
 */
export function parseCheapestPrice(response: Response): number | undefined {
  const match = /data-price=\\?['"]([\d.]+)/.exec(JSON.stringify(response));
  const price = match ? Number(match[1]) : NaN;
  return price > 0 ? price : undefined;
}

export interface Offer {
  id: number;
  price: number;
  /** Gold the offer still has. */
  amount: number;
}

/** The offers on the page, cheapest first, read from their buy buttons. */
export function parseOffers(response: Response): Offer[] {
  const offers: Offer[] = [];
  for (const value of Object.values(response)) {
    if (typeof value !== "string") {
      continue;
    }
    const doc = new DOMParser().parseFromString(value, "text/html");
    doc
      .querySelectorAll<HTMLElement>("button[id^='purchase_']")
      .forEach((button) => {
        offers.push({
          id: Number(button.id.replace("purchase_", "")),
          price: Number(button.dataset.price),
          amount: Number(button.dataset.max),
        });
      });
  }
  return offers
    .filter((offer) => offer.id > 0 && offer.price > 0 && offer.amount > 0)
    .sort((a, b) => a.price - b.price);
}
