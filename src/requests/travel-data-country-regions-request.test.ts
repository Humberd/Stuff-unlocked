import { describe, expect, it } from "vitest";
import {
  findCheapestRegion,
  type Response,
} from "./travel-data-country-regions-request";
import type { Region } from "./travel-data-request";

function region(fields: Partial<Region>): Region {
  return { canMove: true, countryId: 35, cost: 10, ...fields } as Region;
}

describe("findCheapestRegion", () => {
  it("picks the cheapest region of the country the citizen can move to", () => {
    const response: Response = {
      regions: {
        "1": region({ cost: 12 }),
        "2": region({ cost: 5 }),
        "3": region({ cost: 1, canMove: false }),
        "4": region({ cost: 1, countryId: 36 }),
      },
    };

    expect(findCheapestRegion(response, 35)).toEqual({
      regionId: "2",
      cost: 5,
    });
  });

  it("keeps the first of equally cheap regions", () => {
    const response: Response = {
      regions: { "7": region({ cost: 3 }), "8": region({ cost: 3 }) },
    };

    expect(findCheapestRegion(response, 35)?.regionId).toBe("7");
  });

  it("is undefined when no region can be reached", () => {
    expect(
      findCheapestRegion({ regions: { "1": region({ canMove: false }) } }, 35),
    ).toBeUndefined();
    expect(findCheapestRegion({ regions: {} }, 35)).toBeUndefined();
  });
});
