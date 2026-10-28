/** What the game shows on a battle that has started. */
export const STARTED_TEXT = "00h:00m";

/** Time left until a battle starts, e.g. `-4m:05s` or `-1h:04m:05s`. */
export function formatCountdown(secondsLeft: number): string {
  if (secondsLeft < 1) {
    return STARTED_TEXT;
  }
  const hours = Math.floor(secondsLeft / 3600);
  const minutes = Math.floor((secondsLeft % 3600) / 60);
  const seconds = Math.floor(secondsLeft % 60);
  const paddedSeconds = String(seconds).padStart(2, "0");
  if (hours > 0) {
    return `-${hours}h:${String(minutes).padStart(2, "0")}m:${paddedSeconds}s`;
  }
  return `-${minutes}m:${paddedSeconds}s`;
}
