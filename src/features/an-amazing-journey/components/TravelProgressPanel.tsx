import styles from "./TravelProgressPanel.module.scss";
import { useRef } from "react";
import { HandleMapEvents } from "../hooks/HandleMapEvents";
import { formatNumber } from "../../../utils/format";

interface TravelProgressPanelProps {
  state: TravelProgressState;
}

export interface TravelProgressState {
  status: TravelProgressStatus;
  travelsCompleted: number;
  travelledDistanceKm: number;
  resourcesSpent: TravelResource;
}

export enum TravelProgressStatus {
  InProgress,
  Completed,
  Error,
}

export interface TravelResource {
  amount: number;
  unit: string;
}

export const TravelProgressPanel: React.FC<TravelProgressPanelProps> = (
  props
) => {
  const panelRef = useRef<HTMLDivElement>(null);

  HandleMapEvents(panelRef);

  return (
    <section ref={panelRef} className={styles.panel}>
      <h2 className={styles.title}>Travel Progress</h2>
      <div className={styles.row}>
        <span className={styles.key}>Travels</span>
        <span className={styles.value}>{formatNumber(props.state.travelsCompleted)}</span>
      </div>
      <div className={styles.row}>
        <span className={styles.key}>Distance</span>
        <span className={styles.value}>{formatNumber(props.state.travelledDistanceKm)} km</span>
      </div>
      <div className={styles.row}>
        <span className={styles.key}>Resources</span>
        <span className={styles.value}>
          {formatNumber(props.state.resourcesSpent.amount)} {props.state.resourcesSpent.unit}
        </span>
      </div>
    </section>
  );
};

