import { describe, expect, it } from "vitest";
import { promoPopupKeys } from "./promo-popup";

describe("promoPopupKeys", () => {
  it("returns the keys of today and tomorrow with a zero-based month", () => {
    expect(promoPopupKeys(new Date(2026, 9, 27, 15, 30))).toEqual([
      "promoPopupTimestamp_2026-9-27",
      "promoPopupTimestamp_2026-9-28",
    ]);
  });

  it("rolls over to the next month", () => {
    expect(promoPopupKeys(new Date(2026, 9, 31))).toEqual([
      "promoPopupTimestamp_2026-9-31",
      "promoPopupTimestamp_2026-10-1",
    ]);
  });

  it("rolls over to the next year", () => {
    expect(promoPopupKeys(new Date(2026, 11, 31, 23, 59))).toEqual([
      "promoPopupTimestamp_2026-11-31",
      "promoPopupTimestamp_2027-0-1",
    ]);
  });

  it("doesn't change the given date", () => {
    const date = new Date(2026, 9, 27);
    promoPopupKeys(date);
    expect(date.getDate()).toBe(27);
  });
});
