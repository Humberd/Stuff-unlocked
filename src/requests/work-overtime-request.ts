import { postForm } from "../utils/request";

export interface Request {
  _token: string;
  action_type: "workOvertime";
}

export interface Response {
  status: boolean;
  message: unknown;
}

export function sendRequest(body: Request): Promise<Response> {
  return postForm("/economy/workOvertime", body);
}
