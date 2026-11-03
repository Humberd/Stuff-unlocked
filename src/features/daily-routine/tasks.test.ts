import { beforeEach, describe, expect, it, vi } from "vitest";
import * as JobData from "../../requests/job-data-request";
import * as Work from "../../requests/work-request";
import * as WorkOvertime from "../../requests/work-overtime-request";
import * as MyCompaniesHtml from "../../requests/my-companies-html-request";
import * as TrainingGrounds from "../../requests/training-grounds-json-request";
import * as Train from "../../requests/train-request";
import * as GoldOffers from "../../requests/gold-exchange-offers-request";
import * as GoldPurchase from "../../requests/gold-exchange-purchase-request";
import * as DailyMissions from "../../requests/daily-missions-request";
import { DEFAULT_SETTINGS } from "./settings";
import {
  challengeTask,
  goldTask,
  overtimeTask,
  productionTask,
  type TaskContext,
  trainTask,
  workTask,
} from "./tasks";

vi.mock("../../requests/job-data-request");
vi.mock("../../requests/work-request");
vi.mock("../../requests/work-overtime-request");
vi.mock("../../requests/my-companies-html-request");
vi.mock("../../requests/training-grounds-json-request");
vi.mock("../../requests/train-request");
vi.mock(
  "../../requests/gold-exchange-offers-request",
  async (importOriginal) => ({
    ...(await importOriginal()),
    sendRequest: vi.fn(),
    parseOffers: vi.fn(),
  }),
);
vi.mock("../../requests/gold-exchange-purchase-request");
vi.mock("../../requests/daily-missions-request");

const NOW = Date.parse("2026-11-03T01:00:00Z");

function createContext(changes: Partial<TaskContext> = {}): TaskContext {
  return {
    csrfToken: "token",
    settings: DEFAULT_SETTINGS,
    currency: "PLN",
    goldBoughtToday: 0,
    onGoldBought: vi.fn(),
    now: () => NOW,
    sleep: () => Promise.resolve(),
    ...changes,
  };
}

function jobData(changes: Partial<JobData.Response> = {}): JobData.Response {
  return {
    isEmployee: true,
    alreadyWorked: false,
    salary: 7750,
    currency: "PLN",
    overTime: { points: 115, nextOverTime: 0 },
    ...changes,
  };
}

beforeEach(() => {
  vi.mocked(Work.sendRequest).mockResolvedValue({
    status: true,
    message: true,
  });
  vi.mocked(WorkOvertime.sendRequest).mockResolvedValue({
    status: true,
    message: true,
  });
});

describe("workTask", () => {
  it("works when not worked yet", async () => {
    vi.mocked(JobData.sendRequest).mockResolvedValue(jobData());

    expect(await workTask.run(createContext())).toEqual({
      status: "done",
      message: "Earned 7,750 PLN",
    });
    expect(Work.sendRequest).toHaveBeenCalledWith({
      _token: "token",
      action_type: "work",
    });
  });

  it("does nothing when already worked", async () => {
    vi.mocked(JobData.sendRequest).mockResolvedValue(
      jobData({ alreadyWorked: true }),
    );

    expect((await workTask.run(createContext())).message).toBe(
      "Already worked",
    );
    expect(Work.sendRequest).not.toHaveBeenCalled();
  });

  it("fails with the game's message when it refuses", async () => {
    vi.mocked(JobData.sendRequest).mockResolvedValue(jobData());
    vi.mocked(Work.sendRequest).mockResolvedValue({
      status: false,
      message: "captcha",
    });

    await expect(workTask.run(createContext())).rejects.toThrow("captcha");
  });
});

describe("productionTask", () => {
  it("works in the companies not worked yet, as many as the energy allows", async () => {
    vi.mocked(MyCompaniesHtml.sendRequest).mockResolvedValue("");
    vi.mocked(MyCompaniesHtml.parseMyCompanies).mockReturnValue({
      companies: [
        { id: 1, can_work_as_manager: true, already_worked: true },
        { id: 2, can_work_as_manager: true, already_worked: false },
        { id: 3, can_work_as_manager: false, already_worked: false },
        { id: 4, can_work_as_manager: true, already_worked: false },
        { id: 5, can_work_as_manager: true, already_worked: false },
      ],
      energy: 25,
    });
    vi.mocked(Work.sendRequest).mockResolvedValue({
      status: true,
      message: true,
      result: {
        production: {
          totalFood: 188,
          totalWeapon: 19,
          totalHouse: 0,
          totalAirplane: 0,
        },
      },
    });

    expect(await productionTask.run(createContext())).toEqual({
      status: "done",
      message: "Produced 188 food, 19 weapons, 1 left for lack of energy",
    });
    expect(Work.sendRequest).toHaveBeenCalledWith({
      _token: "token",
      action_type: "production",
      own_work: "[2,4]",
      employee_works: "{}",
      cntOwnWork: 2,
      cntEmployeeWork: 0,
      cntSelected: 2,
    });
  });

  it("does nothing when every company was worked in", async () => {
    vi.mocked(MyCompaniesHtml.sendRequest).mockResolvedValue("");
    vi.mocked(MyCompaniesHtml.parseMyCompanies).mockReturnValue({
      companies: [{ id: 1, can_work_as_manager: true, already_worked: true }],
      energy: 1000,
    });

    expect((await productionTask.run(createContext())).status).toBe("done");
    expect(Work.sendRequest).not.toHaveBeenCalled();
  });
});

describe("trainTask", () => {
  const grounds = [
    { id: 1, name: "Free", trained: false, effectiveCost: 0 },
    { id: 2, name: "Paid", trained: false, effectiveCost: 0.19 },
    { id: 3, name: "Done", trained: true, effectiveCost: 0 },
  ];

  it("trains on every ground not trained yet", async () => {
    vi.mocked(TrainingGrounds.sendRequest).mockResolvedValue({ grounds });
    vi.mocked(Train.sendRequest).mockResolvedValue({
      status: true,
      message: true,
      result: { strength_bonus: 90 },
    });

    expect((await trainTask.run(createContext())).message).toBe("+90 strength");
    expect(Train.sendRequest).toHaveBeenCalledWith("token", [1, 2]);
  });

  it("skips grounds that cost gold when told to", async () => {
    vi.mocked(TrainingGrounds.sendRequest).mockResolvedValue({ grounds });
    vi.mocked(Train.sendRequest).mockResolvedValue({
      status: true,
      message: true,
    });

    await trainTask.run(
      createContext({
        settings: { ...DEFAULT_SETTINGS, trainOnPaidGrounds: false },
      }),
    );

    expect(Train.sendRequest).toHaveBeenCalledWith("token", [1]);
  });
});

describe("overtimeTask", () => {
  it("works overtime when it has the points and no cooldown", async () => {
    vi.mocked(JobData.sendRequest).mockResolvedValue(jobData());

    expect(await overtimeTask.run(createContext())).toEqual({
      status: "done",
      message: "Worked, 91 points left",
      retryAt: NOW + 60 * 60 * 1000,
    });
  });

  it("waits for the cooldown", async () => {
    const nextOverTime = NOW / 1000 + 600;
    vi.mocked(JobData.sendRequest).mockResolvedValue(
      jobData({ overTime: { points: 115, nextOverTime } }),
    );

    const outcome = await overtimeTask.run(createContext());

    expect(outcome).toMatchObject({
      status: "skipped",
      retryAt: nextOverTime * 1000,
    });
    expect(WorkOvertime.sendRequest).not.toHaveBeenCalled();
  });

  it("waits for points", async () => {
    vi.mocked(JobData.sendRequest).mockResolvedValue(
      jobData({ overTime: { points: 20, nextOverTime: 0 } }),
    );

    expect((await overtimeTask.run(createContext())).message).toBe(
      "20/24 overtime points",
    );
    expect(WorkOvertime.sendRequest).not.toHaveBeenCalled();
  });
});

describe("goldTask", () => {
  beforeEach(() => {
    vi.mocked(GoldOffers.sendRequest).mockResolvedValue({});
    vi.mocked(GoldPurchase.sendRequest).mockResolvedValue({
      error: false,
      message: "",
    });
  });

  it("buys from the cheapest offers until it has enough", async () => {
    vi.mocked(GoldOffers.parseOffers).mockReturnValue([
      { id: 1, price: 1800, amount: 4.16 },
      { id: 2, price: 1804, amount: 100 },
    ]);
    const context = createContext({ goldBoughtToday: 2 });

    expect(await goldTask.run(context)).toEqual({
      status: "done",
      message: "Bought 8 gold for 14,415 PLN",
    });
    expect(
      vi
        .mocked(GoldPurchase.sendRequest)
        .mock.calls.map(([body]) => [body.offerId, body.amount]),
    ).toEqual([
      [1, 4.16],
      [2, 3.84],
    ]);
    expect(context.onGoldBought).toHaveBeenCalledTimes(2);
  });

  it("does not buy above the max price", async () => {
    vi.mocked(GoldOffers.parseOffers).mockReturnValue([
      { id: 1, price: 1900, amount: 100 },
    ]);

    const outcome = await goldTask.run(
      createContext({
        settings: { ...DEFAULT_SETTINGS, maxGoldPrice: "1850" },
      }),
    );

    expect(outcome.status).toBe("skipped");
    expect(GoldPurchase.sendRequest).not.toHaveBeenCalled();
  });

  it("does nothing once today's gold is bought", async () => {
    expect(
      (await goldTask.run(createContext({ goldBoughtToday: 10 }))).status,
    ).toBe("done");
    expect(GoldOffers.sendRequest).not.toHaveBeenCalled();
  });

  it("fails with the game's message", async () => {
    vi.mocked(GoldOffers.parseOffers).mockReturnValue([
      { id: 1, price: 1800, amount: 100 },
    ]);
    vi.mocked(GoldPurchase.sendRequest).mockResolvedValue({
      error: true,
      message: "You reached the daily limit",
    });

    await expect(goldTask.run(createContext())).rejects.toThrow(
      "You reached the daily limit",
    );
  });
});

describe("challengeTask", () => {
  it("claims completed missions and the chests the points reach", async () => {
    vi.mocked(DailyMissions.sendMissionsRequest).mockResolvedValue({
      missions: [
        { id: 1, title: "Work", progress: [{ completed: true }] },
        { id: 2, title: "Fight", progress: [{ completed: false }] },
        { id: 3, title: "Train", progress: [{ completed: true }] },
      ],
    });
    vi.mocked(DailyMissions.sendObjectiveStatusRequest).mockResolvedValue({
      status: {
        progress: 45,
        claimedObjectives: { "20": { claimed: true } },
      },
      data: { "20": {}, "40": {}, "60": {} },
    });

    expect(await challengeTask.run(createContext())).toEqual({
      status: "done",
      message: "Claimed 2 missions and the 40 chest",
    });
    expect(
      vi
        .mocked(DailyMissions.sendMissionSolveRequest)
        .mock.calls.map(([body]) => body.missionId),
    ).toEqual([1, 3]);
    expect(DailyMissions.sendObjectiveClaimRewardRequest).toHaveBeenCalledWith({
      _token: "token",
      objectiveCost: 40,
    });
  });

  it("reads an empty array as nothing claimed", async () => {
    vi.mocked(DailyMissions.sendMissionsRequest).mockResolvedValue({
      missions: [],
    });
    vi.mocked(DailyMissions.sendObjectiveStatusRequest).mockResolvedValue({
      status: { progress: 25, claimedObjectives: [] },
      data: { "20": {}, "40": {} },
    });

    expect((await challengeTask.run(createContext())).message).toBe(
      "Claimed the 20 chest",
    );
  });
});
