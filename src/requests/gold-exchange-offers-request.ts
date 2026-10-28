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
