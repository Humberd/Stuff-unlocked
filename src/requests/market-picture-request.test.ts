import { describe, expect, it } from "vitest";
import { findCheapestOffer, type Response } from "./market-picture-request";

const offer = { id: 1, amount: 5, gross: 0.99, net: 0.98, vat: 1, import: 99 };

describe("findCheapestOffer", () => {
  it("finds the first offer of an industry and quality", () => {
    const response = { food: { q1: [offer] } } as unknown as Response;

    expect(findCheapestOffer(response, 1, 1)).toBe(offer);
  });

  it("is undefined without offers or for an unknown industry", () => {
    const response = { food: { q1: [] } } as unknown as Response;

    expect(findCheapestOffer(response, 1, 1)).toBeUndefined();
    expect(findCheapestOffer(response, 1, 7)).toBeUndefined();
    expect(findCheapestOffer(response, 99, 1)).toBeUndefined();
  });
});
