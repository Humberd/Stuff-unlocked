import { createFeature } from "../../utils/feature";
import { error } from "../../utils/utils";
import {
  SettingsButton,
  settingsButtonMountOptions,
} from "./components/SettingsPanel";
import { refreshStuffData } from "./version";

let isStuffDataRefreshed = false;

export const SettingsPanelFeature = createFeature({
  id: "settings_panel",
  name: "Settings Panel",
  description:
    "Adds the Stuff++ button to the sidebar, which opens the settings and shows when an update is available.",
  canExecute: () => window.top === window.self,
  execute: ({ mount }) => {
    // Once per page load is enough, it doesn't change that often
    if (!isStuffDataRefreshed) {
      isStuffDataRefreshed = true;
      refreshStuffData().catch((e) => error("Failed to check for updates", e));
    }

    const userFinances = document.querySelector(".user_finances");
    if (userFinances) {
      mount(<SettingsButton />, userFinances, settingsButtonMountOptions);
    }
  },
});
