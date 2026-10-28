import { describe, expect, it } from "vitest";
import { getManagerWorkLimit, parseEnergy } from "./manager-work";

describe("getManagerWorkLimit", () => {
  it("allows a work for every 10 energy", () => {
    expect(getManagerWorkLimit(59)).toBe(5);
    expect(getManagerWorkLimit(60)).toBe(6);
    expect(getManagerWorkLimit(9)).toBe(0);
    expect(getManagerWorkLimit(-10)).toBe(0);
  });
});

describe("parseEnergy", () => {
  it("parses the shown energy", () => {
    expect(parseEnergy(" 1,234 ")).toBe(1234);
  });

  it("is undefined for anything else", () => {
    expect(parseEnergy("")).toBeUndefined();
    expect(parseEnergy(null)).toBeUndefined();
    expect(parseEnergy("full")).toBeUndefined();
  });
});
