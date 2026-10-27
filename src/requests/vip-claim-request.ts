import { postForm } from "../utils/request";

export interface Request {
  _token: string;
}

export interface Response {
  error: boolean;
  message: string;
}

export function sendRequest(body: Request): Promise<Response> {
  return postForm("/main/vip-claim", body);
}
