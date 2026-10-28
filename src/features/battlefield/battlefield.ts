import { formatNumber } from "../../utils/format";

/** A side that reaches this many points wins the battle zone. */
const WINNING_POINTS = 1800;

export function isZoneDecided(
  points: { attacker: number; defender: number } | undefined,
): boolean {
  return (
    points !== undefined &&
    (points.attacker >= WINNING_POINTS || points.defender >= WINNING_POINTS)
  );
}

/** Appended to the region name, e.g. " RW R3" for round 3 of a resistance war. */
export function regionLabelSuffix(
  isResistance: boolean,
  zoneId: number | undefined,
): string {
  return `${isResistance ? " RW" : ""} R${zoneId}`;
}

/** Only the used fields are typed. */
interface BattleStatsResponse {
  /** 1 for a full scale battle, 2 for an epic one, by battle zone id. */
  battle_zone_situation?: Record<string, number | undefined>;
}

/** The tab title that tells the player about an epic or full scale battle. */
export function epicTitle(
  response: unknown,
  battleZoneId: number,
): string | undefined {
  if (typeof response !== "object" || response === null) {
    return undefined;
  }
  const situation = (response as BattleStatsResponse).battle_zone_situation?.[
    battleZoneId
  ];
  if (!situation) {
    return undefined;
  }
  return `${situation > 1 ? "EPIC BATTLE" : "FULL SCALE"} DETECTED`;
}

/** Shortens big damage, e.g. 12.35M or 1.235B. */
export function formatDamage(damage: number): string {
  if (damage > 999_999_999) {
    return `${(damage / 1e9).toFixed(3)}B`;
  }
  if (damage > 999_999) {
    return `${(damage / 1e6).toFixed(2)}M`;
  }
  return formatNumber(Number(damage.toFixed(2)));
}
