import { ensure } from "../../utils/utils";

/** Page globals of the battlefield that `globals.d.ts` doesn't type. */
interface BattlefieldGlobals {
  /** The game's websocket client, which reports finished deploys. */
  pomelo?: {
    on(event: string, listener: (data: unknown) => void): void;
    removeListener?(event: string, listener: (data: unknown) => void): void;
  };
  /** Division shown on the battlefield. */
  currentDivision?: number;
  /** Interval that sends an inactive player away from the battlefield. */
  globalSleepInterval?: number;
}

export const game = window as unknown as BattlefieldGlobals;

export function isOnBattlefield(): boolean {
  return Boolean(SERVER_DATA.battleId);
}

/** Ids of the battle that is open. Only call it on a battlefield. */
export function getBattleIds() {
  return {
    battleId: ensure(SERVER_DATA.battleId, "No battle id"),
    /** The round of the battle. */
    zoneId: ensure(SERVER_DATA.zoneId, "No zone id"),
    battleZoneId: ensure(SERVER_DATA.battleZoneId, "No battle zone id"),
    /** Country of the side the player fights for, or looks at. */
    leftCountryId: ensure(SERVER_DATA.leftBattleId, "No left side"),
    rightCountryId: ensure(SERVER_DATA.rightBattleId, "No right side"),
  };
}
