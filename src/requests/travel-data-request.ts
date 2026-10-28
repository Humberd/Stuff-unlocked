import { postForm } from "../utils/request";

export interface Request {
  battleId: "0";
  _token: string;
  regionId: string;
  holdingId: "0";
}

export interface Response {
  countries: Record<string, CountryValue>;
  regions: Record<string, Region>;
  preselectCountryId: boolean;
  preselectRegionId: boolean;
  alreadyInRegion: string;
  battleInfo: BattleInfo;
  citizen: Citizen;
}

export function sendRequest(body: Request): Promise<Response> {
  return postForm("/main/travelData", body);
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

export interface Region {
  id: number;
  name: string;
  permalink: string;
  zoneName: ZoneName;
  distanceInZones: number;
  distanceInKm: number;
  isConquered: boolean;
  isConqueredFrom: number;
  isConqueredBy: number;
  countryId: number;
  cityId: number;
  cityName: string;
  cost: number;
  ticket: number;
  ticketAmount: number;
  canMove: boolean;
  isAlly: boolean;
  isDiscounted: boolean;
}

export type ZoneName =
  | "A1"
  | "A2"
  | "A3"
  | "A4"
  | "A5"
  | "B1"
  | "B3"
  | "B4"
  | "B5"
  | "C1"
  | "C2"
  | "C3"
  | "C4"
  | "C5"
  | "D2"
  | "D3"
  | "D5";
