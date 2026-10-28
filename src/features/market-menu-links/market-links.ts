export interface MarketProduct {
  industryId: number;
  quality: number;
}

/** The products shown in the menu, each opens a list of its qualities on hover. */
export const MENU_PRODUCTS: readonly MarketProduct[] = [
  { industryId: 1, quality: 1 }, // Food
  { industryId: 2, quality: 7 }, // Weapons
  { industryId: 23, quality: 1 }, // Aircraft weapons
  { industryId: 3, quality: 5 }, // Moving tickets
  { industryId: 4, quality: 1 }, // Houses
];

/** Raw materials of each industry. */
const RAW_MATERIAL_INDUSTRY: Record<number, number> = {
  1: 7,
  2: 12,
  4: 17,
  23: 24,
};

/** Every quality of the product, followed by its raw material if it has one. */
export function productLinks(industryId: number): MarketProduct[] {
  const maxQuality = industryId < 3 ? 7 : 5;
  const links = Array.from({ length: maxQuality }, (_, index) => ({
    industryId,
    quality: index + 1,
  }));
  const rawIndustryId = RAW_MATERIAL_INDUSTRY[industryId];
  if (rawIndustryId !== undefined) {
    links.push({ industryId: rawIndustryId, quality: 1 });
  }
  return links;
}

export interface CitizenCountries {
  /** Citizenship. */
  country: number;
  countryLocationId: number;
  regionLocationId: number;
  residence?: { hasResidence: number; regionId: number };
}

/**
 * At home, the citizenship market. Away from the residence, the market
 * of the country the citizen is in.
 */
export function marketCountryId(citizen: CitizenCountries): number {
  const residence = citizen.residence;
  const isAwayFromResidence =
    Boolean(residence?.hasResidence) &&
    citizen.regionLocationId !== residence?.regionId;
  return isAwayFromResidence ? citizen.countryLocationId : citizen.country;
}

export function marketplaceUrl(
  culture: string,
  countryId: number,
  { industryId, quality }: MarketProduct,
): string {
  return `/${culture}/economy/marketplace#${countryId}/${industryId}/${quality}`;
}

export function productIconUrl({ industryId, quality }: MarketProduct): string {
  return `https://www.erepublik.net/images/icons/industry/${industryId}/q${quality}.png`;
}
