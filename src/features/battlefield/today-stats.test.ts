import { beforeEach, describe, expect, it } from "vitest";
import {
  addHit,
  addHitToTodayStats,
  EMPTY_TODAY_STATS,
  loadTodayStats,
  parseTodayStats,
  resetTodayStats,
  serializeTodayStats,
  todayStats,
} from "./today-stats";

const hit = { kills: 2, prestigePoints: 10, damage: 1000 };

describe("parseTodayStats", () => {
  it("reads the legacy array", () => {
    expect(parseTodayStats("[1,2,3,4]")).toEqual({
      kills: 1,
      prestigePoints: 2,
      groundDamage: 3,
      airDamage: 4,
    });
  });

  it("fills in missing and invalid values with zeros", () => {
    expect(parseTodayStats('[5,"x"]')).toEqual({
      ...EMPTY_TODAY_STATS,
      kills: 5,
    });
  });

  it("returns zeros for nothing or garbage", () => {
    expect(parseTodayStats(null)).toEqual(EMPTY_TODAY_STATS);
    expect(parseTodayStats("{")).toEqual(EMPTY_TODAY_STATS);
    expect(parseTodayStats('{"a":1}')).toEqual(EMPTY_TODAY_STATS);
  });

  it("round-trips with serializeTodayStats", () => {
    const stats = {
      kills: 1,
      prestigePoints: 2,
      groundDamage: 3,
      airDamage: 4,
    };
    expect(serializeTodayStats(stats)).toBe("[1,2,3,4]");
    expect(parseTodayStats(serializeTodayStats(stats))).toEqual(stats);
  });
});

describe("addHit", () => {
  it("adds ground damage on a ground battle", () => {
    expect(addHit(EMPTY_TODAY_STATS, hit, false)).toEqual({
      kills: 2,
      prestigePoints: 10,
      groundDamage: 1000,
      airDamage: 0,
    });
  });

  it("adds air damage on an air battle", () => {
    expect(addHit(EMPTY_TODAY_STATS, hit, true)).toEqual({
      kills: 2,
      prestigePoints: 10,
      groundDamage: 0,
      airDamage: 1000,
    });
  });
});

describe("stored today's stats", () => {
  beforeEach(() => {
    localStorage.clear();
    todayStats.update(EMPTY_TODAY_STATS);
  });

  it("keeps the legacy stats saved before the day was stored", () => {
    localStorage.setItem("statsToday", "[1,2,3,4]");

    expect(loadTodayStats(100)).toEqual({
      kills: 1,
      prestigePoints: 2,
      groundDamage: 3,
      airDamage: 4,
    });
    expect(localStorage.getItem("STUFF_UNLOCKED.statsTodayEDay")).toBe("100");
  });

  it("starts over on a new day", () => {
    localStorage.setItem("statsToday", "[1,2,3,4]");
    localStorage.setItem("STUFF_UNLOCKED.statsTodayEDay", "99");

    expect(loadTodayStats(100)).toEqual(EMPTY_TODAY_STATS);
    expect(localStorage.getItem("statsToday")).toBe("[0,0,0,0]");
    expect(todayStats.get()).toEqual(EMPTY_TODAY_STATS);
  });

  it("keeps the next day's stats when a tab from the day before adds a hit", () => {
    localStorage.setItem("statsToday", "[1,2,3,4]");
    localStorage.setItem("STUFF_UNLOCKED.statsTodayEDay", "101");

    addHitToTodayStats(hit, false, 100);

    expect(todayStats.get()).toEqual({
      kills: 3,
      prestigePoints: 12,
      groundDamage: 1003,
      airDamage: 4,
    });
    expect(localStorage.getItem("STUFF_UNLOCKED.statsTodayEDay")).toBe("101");
  });

  it("adds hits to what another tab saved", () => {
    addHitToTodayStats(hit, false, 100);
    localStorage.setItem("statsToday", "[10,20,30,40]");
    addHitToTodayStats(hit, true, 100);

    const expected = {
      kills: 12,
      prestigePoints: 30,
      groundDamage: 30,
      airDamage: 1040,
    };
    expect(todayStats.get()).toEqual(expected);
    expect(parseTodayStats(localStorage.getItem("statsToday"))).toEqual(
      expected,
    );
  });

  it("resets the stats", () => {
    addHitToTodayStats(hit, false, 100);
    resetTodayStats(100);

    expect(todayStats.get()).toEqual(EMPTY_TODAY_STATS);
    expect(localStorage.getItem("statsToday")).toBe("[0,0,0,0]");
  });
});
