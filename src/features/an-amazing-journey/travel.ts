import {
  TravelProgressState,
  TravelProgressStatus,
} from "./components/TravelProgressPanel";
import { Travel } from "../../requests/travel-request";
import { findCountryIdFor } from "./regions";
import { log } from "../../utils/utils";
import { CountriesCache } from "./countries-cache";
import { getCsrfToken } from "../../utils/erep-global-info";
import { AnniversaryQuestData } from "../../requests/anniversary-quest-data-request";

export function createNewTravelProgressState(
  unit: string
): TravelProgressState {
  return {
    status: TravelProgressStatus.InProgress,
    travelledDistanceKm: 0,
    travelsCompleted: 0,
    resourcesSpent: {
      amount: 0,
      unit: unit,
    },
  };
}
// if ((await countriesCache.getCurrentRegionId()) !== MazoviaRegionId) {
//   await travelTo(MazoviaRegionId);
//   countriesCache.updateCurrentRegionId(MazoviaRegionId);
// } else {
//   await travelTo(MazuriaRegionId);
//   countriesCache.updateCurrentRegionId(MazuriaRegionId);
// }
//
// log("Waiting for 5 seconds");
// await waitFor(5000);
//
// if ((await countriesCache.getCurrentRegionId()) !== MazoviaRegionId) {
//   await travelTo(MazoviaRegionId);
//   countriesCache.updateCurrentRegionId(MazoviaRegionId);
// } else {
//   await travelTo(MazuriaRegionId);
//   countriesCache.updateCurrentRegionId(MazuriaRegionId);
// }

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
    ),
  });
  if (response.error === 1) {
    throw Error(`Failed to travel to ${regionId}: ${response.message}`);
  }
}

export async function getTotalTravelledDistanceKm() {
  const response = await AnniversaryQuestData.sendRequest({});
  return response.status.inventory.miles;
}
