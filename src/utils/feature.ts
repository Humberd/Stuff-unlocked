export interface Feature {
  name: string;
  description?: string;
  canExecute: (url: Location) => boolean;
  execute: () => Promise<void> | void;
}

export function createFeature(feature: Feature): Feature {
  return {
    ...feature,
  };
}