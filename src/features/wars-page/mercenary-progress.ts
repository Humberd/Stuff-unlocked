import {
  MERCENARY_KILLS_PER_COUNTRY,
  type FreedomFighter,
  type FreedomFighterWar,
  type MercenaryProgress,
} from "../../requests/citizen-profile-personal-request";
import type { Battle } from "../../requests/campaigns-json-list-request";

export const DONE_COLOR = "#83b70b";
export const IN_PROGRESS_COLOR = "#fb7e3d";
export const NOT_STARTED_COLOR = "#f95555";

/** Freedom Fighter kills above this don't count for a war. */
const MAX_FREEDOM_FIGHTER_KILLS = 75;

export function progressColor(kills: number, needed: number): string {
  if (!kills) {
    return NOT_STARTED_COLOR;
  }
  return kills < needed ? IN_PROGRESS_COLOR : DONE_COLOR;
}

export function mercenaryKills(
  progress: MercenaryProgress,
  countryId: number,
): number {
  return progress.details[countryId]?.enemies_killed ?? 0;
}

export function freedomFighterKills(
  wars: FreedomFighterWar[],
  warId: number,
): number {
  const war = wars.find((war) => war.war_id === warId);
  return war ? Math.min(war.kills, MAX_FREEDOM_FIGHTER_KILLS) : 0;
}

export interface CardProgress {
  invaderMercenaryKills: number;
  defenderMercenaryKills: number;
  /** Only for resistance wars. */
  freedomFighterKills?: number;
}

/**
 * Kills of a battle's card. Undefined for fights against dictatorships and
 * liberation fights, which count for neither medal.
 */
export function cardProgress(
  battle: Battle,
  mercenary: MercenaryProgress,
  freedomFighter: FreedomFighter,
): CardProgress | undefined {
  if (battle.is_dict || battle.is_lib) {
    return undefined;
  }
  return {
    invaderMercenaryKills: mercenaryKills(mercenary, battle.inv.id),
    defenderMercenaryKills: mercenaryKills(mercenary, battle.def.id),
    freedomFighterKills: battle.is_rw
      ? freedomFighterKills(
          freedomFighter.progress.wars.inprogress,
          battle.war_id,
        )
      : undefined,
  };
}

/**
 * Kills still needed for the medals. The Mercenary count assumes no kills in
 * the countries not completed yet.
 */
export function killsNeeded(
  mercenary: MercenaryProgress,
  freedomFighter: FreedomFighter,
) {
  return {
    mercenary:
      MERCENARY_KILLS_PER_COUNTRY *
      (mercenary.progress.max - mercenary.progress.current),
    freedomFighter:
      freedomFighter.milestone.kills *
      (freedomFighter.milestone.regions - freedomFighter.progress.regions),
  };
}
