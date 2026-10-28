import { createFeature } from "../../utils/feature";
import { isTopWindow } from "../../utils/erep-global-info";
import { isSettingEnabled } from "../../settings/stuff-settings";
import { BLOCKED_POPUP_TIMESTAMP, promoPopupKeys } from "./promo-popup";

export const PopupBlockerFeature = createFeature({
  id: "popup_blocker",
  name: "Popup Blocker",
  description:
    "Stops the game from showing the pack and promo popups, by making it think they were shown today.",
  canExecute: () => isTopWindow(),
  isSettingEnabled: () => isSettingEnabled("popupBlocker"),
  execute: () => {
    for (const key of promoPopupKeys(new Date())) {
      localStorage.setItem(key, BLOCKED_POPUP_TIMESTAMP);
    }
  },
});
