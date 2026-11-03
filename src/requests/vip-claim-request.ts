import { postForm } from "../utils/request";

export interface Request {
  _token: string;
}

export interface Response {
  error: boolean;
  message: string;
  /** Points the claim gave. */
  today_points?: number;
}

export function sendRequest(body: Request): Promise<Response> {
  return postForm("/main/vip-claim", body);
}
