import { TravelData } from "../../requests/travel-data-request";

// Wellington
// const regionSource: DestinationTarget = {
//   regionId: '714',
//   // how to get this from?
//   countryId: '84',
// };
// Castilla y Leon
// const regionSource: DestinationTarget = {
//   regionId: '173',
//   // how to get this from?
//   countryId: '79',
// };
// Mazuria

export interface TravelRoute {
  regionIdA: string;
  regionIdB: string;
}

export const MazuriaRegionId = "423";
export const MazoviaRegionId = "424";

export const travelRoute: TravelRoute = {
  regionIdA: MazuriaRegionId,
  regionIdB: MazoviaRegionId,
};


export function findCountryIdFor(
  regionId: string,
  countries: Record<string, TravelData.CountryValue>
): string {
  const countryId = Object.values(countries).find((country) => {
    const currentRegions = country.currentRegions;
    if (typeof currentRegions === "number") {
      return currentRegions === Number(regionId);
    }
    if (typeof currentRegions === "string") {
      return currentRegions.split(",").includes(regionId);
    }
    return false;
  })?.id;

  if (!countryId) {
    throw new Error(`Cannot find countryId for regionId ${regionId}`);
  }

  return String(countryId);
}
