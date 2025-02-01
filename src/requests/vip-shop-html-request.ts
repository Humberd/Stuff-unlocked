import { getCookieHeaders } from "../utils/request";

export namespace VipShopHtml {
  export interface Request {}

  export type Response = string;

  export function sendRequest(request: Request): Promise<Response> {
    const response = fetch(
      "https://www.erepublik.com/en/main/vip-shop",
      {
        method: "GET",
        headers: {
          "content-type": "text/html",
          ...getCookieHeaders(),
        },
      }
    );
    return response.then((response) => response.text());
  }
}