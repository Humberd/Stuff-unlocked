import { describe, expect, it } from "vitest";
import {
  calculateNoHitDamage,
  calculateWeaponHitDamage,
  getWeaponPower,
} from "./damage";

describe("calculateNoHitDamage", () => {
  it("grows with strength and rank", () => {
    expect(calculateNoHitDamage(0, 0)).toBe(10);
    expect(calculateNoHitDamage(400, 5)).toBe(40);
  });
});

describe("getWeaponPower", () => {
  it("counts Q7 as Q10", () => {
    expect(getWeaponPower(0)).toBe(0);
    expect(getWeaponPower(6)).toBe(6);
    expect(getWeaponPower(7)).toBe(10);
  });
});

describe("calculateWeaponHitDamage", () => {
  it("triples the damage with Q7", () => {
    expect(calculateWeaponHitDamage(400, 5, 7)).toBe(120);
    expect(calculateWeaponHitDamage(400, 5, 0)).toBe(40);
  });
});
