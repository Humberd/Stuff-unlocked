import type { Battle } from "../../requests/campaigns-json-list-request";

export const EPIC = 2;
export const FULL_SCALE = 1;

const AIR_DIVISION = 11;

export interface EpicBattle {
  battleId: number;
  battleZoneId: number;
  /** {@link EPIC} or {@link FULL_SCALE}. */
  epic: number;
}

export interface Fighter {
  division: number;
  /** Can fight in any division. */
  canFightInAnyDivision: boolean;
}

/**
 * Finds the first battle with an epic zone the fighter can fight in, or a
 * full scale one when there is no epic one. Fights against dictatorships
 * and liberation fights don't count.
 */
export function findEpicBattle(
  battles: Record<string, Battle>,
  fighter: Fighter,
): EpicBattle | undefined {
  const candidates = Object.entries(battles)
    .filter(([, battle]) => !battle.is_dict && !battle.is_lib)
    .map(([battleId, battle]) => {
      const zone = findMostEpicZone(battle, fighter);
      return zone && { battleId: Number(battleId), ...zone };
    })
    .filter((candidate) => candidate !== undefined);

  for (const level of [EPIC, FULL_SCALE]) {
    const found = candidates.find((candidate) => candidate.epic === level);
    if (found) {
      return found;
    }
  }
  return undefined;
}

function findMostEpicZone(
  battle: Battle,
  fighter: Fighter,
): { battleZoneId: number; epic: number } | undefined {
  let best: { battleZoneId: number; epic: number } | undefined;
  for (const [zoneId, zone] of Object.entries(battle.div)) {
    const canFight =
      fighter.canFightInAnyDivision ||
      zone.div === fighter.division ||
      zone.div === AIR_DIVISION;
    if (
      canFight &&
      !zone.end &&
      zone.terrain === 0 &&
      zone.epic > 0 &&
      zone.epic >= (best?.epic ?? 0)
    ) {
      best = { battleZoneId: Number(zoneId), epic: zone.epic };
    }
  }
  return best;
}
