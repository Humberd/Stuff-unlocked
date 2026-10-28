import { createFeature } from "../../utils/feature";
import { isOnHomepage, isTopWindow } from "../../utils/erep-global-info";
import { isSettingEnabled } from "../../settings/stuff-settings";

const RELOAD_AFTER_MS = 10 * 60 * 1_000;

export const AutoRefreshFeature = createFeature({
  id: "auto_refresh",
  name: "Auto Refresh",
  description: "Reloads the main page every 10 minutes.",
  canExecute: () => isTopWindow() && isOnHomepage(),
  isSettingEnabled: () => isSettingEnabled("autoRefresh"),
  execute: ({ onCleanup }) => {
    const timeoutId = window.setTimeout(() => {
      location.href = "/";
    }, RELOAD_AFTER_MS);
    onCleanup(() => window.clearTimeout(timeoutId));
  },
});
