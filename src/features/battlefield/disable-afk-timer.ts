import { createFeature } from "../../utils/feature";
import { isTopWindow } from "../../utils/erep-global-info";
import { isSettingEnabled } from "../../settings/stuff-settings";
import { game, isOnBattlefield } from "./game";

/** Stops the game from sending an inactive player away from the battlefield. */
export const DisableAfkTimerFeature = createFeature({
  id: "disable_afk_timer",
  name: "Disable the Inactivity Timer",
  description: "Lets the player stay on the battlefield while inactive.",
  canExecute: () => isOnBattlefield() && isTopWindow(),
  isSettingEnabled: () => isSettingEnabled("disableAfkTimer"),
  execute: () => {
    if (game.globalSleepInterval !== undefined) {
      window.clearInterval(game.globalSleepInterval);
    }
  },
});
