import { getHtml } from "../utils/request";
import { parseFormattedNumber } from "../utils/format";
import { ensure } from "../utils/utils";

export type Response = string;

export function sendRequest(): Promise<Response> {
  return getHtml("/main/inventory");
}

export interface UsedStorage {
  current: number;
  total: number;
}

export function parseUsedStorage(html: Response): UsedStorage {
  const doc = new DOMParser().parseFromString(html, "text/html");
  const selector = ".used_storage_wrapper .used_storage";
  const usedStorage = ensure(
    doc.querySelector(selector),
    `Can't find ${selector}`,
  );
  // e.g. "1,234 / 5,678"
  const [current, total] = ensure(
    usedStorage.getAttribute("title"),
    `${selector} has no title attribute`,
  )
    .split("/")
    .map(parseFormattedNumber);

  return { current, total };
}
