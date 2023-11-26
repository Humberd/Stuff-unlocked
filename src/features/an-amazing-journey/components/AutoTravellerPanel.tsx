import React, { useEffect, useRef } from "react";
import styles from "./AutoTravellerPanel.module.scss";
import { useForm } from "react-hook-form";
import { HandleMapEvents } from "../hooks/HandleMapEvents";
import { useLocalStorage } from "../../../hooks/storage";
import classNames from "classnames";

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
  targetDistanceKm: string;
  resourceUsed: "preferCurrency" | "preferTicket";
  travelBackAfterFinish: boolean;
}

export const AutoTravellerPanel: React.FC<AutoTravellerPanelProps> = (
  props
) => {
  const panelRef = useRef<HTMLDivElement>(null);
  const [formValuesFromStorage, setFormValues] =
    useLocalStorage<AutoTravelForm>("AnAmazingJourney.autoTravellerForm", {
      targetDistanceKm: "1000",
      resourceUsed: "preferCurrency",
      travelBackAfterFinish: true,
    });
  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
  } = useForm<AutoTravelForm>({
    defaultValues: formValuesFromStorage,
  });
  const formValues = watch(); // watch all form values

  useEffect(() => {
    setFormValues(formValues);
  }, [JSON.stringify(formValues)]);

  HandleMapEvents(panelRef);

  const onStart = (data: AutoTravelForm) => {
    props.onStart(data);
  };

  const onStop = () => {
    props.onStop();
  };

  return (
    <section ref={panelRef} className={styles.panel}>
      <header className={styles.header}>
        <h2 className={styles.title}>Auto Traveller</h2>
      </header>
      <form
        className={styles.form}
        onSubmit={handleSubmit(onStart)}
        autoComplete="off"
      >
        <fieldset>
          <label
            className={styles.label}
            {...(errors.targetDistanceKm && {
              "data-tooltip": errors.targetDistanceKm.message,
            })}
          >
            <span>Target distance (km)</span>
            <input
              {...register("targetDistanceKm", {
                required: {
                  value: true,
                  message: "Please enter a distance",
                },
                pattern: {
                  value: /^[0-9]*$/,
                  message: "Must be a positive natural number.",
                },
                min: {
                  value: 1,
                  message: "Must be a positive natural number.",
                },
              })}
              className={classNames(styles.input, {
                [styles.inputError]: errors.targetDistanceKm,
              })}
              type="text"
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
