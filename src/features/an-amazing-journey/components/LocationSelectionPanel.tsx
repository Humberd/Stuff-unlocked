import React, { useEffect, useRef } from "react";
import styles from "./LocationSelectionPanel.module.scss";
import { useForm } from "react-hook-form";
import { HandleMapEvents } from "../hooks/HandleMapEvents";
import { TravelData } from "../../../requests/travel-data-request";
import { LocationInput } from "./LocationInput";

interface LocationSelectionPanelProps {
  countries: Record<string, TravelData.CountryValue>;
  defaultValues: LocationSelection;
  onChange: (data: LocationSelection) => void;
}

export interface LocationSelection {
  locationA: {
    countryId: string;
    regionId: string;
  };
  locationB: {
    countryId: string;
    regionId: string;
  };
}

export const LocationSelectionPanel: React.FC<LocationSelectionPanelProps> = (
  props
) => {
  const panelRef = useRef<HTMLDivElement>(null);
  const {
    register,
    formState: { errors },
    watch,
    setValue,
    reset,
  } = useForm<LocationSelection>({
    defaultValues: props.defaultValues,
  });
  const formValues = watch();

  // Reset form when defaultValues from storage change (only if different)
  const stringifiedDefaultValues = JSON.stringify(props.defaultValues);
  useEffect(() => {
    const currentValues = JSON.stringify(formValues);
    if (currentValues !== stringifiedDefaultValues) {
      reset(props.defaultValues);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [stringifiedDefaultValues, reset]);

  const handleReset = () => {
    reset({
      locationA: {
        countryId: "15", // Spain
        regionId: "173", // Castilla Y Leon
      },
      locationB: {
        countryId: "84", // New Zealand
        regionId: "714", // Wellington
      },
    });
  };

  // Notify parent of changes
  const stringifiedFormValues = JSON.stringify(formValues);
  useEffect(() => {
    props.onChange(formValues);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [stringifiedFormValues]);

  HandleMapEvents(panelRef);

  return (
    <section ref={panelRef} className={styles.panel}>
      <header className={styles.header}>
        <h2 className={styles.title}>Location Selection</h2>
        <button
          type="button"
          className={styles.resetButton}
          onClick={handleReset}
          title="Reset to default values"
        >
          Reset
        </button>
      </header>
      <form className={styles.form} autoComplete="off">
        <fieldset>
          <LocationInput
            title="Location A"
            countries={props.countries}
            selectedCountryId={formValues.locationA?.countryId || ""}
            selectedRegionId={formValues.locationA?.regionId || ""}
            onCountryChange={(countryId) => {
              setValue("locationA.countryId", countryId, { shouldDirty: true });
              setValue("locationA.regionId", "", { shouldDirty: true }); // Reset region when country changes
            }}
            onRegionChange={(regionId) => setValue("locationA.regionId", regionId, { shouldDirty: true })}
            countryError={errors.locationA?.countryId?.message}
            regionError={errors.locationA?.regionId?.message}
            registerCountry={register("locationA.countryId", {
              required: "Please select a country for Location A",
            })}
            registerRegion={register("locationA.regionId", {
              required: "Please select a region for Location A",
            })}
          />

          <LocationInput
            title="Location B"
            countries={props.countries}
            selectedCountryId={formValues.locationB?.countryId || ""}
            selectedRegionId={formValues.locationB?.regionId || ""}
            onCountryChange={(countryId) => {
              setValue("locationB.countryId", countryId, { shouldDirty: true });
              setValue("locationB.regionId", "", { shouldDirty: true }); // Reset region when country changes
            }}
            onRegionChange={(regionId) => setValue("locationB.regionId", regionId, { shouldDirty: true })}
            countryError={errors.locationB?.countryId?.message}
            regionError={errors.locationB?.regionId?.message}
            registerCountry={register("locationB.countryId", {
              required: "Please select a country for Location B",
            })}
            registerRegion={register("locationB.regionId", {
              required: "Please select a region for Location B",
            })}
          />
        </fieldset>
      </form>
    </section>
  );
};

