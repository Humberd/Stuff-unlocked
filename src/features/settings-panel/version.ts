import { type StuffData, updateStuffData } from "../../settings/stuff-settings";

const CONTRIBUTORS_URL =
  "https://raw.githubusercontent.com/Humberd/Stuff-unlocked/master/src/contributors.json";

export const USERSCRIPT_URL =
  "https://github.com/Humberd/Stuff-unlocked/raw/master/src/index.user.js";

/** Refreshes the latest version and the contributors and donators lists. */
export async function refreshStuffData() {
  const response = await fetch(CONTRIBUTORS_URL);
  if (!response.ok) {
    throw new Error(`Failed to fetch contributors.json: ${response.status}`);
  }
  const { version, contributors, unlocked } =
    (await response.json()) as StuffData;
  updateStuffData({ version, contributors, unlocked });
}

/** Compares dot-separated versions like "5.76" part by part. */
export function isNewerVersion(candidate: string, current: string): boolean {
  const candidateParts = candidate.split(".").map(Number);
  const currentParts = current.split(".").map(Number);
  for (
    let i = 0;
    i < Math.max(candidateParts.length, currentParts.length);
    i++
  ) {
    const difference = (candidateParts[i] ?? 0) - (currentParts[i] ?? 0);
    if (difference !== 0) {
      return difference > 0;
    }
  }
  return false;
}
