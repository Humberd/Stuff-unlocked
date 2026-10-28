import { describe, expect, it } from "vitest";
import {
  electionsUrl,
  electionTypeForDay,
  parseDayOfMonth,
} from "./election-type";

describe("electionTypeForDay", () => {
  it.each([
    [1, "congress"],
    [4, "congress"],
    [5, "presidential"],
    [14, "presidential"],
    [15, "party"],
    [24, "party"],
    [25, "congress"],
    [31, "congress"],
  ] as const)("on day %i opens the %s elections", (day, type) => {
    expect(electionTypeForDay(day)).toBe(type);
  });
});

describe("parseDayOfMonth", () => {
  it("reads the day from the sidebar date", () => {
    expect(parseDayOfMonth("Oct 27")).toBe(27);
    expect(parseDayOfMonth("  Nov 3 ")).toBe(3);
  });

  it("returns nothing for an unexpected text", () => {
    expect(parseDayOfMonth("")).toBeUndefined();
    expect(parseDayOfMonth("Day 6,000")).toBeUndefined();
    expect(parseDayOfMonth("October")).toBeUndefined();
  });
});

describe("electionsUrl", () => {
  it("points at the elections page in the site's language", () => {
    expect(electionsUrl("en", "party")).toBe("/en/main/party-elections");
  });
});
