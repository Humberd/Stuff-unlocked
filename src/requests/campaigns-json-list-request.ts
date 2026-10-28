import { getJson } from "../utils/request";

/** The battles of the wars page. Only the used fields are typed. */
export interface Response {
  /** By battle id. */
  battles: Record<string, Battle>;
  /** Server time of the response, in seconds. */
  time: number;
}

/**
 * A battle as the wars page's Angular scope (`.war_card` → `campaign`) holds
 * it, too.
 */
export interface Battle {
  id: number;
  war_id: number;
  /** Start time, in seconds. In the future while the battle is waiting. */
  start: number;
  /** Resistance war. */
  is_rw: boolean;
  /** Fight against a dictatorship. */
  is_dict: boolean;
  /** Liberation fight. */
  is_lib: boolean;
  /** Invader. */
  inv: BattleSide;
  /** Defender. */
  def: BattleSide;
  /** By battle zone id. */
  div: Record<string, BattleZone>;
}

export interface BattleSide {
  /** Country id. */
  id: number;
}

export interface BattleZone {
  /** Division number, 11 is the air division. */
  div: number;
  /** Set once the zone has ended. */
  end: number | null;
  /** 2 for an epic battle, 1 for a full scale battle, 0 otherwise. */
  epic: number;
  terrain: number;
}

export function sendRequest(): Promise<Response> {
  return getJson("/military/campaignsJson/list");
}
