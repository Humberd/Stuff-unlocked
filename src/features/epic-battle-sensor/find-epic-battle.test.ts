import { describe, expect, it } from "vitest";
import type {
  Battle,
  BattleZone,
} from "../../requests/campaigns-json-list-request";
import { findEpicBattle, type Fighter } from "./find-epic-battle";

function zone(overrides: Partial<BattleZone> = {}): BattleZone {
  return { div: 4, end: null, epic: 0, terrain: 0, ...overrides };
}

function battle(
  div: Record<string, BattleZone>,
  overrides: Partial<Battle> = {},
): Battle {
  return {
    id: 0,
    war_id: 0,
    start: 0,
    is_rw: false,
    is_dict: false,
    is_lib: false,
    inv: { id: 1 },
    def: { id: 2 },
    div,
    ...overrides,
  };
}

const division4: Fighter = { division: 4, canFightInAnyDivision: false };

describe("findEpicBattle", () => {
  it("returns undefined when no zone is epic", () => {
    expect(
      findEpicBattle({ 10: battle({ 100: zone() }) }, division4),
    ).toBeUndefined();
  });

  it("finds an epic zone of the fighter's division", () => {
    expect(
      findEpicBattle(
        {
          10: battle({
            100: zone({ div: 3, epic: 2 }),
            101: zone({ epic: 2 }),
          }),
        },
        division4,
      ),
    ).toEqual({ battleId: 10, battleZoneId: 101, epic: 2 });
  });

  it("prefers an epic battle over an earlier full scale one", () => {
    expect(
      findEpicBattle(
        {
          10: battle({ 100: zone({ epic: 1 }) }),
          20: battle({ 200: zone({ epic: 2 }) }),
        },
        division4,
      ),
    ).toEqual({ battleId: 20, battleZoneId: 200, epic: 2 });
  });

  it("falls back to a full scale battle", () => {
    expect(
      findEpicBattle({ 10: battle({ 100: zone({ epic: 1 }) }) }, division4),
    ).toEqual({ battleId: 10, battleZoneId: 100, epic: 1 });
  });

  it("returns the first matching battle", () => {
    expect(
      findEpicBattle(
        {
          10: battle({ 100: zone({ epic: 2 }) }),
          20: battle({ 200: zone({ epic: 2 }) }),
        },
        division4,
      )?.battleId,
    ).toBe(10);
  });

  it("counts the air division for everyone", () => {
    expect(
      findEpicBattle(
        { 10: battle({ 100: zone({ div: 11, epic: 2 }) }) },
        division4,
      )?.battleZoneId,
    ).toBe(100);
  });

  it("counts any division for a fighter who can fight in any", () => {
    expect(
      findEpicBattle(
        { 10: battle({ 100: zone({ div: 1, epic: 2 }) }) },
        { division: 4, canFightInAnyDivision: true },
      )?.battleZoneId,
    ).toBe(100);
  });

  it("skips ended zones, other terrains and other divisions", () => {
    expect(
      findEpicBattle(
        {
          10: battle({
            100: zone({ epic: 2, end: 123 }),
            101: zone({ epic: 2, terrain: 1 }),
            102: zone({ epic: 2, div: 1 }),
          }),
        },
        division4,
      ),
    ).toBeUndefined();
  });

  it("skips fights against dictatorships and liberation fights", () => {
    expect(
      findEpicBattle(
        {
          10: battle({ 100: zone({ epic: 2 }) }, { is_dict: true }),
          20: battle({ 200: zone({ epic: 2 }) }, { is_lib: true }),
        },
        division4,
      ),
    ).toBeUndefined();
  });

  it("does not take a full scale zone of a battle that has an epic zone in another division", () => {
    expect(
      findEpicBattle(
        {
          10: battle({
            100: zone({ epic: 1 }),
            101: zone({ div: 11, epic: 2 }),
          }),
        },
        division4,
      ),
    ).toEqual({ battleId: 10, battleZoneId: 101, epic: 2 });
  });
});
