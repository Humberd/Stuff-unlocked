const DAY_MS = 24 * 60 * 60 * 1000;

/** The game day changes at midnight in the game's time zone. */
const GAME_TIME_ZONE = "America/Los_Angeles";

const gameDateFormat = new Intl.DateTimeFormat("en-CA", {
  timeZone: GAME_TIME_ZONE,
  year: "numeric",
  month: "2-digit",
  day: "2-digit",
});

function daysSinceEpochInGameTime(time: number): number {
  const [year, month, day] = gameDateFormat.format(time).split("-").map(Number);
  return Date.UTC(year, month - 1, day) / DAY_MS;
}

/**
 * The game day now, from the one the page was loaded on. A page can stay
 * open past midnight, and its `eDay` doesn't change then.
 */
export function getCurrentEDay(
  loadedEDay: number,
  loadedAt: number,
  now: number,
): number {
  return (
    loadedEDay +
    daysSinceEpochInGameTime(now) -
    daysSinceEpochInGameTime(loadedAt)
  );
}
