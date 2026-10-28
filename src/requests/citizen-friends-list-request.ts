import { getJson } from "../utils/request";

/** A page of a citizen's friends list. */
export interface Response {
  /** HTML of the list. Dead friends have the `dead` class and an id like `friend_123`. */
  content: string;
}

/** `page` counts from 1, 20 friends per page. */
export function sendRequest(
  citizenId: number,
  page: number,
): Promise<Response> {
  return getJson(`/main/citizen-friends/${citizenId}/${page}/list`);
}
