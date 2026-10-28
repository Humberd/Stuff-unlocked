import { describe, expect, it } from "vitest";
import {
  addCappedKills,
  addHitToBattleStats,
  battleStatsCookie,
  battleStatsCookieName,
  parseBattleStatsCookie,
} from "./battle-stats";

describe("parseBattleStatsCookie", () => {
  const name = battleStatsCookieName(123, 35);

  it("reads the stats of this battle zone and side", () => {
    expect(
      parseBattleStatsCookie("a=1; 1123-35=9|9|9; 123-35=5|40|1000; b=2", name),
    ).toEqual({ kills: 5, prestigePoints: 40, damage: 1000 });
  });

  it("reads the legacy cookie without damage", () => {
    expect(parseBattleStatsCookie("123-35=5|40", name)).toEqual({
      kills: 5,
      prestigePoints: 40,
      damage: 0,
    });
  });

  it("starts from zeros without a cookie", () => {
    expect(parseBattleStatsCookie("a=1", name)).toEqual({
      kills: 0,
      prestigePoints: 0,
      damage: 0,
    });
  });
});

describe("battleStatsCookie", () => {
  it("writes the stats in the legacy format", () => {
    expect(
      battleStatsCookie("123-35", {
        kills: 5,
        prestigePoints: 40,
        damage: 1000,
      }),
    ).toBe("123-35=5|40|1000;max-age=7200;Secure;SameSite=Strict");
  });
});

describe("addHitToBattleStats", () => {
  it("adds up everything", () => {
    expect(
      addHitToBattleStats(
        { kills: 1, prestigePoints: 2, damage: 3 },
        { kills: 1, prestigePoints: 10, damage: 100 },
      ),
    ).toEqual({ kills: 2, prestigePoints: 12, damage: 103 });
  });
});

describe("addCappedKills", () => {
  it("counts up to the cap", () => {
    expect(addCappedKills(20, 3, 25)).toBe(23);
    expect(addCappedKills(20, 10, 25)).toBe(25);
  });

  it("keeps a value that is already above the cap", () => {
    expect(addCappedKills(30, 5, 25)).toBe(30);
  });
});
