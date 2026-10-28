import type * as CitizenProfileJson from "../../requests/citizen-profile-json-request";
import * as CitizenHovercard from "../../requests/citizen-hovercard-request";
import { formatNumber } from "../../utils/format";
import { calculateWeaponHitDamage } from "../../utils/damage";

export interface HovercardData {
  profile: CitizenProfileJson.Response;
  hovercard: CitizenHovercard.Response;
}

export function parsePlayerId(href: string): string | undefined {
  return /\/citizen\/profile\/(\d+)/.exec(href)?.[1];
}

/** The XP bar fills every 5,000 XP, like in the legacy script. */
const XP_BAR_SIZE = 5_000;
const NEAR_LEVEL_UP_XP = 500;
const NEAR_LEVEL_UP_MIN_LEVEL = 70;
const LEGEND_RANK_NUMBER = 70;

export function getXpBar(profile: CitizenProfileJson.Response): {
  percent: number;
  isNearLevelUp: boolean;
} {
  const { level, nextLevelXp } = profile.citizen;
  const experience = profile.citizenAttributes.experience_points;
  return {
    percent: ((experience % XP_BAR_SIZE) / XP_BAR_SIZE) * 100,
    isNearLevelUp:
      level >= NEAR_LEVEL_UP_MIN_LEVEL &&
      nextLevelXp - experience < NEAR_LEVEL_UP_XP,
  };
}

/** Shortens "… Battalion X" ground ranks of legends to "Legend X". */
export function getRankLabel(
  rank: CitizenProfileJson.Rank,
  kind: "ground" | "air",
): string {
  const [, legendLevel] = rank.name.split("Battalion");
  if (
    kind === "ground" &&
    rank.rankNumber >= LEGEND_RANK_NUMBER &&
    legendLevel !== undefined
  ) {
    return "Legend" + legendLevel;
  }
  return rank.name;
}

/** The game used to send the damage per hit; it is computed when it doesn't. */
export function describeGroundHit(hovercard: CitizenHovercard.Response) {
  const { damagePerHit, damagePerHitLegend, strength, rank } =
    hovercard.fighterInfo.military;
  const hit = damagePerHit || calculateWeaponHitDamage(strength, rank, 7);
  const truePatriotHit = damagePerHitLegend
    ? ` (TP ${formatNumber(Math.round(damagePerHitLegend))})`
    : "";
  return `Q7 hit: ${formatNumber(Math.round(hit))}${truePatriotHit}`;
}

export function describeAirHit(hovercard: CitizenHovercard.Response) {
  const { damagePerHitNoWeapon, perception, rank } =
    hovercard.fighterInfo.aviation;
  const hit =
    damagePerHitNoWeapon || calculateWeaponHitDamage(perception, rank, 0);
  return `Q0 hit: ${formatNumber(Math.round(hit))}`;
}

export function formatStrength(hovercard: CitizenHovercard.Response) {
  return hovercard.fighterInfo.military.strength.toLocaleString("en-US", {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  });
}

export function getPartyRole(profile: CitizenProfileJson.Response): string {
  if (profile.isPresident) {
    return "Country President";
  }
  if (profile.title?.country) {
    return profile.title.country;
  }
  if (profile.isCongressman) {
    return "Congressman";
  }
  if (profile.isPartyPresident) {
    return "Party President";
  }
  return profile.partyData ? "Member" : "No political activity";
}

export function getMilitaryUnitRole(
  unit: CitizenProfileJson.MilitaryUnit | null,
  playerId: string,
): string {
  if (!unit) {
    return "";
  }
  if (String(unit.leader_id) === playerId) {
    return "Commander";
  }
  if (
    String(unit.second_commander_1) === playerId ||
    String(unit.second_commander_2) === playerId
  ) {
    return "Second Commander";
  }
  return containsId(unit.leaders, playerId) ? "Captain" : "Soldier";
}

/** Whether `id` is anywhere in `value`, as a number or a string. */
export function containsId(value: unknown, id: string): boolean {
  if (typeof value === "number" || typeof value === "string") {
    return String(value) === id;
  }
  if (value && typeof value === "object") {
    return Object.values(value).some((item) => containsId(item, id));
  }
  return false;
}

export type ResidenceStatus = "inResidenceRegion" | "away" | "noResidence";

export function getResidenceStatus(
  profile: CitizenProfileJson.Response,
): ResidenceStatus {
  const { residenceCityId, residenceCity } = profile.city;
  if (!residenceCityId || !residenceCity) {
    return "noResidence";
  }
  return residenceCity.region_id === profile.location.residenceRegion.id
    ? "inResidenceRegion"
    : "away";
}

export function truncate(text: string, maxLength: number): string {
  return text.length > maxLength ? text.slice(0, maxLength - 1) + "…" : text;
}

export interface Badge {
  label: string;
  isPositive: boolean;
}

export function getBadges(
  { profile, hovercard }: HovercardData,
  isContributor: boolean,
): Badge[] {
  const { citizen } = profile;
  const banType = citizen.banStatus.type;
  const badges: Array<Badge | false> = [
    citizen.is_organization && { label: "Organization", isPositive: true },
    CitizenHovercard.isFriend(hovercard) && {
      label: "Friend",
      isPositive: true,
    },
    !citizen.is_alive && { label: "Dead", isPositive: false },
    !!banType && {
      label: banType === "Permanently" ? "Permaban" : "Tempban",
      isPositive: false,
    },
    isContributor && { label: "Stuff++ contributor", isPositive: true },
    profile.isModerator && { label: "Mod", isPositive: false },
  ];
  return badges.filter((badge) => badge !== false);
}

export function getDateLine({ profile, hovercard }: HovercardData): string {
  return profile.citizen.is_organization
    ? `Created at: ${profile.citizen.created_at}`
    : `eR birthday: ${hovercard.bornOn}`;
}

export function getActivePacks(profile: CitizenProfileJson.Response): string[] {
  const packs = profile.activePacks;
  return [
    packs.power_pack ? "PP" : "",
    packs.infantry_kit ? "IK" : "",
    packs.division_switch_pack ? "MP" : "",
  ].filter(Boolean);
}

export interface AchievementIcon {
  iconUrl: string;
  count: string;
}

const HIDDEN_ACHIEVEMENTS = /hardworker|supersoldier/;

export function getAchievementIcons(
  profile: CitizenProfileJson.Response,
): AchievementIcon[] {
  return Object.values(profile.achievements)
    .filter((achievement) => !HIDDEN_ACHIEVEMENTS.test(achievement.img))
    .map((achievement) => ({
      iconUrl: `//www.erepublik.net/images/achievements/icon_${achievement.img}${achievement.count ? "_on" : "_off"}.gif`,
      count:
        achievement.count > 9_999
          ? `${Math.floor(achievement.count / 1_000)}k`
          : String(achievement.count),
    }));
}
