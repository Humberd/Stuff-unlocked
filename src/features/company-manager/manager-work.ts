import { parseFormattedNumber } from "../../utils/format";

/** Energy one Work as Manager takes. */
const ENERGY_PER_WORK = 10;

/** How many companies the citizen has energy to work in as manager. */
export function getManagerWorkLimit(energy: number): number {
  return Math.max(0, Math.floor(energy / ENERGY_PER_WORK));
}

/** The energy shown in the top bar, e.g. "1,234". */
export function parseEnergy(
  text: string | null | undefined,
): number | undefined {
  if (!text?.trim()) {
    return undefined;
  }
  const energy = parseFormattedNumber(text);
  return Number.isNaN(energy) ? undefined : energy;
}
