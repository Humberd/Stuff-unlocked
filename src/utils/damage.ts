export const MAX_WEAPON_QUALITY = 7;

/** Damage of one hit without a weapon, before boosters and bonuses. */
export function calculateNoHitDamage(
  strength: number,
  rankNumber: number,
): number {
  return 10 * (1 + strength / 400) * (1 + rankNumber / 5);
}

/**
 * Q7 counts as Q10: it gives +200% damage. Each quality below it gives
 * +20%.
 */
export function getWeaponPower(quality: number): number {
  return quality < MAX_WEAPON_QUALITY ? quality : 10;
}

/** Damage of one hit with a weapon of `quality`, before boosters and bonuses. */
export function calculateWeaponHitDamage(
  strength: number,
  rankNumber: number,
  quality: number,
): number {
  return (
    calculateNoHitDamage(strength, rankNumber) *
    (1 + getWeaponPower(quality) / 5)
  );
}
