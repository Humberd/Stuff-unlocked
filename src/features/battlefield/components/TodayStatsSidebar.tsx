import styles from "./TodayStatsSidebar.module.scss";
import type { MountOptions } from "../../../utils/render";
import { useExternalProperty } from "../../../hooks/external-property";
import { formatNumber } from "../../../utils/format";
import { getEDay } from "../../../utils/erep-global-info";
import { resetTodayStats, todayStats } from "../today-stats";

export const todayStatsSidebarMountOptions: MountOptions = {
  className: styles.TodayStatsRoot,
};

export const TodayStatsSidebar = () => {
  const stats = useExternalProperty(todayStats);
  const lines = [
    stats.kills || stats.prestigePoints
      ? {
          label: "Kills | PP:",
          value: `${formatNumber(stats.kills)} | ${formatNumber(stats.prestigePoints)}`,
        }
      : undefined,
    stats.groundDamage
      ? { label: "Ground:", value: formatNumber(stats.groundDamage) }
      : undefined,
    stats.airDamage
      ? { label: "Air:", value: formatNumber(stats.airDamage) }
      : undefined,
  ].filter((line) => line !== undefined);

  if (lines.length === 0) {
    return null;
  }

  return (
    <div
      className={styles.TodayStats}
      title="Today's kills and damage. Click to reset."
      onClick={() => resetTodayStats(getEDay())}
    >
      {lines.map(({ label, value }) => (
        <div key={label}>
          <strong>{label}</strong>
          <span>{value}</span>
        </div>
      ))}
    </div>
  );
};
