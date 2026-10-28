import { describe, expect, it } from "vitest";
import { parseVipStatus } from "./vip-shop-html-request";

function vipShopHtml(claimButtonStyle: string) {
  return `
    <span id="vip_level">12</span>
    <span id="vip_points"> 1,234,567 </span>
    <span id="next_threshold">2,000,000</span>
    <a id="claimDailyVIPPoints" style="${claimButtonStyle}">Claim</a>`;
}

describe("parseVipStatus", () => {
  it("reads the level, points and whether they are claimed", () => {
    expect(parseVipStatus(vipShopHtml("display:none"))).toEqual({
      level: 12,
      currentPoints: 1234567,
      totalPoints: 2000000,
      isClaimed: true,
    });
  });

  it("is not claimed while the claim button shows", () => {
    expect(parseVipStatus(vipShopHtml("")).isClaimed).toBe(false);
  });

  it("throws when the page has changed", () => {
    expect(() => parseVipStatus("<p></p>")).toThrow("Can't find #vip_level");
  });
});
