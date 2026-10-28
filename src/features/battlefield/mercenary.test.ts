import { describe, expect, it } from "vitest";
import type { FreedomFighter } from "../../requests/citizen-profile-personal-request";
import {
  freedomFighterKills,
  isFreedomFighterBattle,
  killsToPrefill,
  mercenaryKills,
  regionNameFromTitle,
} from "./mercenary";

describe("regionNameFromTitle", () => {
  it("reads the region name", () => {
    expect(regionNameFromTitle("Region name - Mazovia")).toBe("Mazovia");
    expect(regionNameFromTitle("Mazovia")).toBeUndefined();
  });
});

describe("mercenaryKills", () => {
  it("reads the kills for both sides' countries", () => {
    const progress = {
      details: {
        "35": { enemies_killed: 12, name: "Poland" },
        "41": { enemies_killed: 25, name: "Germany" },
      },
      progress: { current: 10, max: 50, percent: 20 },
    };
    expect(mercenaryKills(progress, 35, 41)).toEqual({ left: 12, right: 25 });
    expect(mercenaryKills(progress, 35, 1)).toEqual({ left: 12, right: 0 });
  });
});

describe("freedomFighterKills", () => {
  const freedomFighter = (
    inprogress: FreedomFighter["progress"]["wars"]["inprogress"],
  ): FreedomFighter => ({
    achievements: 0,
    milestone: { kills: 75, regions: 5 },
    progress: { regions: 0, wars: { inprogress, finished: [] } },
  });

  it("reads the kills in the region", () => {
    expect(
      freedomFighterKills(
        freedomFighter([
          { war_id: 1, region: "Mazovia", kills: 30 },
          { war_id: 2, region: "Silesia", kills: 10 },
        ]),
        "Mazovia",
      ),
    ).toBe(30);
  });

  it("caps the kills at 75", () => {
    expect(
      freedomFighterKills(
        freedomFighter([{ war_id: 1, region: "Mazovia", kills: 90 }]),
        "Mazovia",
      ),
    ).toBe(75);
  });

  it("returns 0 for another region", () => {
    expect(
      freedomFighterKills(
        freedomFighter([{ war_id: 1, region: "Mazovia", kills: 30 }]),
        undefined,
      ),
    ).toBe(0);
  });
});

describe("isFreedomFighterBattle", () => {
  it("is a resistance war on the real invader's side", () => {
    expect(
      isFreedomFighterBattle({
        isResistance: true,
        leftBattleId: 35,
        realInvaderId: 35,
      }),
    ).toBe(true);
    expect(
      isFreedomFighterBattle({
        isResistance: true,
        leftBattleId: 41,
        realInvaderId: 35,
        spectatorOnly: true,
      }),
    ).toBe(true);
  });

  it("is not on the other side or in a normal battle", () => {
    expect(
      isFreedomFighterBattle({
        isResistance: true,
        leftBattleId: 41,
        realInvaderId: 35,
      }),
    ).toBe(false);
    expect(
      isFreedomFighterBattle({ leftBattleId: 35, realInvaderId: 35 }),
    ).toBe(false);
  });
});

describe("killsToPrefill", () => {
  it("prefills the kills left", () => {
    expect(killsToPrefill(75, 30)).toBe(45);
  });

  it("prefills 25 when nothing is left", () => {
    expect(killsToPrefill(75, 75)).toBe(25);
  });
});
