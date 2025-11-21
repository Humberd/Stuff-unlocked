import React, { useEffect, useRef, useState } from "react";
import styles from "./AutoTravellerPanel.module.scss";
import { useForm } from "react-hook-form";
import { HandleMapEvents } from "../hooks/HandleMapEvents";
import { useLocalStorage } from "../../../hooks/storage";
import classNames from "classnames";
import { TravelData } from "../../../requests/travel-data-request";
import { LocationSelectionPanel } from "./LocationSelectionPanel";
import { CountriesCache } from "../countries-cache";
import { error, log } from "../../../utils/utils";

const countriesCache = new CountriesCache();

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
  locationA: {
    countryId: string;
    regionId: string;
  };
  locationB: {
    countryId: string;
    regionId: string;
  };
}

export const AutoTravellerPanel: React.FC<AutoTravellerPanelProps> = (
  props
) => {
  const panelRef = useRef<HTMLDivElement>(null);
  const [countries, setCountries] = useState<Record<string, TravelData.CountryValue>>({});
  const [isLocationPanelCollapsed, setIsLocationPanelCollapsed] = useLocalStorage(
    "AnAmazingJourney.isLocationPanelCollapsed",
    false
  );
  
  // Fetch countries data on mount
  useEffect(() => {
    const fetchTravelData = async () => {
      try {
        const travelDataCountries = await countriesCache.getCountries();
        setCountries(travelDataCountries);
        log("Loaded countries:", Object.keys(travelDataCountries).length);
      } catch (e: any) {
        error("Failed to fetch travel data", e);
      }
    };
    fetchTravelData();
  }, []);
  const [formValuesFromStorage, setFormValues] =
    useLocalStorage<AutoTravelForm>("AnAmazingJourney.autoTravellerForm", {
      targetDistanceKm: "1000000",
      resourceUsed: "preferTicket",
      travelBackAfterFinish: true,
      locationA: {
        countryId: "15", // Spain
        regionId: "173", // Castilla Y Leon
      },
      locationB: {
        countryId: "84", // New Zealand
        regionId: "714", // Wellington
      },
    });
  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
    setValue,
  } = useForm<AutoTravelForm>({
    defaultValues: formValuesFromStorage,
  });
  const formValues = watch();

  const stringifiedFormValues = JSON.stringify(formValues);
  useEffect(() => {
    setFormValues(formValues);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [stringifiedFormValues]);

  HandleMapEvents(panelRef);

  const onStart = (data: AutoTravelForm) => {
    props.onStart(data);
  };

  const onStop = () => {
    props.onStop();
  };

  return (
    <>
      {!isLocationPanelCollapsed && (
        <LocationSelectionPanel
          countries={countries}
          locationSelection={{
            locationA: formValues.locationA,
            locationB: formValues.locationB,
          }}
          onChange={(locationData) => {
            setValue("locationA", locationData.locationA);
            setValue("locationB", locationData.locationB);
          }}
        />
      )}
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
          <button
            className={classNames(styles.locationToggle, {
              [styles.locationToggleActive]: !isLocationPanelCollapsed,
            })}
            onClick={() => setIsLocationPanelCollapsed(!isLocationPanelCollapsed)}
            type="button"
          >
            Update locations
          </button>
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
    </>
  );
};
