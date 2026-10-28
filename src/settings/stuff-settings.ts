import type { DonatorsData } from "../features/donator-badges/donators";
import { ExternalProperty } from "../hooks/external-property";
import { error } from "../utils/utils";

/**
 * Everything is kept as JSON under the `stuff` key, like the legacy script
 * did, so that players keep their settings.
 */
const STORAGE_KEY = "stuff";

export interface SettingDefinition {
  key: string;
  label: string;
  section: string;
  /**
   * Acts on the player's behalf without a click. Such settings are off
   * unless turned on, the rest are on unless turned off.
   */
  isAutomatic?: boolean;
}

/** The toggles of the settings panel, in the order they are shown. */
export const SETTINGS = [
  { section: "Battlefield", key: "battlefield", label: "Improved battlefield" },
  { section: "Battlefield", key: "topLists", label: "Top damage lists" },
  {
    section: "Battlefield",
    key: "disableAfkTimer",
    label: "Turn off the inactivity timer",
    isAutomatic: true,
  },
  {
    section: "Companies",
    key: "companyManager",
    label: "Work as Manager by type",
  },
  {
    section: "Companies",
    key: "showBestJobOffer",
    label: "Best local job offer",
  },
  {
    section: "Energy",
    key: "energyRecovery",
    label: "Eat food automatically",
    isAutomatic: true,
  },
  { section: "Main page", key: "epicSensor", label: "Epic battle sensor" },
  {
    section: "Main page",
    key: "hideMedals",
    label: "Hide medal posts in the feed",
  },
  {
    section: "Main page",
    key: "autoRefresh",
    label: "Reload the main page every 10 minutes",
    isAutomatic: true,
  },
  {
    section: "Marketplace",
    key: "improveMarketplace",
    label: "Improved marketplace",
  },
  {
    section: "Marketplace",
    key: "autofillMarket",
    label: "Fill in the max amount",
  },
  {
    section: "Marketplace",
    key: "marketLinks",
    label: "Market links in the menu",
  },
  {
    section: "Monetary market",
    key: "autofillGold",
    label: "Fill in the max gold amount",
  },
  { section: "Profile", key: "improveProfile", label: "Improved profile" },
  {
    section: "Profile",
    key: "influenceCalculator",
    label: "Influence calculator",
  },
  { section: "Storage", key: "improveInventory", label: "Improved storage" },
  { section: "Storage", key: "displayStorage", label: "Side inventory" },
  { section: "Wars page", key: "compactWarsPage", label: "Compact layout" },
  {
    section: "Wars page",
    key: "replaceWaitingwithCountdown",
    label: "Countdown instead of waiting",
  },
  { section: "Other", key: "xpLeft", label: "XP left to the next level" },
  { section: "Other", key: "showStats", label: "Today's kills and damage" },
  {
    section: "Other",
    key: "mercFF",
    label: "Mercenary and Freedom Fighter progress",
  },
  {
    section: "Other",
    key: "externalLinks",
    label: "Skip the external link warning",
  },
  {
    section: "Other",
    key: "playerTooltip",
    label: "Improved player hovercards",
  },
  { section: "Other", key: "popupBlocker", label: "Block pack popups" },
  {
    section: "Other",
    key: "closeTPnotifications",
    label: "Close True Patriot notifications",
    isAutomatic: true,
  },
  {
    section: "Other",
    key: "autoLogin",
    label: "Log in with the browser's saved password",
    isAutomatic: true,
  },
] as const satisfies readonly SettingDefinition[];

export type SettingKey = (typeof SETTINGS)[number]["key"];

/** Data the script keeps besides the toggles. */
export interface StuffData {
  /** Latest released version, from `contributors.json`. */
  version?: string;
  /** Ids of the players that contributed to Stuff++. */
  contributors?: number[];
  /** Donators, from `contributors.json`. */
  unlocked?: DonatorsData;
}

/**
 * A setting is stored as `true` when it is turned off. That is how the
 * legacy settings panel stored them.
 */
type StoredStuff = StuffData & Partial<Record<SettingKey, boolean>>;

const automaticKeys = new Set<string>(
  SETTINGS.filter((setting) => "isAutomatic" in setting).map(
    (setting) => setting.key,
  ),
);

function readStuff(): StoredStuff {
  try {
    const stuff = localStorage.getItem(STORAGE_KEY);
    return stuff ? (JSON.parse(stuff) as StoredStuff) : {};
  } catch (e) {
    error("Failed to read the settings", e);
    return {};
  }
}

function writeStuff(stuff: StoredStuff) {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(stuff));
  } catch (e) {
    error("Failed to save the settings", e);
  }
}

/** Changes whenever something is saved, so the settings panel stays up to date. */
export const stuffChanged = new ExternalProperty(0);

export function isSettingEnabled(key: SettingKey): boolean {
  const isTurnedOff = readStuff()[key];
  return automaticKeys.has(key) ? isTurnedOff === false : isTurnedOff !== true;
}

export function setSettingEnabled(key: SettingKey, isEnabled: boolean) {
  writeStuff({ ...readStuff(), [key]: !isEnabled });
  stuffChanged.update(stuffChanged.get() + 1);
}

export function readStuffData(): StuffData {
  const { version, contributors, unlocked } = readStuff();
  return { version, contributors, unlocked };
}

export function updateStuffData(data: StuffData) {
  writeStuff({ ...readStuff(), ...data });
  stuffChanged.update(stuffChanged.get() + 1);
}
