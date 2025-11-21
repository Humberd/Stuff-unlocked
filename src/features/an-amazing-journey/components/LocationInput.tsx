import React, { useEffect, useState } from "react";
import styles from "./LocationSelectionPanel.module.scss";
import classNames from "classnames";
import { TravelData } from "../../../requests/travel-data-request";
import { getCsrfToken } from "../../../utils/erep-global-info";

interface LocationInputProps {
  title: string;
  countries: Record<string, TravelData.CountryValue>;
  selectedCountryId: string;
  selectedRegionId: string;
  onCountryChange: (countryId: string) => void;
  onRegionChange: (regionId: string) => void;
  countryError?: string;
  regionError?: string;
  registerCountry: any;
  registerRegion: any;
}

export const LocationInput: React.FC<LocationInputProps> = (props) => {
  const [regions, setRegions] = useState<TravelData.Region[]>([]);
  const [isLoadingRegions, setIsLoadingRegions] = useState(false);

  useEffect(() => {
    const fetchRegions = async () => {
      if (props.selectedCountryId && props.countries[props.selectedCountryId]) {
        setIsLoadingRegions(true);
        try {
          const response = await TravelData.sendRequest({
            check: "getCountryRegions",
            countryId: props.selectedCountryId,
            _token: getCsrfToken(),
            holdingId: "0",
            regionId: "0",
          });
          const availableRegions = Object.values(response.regions);
          console.log(props.title, '- Selected country:', props.selectedCountryId, 'Available regions:', availableRegions.length);
          setRegions(availableRegions);
        } catch (error) {
          console.error('Failed to fetch regions for country', props.selectedCountryId, error);
          setRegions([]);
        } finally {
          setIsLoadingRegions(false);
        }
      } else {
        setRegions([]);
      }
    };
    fetchRegions();
  }, [props.selectedCountryId, props.countries, props.title]);

  return (
    <div className={styles.locationGroup}>
      <h3 className={styles.locationTitle}>{props.title}</h3>
      <label
        className={styles.label}
        {...(props.countryError && {
          "data-tooltip": props.countryError,
        })}
      >
        <span>Country</span>
        <select
          {...props.registerCountry}
          className={classNames(styles.select, {
            [styles.inputError]: props.countryError,
          })}
          onChange={(e) => {
            props.registerCountry.onChange(e);
            props.onCountryChange(e.target.value);
          }}
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
        {...(props.regionError && {
          "data-tooltip": props.regionError,
        })}
      >
        <span>Region</span>
        <select
          {...props.registerRegion}
          className={classNames(styles.select, {
            [styles.inputError]: props.regionError,
          })}
          disabled={regions.length === 0 || isLoadingRegions}
          onChange={(e) => {
            props.registerRegion.onChange(e);
            props.onRegionChange(e.target.value);
          }}
        >
          <option value="">
            {isLoadingRegions ? "Loading regions..." : "Please select a region"}
          </option>
          {regions
            .sort((a, b) => a.name.localeCompare(b.name))
            .map((region) => (
              <option key={region.id} value={String(region.id)}>
                {region.name}
              </option>
            ))}
        </select>
      </label>
    </div>
  );
};

