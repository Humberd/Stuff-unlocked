/** What the game's My Companies page script defines globally. */
export interface CompanyPage {
  pageDetails: { recoverable_health: { value: number } };
  /** Energy left in the food. */
  food_remaining: number;
  calculateProduction(company: Element, isSelected: boolean): void;
  checkHealth(): void;
  checkTax(): void;
  calculateTotals(): void;
  warnForCritical(): void;
}

const functionNames = [
  "calculateProduction",
  "checkHealth",
  "checkTax",
  "calculateTotals",
  "warnForCritical",
] as const;

/** The page's globals, or undefined when any of them is missing. */
export function getCompanyPage(): CompanyPage | undefined {
  const page = window as unknown as Partial<CompanyPage>;
  const hasAll =
    functionNames.every((name) => typeof page[name] === "function") &&
    typeof page.food_remaining === "number" &&
    typeof page.pageDetails?.recoverable_health === "object";
  return hasAll ? (page as CompanyPage) : undefined;
}
