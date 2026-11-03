import { describe, expect, it } from "vitest";
import {
  parseCheapestPrice,
  parseOffers,
} from "./gold-exchange-offers-request";

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

describe("parseOffers", () => {
  it("reads every offer, cheapest first", () => {
    const response = {
      error: false,
      buy_mode:
        "<table><tr><th>Citizen</th></tr>" +
        "<tr><td><button id='purchase_7' data-price='1809.000' data-max='1379.89'>Buy</button></td></tr>" +
        "<tr><td><button id='purchase_5' data-price='1800.000' data-max='4.16'>Buy</button></td></tr>" +
        "</table>",
    };

    expect(parseOffers(response)).toEqual([
      { id: 5, price: 1800, amount: 4.16 },
      { id: 7, price: 1809, amount: 1379.89 },
    ]);
  });

  it("is empty without offers", () => {
    expect(parseOffers({ buy_mode: "<p>No offers</p>", page: 0 })).toEqual([]);
  });
});
