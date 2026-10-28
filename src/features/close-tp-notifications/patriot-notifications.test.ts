import { describe, expect, it, vi } from "vitest";
import {
  closePatriotNotifications,
  type SideNotification,
  type SideNotificationScope,
} from "./patriot-notifications";

const patriot = (id: number) => ({
  id,
  iconURL: `/images/truePatriot${id}.png`,
});
const other = (id: number) => ({ id, iconURL: `/images/medal${id}.png` });

/** Shows one notification at a time, like the game's controller. */
type TestNotification = SideNotification & { id: number };

function withActive(
  list: TestNotification[],
  active: TestNotification | undefined,
): TestNotification[] & { active?: TestNotification } {
  return Object.assign(list, { active });
}

function createScope(list: TestNotification[]) {
  let index = 0;
  const scope = {
    notifications: withActive([...list], list[0]),
    closeNotif: vi.fn(() => {
      const notifications = scope.notifications.filter(
        (notification) => notification !== scope.notifications.active,
      );
      index = notifications.length ? index % notifications.length : 0;
      scope.notifications = withActive(notifications, notifications[index]);
    }),
    goNext: vi.fn(() => {
      index = (index + 1) % scope.notifications.length;
      scope.notifications.active = scope.notifications[index];
    }),
  };
  return scope;
}

describe("closePatriotNotifications", () => {
  it("closes only the True Patriot notifications", () => {
    const scope = createScope([other(1), patriot(2), other(3), patriot(4)]);

    expect(closePatriotNotifications(scope)).toBe(2);
    expect(scope.notifications.map(({ id }) => id)).toEqual([1, 3]);
  });

  it("does nothing without True Patriot notifications", () => {
    const scope = createScope([other(1), other(2)]);

    expect(closePatriotNotifications(scope)).toBe(0);
    expect(scope.goNext).not.toHaveBeenCalled();
  });

  it("gives up when the scope doesn't move to the next notification", () => {
    const scope = createScope([other(1), patriot(2)]);
    scope.goNext.mockImplementation(() => {});

    expect(closePatriotNotifications(scope)).toBe(0);
    expect(scope.goNext).toHaveBeenCalledTimes(200);
  });

  it("stops when no notification is shown", () => {
    const scope = createScope([patriot(1)]);
    scope.notifications.active = undefined;

    expect(closePatriotNotifications(scope)).toBe(0);
  });

  it("does nothing when the scope isn't the expected one", () => {
    expect(closePatriotNotifications({})).toBe(0);
    const scope: SideNotificationScope = { notifications: [patriot(1)] };
    expect(closePatriotNotifications(scope)).toBe(0);
  });
});
