import { describe, expect, it } from "vitest";
import { formatAmount, getNetPrice } from "./net-price";

const taxes = { valueAddedTax: 10, importTax: 15 };

describe("getNetPrice", () => {
  it("takes the VAT off the price", () => {
    expect(getNetPrice(11, taxes, false)).toBeCloseTo(10);
  });

  it("takes the import tax off too when selling abroad", () => {
    expect(getNetPrice(12.5, taxes, true)).toBeCloseTo(10);
  });
});

describe("formatAmount", () => {
  it("groups thousands and pads the decimals", () => {
    expect(formatAmount(1234.5, 2)).toBe("1,234.50");
    expect(formatAmount(0.123456, 4)).toBe("0.1235");
  });
});
