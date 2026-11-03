import { postForm } from "../utils/request";

export interface Response {
  status: boolean;
  message: unknown;
  result?: { strength_bonus: number };
}

export function sendRequest(
  csrfToken: string,
  groundIds: number[],
): Promise<Response> {
  const body: Record<string, string | number> = { _token: csrfToken };
  groundIds.forEach((id, index) => {
    body[`grounds[${index}][id]`] = id;
    body[`grounds[${index}][train]`] = 1;
  });
  return postForm("/economy/train", body);
}
