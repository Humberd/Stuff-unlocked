export type ElectionType = "presidential" | "party" | "congress";

/**
 * The elections the menu link should open on a day of the month:
 * presidential ones are on the 5th, party ones on the 15th and congress
 * ones on the 25th, so each is shown until the next one comes.
 */
export function electionTypeForDay(dayOfMonth: number): ElectionType {
  if (dayOfMonth >= 5 && dayOfMonth <= 14) {
    return "presidential";
  }
  if (dayOfMonth >= 15 && dayOfMonth <= 24) {
    return "party";
  }
  return "congress";
}

/** Day of the month from the sidebar date, e.g. 27 from "Oct 27". */
export function parseDayOfMonth(dateText: string): number | undefined {
  const day = Number(dateText.trim().split(/\s+/)[1]);
  return Number.isInteger(day) && day >= 1 && day <= 31 ? day : undefined;
}

export function electionsUrl(culture: string, type: ElectionType): string {
  return `/${culture}/main/${type}-elections`;
}
