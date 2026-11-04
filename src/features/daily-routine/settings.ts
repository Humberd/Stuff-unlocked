import { readLocalStorage } from "../../hooks/storage";

export const DAILY_TASK_IDS = [
  "vip",
  "work",
  "production",
  "train",
  "overtime",
  "gold",
  "challenge",
  "weeklyChallenge",
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
    gold: false,
    challenge: true,
    weeklyChallenge: true,
  },
  isAutomatic: false,
  trainOnPaidGrounds: true,
  goldAmount: "10",
  maxGoldPrice: "",
};

/** Fills in the defaults for anything added since the settings were saved. */
export function withDefaults(
  saved: Partial<DailyRoutineSettings>,
): DailyRoutineSettings {
  return {
    ...DEFAULT_SETTINGS,
    ...saved,
    tasks: { ...DEFAULT_SETTINGS.tasks, ...saved.tasks },
  };
}

export function readSettings(): DailyRoutineSettings {
  return withDefaults(
    readLocalStorage<Partial<DailyRoutineSettings>>(SETTINGS_KEY, {}),
  );
}
