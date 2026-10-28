import { describe, expect, it } from "vitest";
import { hitFromDeployFinished, hitFromFightResponse } from "./hits";

describe("hitFromFightResponse", () => {
  it("counts a kill with the given damage and prestige points", () => {
    expect(
      hitFromFightResponse({
        error: false,
        message: "ENEMY_KILLED",
        hits: 3,
        oldEnemy: { isNatural: false },
        user: { givenDamage: 1000 },
      }),
    ).toEqual({ kills: 1, prestigePoints: 3, damage: 1000 });
  });

  it("adds the natural enemy bonus, rounded down", () => {
    expect(
      hitFromFightResponse({
        message: "OK",
        oldEnemy: { isNatural: true },
        user: { givenDamage: 1005 },
      }),
    ).toEqual({ kills: 1, prestigePoints: 1, damage: 1105 });
  });

  it("takes the damage of a bomb", () => {
    expect(
      hitFromFightResponse({
        error: false,
        message: "OK",
        bomb: { damage: 50_000 },
      }),
    ).toEqual({ kills: 1, prestigePoints: 1, damage: 50_000 });
  });

  it("accepts a response with data and another message", () => {
    expect(
      hitFromFightResponse({
        message: "SOMETHING",
        data: { x: 1 },
        user: { givenDamage: 7 },
      }),
    ).toEqual({ kills: 1, prestigePoints: 1, damage: 7 });
  });

  it("ignores errors and responses without a fight", () => {
    expect(
      hitFromFightResponse({ error: true, message: "ENEMY_KILLED" }),
    ).toBeUndefined();
    expect(hitFromFightResponse({ message: "NOT_ENOUGH_HEALTH" })).toBe(
      undefined,
    );
    expect(hitFromFightResponse("<html>")).toBeUndefined();
    expect(hitFromFightResponse(null)).toBeUndefined();
  });
});

describe("hitFromDeployFinished", () => {
  it("parses the formatted numbers", () => {
    expect(
      hitFromDeployFinished({
        kills: "1,234",
        damage: "12,345,678",
        rewards: { prestigePoints: "2,500" },
      }),
    ).toEqual({ kills: 1234, prestigePoints: 2500, damage: 12_345_678 });
  });

  it("accepts plain numbers", () => {
    expect(
      hitFromDeployFinished({
        kills: 5,
        damage: 100,
        rewards: { prestigePoints: 10 },
      }),
    ).toEqual({ kills: 5, prestigePoints: 10, damage: 100 });
  });
});
