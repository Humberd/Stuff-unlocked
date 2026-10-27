import { getHtml } from "../utils/request";

export type Response = string;

export function sendRequest(): Promise<Response> {
  return getHtml("/main/inventory");
}
