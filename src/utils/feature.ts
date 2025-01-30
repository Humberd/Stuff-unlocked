import { log } from "./utils";

export interface Feature {
  name: string;
  description?: string;
  canExecute: (url: Location) => boolean;
  execute: () => Promise<void> | void;
}

export function createFeature(feature: Feature): Feature {
  return {
    ...feature,
    execute: async () => applyExecuteTimeSpent(feature.name, feature.execute),
  };
}

const applyExecuteTimeSpent = async (
  name: string,
  callback: () => Promise<void> | void
) => {
  const start = Date.now();
  await callback();
  const end = Date.now();
  log(`Time spent executing ${name}: ${end - start}ms`);
};
