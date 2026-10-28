import { describe, expect, it } from "vitest";
import { type EnergyState, shouldEat } from "./should-eat";

const state: EnergyState = {
  foodRemaining: 1_000,
  smallestFoodUse: 20,
  currentEnergy: 400,
  energyPoolLimit: 500,
  isDeploying: false,
  isSessionValidationPending: false,
};

describe("shouldEat", () => {
  it("eats when there is food left and room for the energy", () => {
    expect(shouldEat(state)).toBe(true);
  });

  it("eats when the energy fills the pool exactly", () => {
    expect(shouldEat({ ...state, currentEnergy: 480 })).toBe(true);
  });

  it("doesn't eat when the energy would overflow the pool", () => {
    expect(shouldEat({ ...state, currentEnergy: 481 })).toBe(false);
  });

  it("doesn't eat without enough food left", () => {
    expect(shouldEat({ ...state, foodRemaining: 19 })).toBe(false);
  });

  it("eats the last portion of food", () => {
    expect(shouldEat({ ...state, foodRemaining: 20 })).toBe(true);
  });

  it("doesn't eat during a deployment", () => {
    expect(shouldEat({ ...state, isDeploying: true })).toBe(false);
  });

  it("doesn't eat while the game checks for bots", () => {
    expect(shouldEat({ ...state, isSessionValidationPending: true })).toBe(
      false,
    );
  });

  it("doesn't eat when food recovers nothing", () => {
    expect(shouldEat({ ...state, smallestFoodUse: 0 })).toBe(false);
  });

  it.each([
    "foodRemaining",
    "smallestFoodUse",
    "currentEnergy",
    "energyPoolLimit",
  ] as const)("doesn't eat when %s is missing", (key) => {
    expect(shouldEat({ ...state, [key]: undefined })).toBe(false);
    expect(shouldEat({ ...state, [key]: NaN })).toBe(false);
  });
});
