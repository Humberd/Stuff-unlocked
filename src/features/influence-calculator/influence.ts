import { calculateNoHitDamage, getWeaponPower } from "../../utils/damage";
import { formatNumber } from "../../utils/format";
import type { ProfileMilitaryUnit } from "../improved-profile/profile-data";

export const MILITARY_KINDS = ["ground", "aircraft"] as const;
export type MilitaryKind = (typeof MILITARY_KINDS)[number];

const ENERGY_PER_HIT = 10;
/** Every 10 damage give a rank point. */
const DAMAGE_PER_RANK_POINT = 10;
const NATURAL_ENEMY_FACTOR = 1.1;
const WAR_STASH_FACTOR = 1.1;
const LEGEND_START_RANK = 70;

export interface CalculatorInputs {
  hits: number;
  isNaturalEnemy: boolean;
  hasWarStash: boolean;
  boosterPercent: number;
  /** Counts for ground fights only. */
  legendPercent: number;
}

export interface InfluenceResults {
  influence: number;
  /** Infinity at the last rank. */
  hitsToNextRank: number;
  /** Currency per a million influence, weapons and food included. Undefined without prices. */
  costPerMillion: number | undefined;
}

export interface WeaponPrices {
  /** Price of a weapon of the selected quality. */
  weaponPrice: number | undefined;
  foodPricePerEnergy: number | undefined;
}

/** Damage of a hit without a weapon. */
/** The default Legend bonus, like the legacy calculator's: 20% at rank 71 and 10% more for every next rank. */
export function getLegendBonusPercent(groundRankNumber: number): number {
  return groundRankNumber > LEGEND_START_RANK
    ? (groundRankNumber - LEGEND_START_RANK + 1) * 10
    : 0;
}

export function calculateHitDamage(
  kind: MilitaryKind,
  unit: ProfileMilitaryUnit,
  quality: number,
  inputs: CalculatorInputs,
): number {
  const legendFactor = kind === "ground" ? 1 + inputs.legendPercent / 100 : 1;
  return (
    calculateNoHitDamage(unit.temporaryStrength ?? 0, unit.rankNumber) *
    (1 + getWeaponPower(quality) / 5) *
    legendFactor *
    (1 + inputs.boosterPercent / 100)
  );
}

export function calculateInfluenceResults(
  kind: MilitaryKind,
  unit: ProfileMilitaryUnit,
  quality: number,
  inputs: CalculatorInputs,
  prices: WeaponPrices,
): InfluenceResults {
  const hitDamage = calculateHitDamage(kind, unit, quality, inputs);
  const naturalEnemyFactor = inputs.isNaturalEnemy ? NATURAL_ENEMY_FACTOR : 1;
  const missingRankPoints = unit.nextRankAt - unit.points;

  return {
    influence: Math.floor(hitDamage * inputs.hits * naturalEnemyFactor),
    hitsToNextRank:
      missingRankPoints > 0
        ? Math.ceil(
            (DAMAGE_PER_RANK_POINT * missingRankPoints) /
              hitDamage /
              (inputs.hasWarStash ? WAR_STASH_FACTOR : 1),
          )
        : Infinity,
    costPerMillion: calculateCostPerMillion(
      hitDamage,
      quality,
      prices,
      naturalEnemyFactor,
    ),
  };
}

function calculateCostPerMillion(
  hitDamage: number,
  quality: number,
  { weaponPrice, foodPricePerEnergy }: WeaponPrices,
  naturalEnemyFactor: number,
): number | undefined {
  if (foodPricePerEnergy === undefined) {
    return undefined;
  }
  let weaponCostPerHit = 0;
  if (quality > 0) {
    if (weaponPrice === undefined) {
      return undefined;
    }
    weaponCostPerHit = weaponPrice / getWeaponPower(quality);
  }
  const hitsPerMillion = 1e6 / hitDamage;
  const costPerHit = weaponCostPerHit + foodPricePerEnergy * ENERGY_PER_HIT;
  // Natural Enemy gives more influence for the same hits
  return (hitsPerMillion * costPerHit) / naturalEnemyFactor;
}

/** Reads a number typed by the player, e.g. "10%" is 10. Unreadable is 0. */
export function parseInputNumber(text: string): number {
  const number = parseFloat(text);
  return Number.isFinite(number) ? number : 0;
}

/** Shortens big numbers like the legacy script did, e.g. 1.5M or 2.25B. */
export function formatCompact(value: number, precision: number): string {
  if (value > 999_999_999) {
    return `${(value / 1e9).toFixed(precision + 1)}B`;
  }
  if (value > 999_999) {
    return `${(value / 1e6).toFixed(precision)}M`;
  }
  return formatNumber(Number(value.toFixed(precision)));
}
