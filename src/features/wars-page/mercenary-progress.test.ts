import { describe, expect, it } from "vitest";
import type {
  FreedomFighter,
  MercenaryProgress,
} from "../../requests/citizen-profile-personal-request";
import type { Battle } from "../../requests/campaigns-json-list-request";
import {
  cardProgress,
  DONE_COLOR,
  freedomFighterKills,
  IN_PROGRESS_COLOR,
  killsNeeded,
  NOT_STARTED_COLOR,
  progressColor,
} from "./mercenary-progress";

const mercenary: MercenaryProgress = {
  details: {
    1: { enemies_killed: 10, name: "Romania" },
    2: { enemies_killed: 25, name: "Brazil" },
  },
  progress: { current: 12, max: 50, percent: 24 },
};

const freedomFighter: FreedomFighter = {
  achievements: 0,
  milestone: { kills: 50, regions: 10 },
  progress: {
    regions: 4,
    wars: {
      inprogress: [
        { war_id: 7, region: "Bucuresti", kills: 30 },
        { war_id: 8, region: "Moldova", kills: 120 },
      ],
      finished: [],
    },
  },
};

function battle(overrides: Partial<Battle> = {}): Battle {
  return {
    id: 1,
    war_id: 7,
    start: 0,
    is_rw: false,
    is_dict: false,
    is_lib: false,
    inv: { id: 1 },
    def: { id: 2 },
    div: {},
    ...overrides,
  };
}

describe("progressColor", () => {
  it.each([
    [0, NOT_STARTED_COLOR],
    [10, IN_PROGRESS_COLOR],
    [25, DONE_COLOR],
    [40, DONE_COLOR],
  ])("colours %s of 25 kills", (kills, color) => {
    expect(progressColor(kills, 25)).toBe(color);
  });
});

describe("freedomFighterKills", () => {
  it("returns the kills of the war, up to 75", () => {
    const wars = freedomFighter.progress.wars.inprogress;
    expect(freedomFighterKills(wars, 7)).toBe(30);
    expect(freedomFighterKills(wars, 8)).toBe(75);
    expect(freedomFighterKills(wars, 9)).toBe(0);
  });
});

describe("cardProgress", () => {
  it("returns the Mercenary kills of both sides", () => {
    expect(cardProgress(battle(), mercenary, freedomFighter)).toEqual({
      invaderMercenaryKills: 10,
      defenderMercenaryKills: 25,
      freedomFighterKills: undefined,
    });
  });

  it("counts no kills for a country missing in the details", () => {
    expect(
      cardProgress(battle({ def: { id: 3 } }), mercenary, freedomFighter)
        ?.defenderMercenaryKills,
    ).toBe(0);
  });

  it("adds the Freedom Fighter kills of a resistance war", () => {
    expect(
      cardProgress(battle({ is_rw: true }), mercenary, freedomFighter)
        ?.freedomFighterKills,
    ).toBe(30);
  });

  it("skips fights against dictatorships and liberation fights", () => {
    expect(
      cardProgress(battle({ is_dict: true }), mercenary, freedomFighter),
    ).toBeUndefined();
    expect(
      cardProgress(battle({ is_lib: true }), mercenary, freedomFighter),
    ).toBeUndefined();
  });
});

describe("killsNeeded", () => {
  it("returns the kills needed for both medals", () => {
    expect(killsNeeded(mercenary, freedomFighter)).toEqual({
      mercenary: 25 * 38,
      freedomFighter: 50 * 6,
    });
  });
});
