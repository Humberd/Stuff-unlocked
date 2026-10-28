import { describe, expect, it } from "vitest";
import { findResidenceToReturnTo } from "./residence";

const residence = { hasResidence: 1, regionId: 10, countryId: 35 };

describe("findResidenceToReturnTo", () => {
  it("returns the residence when the citizen is in another region", () => {
    expect(
      findResidenceToReturnTo({ regionLocationId: 20, residence }),
    ).toEqual({ regionId: 10, countryId: 35 });
  });

  it("returns nothing when the citizen is in the residence region", () => {
    expect(
      findResidenceToReturnTo({ regionLocationId: 10, residence }),
    ).toBeUndefined();
  });

  it("returns nothing without a residence", () => {
    expect(
      findResidenceToReturnTo({
        regionLocationId: 20,
        residence: { ...residence, hasResidence: 0 },
      }),
    ).toBeUndefined();
    expect(findResidenceToReturnTo({ regionLocationId: 20 })).toBeUndefined();
  });
});
