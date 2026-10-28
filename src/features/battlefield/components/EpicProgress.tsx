import { useEffect, useState } from "react";
import styles from "./EpicProgress.module.scss";
import * as BattleConsole from "../../../requests/battle-console-request";
import { getCsrfToken } from "../../../utils/erep-global-info";
import { error } from "../../../utils/utils";
import { isZoneDecided } from "../battlefield";

const POLL_INTERVAL_MS = 65_000;

interface EpicProgressProps {
  battleId: number;
  zoneId: number;
  division: number;
}

/** Polls the epic battle progress of the division while it is checked. */
export const EpicProgress = ({
  battleId,
  zoneId,
  division,
}: EpicProgressProps) => {
  const [isPolling, setIsPolling] = useState(false);
  const [progress, setProgress] = useState<number>();

  useEffect(() => {
    if (!isPolling) {
      return;
    }
    let isCancelled = false;
    const poll = async () => {
      const response = await BattleConsole.sendBattleConsoleRequest({
        _token: getCsrfToken(),
        battleId,
        zoneId,
      });
      if (isCancelled) {
        return;
      }
      const newProgress = BattleConsole.findEpicProgress(response, division);
      setProgress(newProgress);
      if (newProgress === 100 || isZoneDecided(SERVER_DATA.points)) {
        setIsPolling(false);
      }
    };
    const pollSafely = () => {
      poll().catch((e) => error("Failed to check the epic progress", e));
    };

    pollSafely();
    const intervalId = window.setInterval(pollSafely, POLL_INTERVAL_MS);
    return () => {
      isCancelled = true;
      window.clearInterval(intervalId);
    };
  }, [isPolling, battleId, zoneId, division]);

  return (
    <label className={styles.EpicProgress}>
      <input
        type="checkbox"
        checked={isPolling}
        onChange={(event) => setIsPolling(event.target.checked)}
      />
      Epic progress <span>{progress}</span>%
    </label>
  );
};
