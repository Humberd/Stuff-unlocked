import { ExternalProperty } from "../../hooks/external-property";
import { error } from "../../utils/utils";
import type { Hit } from "./hits";

export interface TodayStats {
  kills: number;
  prestigePoints: number;
  groundDamage: number;
  airDamage: number;
}

/**
 * Kept as `[kills, prestigePoints, groundDamage, airDamage]`, like the
 * legacy script did, so that players keep today's numbers.
 */
const STATS_KEY = "statsToday";
const EDAY_KEY = "STUFF_UNLOCKED.statsTodayEDay";

export const EMPTY_TODAY_STATS: TodayStats = {
  kills: 0,
  prestigePoints: 0,
  groundDamage: 0,
  airDamage: 0,
};

/** Today's stats as last read or saved by this tab. */
export const todayStats = new ExternalProperty<TodayStats>(EMPTY_TODAY_STATS);

export function parseTodayStats(json: string | null): TodayStats {
  try {
    const stored: unknown = JSON.parse(json ?? "null");
    if (!Array.isArray(stored)) {
      return EMPTY_TODAY_STATS;
    }
    const [kills, prestigePoints, groundDamage, airDamage] = stored.map(
      (value) => Number(value) || 0,
    );
    return {
      kills: kills ?? 0,
      prestigePoints: prestigePoints ?? 0,
      groundDamage: groundDamage ?? 0,
      airDamage: airDamage ?? 0,
    };
  } catch {
    return EMPTY_TODAY_STATS;
  }
}

export function serializeTodayStats(stats: TodayStats): string {
  return JSON.stringify([
    stats.kills,
    stats.prestigePoints,
    stats.groundDamage,
    stats.airDamage,
  ]);
}

export function addHit(
  stats: TodayStats,
  hit: Hit,
  isAirBattle: boolean,
): TodayStats {
  return {
    kills: stats.kills + hit.kills,
    prestigePoints: stats.prestigePoints + hit.prestigePoints,
    groundDamage: stats.groundDamage + (isAirBattle ? 0 : hit.damage),
    airDamage: stats.airDamage + (isAirBattle ? hit.damage : 0),
  };
}

/**
 * Reads the stats saved by any tab into {@link todayStats}. They start over
 * on a new day. Stats saved before the day was stored are kept, and so are
 * the stats of a later day, saved by a tab opened after this one.
 */
export function loadTodayStats(eDay: number): TodayStats {
  return loadStored(eDay).stats;
}

export function addHitToTodayStats(
  hit: Hit,
  isAirBattle: boolean,
  eDay: number,
) {
  const stored = loadStored(eDay);
  saveTodayStats(addHit(stored.stats, hit, isAirBattle), stored.eDay);
}

function loadStored(eDay: number): { stats: TodayStats; eDay: number } {
  const storedEDay = localStorage.getItem(EDAY_KEY);
  const storedStats = parseTodayStats(localStorage.getItem(STATS_KEY));
  if (storedEDay === null) {
    saveTodayStats(storedStats, eDay);
    return { stats: storedStats, eDay };
  }
  if (Number(storedEDay) < eDay) {
    saveTodayStats(EMPTY_TODAY_STATS, eDay);
    return { stats: EMPTY_TODAY_STATS, eDay };
  }
  todayStats.update(storedStats);
  return { stats: storedStats, eDay: Number(storedEDay) };
}

export function resetTodayStats(eDay: number) {
  saveTodayStats(EMPTY_TODAY_STATS, eDay);
}

function saveTodayStats(stats: TodayStats, eDay: number) {
  try {
    localStorage.setItem(STATS_KEY, serializeTodayStats(stats));
    localStorage.setItem(EDAY_KEY, String(eDay));
  } catch (e) {
    error("Failed to save today's stats", e);
  }
  todayStats.update(stats);
}

/** Whether a `storage` event is about today's stats, saved by another tab. */
export function isTodayStatsKey(key: string | null): boolean {
  return key === null || key === STATS_KEY || key === EDAY_KEY;
}
