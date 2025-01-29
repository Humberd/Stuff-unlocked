import { getCookieHeaders } from "../utils/request";

export namespace AnniversaryQuestData {
  export interface Request {}

  export interface Response {
    status: Status;
    cities: Record<string, City>;
    neighbors: Neighbor[];
    rewards: Rewards;
  }

  export function sendRequest(request: Request): Promise<Response> {
    const response = fetch(
      "https://www.erepublik.com/en/main/anniversaryQuestData",
      {
        method: "GET",
        headers: {
          "content-type": "application/json",
          ...getCookieHeaders(),
        },
      }
    );
    return response.then((response) => response.json());
  }

  export interface City {
    id: number;
    latitude: number;
    longitude: number;
    cityId: number;
    miles: number;
    energy: number;
    tokens: number;
    waitTime: number;
    skipCost: number;
    rewards: Reward[];
    extraRewards: Reward[];
    name: string;
    countryId: number;
  }

  export interface Reward {
    type: string;
    name: string;
    amount: number;
    ttl?: number;
  }

  export interface Neighbor {
    nodeId: number;
    neighborId: number;
  }

  export interface Rewards {
    total: number;
    collected: number;
    hasExtra: boolean;
    canCollectExtra: boolean;
  }

  export interface Status {
    inventory: Inventory;
    queue: Queue[];
    progress: { [key: string]: Progress };
  }

  export interface Inventory {
    citizenId: number;
    eventId: number;
    miles: number;
    energy: number;
    tokens: number;
    currentTime: Date;
  }

  export interface Progress {
    nodeId: number;
    startUnlockTime: string;
    finishUnlockTime: string;
    claimedAt: null | string;
    extraClaimedAt: null;
    nodeStatus: NodeStatus;
    extraStatus: ExtraStatus;
  }

  export enum ExtraStatus {
    EUnavailable = "e_unavailable",
  }

  export enum NodeStatus {
    Claimed = "claimed",
    Unclaimed = "unclaimed",
    Unlocking = "unlocking",
  }

  export interface Queue {
    nodeId: number;
    startUnlockTime: string;
    finishUnlockTime: string;
    waitTime: number;
    remainingTime: number;
    progress: number;
  }
}
