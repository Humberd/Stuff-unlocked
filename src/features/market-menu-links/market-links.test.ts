import { describe, expect, it } from "vitest";
import { marketCountryId, marketplaceUrl, productLinks } from "./market-links";

describe("productLinks", () => {
  it("lists 7 qualities of food and its raw material", () => {
    expect(productLinks(1)).toEqual([
      { industryId: 1, quality: 1 },
      { industryId: 1, quality: 2 },
      { industryId: 1, quality: 3 },
      { industryId: 1, quality: 4 },
      { industryId: 1, quality: 5 },
      { industryId: 1, quality: 6 },
      { industryId: 1, quality: 7 },
      { industryId: 7, quality: 1 },
    ]);
  });

  it("lists 7 qualities of weapons and their raw material", () => {
    const links = productLinks(2);
    expect(links).toHaveLength(8);
    expect(links.at(-1)).toEqual({ industryId: 12, quality: 1 });
  });

  it("lists 5 qualities of tickets, which have no raw material", () => {
    expect(productLinks(3)).toEqual(
      [1, 2, 3, 4, 5].map((quality) => ({ industryId: 3, quality })),
    );
  });

  it("lists 5 qualities of houses and aircraft weapons with their raw materials", () => {
    expect(productLinks(4).at(-1)).toEqual({ industryId: 17, quality: 1 });
    expect(productLinks(4)).toHaveLength(6);
    expect(productLinks(23).at(-1)).toEqual({ industryId: 24, quality: 1 });
    expect(productLinks(23)).toHaveLength(6);
  });
});

describe("marketCountryId", () => {
  const citizen = {
    country: 35,
    countryLocationId: 40,
    regionLocationId: 100,
    residence: { hasResidence: 1, regionId: 200 },
  };

  it("uses the current country away from the residence", () => {
    expect(marketCountryId(citizen)).toBe(40);
  });

  it("uses the citizenship in the residence region", () => {
    expect(marketCountryId({ ...citizen, regionLocationId: 200 })).toBe(35);
  });

  it("uses the citizenship without a residence", () => {
    expect(
      marketCountryId({
        ...citizen,
        residence: { hasResidence: 0, regionId: 200 },
      }),
    ).toBe(35);
  });
});

describe("marketplaceUrl", () => {
  it("points at the product in the country's market", () => {
    expect(marketplaceUrl("en", 35, { industryId: 2, quality: 7 })).toBe(
      "/en/economy/marketplace#35/2/7",
    );
  });
});
