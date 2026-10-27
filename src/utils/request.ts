const BASE_URL = "https://www.erepublik.com/en";

export class HttpError extends Error {
  readonly status: number;
  readonly url: string;

  constructor(status: number, url: string) {
    super(`Request to ${url} failed with status ${status}`);
    this.name = "HttpError";
    this.status = status;
    this.url = url;
  }
}

type FormValue = string | number | boolean | undefined;
type FormBody<B> = { [K in keyof B]: FormValue };

/**
 * GETs a JSON endpoint. The body is parsed even for error statuses,
 * because eRepublik reports errors inside JSON bodies.
 */
export async function getJson<T>(path: string): Promise<T> {
  return parseJson(await fetch(BASE_URL + path));
}

export async function getHtml(path: string): Promise<string> {
  const response = await fetch(BASE_URL + path);
  if (!response.ok) {
    throw new HttpError(response.status, response.url);
  }
  return response.text();
}

/**
 * POSTs a form to a JSON endpoint. The body is parsed even for error
 * statuses, because eRepublik reports errors inside JSON bodies.
 */
export async function postForm<T, B extends FormBody<B>>(
  path: string,
  body: B,
): Promise<T> {
  const response = await fetch(BASE_URL + path, {
    method: "POST",
    headers: {
      "content-type": "application/x-www-form-urlencoded",
    },
    body: toUrlEncoded(body as Record<string, FormValue>),
  });
  return parseJson(response);
}

async function parseJson<T>(response: Response): Promise<T> {
  const text = await response.text();
  try {
    return JSON.parse(text);
  } catch (e) {
    if (!response.ok) {
      throw new HttpError(response.status, response.url);
    }
    throw new Error(`Invalid JSON in response from ${response.url}`, {
      cause: e,
    });
  }
}

function toUrlEncoded(body: Record<string, FormValue>): string {
  const searchParams = new URLSearchParams();
  for (const [key, value] of Object.entries(body)) {
    if (value !== undefined) {
      searchParams.append(key, String(value));
    }
  }
  return searchParams.toString();
}

export interface SuccessResponse {
  error: 0;
  message: string;
}

export interface ErrorResponse {
  error: 1;
  message: string;
}

export type GenericResponseType = SuccessResponse | ErrorResponse;
