import { postForm } from "../utils/request";

export interface Request {
  _token: string;
  offerId: number;
  amount: number;
  page: number;
  currencyId: number;
}

export interface Response {
  error: boolean;
  message: string;
}

export function sendRequest(body: Request): Promise<Response> {
  return postForm("/economy/exchange/purchase/", body);
}
