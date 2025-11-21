import React, { useEffect, useRef, useState } from "react";
import styles from "./LocationSelectionPanel.module.scss";
import { useForm } from "react-hook-form";
import { HandleMapEvents } from "../hooks/HandleMapEvents";
import classNames from "classnames";
import { TravelData } from "../../../requests/travel-data-request";

interface LocationSelectionPanelProps {
  countries: Record<string, TravelData.CountryValue>;
  regions: Record<string, TravelData.Region>;
  defaultValues: LocationSelection;
  onChange: (data: LocationSelection) => void;
  isCollapsed: boolean;
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
  } = useForm<LocationSelection>({
    defaultValues: props.defaultValues,
  });
  const formValues = watch();

  // Get available regions for each location based on selected country
  const [regionsForLocationA, setRegionsForLocationA] = useState<
    TravelData.Region[]
  >([]);
  const [regionsForLocationB, setRegionsForLocationB] = useState<
    TravelData.Region[]
  >([]);

  const selectedCountryA = formValues.locationA?.countryId;
  const selectedCountryB = formValues.locationB?.countryId;

  useEffect(() => {
    if (selectedCountryA && props.countries[selectedCountryA]) {
      const country = props.countries[selectedCountryA];
      const availableRegions = Object.values(props.regions).filter(
        (region) => region.countryId === country.id
      );
      setRegionsForLocationA(availableRegions);

      // If current region is not in the new list, reset it
      if (
        formValues.locationA?.regionId &&
        !availableRegions.find(
          (r) => String(r.id) === formValues.locationA.regionId
        )
      ) {
        setValue("locationA.regionId", "");
      }
    } else {
      setRegionsForLocationA([]);
    }
  }, [
    selectedCountryA,
    props.countries,
    props.regions,
    formValues.locationA?.regionId,
    setValue,
  ]);

  useEffect(() => {
    if (selectedCountryB && props.countries[selectedCountryB]) {
      const country = props.countries[selectedCountryB];
      const availableRegions = Object.values(props.regions).filter(
        (region) => region.countryId === country.id
      );
      setRegionsForLocationB(availableRegions);

      // If current region is not in the new list, reset it
      if (
        formValues.locationB?.regionId &&
        !availableRegions.find(
          (r) => String(r.id) === formValues.locationB.regionId
        )
      ) {
        setValue("locationB.regionId", "");
      }
    } else {
      setRegionsForLocationB([]);
    }
  }, [
    selectedCountryB,
    props.countries,
    props.regions,
    formValues.locationB?.regionId,
    setValue,
  ]);

  // Notify parent of changes
  const stringifiedFormValues = JSON.stringify(formValues);
  useEffect(() => {
    props.onChange(formValues);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [stringifiedFormValues]);

  HandleMapEvents(panelRef);

  if (props.isCollapsed) {
    return null;
  }

  return (
    <section ref={panelRef} className={styles.panel}>
      <header className={styles.header}>
        <h2 className={styles.title}>Location Selection</h2>
      </header>
      <form className={styles.form} autoComplete="off">
            <fieldset>
              <div className={styles.locationGroup}>
                <h3 className={styles.locationTitle}>Location A</h3>
                <label
                  className={styles.label}
                  {...(errors.locationA?.countryId && {
                    "data-tooltip": errors.locationA.countryId.message,
                  })}
                >
                  <span>Country</span>
                  <select
                    {...register("locationA.countryId", {
                      required: "Please select a country for Location A",
                    })}
                    className={classNames(styles.select, {
                      [styles.inputError]: errors.locationA?.countryId,
                    })}
                  >
                    <option value="">Please select a country</option>
                    {Object.values(props.countries)
                      .sort((a, b) => a.name.localeCompare(b.name))
                      .map((country) => (
                        <option key={country.id} value={String(country.id)}>
                          {country.name}
                        </option>
                      ))}
                  </select>
                </label>
                <label
                  className={styles.label}
                  {...(errors.locationA?.regionId && {
                    "data-tooltip": errors.locationA.regionId.message,
                  })}
                >
                  <span>Region</span>
                  <select
                    {...register("locationA.regionId", {
                      required: "Please select a region for Location A",
                    })}
                    className={classNames(styles.select, {
                      [styles.inputError]: errors.locationA?.regionId,
                    })}
                    disabled={regionsForLocationA.length === 0}
                  >
                    <option value="">Please select a region</option>
                    {regionsForLocationA
                      .sort((a, b) => a.name.localeCompare(b.name))
                      .map((region) => (
                        <option key={region.id} value={String(region.id)}>
                          {region.name}
                        </option>
                      ))}
                  </select>
                </label>
              </div>

              <div className={styles.locationGroup}>
                <h3 className={styles.locationTitle}>Location B</h3>
                <label
                  className={styles.label}
                  {...(errors.locationB?.countryId && {
                    "data-tooltip": errors.locationB.countryId.message,
                  })}
                >
                  <span>Country</span>
                  <select
                    {...register("locationB.countryId", {
                      required: "Please select a country for Location B",
                    })}
                    className={classNames(styles.select, {
                      [styles.inputError]: errors.locationB?.countryId,
                    })}
                  >
                    <option value="">Please select a country</option>
                    {Object.values(props.countries)
                      .sort((a, b) => a.name.localeCompare(b.name))
                      .map((country) => (
                        <option key={country.id} value={String(country.id)}>
                          {country.name}
                        </option>
                      ))}
                  </select>
                </label>
                <label
                  className={styles.label}
                  {...(errors.locationB?.regionId && {
                    "data-tooltip": errors.locationB.regionId.message,
                  })}
                >
                  <span>Region</span>
                  <select
                    {...register("locationB.regionId", {
                      required: "Please select a region for Location B",
                    })}
                    className={classNames(styles.select, {
                      [styles.inputError]: errors.locationB?.regionId,
                    })}
                    disabled={regionsForLocationB.length === 0}
                  >
                    <option value="">Please select a region</option>
                    {regionsForLocationB
                      .sort((a, b) => a.name.localeCompare(b.name))
                      .map((region) => (
                        <option key={region.id} value={String(region.id)}>
                          {region.name}
                        </option>
                      ))}
                  </select>
                </label>
              </div>
            </fieldset>
          </form>
    </section>
  );
};

