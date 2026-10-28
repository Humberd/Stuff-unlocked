import type { DonatorsData } from "../features/donator-badges/donators";
import { error } from "./utils";

/** Settings the legacy script keeps as JSON under the `stuff` key. */
interface LegacyStuff {
  /** `true` turns the feature off. */
  improveInventory?: boolean;
  /** `true` turns the feature off. */
  displayStorage?: boolean;
  /** Cached by the legacy script from the remote `contributors.json`. */
  unlocked?: DonatorsData;
}

function readStuff(): LegacyStuff {
  try {
    const stuff = localStorage.getItem("stuff");
    return stuff ? (JSON.parse(stuff) as LegacyStuff) : {};
  } catch (e) {
    error("Failed to read the legacy settings", e);
    return {};
  }
}

export const LegacyStorageSettings = {
  isImproveInventoryEnabled: () => !readStuff().improveInventory,
  isSideInventoryEnabled: () => !readStuff().displayStorage,
  getDonatorsData: (): DonatorsData | undefined => readStuff().unlocked,
};
