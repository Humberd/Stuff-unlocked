import { createFeature } from "../../utils/feature";
import {
  getCitizen,
  getCsrfToken,
  getEDay,
  isTopWindow,
} from "../../utils/erep-global-info";
import { isSettingEnabled } from "../../settings/stuff-settings";
import { waitFor } from "../../utils/time";
import { error } from "../../utils/utils";
import { DailyRoutine } from "./daily-routine";
import { getCurrentEDay } from "./game-day";
import { refreshPage } from "./refresh-page";
import { readSettings } from "./settings";
import { DailyRoutinePanel } from "./components/DailyRoutinePanel";

const CHECK_INTERVAL_MS = 5 * 60 * 1000;

export const DailyRoutineFeature = createFeature({
  id: "daily_routine",
  name: "Daily Routine",
  description:
    "Adds a sidebar panel that claims VIP points, works, works as manager, trains, works overtime, buys gold and claims the daily and weekly challenges, on a click or by itself every day.",
  canExecute: () => isTopWindow(),
  isSettingEnabled: () => isSettingEnabled("dailyRoutine"),
  execute: ({ mount, onCleanup }) => {
    if (typeof SERVER_DATA === "undefined" || !getCitizen()) {
      return;
    }
    const routine = getDailyRoutine();

    const missions = document.querySelector(".sidebar .user_missions");
    if (missions) {
      mount(
        <DailyRoutinePanel routine={routine} getEDay={getTodaysEDay} />,
        missions,
      );
    }

    const runIfDue = () => {
      if (readSettings().isAutomatic) {
        routine.runIfDue().catch((e) => error("Daily routine failed", e));
      }
    };
    runIfDue();
    const intervalId = window.setInterval(runIfDue, CHECK_INTERVAL_MS);
    onCleanup(() => window.clearInterval(intervalId));
  },
});

const loadedAt = Date.now();

function getTodaysEDay() {
  return getCurrentEDay(getEDay(), loadedAt, Date.now());
}

let dailyRoutine: DailyRoutine | undefined;

/** Created once, so that a run survives the panel being mounted again. */
function getDailyRoutine() {
  dailyRoutine ??= new DailyRoutine({
    getEDay: getTodaysEDay,
    getCitizenId: () => getCitizen().citizenId,
    getCsrfToken,
    getCurrency: () => getCitizen().currency,
    isSessionValidationPending: () => Boolean(SERVER_DATA.sessionValidation),
    refreshPage,
    now: Date.now,
    sleep: waitFor,
  });
  return dailyRoutine;
}
