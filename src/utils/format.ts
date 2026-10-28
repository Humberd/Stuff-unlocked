export function formatNumber(number: number) {
  return number.toLocaleString("en-US");
}

/** Parses a number the way the game displays it, e.g. "1,234,567". */
export function parseFormattedNumber(text: string): number {
  return Number(text.trim().replace(/,/g, ""));
}
