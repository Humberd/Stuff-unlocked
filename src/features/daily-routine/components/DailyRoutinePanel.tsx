import React from "react";
import classNames from "classnames";
import styles from "./DailyRoutinePanel.module.scss";
import { Button } from "../../../common-components/button/Button";
import { useLocalStorage } from "../../../hooks/storage";
import { useExternalProperty } from "../../../hooks/external-property";
import {
  readSettings,
  SETTINGS_KEY,
  type DailyRoutineSettings,
  type DailyTaskId,
} from "../settings";
import { DAILY_TASKS } from "../tasks";
import type { DailyRoutine } from "../daily-routine";

interface DailyRoutinePanelProps {
  routine: DailyRoutine;
  getEDay: () => number;
}

export const DailyRoutinePanel: React.FC<DailyRoutinePanelProps> = ({
  routine,
  getEDay,
}) => {
  const [settings, setSettings] = useLocalStorage<DailyRoutineSettings>(
    SETTINGS_KEY,
    readSettings(),
  );
  const [isExpanded, setIsExpanded] = useLocalStorage(
    "DailyRoutine.isExpanded",
    true,
  );
  const isRunning = useExternalProperty(routine.isRunning);
  const results = useExternalProperty(routine.results);
  const eDay = getEDay();

  const updateSettings = (changes: Partial<DailyRoutineSettings>) =>
    setSettings((current) => ({ ...current, ...changes }));
  const setTaskEnabled = (id: DailyTaskId, isEnabled: boolean) =>
    setSettings((current) => ({
      ...current,
      tasks: { ...current.tasks, [id]: isEnabled },
    }));

  const enabledTasks = DAILY_TASKS.filter((task) => settings.tasks[task.id]);
  const doneCount = enabledTasks.filter(
    (task) =>
      results[task.id]?.eDay === eDay && results[task.id]?.status === "done",
  ).length;

  return (
    <div className={styles.Panel}>
      <div className={styles.Header} onClick={() => setIsExpanded(!isExpanded)}>
        <strong>Daily routine</strong>
        <span>
          {isRunning ? "Running…" : `${doneCount}/${enabledTasks.length} done`}
        </span>
      </div>
      {isExpanded && (
        <>
          <ul className={styles.Tasks}>
            {DAILY_TASKS.map((task) => {
              const result = results[task.id];
              const todayResult = result?.eDay === eDay ? result : undefined;
              return (
                <li key={task.id}>
                  <label className={styles.Task}>
                    <input
                      type="checkbox"
                      checked={settings.tasks[task.id]}
                      onChange={(e) =>
                        setTaskEnabled(task.id, e.target.checked)
                      }
                    />
                    {task.label}
                  </label>
                  {todayResult && settings.tasks[task.id] && (
                    <div
                      className={classNames(
                        styles.Result,
                        styles[todayResult.status],
                      )}
                    >
                      {todayResult.message}
                    </div>
                  )}
                </li>
              );
            })}
          </ul>

          <div className={styles.Options}>
            <label className={styles.Option}>
              <input
                type="checkbox"
                checked={settings.trainOnPaidGrounds}
                onChange={(e) =>
                  updateSettings({ trainOnPaidGrounds: e.target.checked })
                }
              />
              Train on grounds that cost gold
            </label>
            <label className={styles.Option}>
              Gold to buy
              <input
                className={styles.Input}
                type="number"
                min={0}
                step={1}
                value={settings.goldAmount}
                onChange={(e) => updateSettings({ goldAmount: e.target.value })}
              />
            </label>
            <label className={styles.Option}>
              Max price per gold
              <input
                className={styles.Input}
                type="number"
                min={0}
                placeholder="any"
                value={settings.maxGoldPrice}
                onChange={(e) =>
                  updateSettings({ maxGoldPrice: e.target.value })
                }
              />
            </label>
            <label className={styles.Option}>
              <input
                type="checkbox"
                checked={settings.isAutomatic}
                onChange={(e) =>
                  updateSettings({ isAutomatic: e.target.checked })
                }
              />
              Run by itself every day
            </label>
          </div>

          <div className={styles.Buttons}>
            <Button
              size="small"
              disabled={isRunning}
              onClick={() => void routine.run()}
            >
              {isRunning ? "Running…" : "Run now"}
            </Button>
          </div>
        </>
      )}
    </div>
  );
};
