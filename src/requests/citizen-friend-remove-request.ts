import { HttpError } from "../utils/request";

/**
 * Removes a friend of the logged in citizen. The response isn't JSON,
 * so only its status is checked.
 */
export async function sendRequest(
  friendId: string,
  csrfToken: string,
): Promise<void> {
  const url = `https://www.erepublik.com/en/main/citizen-friends/${friendId}/1/remove?_token=${encodeURIComponent(csrfToken)}`;
  const response = await fetch(url, {
    method: "POST",
    headers: { "content-type": "application/x-www-form-urlencoded" },
  });
  if (!response.ok) {
    throw new HttpError(response.status, response.url);
  }
}
