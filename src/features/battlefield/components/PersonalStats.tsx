import styles from "./PersonalStats.module.scss";
import { useExternalProperty } from "../../../hooks/external-property";
import { formatNumber } from "../../../utils/format";
import { battleStats } from "../battle-stats";

/** Kills | prestige points | damage of the player in this battle. */
export const PersonalStats = () => {
  const stats = useExternalProperty(battleStats);
  if (!stats) {
    return null;
  }

  return (
    <div className={styles.PersonalStats} title="Kills | PP | Damage">
      {formatNumber(stats.kills)} | {formatNumber(stats.prestigePoints)} |{" "}
      {formatNumber(stats.damage)}
    </div>
  );
};
