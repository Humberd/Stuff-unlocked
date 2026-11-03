import { ExternalProperty } from "../../hooks/external-property";
import { readLocalStorage, writeLocalStorage } from "../../hooks/storage";
import { log, toError } from "../../utils/utils";
import { readSettings, type DailyTaskId } from "./settings";
import { DAILY_TASKS, type DailyTask, type TaskOutcome } from "./tasks";

const STATE_KEY = "DailyRoutine.state";
/** Keeps two tabs from running the routine at the same time. */
const LOCK_KEY = "DailyRoutine.lock";
/** A lock older than this was left by a tab closed mid-run. */
const LOCK_TTL_MS = 3 * 60 * 1000;
const TASK_DELAY_MS = 800;

export interface TaskResult extends TaskOutcome {
  eDay: number;
}

export type TaskResults = Partial<Record<DailyTaskId, TaskResult>>;

interface RoutineState {
  results: TaskResults;
  lastAutomaticRunEDay?: number;
  goldBought?: { eDay: number; amount: number };
}

export interface DailyRoutineDeps {
  getEDay: () => number;
  getCsrfToken: () => string;
  getCurrency: () => string;
  /** The game wants the player to prove they are not a bot. */
  isSessionValidationPending: () => boolean;
  now: () => number;
  sleep: (ms: number) => Promise<unknown>;
}

export class DailyRoutine {
  readonly isRunning = new ExternalProperty(false);
  readonly results = new ExternalProperty<TaskResults>(readState().results);
  private readonly deps: DailyRoutineDeps;

  constructor(deps: DailyRoutineDeps) {
    this.deps = deps;
  }

  /** Runs the tasks turned on in the settings, skipping the ones already done today. */
  async run(taskIds: readonly DailyTaskId[] = DAILY_TASKS.map((t) => t.id)) {
    if (this.isRunning.get() || !this.acquireLock()) {
      return;
    }
    this.isRunning.update(true);
    try {
      const settings = readSettings();
      const eDay = this.deps.getEDay();
      for (const task of DAILY_TASKS) {
        if (!taskIds.includes(task.id) || !settings.tasks[task.id]) {
          continue;
        }
        const previous = readState().results[task.id];
        if (
          !task.isRepeatable &&
          previous?.status === "done" &&
          previous.eDay === eDay
        ) {
          continue;
        }
        if (this.deps.isSessionValidationPending()) {
          this.saveResult(task.id, eDay, {
            status: "failed",
            message: "The game wants you to prove you are not a bot",
          });
          break;
        }

        const outcome = await this.runTask(task, eDay);
        log(`Daily routine: ${task.label}: ${outcome.message}`);
        this.saveResult(task.id, eDay, outcome);
        await this.deps.sleep(TASK_DELAY_MS);
      }
    } finally {
      this.releaseLock();
      this.isRunning.update(false);
    }
  }

  /**
   * The whole routine once a game day, and overtime whenever it can be
   * worked again, followed by the challenge it completes.
   */
  async runIfDue() {
    const eDay = this.deps.getEDay();
    const state = readState();
    if (state.lastAutomaticRunEDay !== eDay) {
      writeState({ ...state, lastAutomaticRunEDay: eDay });
      await this.run();
      return;
    }

    const overtime = state.results.overtime;
    const isOvertimeWaiting =
      overtime?.eDay === eDay && (overtime.retryAt ?? 0) > this.deps.now();
    if (!readSettings().tasks.overtime || isOvertimeWaiting) {
      return;
    }
    await this.run(["overtime"]);
    if (readState().results.overtime?.status === "done") {
      await this.run(["challenge"]);
    }
  }

  private async runTask(task: DailyTask, eDay: number): Promise<TaskOutcome> {
    const goldBought = readState().goldBought;
    try {
      return await task.run({
        csrfToken: this.deps.getCsrfToken(),
        settings: readSettings(),
        currency: this.deps.getCurrency(),
        goldBoughtToday: goldBought?.eDay === eDay ? goldBought.amount : 0,
        onGoldBought: (amount) => {
          const current = readState().goldBought;
          const previous = current?.eDay === eDay ? current.amount : 0;
          writeState({
            ...readState(),
            goldBought: { eDay, amount: previous + amount },
          });
        },
        now: this.deps.now,
        sleep: this.deps.sleep,
      });
    } catch (e) {
      return { status: "failed", message: toError(e).message };
    }
  }

  private saveResult(taskId: DailyTaskId, eDay: number, outcome: TaskOutcome) {
    const state = readState();
    const results = { ...state.results, [taskId]: { ...outcome, eDay } };
    writeState({ ...state, results });
    this.results.update(results);
  }

  private acquireLock(): boolean {
    const now = this.deps.now();
    if (now - readLocalStorage(LOCK_KEY, 0) < LOCK_TTL_MS) {
      return false;
    }
    writeLocalStorage(LOCK_KEY, now);
    return true;
  }

  private releaseLock() {
    writeLocalStorage(LOCK_KEY, 0);
  }
}

function readState(): RoutineState {
  return readLocalStorage<RoutineState>(STATE_KEY, { results: {} });
}

function writeState(state: RoutineState) {
  writeLocalStorage(STATE_KEY, state);
}
