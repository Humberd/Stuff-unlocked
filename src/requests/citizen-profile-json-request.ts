import { getJson } from "../utils/request";

/** Public profile of any citizen. Only the used fields are typed. */
export interface Response {
  citizen: Citizen;
  citizenAttributes: { experience_points: number };
  /** Keyed by index, so read it with `Object.values`. */
  achievements: Achievement[] | Record<string, Achievement>;
  /** An empty array when no pack is active. */
  activePacks: Partial<
    Record<"power_pack" | "infantry_kit" | "division_switch_pack", unknown>
  >;
  isDictator: boolean;
  isModerator: boolean;
  isPresident: boolean;
  isCongressman: boolean;
  isPartyPresident: boolean;
  title?: { country?: string | null };
  location: {
    citizenshipCountry: Country;
    /** Where the citizen is right now. */
    residenceCountry: Country;
    residenceRegion: { id: number; name: string };
  };
  city: {
    residenceCityId?: number | null;
    residenceCity?: { region_id: number } | null;
  };
  military: {
    militaryData: { ground: Rank; aircraft: Rank };
    militaryUnit: MilitaryUnit | null;
  };
  partyData: Party | null;
}

export function sendRequest(citizenId: string): Promise<Response> {
  return getJson(`/main/citizen-profile-json/${citizenId}`);
}

export interface Citizen {
  name: string;
  avatar: string;
  level: number;
  nextLevelXp: number;
  onlineStatus: boolean;
  is_organization: boolean;
  is_alive: boolean;
  /** `type` is "Permanently" for a permaban, any other value for a tempban. */
  banStatus: { type?: string | null };
  created_at: string;
}

export interface Achievement {
  /** Part of the icon name, e.g. "hardworker". */
  img: string;
  count: number;
}

export interface Country {
  name: string;
  permalink: string;
}

export interface Rank {
  name: string;
  icon: string;
  rankNumber: number;
  /** Progress to the next rank in percent. */
  progress: number;
}

export interface MilitaryUnit {
  name: string;
  avatar: string;
  leader_id: number | string | null;
  second_commander_1: number | string | null;
  second_commander_2: number | string | null;
  /** Captains. Its exact shape is unknown, only the player ids in it are used. */
  leaders: unknown;
}

export interface Party {
  name: string;
  avatar: string;
}
