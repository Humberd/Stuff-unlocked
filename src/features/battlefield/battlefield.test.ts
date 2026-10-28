import { describe, expect, it } from "vitest";
import {
  epicTitle,
  formatDamage,
  isZoneDecided,
  regionLabelSuffix,
} from "./battlefield";

describe("isZoneDecided", () => {
  it("is decided once a side has 1800 points", () => {
    expect(isZoneDecided({ attacker: 1800, defender: 0 })).toBe(true);
    expect(isZoneDecided({ attacker: 100, defender: 1850 })).toBe(true);
    expect(isZoneDecided({ attacker: 1799, defender: 1799 })).toBe(false);
    expect(isZoneDecided(undefined)).toBe(false);
  });
});

describe("regionLabelSuffix", () => {
  it("adds the round and marks resistance wars", () => {
    expect(regionLabelSuffix(true, 3)).toBe(" RW R3");
    expect(regionLabelSuffix(false, 12)).toBe(" R12");
  });
});

describe("epicTitle", () => {
  it("tells epic battles from full scale ones", () => {
    const response = { battle_zone_situation: { "10": 2, "11": 1 } };
    expect(epicTitle(response, 10)).toBe("EPIC BATTLE DETECTED");
    expect(epicTitle(response, 11)).toBe("FULL SCALE DETECTED");
  });

  it("returns undefined for a normal battle", () => {
    expect(epicTitle({ battle_zone_situation: {} }, 10)).toBeUndefined();
    expect(epicTitle({ battle_zone_situation: { "10": 0 } }, 10)).toBe(
      undefined,
    );
    expect(epicTitle({}, 10)).toBeUndefined();
    expect(epicTitle("<html>", 10)).toBeUndefined();
  });
});

describe("formatDamage", () => {
  it("shortens millions and billions", () => {
    expect(formatDamage(1_234_567_890)).toBe("1.235B");
    expect(formatDamage(12_345_678)).toBe("12.35M");
  });

  it("formats smaller damage with separators", () => {
    expect(formatDamage(999_999)).toBe("999,999");
    expect(formatDamage(1234.567)).toBe("1,234.57");
  });
});
