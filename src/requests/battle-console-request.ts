import { postForm } from "../utils/request";

const PATH = "/military/battle-console";

/** Only the used fields are typed. */
export interface BattleConsoleResponse {
  /** By division index, starting from 0. */
  division: Record<number, { epicBattleProgress: number | string }>;
}

/** The battle's state in each division. */
export function sendBattleConsoleRequest(body: {
  _token: string;
  battleId: number;
  zoneId: number;
}): Promise<BattleConsoleResponse> {
  return postForm(PATH, { ...body, action: "battleConsole" });
}

/** Epic battle progress in percent, from 0 to 100. */
export function findEpicProgress(
  response: BattleConsoleResponse,
  division: number,
): number | undefined {
  const progress = response.division[division - 1]?.epicBattleProgress;
  return progress === undefined ? undefined : Number(progress);
}

export interface Fighter {
  citizenId: number;
  citizenName: string;
  /** Damage done in the battle zone. */
  raw_value: number | string;
}

/** Top fighters of each side, by country id. Only the used fields are typed. */
export type BattleStatisticsResponse = Record<
  string,
  { fighterData: Record<string, Fighter> } | undefined
>;

/** The first page of each side's damage top list. */
export function sendBattleStatisticsRequest(body: {
  _token: string;
  battleZoneId: number;
}): Promise<BattleStatisticsResponse> {
  return postForm(PATH, {
    ...body,
    action: "battleStatistics",
    type: "damage",
    leftPage: 1,
    rightPage: 1,
  });
}

/** The legacy script showed the fighters keyed below this. */
const TOP_FIGHTERS_KEY_LIMIT = 11;

export function findTopFighters(
  response: BattleStatisticsResponse,
  countryId: number,
): Fighter[] {
  return Object.entries(response[countryId]?.fighterData ?? {})
    .filter(([key]) => Number(key) < TOP_FIGHTERS_KEY_LIMIT)
    .map(([, fighter]) => fighter);
}
