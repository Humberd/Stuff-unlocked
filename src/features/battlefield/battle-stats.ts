import { ExternalProperty } from "../../hooks/external-property";
import type { Hit } from "./hits";

/** The player's stats in the battle that is open. */
export interface BattleStats {
  kills: number;
  prestigePoints: number;
  damage: number;
}

/** Set once kill tracking has started on a battlefield. */
export const battleStats = new ExternalProperty<BattleStats | undefined>(
  undefined,
);

/**
 * Kills recorded since the page loaded, for counters that start from a
 * value fetched later.
 */
export const recordedKills = new ExternalProperty(0);

/** Kept for this long after the last hit, like the legacy script did. */
const COOKIE_MAX_AGE_SECONDS = 7200;

/** The stats are kept per battle zone and side, e.g. `123456-35`. */
export function battleStatsCookieName(
  battleZoneId: number,
  leftBattleId: number,
): string {
  return `${battleZoneId}-${leftBattleId}`;
}

/** Reads `kills|prestigePoints|damage` from `document.cookie`. */
export function parseBattleStatsCookie(
  cookie: string,
  name: string,
): BattleStats {
  const value = cookie
    .split(";")
    .map((pair) => pair.trim())
    .find((pair) => pair.startsWith(`${name}=`))
    ?.slice(name.length + 1);
  const [kills, prestigePoints, damage] = (value ?? "")
    .split("|")
    .map((part) => Number(part) || 0);
  return {
    kills: kills ?? 0,
    prestigePoints: prestigePoints ?? 0,
    damage: damage ?? 0,
  };
}

export function battleStatsCookie(name: string, stats: BattleStats): string {
  const value = [stats.kills, stats.prestigePoints, stats.damage].join("|");
  return `${name}=${value};max-age=${COOKIE_MAX_AGE_SECONDS};Secure;SameSite=Strict`;
}

export function addHitToBattleStats(stats: BattleStats, hit: Hit): BattleStats {
  return {
    kills: stats.kills + hit.kills,
    prestigePoints: stats.prestigePoints + hit.prestigePoints,
    damage: stats.damage + hit.damage,
  };
}

/**
 * Mercenary and Freedom Fighter counters only count up to their medal,
 * and never go below what the profile said.
 */
export function addCappedKills(base: number, added: number, cap: number) {
  return base >= cap ? base : Math.min(base + added, cap);
}
