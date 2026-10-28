import { getJson } from "../utils/request";

/** Data of the game's own player hovercard. Only the used fields are typed. */
export interface Response {
  level: number;
  bornOn: string;
  /** What the viewer can do, e.g. "removeFriend" when they are friends. */
  interactionButtons?: { type: string }[];
  fighterInfo: {
    military: {
      strength: number;
      division: number;
      rank: number;
      damagePerHit?: number;
      /** Damage per hit with True Patriot, 0 without. */
      damagePerHitLegend?: number;
    };
    aviation: {
      rank: number;
      /** The strength of pilots. */
      perception: number;
      damagePerHitNoWeapon?: number;
    };
  };
}

export function sendRequest(citizenId: string): Promise<Response> {
  return getJson(`/main/citizen-hovercard/${citizenId}`);
}

export function isFriend(response: Response): boolean {
  return (response.interactionButtons ?? []).some(
    (button) => button.type === "removeFriend",
  );
}
