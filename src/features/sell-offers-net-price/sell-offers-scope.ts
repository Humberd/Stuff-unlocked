import { getNetPrice, type Taxes } from "./net-price";

type Id = number | string;

/** The Angular scope of `#sell_offers`. */
export interface SellOffersScope {
  settings?: {
    /** Taxes by country id, then by industry id. */
    countries?: Record<string, { taxes?: Record<string, Taxes> } | undefined>;
  };
  inputs?: {
    pricePerUnit?: Id | null;
    selectedCountry?: Id | null;
    selectedIndustry?: Id | null;
  };
  /** Angular's watch, returns a function that removes it. */
  $watch?: (watchExpression: () => unknown, listener: () => void) => () => void;
}

export function findTaxes(
  scope: SellOffersScope | undefined,
  countryId: Id | null | undefined,
  industryId: Id | null | undefined,
): Taxes | undefined {
  if (countryId == null || industryId == null) {
    return undefined;
  }
  return scope?.settings?.countries?.[countryId]?.taxes?.[industryId];
}

export interface UnitTaxes {
  tax: number;
  net: number;
}

/** Taxes and net per unit of the offer being made in the sell form. */
export function getFormUnitTaxes(
  scope: SellOffersScope | undefined,
  citizenshipId: number,
): UnitTaxes | undefined {
  const { pricePerUnit, selectedCountry, selectedIndustry } =
    scope?.inputs ?? {};
  const price = Number(pricePerUnit);
  const taxes = findTaxes(scope, selectedCountry, selectedIndustry);
  if (!taxes || !(price > 0)) {
    return undefined;
  }
  const net = getNetPrice(
    price,
    taxes,
    Number(selectedCountry) !== citizenshipId,
  );
  return { tax: price - net, net };
}
