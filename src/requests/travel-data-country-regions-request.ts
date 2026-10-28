import { postForm } from "../utils/request";
import type { Region } from "./travel-data-request";

/** Asks for the travel costs to every region of a country. */
export interface Request {
  check: "getCountryRegions";
  countryId: number;
  _token: string;
}

export interface Response {
  /** By region id. */
  regions: Record<string, Region>;
}

export function sendRequest(body: Request): Promise<Response> {
  return postForm("/main/travelData", body);
}

export interface CheapestRegion {
  regionId: string;
  cost: number;
}

/** The cheapest region the citizen can travel to that `countryId` owns now. */
export function findCheapestRegion(
  response: Response,
  countryId: number,
): CheapestRegion | undefined {
  let cheapest: CheapestRegion | undefined;
  for (const [regionId, region] of Object.entries(response.regions ?? {})) {
    if (
      region.canMove &&
      region.countryId === countryId &&
      (!cheapest || region.cost < cheapest.cost)
    ) {
      cheapest = { regionId, cost: region.cost };
    }
  }
  return cheapest;
}
