import { getJson } from "../utils/request";

export interface TrainingGround {
  id: number;
  name: string;
  trained: boolean;
  /** Gold one training costs. */
  effectiveCost: number;
}

export interface Response {
  grounds: TrainingGround[];
}

export function sendRequest(): Promise<Response> {
  return getJson("/main/training-grounds-json");
}
