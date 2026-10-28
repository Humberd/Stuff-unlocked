import { getJson } from "../utils/request";

/** The cheapest offers of every product in a country's market. */
export type Response = Record<IndustryName, Record<string, MarketOffer[]>>;

export interface MarketOffer {
  id: number;
  amount: number;
  /** Price with taxes. */
  gross: number;
  net: number;
  vat: number;
  import: number;
}

export type IndustryName =
  | "food"
  | "weapons"
  | "tickets"
  | "houses"
  | "frm"
  | "wrm"
  | "hrm"
  | "aircraft"
  | "arm";

export function sendRequest(countryId: number): Promise<Response> {
  return getJson(`/economy/marketpicture/${countryId}`);
}

const industryNames: Record<number, IndustryName> = {
  1: "food",
  2: "weapons",
  3: "tickets",
  4: "houses",
  7: "frm",
  12: "wrm",
  17: "hrm",
  23: "aircraft",
  24: "arm",
};

/** The market picture key of an industry, e.g. 1 is "food". */
export function getIndustryName(industryId: number): IndustryName | undefined {
  return industryNames[industryId];
}

/** The cheapest offer of a product, by industry id and quality. */
export function findCheapestOffer(
  response: Response,
  industryId: number,
  quality: number,
): MarketOffer | undefined {
  const industryName = getIndustryName(industryId);
  return industryName
    ? response[industryName]?.[`q${quality}`]?.[0]
    : undefined;
}
