import { TravelData } from "../../requests/travel-data-request";

export interface TravelRoute {
  regionIdA: string;
  regionIdB: string;
}

export const MazuriaRegionId = "423";
export const MazoviaRegionId = "424";
export const travelRouteTest: TravelRoute = {
  regionIdA: MazuriaRegionId,
  regionIdB: MazoviaRegionId,
};

export const WellingtonRegionId = "714";
export const CastillaYLeonRegionId = "173";
export const travelRouteMain: TravelRoute = {
  regionIdA: CastillaYLeonRegionId,
  regionIdB: WellingtonRegionId,
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
