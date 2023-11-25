import { GenericResponseType, getCookieHeaders, objectToWwwFormUrlEncoded } from "../utils/request";

export namespace Travel {
  export interface Request {
    battleId: "0";
    _token: string;
    travelMethod?: TravelMethod;
    inRegionId: string;
    toCountryId: string;
  }

  export type Response = GenericResponseType;

  export async function sendRequest(body: Request): Promise<Response> {
    const response = fetch("https://www.erepublik.com/en/main/travel", {
      method: "POST",
      headers: {
        "content-type": "application/x-www-form-urlencoded",
        ...getCookieHeaders(),
      },
      body: objectToWwwFormUrlEncoded(body),
    });
    return response.then((response) => response.json());
  }

  export type TravelMethod = "preferTicket" | "preferCurrency";
}
