import { postForm } from "../utils/request";

export interface Mission {
  id: number;
  title: string;
  progress?: { completed: boolean }[];
}

/** Claimed missions are left out. */
export interface MissionsResponse {
  missions: Mission[];
}

export function sendMissionsRequest(body: {
  _token: string;
}): Promise<MissionsResponse> {
  return postForm("/main/daily-missions-data", body);
}

export function sendMissionSolveRequest(body: {
  _token: string;
  missionId: number;
}): Promise<unknown> {
  return postForm("/main/mission-solve", body);
}

export interface ObjectiveStatusResponse {
  status: {
    /** Activity points collected today. */
    progress: number;
    /** An empty array when nothing was claimed yet. */
    claimedObjectives: Record<string, { claimed: boolean }> | [];
  };
  /** Rewards by the activity points they cost. */
  data: Record<string, unknown>;
}

export function sendObjectiveStatusRequest(body: {
  _token: string;
}): Promise<ObjectiveStatusResponse> {
  return postForm("/main/objective-status", body);
}

export function sendObjectiveClaimRewardRequest(body: {
  _token: string;
  objectiveCost: number;
}): Promise<unknown> {
  return postForm("/main/objective-claim-reward", body);
}
