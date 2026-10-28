import * as CountryRegions from "../../requests/travel-data-country-regions-request";
import * as Travel from "../../requests/travel-request";
import { getCsrfToken } from "../../utils/erep-global-info";

export type MarketRegion = CountryRegions.CheapestRegion;

/** The cheapest region to travel to to buy in the market of `countryId`. */
export async function findMarketRegion(
  countryId: number,
): Promise<MarketRegion | undefined> {
  const response = await CountryRegions.sendRequest({
    check: "getCountryRegions",
    countryId,
    _token: getCsrfToken(),
  });
  return CountryRegions.findCheapestRegion(response, countryId);
}

export async function travelToMarket(
  countryId: number,
  { regionId }: MarketRegion,
) {
  const response = await Travel.sendRequest({
    _token: getCsrfToken(),
    battleId: "0",
    inRegionId: regionId,
    toCountryId: String(countryId),
  });
  if (response.error === 1) {
    throw new Error(response.message);
  }
}
