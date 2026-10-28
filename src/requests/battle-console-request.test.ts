import { describe, expect, it } from "vitest";
import { findEpicProgress, findTopFighters } from "./battle-console-request";

describe("findEpicProgress", () => {
  const response = {
    division: [{ epicBattleProgress: 10 }, { epicBattleProgress: "55.5" }],
  };

  it("reads the progress of the division, counted from 1", () => {
    expect(findEpicProgress(response, 1)).toBe(10);
    expect(findEpicProgress(response, 2)).toBe(55.5);
  });

  it("returns undefined for a missing division", () => {
    expect(findEpicProgress(response, 4)).toBeUndefined();
  });
});

describe("findTopFighters", () => {
  const fighter = (id: number) => ({
    citizenId: id,
    citizenName: `Citizen ${id}`,
    raw_value: id * 1000,
  });

  it("returns the side's fighters keyed below 11, in order", () => {
    const fighterData = Object.fromEntries(
      Array.from({ length: 12 }, (_, i) => [String(i + 1), fighter(i + 1)]),
    );
    const response = { "35": { fighterData }, "41": { fighterData: {} } };

    expect(findTopFighters(response, 35).map((f) => f.citizenId)).toEqual([
      1, 2, 3, 4, 5, 6, 7, 8, 9, 10,
    ]);
    expect(findTopFighters(response, 41)).toEqual([]);
  });

  it("returns nothing for a side without data", () => {
    expect(findTopFighters({}, 35)).toEqual([]);
  });
});
