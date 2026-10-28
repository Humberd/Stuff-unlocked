import { describe, expect, it } from "vitest";
import {
  type CalculatorInputs,
  calculateHitDamage,
  calculateInfluenceResults,
  formatCompact,
  getLegendBonusPercent,
  parseInputNumber,
} from "./influence";

const inputs: CalculatorInputs = {
  hits: 1,
  isNaturalEnemy: false,
  hasWarStash: false,
  boosterPercent: 0,
  legendPercent: 0,
};

// No-hit damage of 10 * 2 * 2 = 40
const unit = {
  rankNumber: 5,
  temporaryStrength: 400,
  points: 1_000,
  nextRankAt: 1_100,
};

const noPrices = { weaponPrice: undefined, foodPricePerEnergy: undefined };

describe("getLegendBonusPercent", () => {
  it("starts above rank 70", () => {
    expect(getLegendBonusPercent(69)).toBe(0);
    expect(getLegendBonusPercent(70)).toBe(0);
    expect(getLegendBonusPercent(71)).toBe(20);
    expect(getLegendBonusPercent(75)).toBe(60);
  });
});

describe("calculateHitDamage", () => {
  it("applies the weapon, the booster and, on the ground, the Legend bonus", () => {
    const boosted = { ...inputs, boosterPercent: 50, legendPercent: 20 };

    // 40 * (1 + 10/5) * 1.2 * 1.5
    expect(calculateHitDamage("ground", unit, 7, boosted)).toBeCloseTo(216);
    // 40 * (1 + 10/5) * 1.5
    expect(calculateHitDamage("aircraft", unit, 7, boosted)).toBeCloseTo(180);
  });

  it("treats a missing strength as 0", () => {
    const aircraft = { rankNumber: 0, points: 0, nextRankAt: 0 };

    expect(calculateHitDamage("aircraft", aircraft, 0, inputs)).toBe(10);
  });
});

describe("calculateInfluenceResults", () => {
  it("multiplies the hit damage by the hits and Natural Enemy", () => {
    const results = calculateInfluenceResults(
      "ground",
      unit,
      0,
      { ...inputs, hits: 3, isNaturalEnemy: true },
      noPrices,
    );

    // floor(40 * 3 * 1.1)
    expect(results.influence).toBe(132);
  });

  it("counts the hits to the next rank, with the War Stash bonus", () => {
    // 100 missing points are 1000 damage, 25 hits of 40
    expect(
      calculateInfluenceResults("ground", unit, 0, inputs, noPrices)
        .hitsToNextRank,
    ).toBe(25);
    // ceil(25 / 1.1)
    expect(
      calculateInfluenceResults(
        "ground",
        unit,
        0,
        { ...inputs, hasWarStash: true },
        noPrices,
      ).hitsToNextRank,
    ).toBe(23);
  });

  it("has infinite hits at the last rank", () => {
    const lastRank = { ...unit, nextRankAt: unit.points };

    expect(
      calculateInfluenceResults("ground", lastRank, 0, inputs, noPrices)
        .hitsToNextRank,
    ).toBe(Infinity);
  });

  it("costs the food and the weapons of a million influence", () => {
    const prices = { weaponPrice: 50, foodPricePerEnergy: 0.01 };
    // 40 * 3 = 120 damage per hit, 1e6 / 120 hits
    const hitsPerMillion = 1e6 / 120;
    // A Q7 weapon's price spread over 10 hits, and 10 energy of food per hit
    const costPerHit = 50 / 10 + 0.01 * 10;

    expect(
      calculateInfluenceResults("ground", unit, 7, inputs, prices)
        .costPerMillion,
    ).toBeCloseTo(hitsPerMillion * costPerHit);
    expect(
      calculateInfluenceResults(
        "ground",
        unit,
        7,
        { ...inputs, isNaturalEnemy: true },
        prices,
      ).costPerMillion,
    ).toBeCloseTo((hitsPerMillion * costPerHit) / 1.1);
  });

  it("costs only food without a weapon", () => {
    const prices = { weaponPrice: undefined, foodPricePerEnergy: 0.01 };

    // 1e6 / 40 hits of 10 energy
    expect(
      calculateInfluenceResults("ground", unit, 0, inputs, prices)
        .costPerMillion,
    ).toBeCloseTo(2_500);
  });

  it("has no cost without the needed prices", () => {
    expect(
      calculateInfluenceResults("ground", unit, 7, inputs, {
        weaponPrice: undefined,
        foodPricePerEnergy: 0.01,
      }).costPerMillion,
    ).toBeUndefined();
    expect(
      calculateInfluenceResults("ground", unit, 0, inputs, noPrices)
        .costPerMillion,
    ).toBeUndefined();
  });
});

describe("parseInputNumber", () => {
  it("reads numbers with a unit and treats the rest as 0", () => {
    expect(parseInputNumber("10%")).toBe(10);
    expect(parseInputNumber(" 2.5")).toBe(2.5);
    expect(parseInputNumber("")).toBe(0);
    expect(parseInputNumber("abc")).toBe(0);
  });
});

describe("formatCompact", () => {
  it("shortens millions and billions", () => {
    expect(formatCompact(1_234.567, 1)).toBe("1,234.6");
    expect(formatCompact(1_500_000, 1)).toBe("1.5M");
    expect(formatCompact(2_250_000_000, 1)).toBe("2.25B");
  });
});
