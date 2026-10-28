/** The legacy script never filled in more, to not spend everything at once. */
const MAX_GOLD_AMOUNT = 10;

/** The most gold, in hundredths, the citizen can buy of an offer. */
export function getMaxGoldAmount(
  offerMaximum: number,
  pricePerGold: number,
  currencyAmount: number,
): number {
  const affordable = Math.floor((100 * currencyAmount) / pricePerGold) / 100;
  return Math.max(0, Math.min(offerMaximum, MAX_GOLD_AMOUNT, affordable));
}
