export interface Taxes {
  /** In percent. */
  valueAddedTax: number;
  /** In percent, paid when selling outside the citizenship country. */
  importTax: number;
}

/** What the seller gets of a price with taxes. */
export function getNetPrice(
  grossPrice: number,
  { valueAddedTax, importTax }: Taxes,
  isImport: boolean,
): number {
  return (
    grossPrice / ((100 + valueAddedTax + (isImport ? importTax : 0)) / 100)
  );
}

/** E.g. "1,234.50" for 2 decimals. */
export function formatAmount(amount: number, decimals: number): string {
  return amount.toLocaleString("en-US", {
    minimumFractionDigits: decimals,
    maximumFractionDigits: decimals,
  });
}
