export function formatNumber(number: number) {
  return number.toLocaleString("en-US");
}

export function formatStringNumberToInt(value: any) {
  const string = String(value);
  return parseInt(string);
}
