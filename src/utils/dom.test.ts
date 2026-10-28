import { describe, expect, it } from "vitest";
import { lastPathSegment } from "./dom";

describe("lastPathSegment", () => {
  it("returns the citizen id from a profile link", () => {
    expect(lastPathSegment("/en/citizen/profile/4659830")).toBe("4659830");
  });
});
