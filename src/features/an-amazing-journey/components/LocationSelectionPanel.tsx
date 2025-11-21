import React, { useRef } from "react";
import styles from "./LocationSelectionPanel.module.scss";
import { HandleMapEvents } from "../hooks/HandleMapEvents";
import { TravelData } from "../../../requests/travel-data-request";
import { LocationInput } from "./LocationInput";

interface LocationSelectionPanelProps {
  countries: Record<string, TravelData.CountryValue>;
  locationSelection: LocationSelection;
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

const DEFAULT_LOCATIONS = Object.freeze({
  locationA: {
    countryId: "15", // Spain
    regionId: "173", // Castilla Y Leon
  },
  locationB: {
    countryId: "84", // New Zealand
    regionId: "714", // Wellington
  },
});

export const LocationSelectionPanel: React.FC<LocationSelectionPanelProps> = (
  props
) => {
  const panelRef = useRef<HTMLDivElement>(null);

  const handleReset = () => {
    props.onChange(DEFAULT_LOCATIONS);
  };

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
      <div className={styles.form}>
        <fieldset>
          <LocationInput
            title="Location A"
            countries={props.countries}
            selectedCountryId={props.locationSelection.locationA?.countryId || ""}
            selectedRegionId={props.locationSelection.locationA?.regionId || ""}
            onCountryChange={(countryId) => {
              props.onChange({
                ...props.locationSelection,
                locationA: {
                  countryId,
                  regionId: "", // Reset region when country changes
                },
              });
            }}
            onRegionChange={(regionId) => {
              props.onChange({
                ...props.locationSelection,
                locationA: {
                  ...props.locationSelection.locationA,
                  regionId,
                },
              });
            }}
          />

          <LocationInput
            title="Location B"
            countries={props.countries}
            selectedCountryId={props.locationSelection.locationB?.countryId || ""}
            selectedRegionId={props.locationSelection.locationB?.regionId || ""}
            onCountryChange={(countryId) => {
              props.onChange({
                ...props.locationSelection,
                locationB: {
                  countryId,
                  regionId: "", // Reset region when country changes
                },
              });
            }}
            onRegionChange={(regionId) => {
              props.onChange({
                ...props.locationSelection,
                locationB: {
                  ...props.locationSelection.locationB,
                  regionId,
                },
              });
            }}
          />
        </fieldset>
      </div>
    </section>
  );
};

