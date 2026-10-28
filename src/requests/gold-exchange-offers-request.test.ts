import { describe, expect, it } from "vitest";
import { parseCheapestPrice } from "./gold-exchange-offers-request";

describe("parseCheapestPrice", () => {
  it("reads the price of the first offer", () => {
    const response = {
      buy_mode: true,
      this_page:
        "<tr><td><button data-currency='GOLD' data-price='123.45' data-max='10'>Buy</button></td></tr>" +
        "<tr><td><button data-currency='GOLD' data-price='130' data-max='5'>Buy</button></td></tr>",
    };

    expect(parseCheapestPrice(response)).toBe(123.45);
  });

  it("reads double quoted attributes", () => {
    expect(
      parseCheapestPrice({ this_page: '<button data-price="99.9">' }),
    ).toBe(99.9);
  });

  it("is undefined without offers", () => {
    expect(parseCheapestPrice({ this_page: "" })).toBeUndefined();
    expect(parseCheapestPrice({ this_page: "data-price='0'" })).toBeUndefined();
  });
});
