import { postForm, GenericResponseType } from "../utils/request";

export interface Request {
  battleId: "0";
  _token: string;
  travelMethod?: TravelMethod;
  inRegionId: string;
  /** The legacy script left it out when travelling to a market region. */
  toCountryId?: string;
}

export type Response = GenericResponseType;

export function sendRequest(body: Request): Promise<Response> {
  return postForm("/main/travel", body);
}

export type TravelMethod = "preferTicket" | "preferCurrency";
