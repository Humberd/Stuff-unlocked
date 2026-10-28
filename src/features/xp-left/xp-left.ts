/** Every level takes this many experience points. */
const XP_PER_LEVEL = 5_000;
const LOW_XP_LEFT = 500;

export function xpLeftToNextLevel(currentExperiencePoints: number): number {
  return XP_PER_LEVEL - (currentExperiencePoints % XP_PER_LEVEL);
}

export function isXpLeftLow(xpLeft: number): boolean {
  return xpLeft <= LOW_XP_LEFT;
}
