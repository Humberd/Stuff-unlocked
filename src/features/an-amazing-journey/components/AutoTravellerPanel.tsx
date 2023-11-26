import React, { useRef } from "react";
import styles from "./AutoTravellerPanel.module.scss";
import { useForm } from "react-hook-form";
import { HandleMapEvents } from "../hooks/HandleMapEvents";

declare global {
  function disableMap(): void;
  function enableMap(): void;
}

interface AutoTravellerPanelProps {
  onStart: (data: AutoTravelForm) => void;
  onStop: () => void;
  state: AutoTravelFormState;
}

export enum AutoTravelFormState {
  IDLE,
  STARTED,
  STOPPING,
}

export interface AutoTravelForm {
  targetDistanceKm: number;
  resourceUsed: "preferCurrency" | "preferTicket";
  travelBackAfterFinish: boolean;
}

export const AutoTravellerPanel: React.FC<AutoTravellerPanelProps> = (
  props
) => {
  const panelRef = useRef<HTMLDivElement>(null);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<AutoTravelForm>();

  HandleMapEvents(panelRef);

  const onStart = (data: AutoTravelForm) => {
    props.onStart(data);
  };

  const onStop = () => {
    props.onStop();
  };

  return (
    <section ref={panelRef} className={styles.panel}>
      <h2 className={styles.title}>Auto Traveller</h2>
      <form onSubmit={handleSubmit(onStart)}>
        <fieldset>
          <label className={styles.label}>
            <span>Target distance (km)</span>
            {/* TODO: input of type text that consumes only numbers */}
            <input
              {...register("targetDistanceKm", { required: true })}
              className={styles.input}
              type="text"
              defaultValue={1_000}
            />
          </label>
          <label className={styles.label}>
            <span>Resource Used</span>
            <select
              {...register("resourceUsed", { required: true })}
              className={styles.select}
            >
              <option value={"preferCurrency"}>Prefer Currency</option>
              <option value={"preferTicket"}>Prefer Tickets</option>
            </select>
          </label>
          <label className={styles.label}>
            <span>Travel back after finish</span>
            <input
              {...register("travelBackAfterFinish")}
              className={styles.checkbox}
              type="checkbox"
              defaultChecked={true}
            />
          </label>
        </fieldset>
        <section className={styles.actionBar}>
          {props.state !== AutoTravelFormState.IDLE && (
            <button
              className={styles.start}
              type="button"
              onClick={onStop}
              disabled={props.state === AutoTravelFormState.STOPPING}
            >
              Stop
            </button>
          )}
          <button
            className={styles.start}
            type="submit"
            disabled={props.state !== AutoTravelFormState.IDLE}
          >
            Start
          </button>
        </section>
      </form>
    </section>
  );
};
