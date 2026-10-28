import { describe, expect, it } from "vitest";
import { formatCountdown, STARTED_TEXT } from "./countdown";

describe("formatCountdown", () => {
  it.each([
    [59, "-0m:59s"],
    [65, "-1m:05s"],
    [754.6, "-12m:34s"],
    [3600, "-1h:00m:00s"],
    [3 * 3600 + 4 * 60 + 5, "-3h:04m:05s"],
  ])("formats %s seconds as %s", (seconds, expected) => {
    expect(formatCountdown(seconds)).toBe(expected);
  });

  it("shows the started text when less than a second is left", () => {
    expect(formatCountdown(0.5)).toBe(STARTED_TEXT);
    expect(formatCountdown(-10)).toBe(STARTED_TEXT);
  });
});
