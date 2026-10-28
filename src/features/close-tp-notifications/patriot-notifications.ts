export interface SideNotification {
  iconURL?: string;
}

/** The scope of the game's `SideNotificationController`, which shows one notification at a time. */
export interface SideNotificationScope {
  notifications?: SideNotification[] & { active?: SideNotification };
  closeNotif?: () => void;
  goNext?: () => void;
}

/** More than enough to visit every notification of a long list twice. */
const MAX_STEPS = 200;

export function isPatriotNotification(notification: SideNotification): boolean {
  return notification.iconURL?.includes("atriot") ?? false;
}

/**
 * Closes the True Patriot notifications by stepping through the shown
 * notification. Gives up after a fixed number of steps, in case the
 * scope doesn't move on the way it is expected to.
 */
export function closePatriotNotifications(
  scope: SideNotificationScope,
): number {
  const { notifications, closeNotif, goNext } = scope;
  if (!Array.isArray(notifications) || !closeNotif || !goNext) {
    return 0;
  }

  let left = notifications.filter(isPatriotNotification).length;
  let closed = 0;
  for (let step = 0; left > 0 && step < MAX_STEPS; step++) {
    const active = scope.notifications?.active;
    if (!active) {
      break;
    }
    if (isPatriotNotification(active)) {
      closeNotif.call(scope);
      left--;
      closed++;
    } else {
      goNext.call(scope);
    }
  }
  return closed;
}
