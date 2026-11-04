import { ExternalProperty } from "../../hooks/external-property";
import { readLocalStorage, writeLocalStorage } from "../../hooks/storage";
import { log, toError } from "../../utils/utils";
import { readSettings, type DailyTaskId } from "./settings";
import {
  BotCheckError,
  DAILY_TASKS,
  type DailyTask,
  type TaskOutcome,
} from "./tasks";

const STATE_KEY = "DailyRoutine.state";
/** Keeps two tabs from running the routine at the same time. */
const LOCK_KEY = "DailyRoutine.lock";
/** A lock older than this was left by a tab closed mid-run. */
const LOCK_TTL_MS = 3 * 60 * 1000;
const TASK_DELAY_MS = 800;
/** Keeps the automatic run from asking the game over and over when a task fails. */
const FAILED_RETRY_MS = 30 * 60 * 1000;

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
  getCitizenId: () => number;
  getCsrfToken: () => string;
  getCurrency: () => string;
  /** The game wants the player to prove they are not a bot. */
  isSessionValidationPending: () => boolean;
  now: () => number;
  sleep: (ms: number) => Promise<unknown>;
}

export class DailyRoutine {
  readonly isRunning = new ExternalProperty(false);
  readonly results: ExternalProperty<TaskResults>;
  private readonly deps: DailyRoutineDeps;

  constructor(deps: DailyRoutineDeps) {
    this.deps = deps;
    this.results = new ExternalProperty<TaskResults>(this.readState().results);
  }

  /** Runs the tasks turned on in the settings, skipping the ones already done today. */
  async run(
    taskIds: readonly DailyTaskId[] = DAILY_TASKS.map((t) => t.id),
  ): Promise<Partial<Record<DailyTaskId, TaskOutcome>>> {
    const outcomes: Partial<Record<DailyTaskId, TaskOutcome>> = {};
    if (this.isRunning.get() || !this.acquireLock()) {
      return outcomes;
    }
    this.isRunning.update(true);
    try {
      const settings = readSettings();
      const eDay = this.deps.getEDay();
      for (const task of DAILY_TASKS) {
        if (!taskIds.includes(task.id) || !settings.tasks[task.id]) {
          continue;
        }
        const previous = this.readState().results[task.id];
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

        const { outcome, isBotCheck } = await this.runTask(task, eDay);
        log(`Daily routine: ${task.label}: ${outcome.message}`);
        this.saveResult(task.id, eDay, outcome);
        outcomes[task.id] = outcome;
        if (isBotCheck) {
          break;
        }
        await this.deps.sleep(TASK_DELAY_MS);
      }
    } finally {
      this.releaseLock();
      this.isRunning.update(false);
    }
    return outcomes;
  }

  /**
   * The whole routine once a game day, then whatever it didn't finish and
   * overtime whenever it can be worked again, followed by the challenge
   * overtime completes.
   */
  async runIfDue() {
    const eDay = this.deps.getEDay();
    const state = this.readState();
    if (state.lastAutomaticRunEDay !== eDay) {
      this.writeState({ ...state, lastAutomaticRunEDay: eDay });
      await this.run();
      return;
    }

    const { tasks } = readSettings();
    const dueIds = DAILY_TASKS.filter(
      (task) => tasks[task.id] && this.isDue(state.results[task.id], eDay),
    ).map((task) => task.id);
    if (!dueIds.length) {
      return;
    }
    const outcomes = await this.run(dueIds);
    if (outcomes.overtime?.status === "done") {
      await this.run(["challenge"]);
    }
  }

  /** Not reached today, as when a bot check or a closed tab ended the run early, or failed, or asked to be tried again. */
  private isDue(result: TaskResult | undefined, eDay: number): boolean {
    if (result?.eDay !== eDay) {
      return true;
    }
    return result.retryAt !== undefined
      ? result.retryAt <= this.deps.now()
      : result.status === "failed";
  }

  private async runTask(
    task: DailyTask,
    eDay: number,
  ): Promise<{ outcome: TaskOutcome; isBotCheck?: boolean }> {
    const goldBought = this.readState().goldBought;
    try {
      const outcome = await task.run({
        csrfToken: this.deps.getCsrfToken(),
        settings: readSettings(),
        currency: this.deps.getCurrency(),
        goldBoughtToday: goldBought?.eDay === eDay ? goldBought.amount : 0,
        onGoldBought: (amount) => {
          const current = this.readState().goldBought;
          const previous = current?.eDay === eDay ? current.amount : 0;
          this.writeState({
            ...this.readState(),
            goldBought: { eDay, amount: previous + amount },
          });
        },
        now: this.deps.now,
        sleep: this.deps.sleep,
      });
      return { outcome };
    } catch (e) {
      return {
        outcome: {
          status: "failed",
          message: toError(e).message,
          retryAt: this.deps.now() + FAILED_RETRY_MS,
        },
        isBotCheck: e instanceof BotCheckError,
      };
    }
  }

  private saveResult(taskId: DailyTaskId, eDay: number, outcome: TaskOutcome) {
    const state = this.readState();
    const previous = state.results[taskId];
    // A repeatable task with nothing more to do today is still done
    const status =
      outcome.status === "skipped" &&
      previous?.status === "done" &&
      previous.eDay === eDay
        ? "done"
        : outcome.status;
    const results = {
      ...state.results,
      [taskId]: { ...outcome, status, eDay },
    };
    this.writeState({ ...state, results });
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

  /** Kept for each citizen, as a browser can log in to more than one. */
  private get stateKey() {
    return `${STATE_KEY}.${this.deps.getCitizenId()}`;
  }

  private readState(): RoutineState {
    return readLocalStorage<RoutineState>(this.stateKey, { results: {} });
  }

  private writeState(state: RoutineState) {
    writeLocalStorage(this.stateKey, state);
  }
}
