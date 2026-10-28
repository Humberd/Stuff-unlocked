import { describe, expect, it } from "vitest";
import { isNewerVersion } from "./version";

describe("isNewerVersion", () => {
  it.each([
    ["5.77", "5.76", true],
    ["6.0", "5.76", true],
    ["5.76", "5.76", false],
    ["5.75", "5.76", false],
    ["5.100", "5.99", true],
    ["5.76.1", "5.76", true],
  ])("%s is newer than %s: %s", (candidate, current, expected) => {
    expect(isNewerVersion(candidate, current)).toBe(expected);
  });
});
