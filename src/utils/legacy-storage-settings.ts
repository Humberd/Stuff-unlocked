import type { DonatorsData } from "../features/donator-badges/donators";

function getStuffStorage() {
  return localStorage.getItem("stuff");
}

export const LegacyStorageSettings = {
  isImproveInventoryEnabled: () => {
    const stuff = getStuffStorage();
    if (!stuff) {
      return true;
    }
    const jsonStuff = JSON.parse(stuff);

    return !jsonStuff.improveInventory;
  },
  isSideInventoryEnabled: () => {
    const stuff = getStuffStorage();
    if (!stuff) {
      return true;
    }
    const jsonStuff = JSON.parse(stuff);

    return !jsonStuff.displayStorage;
  },
  /** Cached by the legacy script from the remote `contributors.json`. */
  getDonatorsData: (): DonatorsData | undefined => {
    const stuff = getStuffStorage();
    if (!stuff) {
      return undefined;
    }
    return JSON.parse(stuff).unlocked;
  },
};
