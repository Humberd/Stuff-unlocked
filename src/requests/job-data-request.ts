import { getJson } from "../utils/request";

export interface Response {
  isEmployee: boolean;
  alreadyWorked: boolean;
  salary: number;
  currency: string;
  overTime: {
    points: number;
    /** Unix time in seconds when overtime can be worked again, 0 when it can be worked now. */
    nextOverTime: number;
  };
}

export function sendRequest(): Promise<Response> {
  return getJson("/main/job-data");
}
