import { type GenericResponseType, postForm } from "../utils/request";

export interface Request {
  _token: string;
  battleId: number;
  battleZoneId: number;
  /** The side to fight for, when the citizen can choose. */
  sideCountryId?: number;
}

export type Response = GenericResponseType;

/** Moves the citizen to a battle, travelling to its region if needed. */
export function sendRequest(body: Request): Promise<Response> {
  return postForm("/main/battlefieldTravel", body);
}
