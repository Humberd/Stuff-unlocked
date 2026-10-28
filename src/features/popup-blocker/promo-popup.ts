/** Far enough in the future that the game thinks the popup was just shown. */
export const BLOCKED_POPUP_TIMESTAMP = "9999999999999";

/**
 * The keys under which the game remembers when it last showed the promo
 * popup, for the day of `date` and the next one, in local time. The month
 * is zero-based, like the game's own keys.
 */
export function promoPopupKeys(date: Date): [string, string] {
  const tomorrow = new Date(date);
  tomorrow.setDate(tomorrow.getDate() + 1);
  return [promoPopupKey(date), promoPopupKey(tomorrow)];
}

function promoPopupKey(date: Date): string {
  return `promoPopupTimestamp_${date.getFullYear()}-${date.getMonth()}-${date.getDate()}`;
}
