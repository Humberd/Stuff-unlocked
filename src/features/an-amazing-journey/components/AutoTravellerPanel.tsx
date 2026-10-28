import React, { useEffect, useRef } from "react";
import styles from "./AutoTravellerPanel.module.scss";
import { useForm } from "react-hook-form";
import { useMapEvents } from "../hooks/useMapEvents";
import { useLocalStorage } from "../../../hooks/storage";
import classNames from "classnames";
import type { AutoTravelForm, AutoTravellerState } from "../auto-traveller";

interface AutoTravellerPanelProps {
  onStart: (data: AutoTravelForm) => void;
  onStop: () => void;
  state: AutoTravellerState;
}

export const AutoTravellerPanel: React.FC<AutoTravellerPanelProps> = (
  props,
) => {
  const panelRef = useRef<HTMLDivElement>(null);
  const [formValuesFromStorage, setFormValues] =
    useLocalStorage<AutoTravelForm>("AnAmazingJourney.autoTravellerForm", {
      targetDistanceKm: "100000",
      resourceUsed: "preferTicket",
      travelBackAfterFinish: true,
    });
  const {
    register,
    handleSubmit,
    formState: { errors },
    subscribe,
  } = useForm<AutoTravelForm>({
    defaultValues: formValuesFromStorage,
  });

  useEffect(
    () =>
      subscribe({
        formState: { values: true },
        callback: ({ values }) => setFormValues(values),
      }),
    [subscribe, setFormValues],
  );

  useMapEvents(panelRef);

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
        onSubmit={(event) => void handleSubmit(onStart)(event)}
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
          {props.state !== "idle" && (
            <button
              className={styles.start}
              type="button"
              onClick={onStop}
              disabled={props.state === "stopping"}
            >
              Stop
            </button>
          )}
          <button
            className={styles.start}
            type="submit"
            disabled={props.state !== "idle"}
          >
            Start
          </button>
        </section>
      </form>
    </section>
  );
};
