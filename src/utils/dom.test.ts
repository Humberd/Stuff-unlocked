import { describe, expect, it } from "vitest";
import { lastPathSegment, markOnce } from "./dom";

describe("markOnce", () => {
  it("is true only on the first call for an element and key", () => {
    const element = document.createElement("div");

    expect(markOnce(element, "a")).toBe(true);
    expect(markOnce(element, "a")).toBe(false);
    expect(markOnce(element, "b")).toBe(true);
    expect(markOnce(document.createElement("div"), "a")).toBe(true);
  });
});

describe("lastPathSegment", () => {
  it("returns the citizen id from a profile link", () => {
    expect(lastPathSegment("/en/citizen/profile/4659830")).toBe("4659830");
  });
});
