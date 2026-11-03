import { getHtml } from "../utils/request";

export type Response = string;

export function sendRequest(): Promise<Response> {
  return getHtml("/economy/myCompanies");
}

export interface Company {
  id: number;
  can_work_as_manager: boolean;
  already_worked: boolean;
}

export interface MyCompanies {
  companies: Company[];
  energy: number;
}

/** The page keeps its data in `var companies = {...};` and `var pageDetails = {...};`. */
export function parseMyCompanies(html: Response): MyCompanies {
  const companies = readVariable<Record<string, Company>>(html, "companies");
  const pageDetails = readVariable<{ health: number }>(html, "pageDetails");
  return {
    companies: Object.values(companies),
    energy: Number(pageDetails.health),
  };
}

function readVariable<T>(html: string, name: string): T {
  const match = new RegExp(
    `var\\s+${name}\\s*=\\s*(\\{.*?\\});\\s*\\n`,
    "s",
  ).exec(html);
  if (!match) {
    throw new Error(`Can't find ${name} on the companies page`);
  }
  return JSON.parse(match[1]) as T;
}
