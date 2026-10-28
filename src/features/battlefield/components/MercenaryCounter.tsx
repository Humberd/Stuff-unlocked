import styles from "./MercenaryCounter.module.scss";
import { useExternalProperty } from "../../../hooks/external-property";
import { MERCENARY_KILLS_PER_COUNTRY } from "../../../requests/citizen-profile-personal-request";
import { addCappedKills, recordedKills } from "../battle-stats";
import { FREEDOM_FIGHTER_KILLS_CAP } from "../mercenary";

interface MercenaryCounterProps {
  /** Mercenary kills for the countries of both sides, from the profile. */
  mercenary: { left: number; right: number };
  /** Only in a battle that counts for Freedom Fighter. */
  freedomFighter?: { kills: number; milestoneKills: number };
  /** {@link recordedKills} when the profile was loaded. */
  recordedKillsBefore: number;
}

/** Counts up with the kills the player makes for the left side. */
export const MercenaryCounter = ({
  mercenary,
  freedomFighter,
  recordedKillsBefore,
}: MercenaryCounterProps) => {
  const newKills = useExternalProperty(recordedKills) - recordedKillsBefore;

  return (
    <div className={styles.MercenaryCounter}>
      <div className={styles.Mercenary} title="Mercenary kills">
        {addCappedKills(mercenary.left, newKills, MERCENARY_KILLS_PER_COUNTRY)}{" "}
        - {mercenary.right}
      </div>
      {freedomFighter && (
        <div className={styles.FreedomFighter} title="Freedom Fighter kills">
          {addCappedKills(
            freedomFighter.kills,
            newKills,
            FREEDOM_FIGHTER_KILLS_CAP,
          )}{" "}
          / {freedomFighter.milestoneKills}
        </div>
      )}
    </div>
  );
};
