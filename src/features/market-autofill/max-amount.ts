const RAW_MATERIAL_INDUSTRY_IDS = [7, 12, 17, 24];

export function isRawMaterial(industryId: number): boolean {
  return RAW_MATERIAL_INDUSTRY_IDS.includes(industryId);
}

export interface BuyLimits {
  currencyAmount: number;
  pricePerUnit: number;
  /** Most the offer lets buy at once. */
  offerMaximum?: number;
  /** Unknown when the inventory couldn't be read. */
  freeStorage?: number;
  isRawMaterial: boolean;
}

/** The most units the citizen can afford, the offer has, and the storage takes. */
export function getMaxBuyAmount({
  currencyAmount,
  pricePerUnit,
  offerMaximum = Infinity,
  freeStorage,
  isRawMaterial,
}: BuyLimits): number {
  const affordable = Math.floor(currencyAmount / pricePerUnit);
  // As the legacy script counted raw materials, in hundreds and one less
  const storable =
    freeStorage === undefined
      ? Infinity
      : isRawMaterial
        ? Math.floor(freeStorage / 100) - 1
        : freeStorage;
  return Math.max(0, Math.min(affordable, offerMaximum, storable));
}
