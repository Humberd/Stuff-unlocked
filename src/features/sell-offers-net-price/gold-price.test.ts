import { describe, expect, it } from "vitest";
import { isFresh } from "./gold-price";

describe("isFresh", () => {
  const now = 10 * 60 * 60 * 1000;

  it("keeps a price for an hour", () => {
    expect(isFresh({ price: 5, timestamp: now - 59 * 60 * 1000 }, now)).toBe(
      true,
    );
    expect(isFresh({ price: 5, timestamp: now - 60 * 60 * 1000 }, now)).toBe(
      false,
    );
  });

  it("ignores missing, invalid and future prices", () => {
    expect(isFresh(undefined, now)).toBe(false);
    expect(isFresh({ price: 0, timestamp: now }, now)).toBe(false);
    expect(isFresh({ price: 5, timestamp: now + 1 }, now)).toBe(false);
  });
});
