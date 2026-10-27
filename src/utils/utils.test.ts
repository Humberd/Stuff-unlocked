import { describe, expect, it } from "vitest";
import { ensure, toError } from "./utils";

describe("toError", () => {
  it("keeps Error instances", () => {
    const err = new Error("x");
    expect(toError(err)).toBe(err);
  });

  it("wraps other values", () => {
    expect(toError("boom")).toEqual(new Error("boom"));
  });
});

describe("ensure", () => {
  it("returns present values", () => {
    expect(ensure("a")).toBe("a");
  });

  it("throws for null with the given message", () => {
    expect(() => ensure(null, "missing")).toThrow("missing");
  });
});
