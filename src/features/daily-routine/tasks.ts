import * as VipShopHtml from "../../requests/vip-shop-html-request";
import * as VipClaim from "../../requests/vip-claim-request";
import * as JobData from "../../requests/job-data-request";
import * as Work from "../../requests/work-request";
import * as WorkOvertime from "../../requests/work-overtime-request";
import * as MyCompaniesHtml from "../../requests/my-companies-html-request";
import * as TrainingGrounds from "../../requests/training-grounds-json-request";
import * as Train from "../../requests/train-request";
import * as GoldOffers from "../../requests/gold-exchange-offers-request";
import * as GoldPurchase from "../../requests/gold-exchange-purchase-request";
import * as DailyMissions from "../../requests/daily-missions-request";
import * as WeeklyChallenge from "../../requests/weekly-challenge-request";
import { getManagerWorkLimit } from "../company-manager/manager-work";
import { formatNumber } from "../../utils/format";
import type { DailyRoutineSettings, DailyTaskId } from "./settings";

const OVERTIME_POINTS = 24;
const HOUR_MS = 60 * 60 * 1000;
const CLAIM_DELAY_MS = 400;

export type TaskStatus = "done" | "skipped" | "failed";

export interface TaskOutcome {
  status: TaskStatus;
  message: string;
  /** When a repeatable task is worth trying again. */
  retryAt?: number;
}

export interface TaskContext {
  csrfToken: string;
  settings: DailyRoutineSettings;
  currency: string;
  goldBoughtToday: number;
  onGoldBought: (amount: number) => void;
  now: () => number;
  sleep: (ms: number) => Promise<unknown>;
}

export interface DailyTask {
  id: DailyTaskId;
  label: string;
  /** Can do something again later on the same day. */
  isRepeatable?: boolean;
  run: (context: TaskContext) => Promise<TaskOutcome>;
}

const done = (message: string): TaskOutcome => ({ status: "done", message });
const skipped = (message: string): TaskOutcome => ({
  status: "skipped",
  message,
});

/** The game answers `status: false` both for errors and when it wants a captcha. */
function ensureAccepted(response: { status: boolean; message: unknown }) {
  if (response.status === false) {
    throw new Error(
      typeof response.message === "string" && response.message
        ? response.message
        : "The game refused, it may want a captcha. Try it by hand.",
    );
  }
}

const roundGold = (amount: number) => Math.round(amount * 100) / 100;

export const vipTask: DailyTask = {
  id: "vip",
  label: "Claim VIP points",
  run: async ({ csrfToken }) => {
    const status = VipShopHtml.parseVipStatus(await VipShopHtml.sendRequest());
    if (status.isClaimed) {
      return done("Already claimed");
    }
    const response = await VipClaim.sendRequest({ _token: csrfToken });
    if (response.error) {
      throw new Error(response.message);
    }
    return done(
      response.today_points
        ? `+${formatNumber(response.today_points)} points`
        : "Claimed",
    );
  },
};

export const workTask: DailyTask = {
  id: "work",
  label: "Work",
  run: async ({ csrfToken }) => {
    const job = await JobData.sendRequest();
    if (!job.isEmployee) {
      return skipped("You have no job");
    }
    if (job.alreadyWorked) {
      return done("Already worked");
    }
    const response = await Work.sendRequest({
      _token: csrfToken,
      action_type: "work",
    });
    ensureAccepted(response);
    const earned = response.result?.netSalary ?? job.salary;
    return done(`Earned ${formatNumber(earned)} ${job.currency}`);
  },
};

export const productionTask: DailyTask = {
  id: "production",
  label: "Work as manager",
  run: async ({ csrfToken }) => {
    const { companies, energy } = MyCompaniesHtml.parseMyCompanies(
      await MyCompaniesHtml.sendRequest(),
    );
    const toWork = companies.filter(
      (company) => company.can_work_as_manager && !company.already_worked,
    );
    if (!toWork.length) {
      return companies.length
        ? done("Already worked in every company")
        : skipped("You have no companies");
    }
    const ids = toWork
      .slice(0, getManagerWorkLimit(energy))
      .map((company) => company.id);
    if (!ids.length) {
      return skipped("Not enough energy");
    }

    const response = await Work.sendRequest({
      _token: csrfToken,
      action_type: "production",
      own_work: JSON.stringify(ids),
      employee_works: "{}",
      cntOwnWork: ids.length,
      cntEmployeeWork: 0,
      cntSelected: ids.length,
    });
    ensureAccepted(response);

    const left = toWork.length - ids.length;
    return done(
      describeProduction(ids.length, response.result?.production) +
        (left ? `, ${left} left for lack of energy` : ""),
    );
  },
};

function describeProduction(
  companies: number,
  production: Work.Production | undefined,
): string {
  const products = production
    ? (
        [
          [production.totalFood, "food"],
          [production.totalWeapon, "weapons"],
          [production.totalHouse, "houses"],
          [production.totalAirplane, "aircraft weapons"],
        ] as const
      )
        .filter(([amount]) => amount > 0)
        .map(([amount, name]) => `${formatNumber(amount)} ${name}`)
    : [];
  return products.length
    ? `Produced ${products.join(", ")}`
    : `Worked in ${companies} companies`;
}

export const trainTask: DailyTask = {
  id: "train",
  label: "Train",
  run: async ({ csrfToken, settings }) => {
    const { grounds } = await TrainingGrounds.sendRequest();
    if (!grounds.length) {
      return skipped("You have no training grounds");
    }
    const toTrain = grounds.filter(
      (ground) =>
        !ground.trained &&
        (settings.trainOnPaidGrounds || ground.effectiveCost === 0),
    );
    if (!toTrain.length) {
      return done("Already trained");
    }

    const response = await Train.sendRequest(
      csrfToken,
      toTrain.map((ground) => ground.id),
    );
    ensureAccepted(response);
    const strength = response.result?.strength_bonus;
    return done(strength ? `+${formatNumber(strength)} strength` : "Trained");
  },
};

export const overtimeTask: DailyTask = {
  id: "overtime",
  label: "Work overtime",
  isRepeatable: true,
  run: async ({ csrfToken, now }) => {
    const job = await JobData.sendRequest();
    if (!job.isEmployee) {
      return skipped("You have no job");
    }
    if (!job.overTime) {
      return {
        status: "skipped",
        message: "Not until today's work is done",
        retryAt: now() + HOUR_MS,
      };
    }
    const { points, nextOverTime } = job.overTime;
    const nextAt = getOvertimeAt(nextOverTime, now());
    if (nextAt > now()) {
      return {
        status: "skipped",
        message: `Next one at ${formatTime(nextAt)}`,
        retryAt: nextAt,
      };
    }
    if (points < OVERTIME_POINTS) {
      return {
        status: "skipped",
        message: `${points}/${OVERTIME_POINTS} overtime points`,
        retryAt: now() + HOUR_MS,
      };
    }

    ensureAccepted(
      await WorkOvertime.sendRequest({
        _token: csrfToken,
        action_type: "workOvertime",
      }),
    );
    // It already worked, so failing to read the new state isn't a failure
    const after = await JobData.sendRequest().then(
      (response) => response.overTime,
      () => null,
    );
    const nextRetryAt = after ? getOvertimeAt(after.nextOverTime, now()) : 0;
    return {
      status: "done",
      message: after ? `Worked, ${after.points} points left` : "Worked",
      retryAt: nextRetryAt > now() ? nextRetryAt : now() + HOUR_MS,
    };
  },
};

function getOvertimeAt(nextOverTime: number, now: number): number {
  // A small number would be seconds left rather than a timestamp
  return nextOverTime > 1e9 ? nextOverTime * 1000 : now + nextOverTime * 1000;
}

function formatTime(time: number): string {
  return new Date(time).toLocaleTimeString("en-GB", {
    hour: "2-digit",
    minute: "2-digit",
  });
}

export const goldTask: DailyTask = {
  id: "gold",
  label: "Buy gold",
  run: async (context) => {
    const { csrfToken, settings } = context;
    const target = Number(settings.goldAmount);
    if (!(target > 0)) {
      return skipped("Set how much gold to buy");
    }
    let remaining = roundGold(target - context.goldBoughtToday);
    if (remaining <= 0) {
      return done(`Bought ${formatNumber(target)} gold`);
    }
    const maxPrice = Number(settings.maxGoldPrice) || Infinity;

    const offers = GoldOffers.parseOffers(
      await GoldOffers.sendRequest({
        _token: csrfToken,
        page: 0,
        currencyId: GoldOffers.GOLD_CURRENCY_ID,
      }),
    );
    let bought = 0;
    let spent = 0;
    for (const offer of offers) {
      if (remaining <= 0 || offer.price > maxPrice) {
        break;
      }
      const amount = Math.min(remaining, Math.floor(offer.amount * 100) / 100);
      const response = await GoldPurchase.sendRequest({
        _token: csrfToken,
        offerId: offer.id,
        amount,
        page: 0,
        currencyId: GoldOffers.GOLD_CURRENCY_ID,
      });
      if (response.error) {
        throw new Error(
          bought
            ? `Bought ${formatNumber(bought)} gold, then: ${response.message}`
            : response.message,
        );
      }
      context.onGoldBought(amount);
      bought = roundGold(bought + amount);
      spent += amount * offer.price;
      remaining = roundGold(remaining - amount);
    }

    if (!bought) {
      return skipped(
        offers.length
          ? `Cheapest gold costs ${formatNumber(offers[0].price)}, above your limit`
          : "No gold offers",
      );
    }
    const message = `Bought ${formatNumber(bought)} gold for ${formatNumber(Math.round(spent))} ${context.currency}`;
    return remaining > 0
      ? skipped(`${message}, the rest is too expensive`)
      : done(message);
  },
};

export const challengeTask: DailyTask = {
  id: "challenge",
  label: "Claim daily challenge",
  isRepeatable: true,
  run: async ({ csrfToken, sleep }) => {
    const { missions } = await DailyMissions.sendMissionsRequest({
      _token: csrfToken,
    });
    const completed = missions.filter(
      (mission) =>
        mission.progress?.length &&
        mission.progress.every((part) => part.completed),
    );
    for (const mission of completed) {
      await DailyMissions.sendMissionSolveRequest({
        _token: csrfToken,
        missionId: mission.id,
      });
      await sleep(CLAIM_DELAY_MS);
    }

    const { status, data } = await DailyMissions.sendObjectiveStatusRequest({
      _token: csrfToken,
    });
    const claimed: Record<string, { claimed: boolean }> = Array.isArray(
      status.claimedObjectives,
    )
      ? {}
      : status.claimedObjectives;
    const chests = Object.keys(data)
      .map(Number)
      .filter((cost) => cost <= status.progress && !claimed[cost]?.claimed)
      .sort((a, b) => a - b);
    for (const cost of chests) {
      await DailyMissions.sendObjectiveClaimRewardRequest({
        _token: csrfToken,
        objectiveCost: cost,
      });
      await sleep(CLAIM_DELAY_MS);
    }

    if (!completed.length && !chests.length) {
      return skipped(`Nothing to claim, ${status.progress} activity points`);
    }
    const claims = [
      completed.length ? `${completed.length} missions` : "",
      chests.length
        ? `the ${chests.join(", ")} chest${chests.length > 1 ? "s" : ""}`
        : "",
    ].filter(Boolean);
    return done(`Claimed ${claims.join(" and ")}`);
  },
};

export const weeklyChallengeTask: DailyTask = {
  id: "weeklyChallenge",
  label: "Claim weekly challenge",
  isRepeatable: true,
  run: async ({ csrfToken }) => {
    const { enabled, maxRewardId, rewards } =
      await WeeklyChallenge.sendDataRequest();
    if (!enabled) {
      return skipped("No weekly challenge right now");
    }
    const waiting = [...rewards.normal, ...rewards.extra].filter(
      (reward) => reward.status === "completed",
    ).length;
    if (!waiting) {
      return skipped("Nothing to claim");
    }

    const response = await WeeklyChallenge.sendCollectAllRequest({
      _token: csrfToken,
      maxRewardId,
    });
    if (response.error) {
      throw new Error(response.message);
    }
    return done(`Claimed ${waiting} reward${waiting > 1 ? "s" : ""}`);
  },
};

/** In the order they run, so that the challenges get claimed after the rest is done. */
export const DAILY_TASKS: DailyTask[] = [
  vipTask,
  workTask,
  productionTask,
  trainTask,
  overtimeTask,
  goldTask,
  challengeTask,
  weeklyChallengeTask,
];
