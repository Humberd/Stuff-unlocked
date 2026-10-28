import styles from "./TravelProgressPanel.module.scss";
import { mapGuardHandlers } from "../map-guard";
import { formatNumber } from "../../../utils/format";
import { StatusIndicator } from "./StatusIndicator";
import type { TravelProgressState } from "../auto-traveller";

interface TravelProgressPanelProps {
  state: TravelProgressState;
}

export const TravelProgressPanel: React.FC<TravelProgressPanelProps> = (
  props,
) => {
  return (
    <section className={styles.panel} {...mapGuardHandlers}>
      <header className={styles.header}>
        <h2 className={styles.title}>Travel Progress</h2>
        <StatusIndicator status={props.state.status} />
      </header>
      <div className={styles.rows}>
        <div className={styles.row}>
          <span className={styles.key}>Travels</span>
          <span className={styles.value}>
            {formatNumber(props.state.travelsCompleted)}
          </span>
        </div>
        <div className={styles.row}>
          <span className={styles.key}>Distance</span>
          <span className={styles.value}>
            {formatNumber(props.state.travelledDistanceKm)} km
          </span>
        </div>
        <div className={styles.row}>
          <span className={styles.key}>Resources</span>
          <span className={styles.value}>
            {formatNumber(props.state.resourcesSpent.amount)}{" "}
            {props.state.resourcesSpent.unit}
          </span>
        </div>
      </div>
    </section>
  );
};
