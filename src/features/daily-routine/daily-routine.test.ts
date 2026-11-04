import { beforeEach, describe, expect, it, vi } from "vitest";
import { DailyRoutine, type DailyRoutineDeps } from "./daily-routine";
import { DEFAULT_SETTINGS, SETTINGS_KEY } from "./settings";
import { BotCheckError, DAILY_TASKS, type TaskOutcome } from "./tasks";

vi.mock("../../utils/utils", async (importOriginal) => ({
  ...(await importOriginal()),
  log: vi.fn(),
  error: vi.fn(),
}));

const HOUR_MS = 60 * 60 * 1000;

function createDeps(changes: Partial<DailyRoutineDeps> = {}) {
  let now = Date.parse("2026-11-03T01:00:00Z");
  return {
    getEDay: () => 6922,
    getCsrfToken: () => "token",
    getCurrency: () => "PLN",
    isSessionValidationPending: () => false,
    now: () => now,
    advance: (ms: number) => {
      now += ms;
    },
    sleep: () => Promise.resolve(),
    ...changes,
  };
}

/** Replaces every task's run with one that finishes with `outcome`. */
function stubTasks(outcome: (id: string) => TaskOutcome) {
  return Object.fromEntries(
    DAILY_TASKS.map((task) => [
      task.id,
      vi
        .spyOn(task, "run")
        .mockImplementation(() => Promise.resolve(outcome(task.id))),
    ]),
  );
}

function saveSettings(changes: Partial<typeof DEFAULT_SETTINGS>) {
  localStorage.setItem(
    `STUFF_UNLOCKED.${SETTINGS_KEY}`,
    JSON.stringify({ ...DEFAULT_SETTINGS, ...changes }),
  );
}

describe("DailyRoutine", () => {
  beforeEach(() => {
    localStorage.clear();
  });

  it("runs every task turned on and keeps the results", async () => {
    const runs = stubTasks(() => ({ status: "done", message: "ok" }));
    saveSettings({ tasks: { ...DEFAULT_SETTINGS.tasks, gold: false } });
    const routine = new DailyRoutine(createDeps());

    await routine.run();

    expect(runs.gold).not.toHaveBeenCalled();
    expect(runs.work).toHaveBeenCalledTimes(1);
    expect(routine.results.get().work).toEqual({
      status: "done",
      message: "ok",
      eDay: 6922,
    });
    expect(routine.isRunning.get()).toBe(false);
  });

  it("skips tasks done today, except the repeatable ones", async () => {
    const runs = stubTasks(() => ({ status: "done", message: "ok" }));
    const routine = new DailyRoutine(createDeps());

    await routine.run();
    await routine.run();

    expect(runs.work).toHaveBeenCalledTimes(1);
    expect(runs.overtime).toHaveBeenCalledTimes(2);
    expect(runs.challenge).toHaveBeenCalledTimes(2);
  });

  it("keeps a repeatable task done when it has nothing more to do", async () => {
    const runs = stubTasks(() => ({ status: "done", message: "ok" }));
    const routine = new DailyRoutine(createDeps());

    await routine.run();
    runs.challenge.mockResolvedValue({
      status: "skipped",
      message: "Nothing to claim",
    });
    await routine.run();

    expect(routine.results.get().challenge).toMatchObject({
      status: "done",
      message: "Nothing to claim",
    });
  });

  it("doesn't count yesterday's work towards a skipped task", async () => {
    let eDay = 6922;
    const runs = stubTasks(() => ({ status: "done", message: "ok" }));
    const routine = new DailyRoutine(createDeps({ getEDay: () => eDay }));

    await routine.run();
    eDay++;
    runs.challenge.mockResolvedValue({
      status: "skipped",
      message: "Nothing to claim",
    });
    await routine.run();

    expect(routine.results.get().challenge?.status).toBe("skipped");
  });

  it("retries a failed task and runs a done one again the next day", async () => {
    let eDay = 6922;
    const runs = stubTasks((id) =>
      id === "vip"
        ? { status: "failed", message: "oops" }
        : { status: "done", message: "ok" },
    );
    const routine = new DailyRoutine(createDeps({ getEDay: () => eDay }));

    await routine.run();
    await routine.run();
    expect(runs.vip).toHaveBeenCalledTimes(2);
    expect(runs.work).toHaveBeenCalledTimes(1);

    eDay++;
    await routine.run();
    expect(runs.work).toHaveBeenCalledTimes(2);
  });

  it("turns a thrown error into a failed result and goes on", async () => {
    const runs = stubTasks(() => ({ status: "done", message: "ok" }));
    runs.work.mockRejectedValue(new Error("Not enough energy"));
    const routine = new DailyRoutine(createDeps());

    await routine.run();

    expect(routine.results.get().work).toMatchObject({
      status: "failed",
      message: "Not enough energy",
    });
    expect(runs.train).toHaveBeenCalled();
  });

  it("stops when the game refuses with a bot check", async () => {
    const runs = stubTasks(() => ({ status: "done", message: "ok" }));
    runs.work.mockRejectedValue(new BotCheckError());
    const routine = new DailyRoutine(createDeps());

    await routine.run();

    expect(routine.results.get().work?.status).toBe("failed");
    expect(runs.train).not.toHaveBeenCalled();
    expect(runs.gold).not.toHaveBeenCalled();
    expect(routine.isRunning.get()).toBe(false);
  });

  it("stops while the game wants a bot check", async () => {
    const runs = stubTasks(() => ({ status: "done", message: "ok" }));
    const routine = new DailyRoutine(
      createDeps({ isSessionValidationPending: () => true }),
    );

    await routine.run();

    expect(runs.vip).not.toHaveBeenCalled();
    expect(routine.results.get().vip?.status).toBe("failed");
    expect(routine.results.get().work).toBeUndefined();
  });

  it("doesn't run while another tab runs it", async () => {
    const runs = stubTasks(() => ({ status: "done", message: "ok" }));
    const deps = createDeps();
    localStorage.setItem(
      "STUFF_UNLOCKED.DailyRoutine.lock",
      String(deps.now()),
    );

    await new DailyRoutine(deps).run();

    expect(runs.vip).not.toHaveBeenCalled();
  });

  it("counts the gold bought today across runs", async () => {
    const runs = stubTasks(() => ({ status: "done", message: "ok" }));
    runs.gold.mockImplementation((context) => {
      context.onGoldBought(4);
      return Promise.resolve({ status: "failed", message: "limit" });
    });
    const routine = new DailyRoutine(createDeps());

    await routine.run();
    await routine.run();

    expect(runs.gold.mock.calls[1][0].goldBoughtToday).toBe(4);
  });

  describe("runIfDue", () => {
    it("runs everything once a day, then only overtime when it is due", async () => {
      const runs = stubTasks((id) =>
        id === "overtime"
          ? { status: "done", message: "ok", retryAt: deps.now() + HOUR_MS }
          : { status: "done", message: "ok" },
      );
      const deps = createDeps();
      const routine = new DailyRoutine(deps);

      await routine.runIfDue();
      expect(runs.work).toHaveBeenCalledTimes(1);
      expect(runs.overtime).toHaveBeenCalledTimes(1);

      await routine.runIfDue();
      expect(runs.overtime).toHaveBeenCalledTimes(1);

      deps.advance(HOUR_MS);
      await routine.runIfDue();
      expect(runs.overtime).toHaveBeenCalledTimes(2);
      expect(runs.challenge).toHaveBeenCalledTimes(2);
      expect(runs.work).toHaveBeenCalledTimes(1);
    });

    it("doesn't claim the challenge when overtime had nothing to do", async () => {
      const deps = createDeps();
      const runs = stubTasks((id) =>
        id === "overtime"
          ? { status: "done", message: "ok", retryAt: deps.now() + HOUR_MS }
          : { status: "done", message: "ok" },
      );
      const routine = new DailyRoutine(deps);
      await routine.runIfDue();

      deps.advance(HOUR_MS);
      runs.overtime.mockResolvedValue({
        status: "skipped",
        message: "Next one later",
        retryAt: deps.now() + 2 * HOUR_MS,
      });
      await routine.runIfDue();

      expect(runs.overtime).toHaveBeenCalledTimes(2);
      expect(runs.challenge).toHaveBeenCalledTimes(1);
    });

    it("runs the rest once a bot check that ended the first run passes", async () => {
      let isPending = true;
      const runs = stubTasks(() => ({ status: "done", message: "ok" }));
      const routine = new DailyRoutine(
        createDeps({ isSessionValidationPending: () => isPending }),
      );

      await routine.runIfDue();
      expect(runs.vip).not.toHaveBeenCalled();

      isPending = false;
      await routine.runIfDue();
      expect(runs.vip).toHaveBeenCalledTimes(1);
      expect(runs.gold).toHaveBeenCalledTimes(1);
      expect(routine.results.get().vip?.status).toBe("done");
    });

    it("runs the tasks a closed tab didn't get to", async () => {
      const runs = stubTasks(() => ({ status: "done", message: "ok" }));
      const routine = new DailyRoutine(createDeps());
      localStorage.setItem(
        "STUFF_UNLOCKED.DailyRoutine.state",
        JSON.stringify({
          lastAutomaticRunEDay: 6922,
          results: { vip: { status: "done", message: "ok", eDay: 6922 } },
        }),
      );

      await routine.runIfDue();

      expect(runs.vip).not.toHaveBeenCalled();
      expect(runs.work).toHaveBeenCalledTimes(1);
    });

    it("tries a failed task again, but not right away", async () => {
      const deps = createDeps();
      const runs = stubTasks(() => ({ status: "done", message: "ok" }));
      runs.work.mockRejectedValueOnce(new Error("Network"));
      const routine = new DailyRoutine(deps);

      await routine.runIfDue();
      await routine.runIfDue();
      expect(runs.work).toHaveBeenCalledTimes(1);

      deps.advance(HOUR_MS);
      await routine.runIfDue();
      expect(runs.work).toHaveBeenCalledTimes(2);
      expect(routine.results.get().work?.status).toBe("done");
    });

    it("leaves alone what is done or skipped for good", async () => {
      const deps = createDeps();
      const runs = stubTasks((id) =>
        id === "train"
          ? { status: "skipped", message: "You have no training grounds" }
          : { status: "done", message: "ok" },
      );
      const routine = new DailyRoutine(deps);

      await routine.runIfDue();
      deps.advance(HOUR_MS);
      await routine.runIfDue();

      expect(runs.train).toHaveBeenCalledTimes(1);
      expect(runs.work).toHaveBeenCalledTimes(1);
    });

    it("leaves alone a task that was turned off", async () => {
      const runs = stubTasks(() => ({ status: "done", message: "ok" }));
      saveSettings({ tasks: { ...DEFAULT_SETTINGS.tasks, gold: false } });
      const routine = new DailyRoutine(createDeps());

      await routine.runIfDue();
      await routine.runIfDue();

      expect(runs.gold).not.toHaveBeenCalled();
    });
  });
});
