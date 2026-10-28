import { describe, expect, it } from "vitest";
import { ensure, toError, urlWithoutHash } from "./utils";

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

  it("keeps falsy values that are not nullish", () => {
    expect(ensure(0)).toBe(0);
    expect(ensure("")).toBe("");
  });

  it("throws for null with the given message", () => {
    expect(() => ensure(null, "missing")).toThrow("missing");
  });
});

describe("urlWithoutHash", () => {
  it("drops the hash, which a click on a href='#' link adds", () => {
    expect(urlWithoutHash("https://www.erepublik.com/en#")).toBe(
      "https://www.erepublik.com/en",
    );
    expect(urlWithoutHash("https://www.erepublik.com/en?a=1#tab")).toBe(
      "https://www.erepublik.com/en?a=1",
    );
  });
});
