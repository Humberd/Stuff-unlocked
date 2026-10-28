import { getHtml } from "../utils/request";
import { parseFormattedNumber } from "../utils/format";
import { ensure } from "../utils/utils";

export type Response = string;

export function sendRequest(): Promise<Response> {
  return getHtml("/main/vip-shop");
}

export interface VipStatus {
  level: number;
  currentPoints: number;
  /** Points needed for the next level. */
  totalPoints: number;
  isClaimed: boolean;
}

export function parseVipStatus(html: Response): VipStatus {
  const doc = new DOMParser().parseFromString(html, "text/html");
  const readNumber = (selector: string) =>
    parseFormattedNumber(
      ensure(doc.querySelector(selector), `Can't find ${selector}`).textContent,
    );

  return {
    level: readNumber("#vip_level"),
    currentPoints: readNumber("#vip_points"),
    totalPoints: readNumber("#next_threshold"),
    isClaimed:
      doc.querySelector("#claimDailyVIPPoints[style='display:none']") !== null,
  };
}
