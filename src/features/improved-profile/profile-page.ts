import { parseFormattedNumber } from "../../utils/format";

/** Pages that show a citizen's profile sidebar besides the profile itself. */
const PROFILE_SUBPAGE_PATTERN = /donate-|accounts|citizen-friends/;

const FULL_SIZE_AVATARS_URL = "https://erpk-static-avatars.s3.amazonaws.com/";

export function isProfilePage(pathname: string): boolean {
  return pathname.includes("/citizen/profile/");
}

export function isProfileSubpage(pathname: string): boolean {
  return PROFILE_SUBPAGE_PATTERN.test(pathname);
}

/** The citizen a profile page (or its donate, accounts, friends page) is about. */
export function parseProfileCitizenId(pathname: string): number | undefined {
  const segment = pathname.split("/").find((part) => /^\d+$/.test(part));
  return segment ? Number(segment) : undefined;
}

/**
 * The full size avatar, from the `style` of the resized one, e.g.
 * `background-image: url("https://cdnt.erepublik.net/…/smart/avatars/Citizens/a.jpg")`.
 */
export function getFullSizeAvatarUrl(style: string): string | undefined {
  const path = /smart\/([^)"']+)/.exec(style)?.[1];
  return path ? FULL_SIZE_AVATARS_URL + path : undefined;
}

/** Sums the achievement counters, e.g. ["3", "12"] is 15. */
export function sumAchievementCounters(counters: string[]): number {
  return counters
    .map(parseFormattedNumber)
    .filter(Number.isFinite)
    .reduce((sum, count) => sum + count, 0);
}

/** "Battalion" ranks are the Legend ranks, e.g. "Battalion II" is "Legend II". */
export function toLegendRankName(rankName: string): string | undefined {
  const rest = rankName.split("Battalion")[1];
  return rest ? `Legend${rest}` : undefined;
}

export function getErepublikToolsUrl(citizenId: number): string {
  return `https://erepublik.tools/en/society/citizen/${citizenId}`;
}
