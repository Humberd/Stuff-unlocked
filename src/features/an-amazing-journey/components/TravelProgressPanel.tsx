import styles from "./TravelProgressPanel.module.scss";
import { useRef } from "react";
import { useMapEvents } from "../hooks/useMapEvents";
import { formatNumber } from "../../../utils/format";
import { StatusIndicator } from "./StatusIndicator";

interface TravelProgressPanelProps {
  state: TravelProgressState;
}

export interface TravelProgressState {
  status: TravelProgressStatus;
  travelsCompleted: number;
  travelledDistanceKm: number;
  resourcesSpent: TravelResource;
  errorMessage?: string;
}

export const TravelProgressStatus = {
  InProgress: 0,
  Completed: 1,
  Error: 2,
} as const;
export type TravelProgressStatus =
  (typeof TravelProgressStatus)[keyof typeof TravelProgressStatus];

export interface TravelResource {
  amount: number;
  unit: string;
}

export const TravelProgressPanel: React.FC<TravelProgressPanelProps> = (
  props,
) => {
  const panelRef = useRef<HTMLDivElement>(null);

  useMapEvents(panelRef);

  return (
    <section ref={panelRef} className={styles.panel}>
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
