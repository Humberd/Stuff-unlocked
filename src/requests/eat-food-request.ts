import { getJson } from "../utils/request";

export interface Request {
  _token: string;
}

/** Handed to the game's `energy.processResponse` as it is. */
export type Response = unknown;

export function sendRequest({ _token }: Request): Promise<Response> {
  const query = new URLSearchParams({
    format: "json",
    _token,
    buttonColor: "blue",
  });
  return getJson(`/main/eat?${query.toString()}`);
}
