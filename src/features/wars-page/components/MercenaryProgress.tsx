import React from "react";
import styles from "./MercenaryProgress.module.scss";
import type { MountOptions } from "../../../utils/render";
import { MERCENARY_KILLS_PER_COUNTRY } from "../../../requests/citizen-profile-personal-request";
import {
  type CardProgress,
  DONE_COLOR,
  IN_PROGRESS_COLOR,
  progressColor,
} from "../mercenary-progress";

export const cardProgressMountOptions: MountOptions = {
  position: "append",
  className: styles.Card,
};

export const summaryMountOptions: MountOptions = {
  position: "append",
  className: styles.Summary,
};

/** Kills of a battle's card: Mercenary of both sides, Freedom Fighter between them. */
export const CardProgressBadges: React.FC<{
  progress: CardProgress;
  /** Kills needed per region for the Freedom Fighter medal. */
  freedomFighterKillsNeeded: number;
}> = ({ progress, freedomFighterKillsNeeded }) => (
  <>
    <MercenaryBadge
      className={styles.Invader}
      kills={progress.invaderMercenaryKills}
    />
    {progress.freedomFighterKills !== undefined && (
      <span
        className={styles.FreedomFighter}
        title="Freedom Fighter kills"
        style={{
          background: progressColor(
            progress.freedomFighterKills,
            freedomFighterKillsNeeded,
          ),
        }}
      >
        {progress.freedomFighterKills} / {freedomFighterKillsNeeded}
      </span>
    )}
    <MercenaryBadge
      className={styles.Defender}
      kills={progress.defenderMercenaryKills}
    />
  </>
);

const MercenaryBadge: React.FC<{ className: string; kills: number }> = ({
  className,
  kills,
}) => (
  <span
    className={className}
    title="Mercenary kills"
    style={{ background: progressColor(kills, MERCENARY_KILLS_PER_COUNTRY) }}
  >
    {kills}
  </span>
);

export const ProgressSummary: React.FC<{
  mercenary: { current: number; max: number; killsNeeded: number };
  freedomFighter: {
    regions: number;
    regionsNeeded: number;
    killsPerRegion: number;
    killsNeeded: number;
  };
}> = ({ mercenary, freedomFighter }) => (
  <>
    <span
      style={{ background: IN_PROGRESS_COLOR }}
      title={`${mercenary.killsNeeded} kills needed`}
    >
      Merc {mercenary.current}/{mercenary.max}
    </span>
    <span
      style={{ background: DONE_COLOR }}
      title={`${freedomFighter.killsNeeded} kills needed`}
    >
      FF {freedomFighter.regions}/{freedomFighter.regionsNeeded} (x
      {freedomFighter.killsPerRegion})
    </span>
  </>
);
