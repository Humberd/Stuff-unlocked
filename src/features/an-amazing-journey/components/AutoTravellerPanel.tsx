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
}

export interface AutoTravelForm {
  targetDistance: string;
  resourceUsed: "preferCurrency" | "preferTickets";
  travelBackAfterFinish: boolean;
}

export const AutoTravellerPanel: React.FC<AutoTravellerPanelProps> = (
  props
) => {
  const panelRef = useRef<HTMLDivElement>(null);
  const [isStarted, setIsStarted] = React.useState(false);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<AutoTravelForm>();

  HandleMapEvents(panelRef);

  const onStart = (data: AutoTravelForm) => {
    setIsStarted(true);
    props.onStart(data);
  };

  const onStop = () => {
    setIsStarted(false);
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
              {...register("targetDistance", { required: true })}
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
              <option value={"preferTickets"}>Prefer Tickets</option>
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
          {isStarted && (
            <button className={styles.start} type="button" onClick={onStop}>
              Stop
            </button>
          )}
          <button className={styles.start} type="submit" disabled={isStarted}>
            Start
          </button>
        </section>
      </form>
    </section>
  );
};

