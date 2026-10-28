import { describe, expect, it } from "vitest";
import { parseFormattedNumber } from "./format";

describe("parseFormattedNumber", () => {
  it("removes every thousands separator", () => {
    expect(parseFormattedNumber(" 1,234,567 ")).toBe(1234567);
  });
});
