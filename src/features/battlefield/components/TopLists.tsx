import { useEffect, useState } from "react";
import styles from "./TopLists.module.scss";
import * as BattleConsole from "../../../requests/battle-console-request";
import { getCsrfToken } from "../../../utils/erep-global-info";
import { error } from "../../../utils/utils";
import { formatDamage, isZoneDecided } from "../battlefield";

const REFRESH_INTERVAL_MS = 30_000;

interface TopListsProps {
  battleZoneId: number;
  leftCountryId: number;
  rightCountryId: number;
}

/** Each side's top damage dealers, refreshed until the zone is decided. */
export const TopLists = ({
  battleZoneId,
  leftCountryId,
  rightCountryId,
}: TopListsProps) => {
  const [statistics, setStatistics] =
    useState<BattleConsole.BattleStatisticsResponse>();

  useEffect(() => {
    let isCancelled = false;
    const refresh = () =>
      BattleConsole.sendBattleStatisticsRequest({
        _token: getCsrfToken(),
        battleZoneId,
      })
        .then((response) => {
          if (!isCancelled) {
            setStatistics(response);
          }
        })
        .catch((e) => error("Failed to load the top lists", e));

    void refresh();
    const intervalId = window.setInterval(() => {
      if (!isZoneDecided(SERVER_DATA.points)) {
        void refresh();
      }
    }, REFRESH_INTERVAL_MS);
    return () => {
      isCancelled = true;
      window.clearInterval(intervalId);
    };
  }, [battleZoneId]);

  if (!statistics) {
    return null;
  }

  return (
    <>
      <TopList
        className={styles.Left}
        fighters={BattleConsole.findTopFighters(statistics, leftCountryId)}
      />
      <TopList
        className={styles.Right}
        fighters={BattleConsole.findTopFighters(statistics, rightCountryId)}
      />
    </>
  );
};

const TopList = ({
  className,
  fighters,
}: {
  className: string;
  fighters: BattleConsole.Fighter[];
}) => (
  <div className={`${styles.TopList} ${className}`}>
    {fighters.map((fighter) => (
      <a
        key={fighter.citizenId}
        className={styles.Fighter}
        href={`/en/citizen/profile/${fighter.citizenId}`}
      >
        <span className={styles.Name}>{fighter.citizenName}</span>
        <span className={styles.Damage}>
          {formatDamage(Number(fighter.raw_value))}
        </span>
      </a>
    ))}
  </div>
);
