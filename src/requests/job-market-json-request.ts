import { getJson } from "../utils/request";

export interface Response {
  jobs?: JobOffer[];
}

export interface JobOffer {
  /** Gross salary per work. */
  salary: number;
  netSalary: number;
  /** Most the employer pays per day, 0 without a limit. */
  salaryLimit: number;
  citizenId?: number;
  companyId?: number;
}

/** The first page of a country's job offers, the highest salaries first. */
export function sendRequest(countryId: number): Promise<Response> {
  return getJson(`/economy/job-market-json/${countryId}/1/desc`);
}
