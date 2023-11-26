import {
  TravelProgressState,
  TravelProgressStatus
} from "./components/TravelProgressPanel";
import { Travel } from "../../requests/travel-request";
import { findCountryIdFor } from "./regions";
import { CountriesCache } from "./countries-cache";
import { getCsrfToken } from "../../utils/erep-global-info";
import { AnniversaryQuestData } from "../../requests/anniversary-quest-data-request";
import { TravelData } from "../../requests/travel-data-request";

export function createNewTravelProgressState(
  unit: string
): TravelProgressState {
  return {
    status: TravelProgressStatus.InProgress,
    travelledDistanceKm: 0,
    travelsCompleted: 0,
    resourcesSpent: {
      amount: 0,
      unit: unit
    }
  };
}

export async function travelTo(
  regionId: string,
  travelMethod: Travel.Request["travelMethod"],
  countriesCache: CountriesCache
) {
  const response = await Travel.sendRequest({
    _token: getCsrfToken(),
    travelMethod: travelMethod,
    battleId: "0",
    inRegionId: regionId,
    toCountryId: findCountryIdFor(
      regionId,
      await countriesCache.getCountries()
    )
  });
  if (response.error === 1) {
    throw Error(`Failed to travel to ${regionId}: ${response.message}`);
  }
}

export async function getTotalTravelledDistanceKm() {
  const response = await AnniversaryQuestData.sendRequest({});
  return response.status.inventory.miles;
}

export interface TravelInfo {
  distanceKm: number;
  currencyCost: number;
  ticketCost: number;
}

export async function getTravelInfoTo(regionId: string): Promise<TravelInfo> {
  const response = await TravelData.sendRequest({
    _token: getCsrfToken(),
    battleId: "0",
    regionId: regionId,
    holdingId: "0"
  });
  return {
    distanceKm: response.regions[regionId].distanceInKm,
    currencyCost: response.regions[regionId].cost,
    ticketCost: response.regions[regionId].ticketAmount
  };
}
