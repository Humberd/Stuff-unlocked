export interface Feature {
  id: string;
  name: string;
  description?: string;
  canExecute: (url: Location) => boolean;
  isSettingEnabled?: () => boolean;
  execute: () => Promise<void> | void;
}

export function createFeature(feature: Feature): Feature {
  return {
    ...feature,
  };
}