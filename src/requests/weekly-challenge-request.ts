import { getJson, postForm } from "../utils/request";

export interface Reward {
  id: number;
  /** "completed" when it was reached and waits to be collected. */
  status: string;
}

export interface DataResponse {
  enabled: boolean;
  /** The highest reward reached so far. */
  maxRewardId: number;
  rewards: {
    normal: Reward[];
    extra: Reward[];
  };
}

export function sendDataRequest(): Promise<DataResponse> {
  return getJson("/main/weekly-challenge-data");
}

export interface CollectAllRequest {
  _token: string;
  maxRewardId: number;
}

export interface CollectAllResponse {
  error: boolean;
  message: string;
}

export function sendCollectAllRequest(
  body: CollectAllRequest,
): Promise<CollectAllResponse> {
  return postForm("/main/weekly-challenge-collect-all", body);
}
