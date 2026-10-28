import type {
  FreedomFighter,
  MercenaryProgress,
} from "../../requests/citizen-profile-personal-request";

/** Kills that count for Freedom Fighter in one region. */
export const FREEDOM_FIGHTER_KILLS_CAP = 75;

/** Prefilled kills when the player has nothing left to kill for Freedom Fighter. */
const DEFAULT_KILLS_TO_PREFILL = 25;

/** The region's name from the title of `#region_name_link`. */
export function regionNameFromTitle(title: string): string | undefined {
  return title.split("Region name - ")[1];
}

/** Mercenary kills for the country of each side. */
export function mercenaryKills(
  progress: MercenaryProgress,
  leftCountryId: number,
  rightCountryId: number,
): { left: number; right: number } {
  return {
    left: progress.details[leftCountryId]?.enemies_killed ?? 0,
    right: progress.details[rightCountryId]?.enemies_killed ?? 0,
  };
}

/** Freedom Fighter kills in the region of a war still in progress. */
export function freedomFighterKills(
  freedomFighter: FreedomFighter,
  regionName: string | undefined,
): number {
  const war = freedomFighter.progress.wars.inprogress
    .filter((war) => war.region === regionName)
    .at(-1);
  return Math.min(war?.kills ?? 0, FREEDOM_FIGHTER_KILLS_CAP);
}

/**
 * Freedom Fighter kills count in resistance wars, on the real invader's side.
 * The player's side is on the left; a spectator can still pick it.
 */
export function isFreedomFighterBattle(battle: {
  isResistance?: boolean;
  leftBattleId?: number;
  realInvaderId?: number;
  spectatorOnly?: boolean;
}): boolean {
  return Boolean(
    battle.isResistance &&
    (battle.leftBattleId === battle.realInvaderId || battle.spectatorOnly),
  );
}

/** Kills the player still needs in this region for Freedom Fighter. */
export function killsToPrefill(milestoneKills: number, kills: number): number {
  const remaining = milestoneKills - kills;
  return remaining > 0 ? remaining : DEFAULT_KILLS_TO_PREFILL;
}
