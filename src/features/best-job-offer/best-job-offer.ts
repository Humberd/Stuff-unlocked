import { formatNumber } from "../../utils/format";

/** The offer with the highest net salary, the first one of equal offers. */
export function findBestJobOffer<T extends { netSalary: number }>(
  offers: T[],
): T | undefined {
  let best: T | undefined;
  for (const offer of offers) {
    if (!best || offer.netSalary > best.netSalary) {
      best = offer;
    }
  }
  return best;
}

/** E.g. "max 1,234cc/day", or "no overtime limit" for 0. */
export function describeSalaryLimit(salaryLimit: number): string {
  return salaryLimit > 0
    ? `max ${formatNumber(salaryLimit)}cc/day`
    : "no overtime limit";
}
