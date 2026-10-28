import { getJson } from "../utils/request";

/** Data of the logged in citizen's own profile. Only the used fields are typed. */
export interface Response {
  achievements: Achievement[];
  freedomFighter: FreedomFighter;
  military: unknown;
  activePacks: unknown;
}

export function sendRequest(citizenId: number): Promise<Response> {
  return getJson(`/main/citizen-profile-json-personal/${citizenId}`);
}

export interface Achievement {
  name: string;
  count: number;
  /** Only on the Mercenary achievement. */
  mercenaryProgress?: MercenaryProgress;
}

export interface MercenaryProgress {
  /** Countries the citizen has killed enemies for, by country id. */
  details: Record<string, { enemies_killed: number; name: string }>;
  progress: { current: number; max: number; percent: number };
}

export interface FreedomFighter {
  achievements: number;
  /** Kills needed per region and regions needed for the next medal. */
  milestone: { kills: number; regions: number };
  progress: {
    regions: number;
    wars: {
      inprogress: FreedomFighterWar[];
      finished: FreedomFighterWar[];
    };
  };
}

export interface FreedomFighterWar {
  war_id: number;
  region: string;
  kills: number;
}

/** Kills needed per country for the Mercenary medal. */
export const MERCENARY_KILLS_PER_COUNTRY = 25;

export function findMercenaryProgress(
  response: Response,
): MercenaryProgress | undefined {
  return response.achievements.find(
    (achievement) => achievement.mercenaryProgress,
  )?.mercenaryProgress;
}
