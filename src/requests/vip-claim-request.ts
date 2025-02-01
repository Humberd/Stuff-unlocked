import { getCookieHeaders, objectToWwwFormUrlEncoded } from "../utils/request";

export namespace VipClaim {
  export interface Request {
    _token: string;
  }
  
  export interface Response {
    error: boolean;
    message: string;
  }
  
  export async function sendRequest(body: Request): Promise<Response> {
    const response = fetch("https://www.erepublik.com/en/main/vip-claim", {
      method: "POST",
      headers: {
        "content-type": "application/x-www-form-urlencoded",
        ...getCookieHeaders(),
      },
      body: objectToWwwFormUrlEncoded(body),
    });
    return response.then((response) => response.json());
  }
}