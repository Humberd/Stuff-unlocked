import { describe, expect, it } from "vitest";
import {
  findTaxes,
  getFormUnitTaxes,
  type SellOffersScope,
} from "./sell-offers-scope";

const taxes = { valueAddedTax: 10, importTax: 15 };
const scope: SellOffersScope = {
  settings: { countries: { "35": { taxes: { "1": taxes } } } },
  inputs: { pricePerUnit: "12.5", selectedCountry: 35, selectedIndustry: "1" },
};

describe("findTaxes", () => {
  it("finds the taxes of a country and industry", () => {
    expect(findTaxes(scope, "35", 1)).toBe(taxes);
  });

  it("is undefined for unknown ones", () => {
    expect(findTaxes(scope, 12, 1)).toBeUndefined();
    expect(findTaxes(scope, 35, null)).toBeUndefined();
    expect(findTaxes(undefined, 35, 1)).toBeUndefined();
  });
});

describe("getFormUnitTaxes", () => {
  it("splits the price into tax and net", () => {
    const unitTaxes = getFormUnitTaxes(scope, 35);

    expect(unitTaxes?.net).toBeCloseTo(11.3636);
    expect(unitTaxes?.tax).toBeCloseTo(1.1364);
  });

  it("adds the import tax in a foreign market", () => {
    expect(getFormUnitTaxes(scope, 12)?.net).toBeCloseTo(10);
  });

  it("is undefined without a price", () => {
    expect(
      getFormUnitTaxes(
        { ...scope, inputs: { ...scope.inputs, pricePerUnit: null } },
        35,
      ),
    ).toBeUndefined();
  });
});
