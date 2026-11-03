import { describe, expect, it } from "vitest";
import { getCurrentEDay } from "./game-day";

describe("getCurrentEDay", () => {
  // 2026-11-02 17:00 in the game's time zone
  const loadedAt = Date.parse("2026-11-03T01:00:00Z");

  it("stays the same before midnight in the game's time zone", () => {
    expect(
      getCurrentEDay(6922, loadedAt, Date.parse("2026-11-03T07:59:00Z")),
    ).toBe(6922);
  });

  it("moves on after midnight in the game's time zone", () => {
    expect(
      getCurrentEDay(6922, loadedAt, Date.parse("2026-11-03T08:01:00Z")),
    ).toBe(6923);
    expect(
      getCurrentEDay(6922, loadedAt, Date.parse("2026-11-05T09:00:00Z")),
    ).toBe(6925);
  });
});
