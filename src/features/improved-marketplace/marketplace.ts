export const FOOD_INDUSTRY_ID = 1;

type Id = number | string;

/** The Angular scope of `#marketplace`. */
export interface MarketplaceScope {
  settings?: {
    /** Set on the page of a single offer someone shared. */
    isSharedOffer?: boolean;
    countryId?: Id;
    industryId?: Id;
    lastQuality?: Id;
    /** Set when the citizen can buy in the market shown. */
    can_buy?: boolean;
    my_offer?: boolean;
  };
  /** The offers shown. */
  marketplace?: Array<{ country_id?: Id; customization_level?: Id }>;
}

export interface MarketSelection {
  countryId: number;
  industryId: number;
  quality: number;
  isSharedOffer: boolean;
  /** The citizen has to travel to buy here. */
  needsTravelToBuy: boolean;
}

/** The market shown, or undefined while the page hasn't loaded it. */
export function getMarketSelection(
  scope: MarketplaceScope | undefined,
): MarketSelection | undefined {
  const settings = scope?.settings;
  if (!settings) {
    return undefined;
  }
  const isSharedOffer = Boolean(settings.isSharedOffer);
  const sharedOffer = scope.marketplace?.[0];
  if (isSharedOffer && !sharedOffer) {
    return undefined;
  }
  const selection = {
    countryId: Number(
      isSharedOffer ? sharedOffer?.country_id : settings.countryId,
    ),
    industryId: Number(settings.industryId),
    quality: Number(
      isSharedOffer ? sharedOffer?.customization_level : settings.lastQuality,
    ),
    isSharedOffer,
    needsTravelToBuy: !settings.can_buy && !settings.my_offer,
  };
  const isComplete = [
    selection.countryId,
    selection.industryId,
    selection.quality,
  ].every((id) => id > 0);
  return isComplete ? selection : undefined;
}

export interface CitizenLocation {
  /** Citizenship. */
  country: number;
  countryLocationId: number;
}

/**
 * The other market worth comparing prices with: the citizenship's one, or
 * the one of the country the citizen is in while looking at the
 * citizenship's market. None while the citizen is at home and looks at
 * the home market.
 */
export function getComparedCountryId(
  shownCountryId: number,
  { country, countryLocationId }: CitizenLocation,
): number | undefined {
  if (shownCountryId === country) {
    return countryLocationId === country ? undefined : countryLocationId;
  }
  return country;
}

/** Price of a single health point restored by food. */
export function getCostPerHealthPoint(
  price: number,
  energyPerFood: number,
): number | undefined {
  return price > 0 && energyPerFood > 0 ? price / energyPerFood : undefined;
}
