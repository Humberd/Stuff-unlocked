import { getCookieHeaders, objectToWwwFormUrlEncoded } from "../utils/request";

export namespace TravelData {
  export interface Request {
    battleId: "0";
    _token: string;
    regionId: "0";
    holdingId: "0";
  }

  export interface Response {
    countries: Record<string, CountryValue>;
    regions: any[];
    preselectCountryId: boolean;
    preselectRegionId: boolean;
    alreadyInRegion: string;
    battleInfo: BattleInfo;
    citizen: Citizen;
  }

  export async function sendRequest(body: Request): Promise<Response> {
    const response = fetch("https://www.erepublik.com/en/main/travelData", {
      method: "POST",
      headers: {
        "content-type": "application/x-www-form-urlencoded",
        ...getCookieHeaders(),
      },
      body: objectToWwwFormUrlEncoded(body),
    });
    return response.then((response) => response.json());
  }

  export interface BattleInfo {
    battleInfoText: string;
    travelRequired: boolean;
    travelData: boolean;
  }

  export interface Citizen {
    country: RegionClass;
    region: RegionClass;
    city: City;
    residence: Residence;
    travelMethod: string;
  }

  export interface City {
    id: number;
    name: string;
  }

  export interface RegionClass {
    id: number;
    name: string;
    permalink: string;
  }

  export interface Residence {
    hasResidence: number;
    cityId: number;
    regionId: number;
    countryId: number;
    bonuses: Bonuses;
    cityInfo: CityInfo;
  }

  export interface Bonuses {
    hasResidence: number;
    isInResidence: number;
    validUntil: number;
    timeRemaining: number;
    numHouses: number;
    energyBonus: number;
    recoveryBonus: number;
    description: string;
  }

  export interface CityInfo {
    id: number;
    name: string;
    permalink: string;
    regionId: number;
    cityTypeId: number;
    regionName: string;
    regionPermalink: string;
    countryId: number;
    countryName: string;
    countryPermalink: string;
  }

  export interface CountryValue {
    id: number;
    name: string;
    permalink: string;
    // string is in a pattern of "123,432,11,32,42"
    currentRegions: number | null | string;
    // string is in a pattern of "123,432,11,32,42"
    regionsOccupiedByOthers: number | null | string;
    hasRegionsOccupiedByOthers: boolean;
    hasRegionsFromOthers: boolean;
    regions: number[];
  }
}
