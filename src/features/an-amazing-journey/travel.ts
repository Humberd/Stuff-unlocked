import { TravelProgressState, TravelProgressStatus } from "./components/TravelProgressPanel";
import { Travel } from "../../requests/travel-request";
import { findCountryIdFor } from "./regions";
import { CountriesCache } from "./countries-cache";
import { getCsrfToken } from "../../utils/erep-global-info";
import { TravelData } from "../../requests/travel-data-request";
import { AutoTravelForm } from "./components/AutoTravellerPanel";
import { log } from "../../utils/utils";

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

export async function executeTravel(nextTargetRegionId: string, form: AutoTravelForm, countriesCache: CountriesCache) {
  let travelInfo: TravelInfo;
  try {
    log(`Getting travel info for region ${nextTargetRegionId}...`);
    travelInfo = await getTravelInfoTo(nextTargetRegionId);
    log(`Got travel info for region ${nextTargetRegionId}`, travelInfo);
  } catch (e: any) {
    throw Error(
      `Failed to get travel info for region ${nextTargetRegionId}`,
      {
        cause: e
      }
    );
  }

  try {
    log(`Travelling to region ${nextTargetRegionId}...`);
    await travelTo(nextTargetRegionId, form.resourceUsed, countriesCache);
    log(`Travelled to region ${nextTargetRegionId}`);
  } catch (e: any) {
    throw Error(`Failed to travel to region ${nextTargetRegionId}`, {
      cause: e
    });
  }
  return travelInfo;
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

export interface TravelInfo {
  distanceKm: number;
  currencyCost: number;
  ticketCost: number;
}
