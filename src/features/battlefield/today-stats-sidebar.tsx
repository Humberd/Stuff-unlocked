import { createFeature } from "../../utils/feature";
import { getEDay } from "../../utils/erep-global-info";
import { isSettingEnabled } from "../../settings/stuff-settings";
import {
  TodayStatsSidebar,
  todayStatsSidebarMountOptions,
} from "./components/TodayStatsSidebar";
import { isTodayStatsKey, loadTodayStats } from "./today-stats";

const ANCHOR_SELECTOR = ".user_finances";

export const TodayStatsSidebarFeature = createFeature({
  id: "today_stats_sidebar",
  name: "Today's Stats in the Sidebar",
  description:
    "Shows today's kills, prestige points and damage under the finances.",
  canExecute: () => document.querySelector(ANCHOR_SELECTOR) !== null,
  isSettingEnabled: () => isSettingEnabled("showStats"),
  execute: ({ mount, signal }) => {
    loadTodayStats(getEDay());
    // Stays up to date with the hits made in other tabs
    window.addEventListener(
      "storage",
      (event) => {
        if (isTodayStatsKey(event.key)) {
          loadTodayStats(getEDay());
        }
      },
      { signal },
    );

    mount(
      <TodayStatsSidebar />,
      document.querySelector(ANCHOR_SELECTOR),
      todayStatsSidebarMountOptions,
    );
  },
});
