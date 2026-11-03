import { postForm } from "../utils/request";

export interface WorkRequest {
  _token: string;
  action_type: "work";
}

/** Work as Manager in the citizen's own companies. */
export interface ProductionRequest {
  _token: string;
  action_type: "production";
  /** JSON array of company ids. */
  own_work: string;
  /** JSON object of company id to the number of employee works. */
  employee_works: string;
  cntOwnWork: number;
  cntEmployeeWork: number;
  cntSelected: number;
}

export interface Production {
  totalFood: number;
  totalWeapon: number;
  totalHouse: number;
  totalAirplane: number;
}

export interface Response {
  status: boolean;
  message: unknown;
  result?: { production?: Production };
}

export function sendRequest(
  body: WorkRequest | ProductionRequest,
): Promise<Response> {
  return postForm("/economy/work", body);
}
