import { createFeature } from "../../utils/feature";
import { isTopWindow } from "../../utils/erep-global-info";
import { isSettingEnabled } from "../../settings/stuff-settings";
import { onXhrLoad } from "../../utils/xhr";
import { getAngularjsControllerScopeOrNull } from "../../angularjs-utils";
import {
  closePatriotNotifications,
  type SideNotificationScope,
} from "./patriot-notifications";

export const CloseTpNotificationsFeature = createFeature({
  id: "close_tp_notifications",
  name: "Close True Patriot Notifications",
  description:
    "Closes the True Patriot notifications as soon as the game shows them.",
  canExecute: () => isTopWindow(),
  isSettingEnabled: () => isSettingEnabled("closeTPnotifications"),
  execute: ({ signal }) => {
    onXhrLoad(
      "citizenNotifications",
      () => {
        const scope = getAngularjsControllerScopeOrNull<SideNotificationScope>(
          "SideNotificationController",
        );
        if (scope) {
          closePatriotNotifications(scope);
        }
      },
      { signal },
    );
  },
});
