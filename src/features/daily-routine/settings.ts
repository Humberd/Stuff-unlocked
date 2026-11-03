import { readLocalStorage } from "../../hooks/storage";

export const DAILY_TASK_IDS = [
  "vip",
  "work",
  "production",
  "train",
  "overtime",
  "gold",
  "challenge",
] as const;

export type DailyTaskId = (typeof DAILY_TASK_IDS)[number];

export interface DailyRoutineSettings {
  tasks: Record<DailyTaskId, boolean>;
  /** Runs once a day, and works overtime whenever it can, without a click. */
  isAutomatic: boolean;
  trainOnPaidGrounds: boolean;
  goldAmount: string;
  /** Highest price per gold, empty for any price. */
  maxGoldPrice: string;
}

export const SETTINGS_KEY = "DailyRoutine.settings";

export const DEFAULT_SETTINGS: DailyRoutineSettings = {
  tasks: {
    vip: true,
    work: true,
    production: true,
    train: true,
    overtime: true,
    gold: true,
    challenge: true,
  },
  isAutomatic: false,
  trainOnPaidGrounds: true,
  goldAmount: "10",
  maxGoldPrice: "",
};

/** The saved settings, with defaults for anything added since they were saved. */
export function readSettings(): DailyRoutineSettings {
  const saved = readLocalStorage<Partial<DailyRoutineSettings>>(
    SETTINGS_KEY,
    {},
  );
  return {
    ...DEFAULT_SETTINGS,
    ...saved,
    tasks: { ...DEFAULT_SETTINGS.tasks, ...saved.tasks },
  };
}
