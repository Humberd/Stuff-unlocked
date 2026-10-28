import { parseFormattedNumber } from "../../utils/format";

/** What a hit, a bomb or a deploy added to the player's stats. */
export interface Hit {
  kills: number;
  prestigePoints: number;
  damage: number;
}

/** Response of a `fight-shoo…` or `deploy-bomb` request. Only the used fields are typed. */
interface FightResponse {
  error?: boolean | number;
  message?: string;
  data?: unknown;
  /** Prestige points of the hit. */
  hits?: number;
  bomb?: { damage: number };
  oldEnemy?: { isNatural?: boolean };
  user?: { givenDamage: number };
}

/** Payload of pomelo's `onDeployFinished` event. Numbers come formatted, e.g. "1,234". */
interface DeployFinishedEvent {
  kills: string | number;
  damage: string | number;
  rewards: { prestigePoints: string | number };
}

/** Fighting a natural enemy gives 10% more damage than the response says. */
const NATURAL_ENEMY_BONUS = 1.1;

/** The hit from a fight response, or `undefined` when the request didn't fight. */
export function hitFromFightResponse(response: unknown): Hit | undefined {
  if (typeof response !== "object" || response === null) {
    return undefined;
  }
  const fight = response as FightResponse;
  const isSuccess =
    !fight.error &&
    (fight.message === "ENEMY_KILLED" ||
      fight.message === "OK" ||
      Boolean(fight.data));
  if (!isSuccess) {
    return undefined;
  }
  return {
    kills: 1,
    prestigePoints: fight.hits || 1,
    damage: fightDamage(fight),
  };
}

function fightDamage(fight: FightResponse): number {
  if (fight.bomb) {
    return fight.bomb.damage;
  }
  const givenDamage = fight.user?.givenDamage ?? 0;
  return fight.oldEnemy?.isNatural
    ? Math.floor(NATURAL_ENEMY_BONUS * givenDamage)
    : givenDamage;
}

export function hitFromDeployFinished(event: unknown): Hit {
  const deploy = event as DeployFinishedEvent;
  return {
    kills: toNumber(deploy.kills),
    prestigePoints: toNumber(deploy.rewards.prestigePoints),
    damage: toNumber(deploy.damage),
  };
}

function toNumber(value: string | number): number {
  return parseFormattedNumber(String(value));
}
