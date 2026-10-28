import React, { useState } from "react";
import classNames from "classnames";
import styles from "./TravelBackHomeButton.module.scss";
import * as Travel from "../../../requests/travel-request";
import { getCsrfToken } from "../../../utils/erep-global-info";
import { error, toError } from "../../../utils/utils";
import type { Residence } from "../residence";

interface TravelBackHomeButtonProps {
  residence: Residence;
}

export const TravelBackHomeButton: React.FC<TravelBackHomeButtonProps> = (
  props,
) => {
  const [isTravelling, setIsTravelling] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const travel = async () => {
    if (isTravelling) {
      return;
    }
    setIsTravelling(true);
    setErrorMessage(null);
    try {
      const response = await Travel.sendRequest({
        _token: getCsrfToken(),
        battleId: "0",
        inRegionId: String(props.residence.regionId),
        toCountryId: String(props.residence.countryId),
      });
      if (response.error === 1) {
        setErrorMessage(response.message);
        setIsTravelling(false);
        return;
      }
      location.reload();
    } catch (e) {
      error("Failed to travel back home", e);
      setErrorMessage(toError(e).message);
      setIsTravelling(false);
    }
  };

  // Uses eRepublik's own button styles, so it looks like the rest of the sidebar.
  return (
    <>
      <a
        className={classNames(
          "std_global_btn",
          "smallSize",
          "blueColor",
          styles.Button,
          { disabled: isTravelling, loading: isTravelling },
        )}
        onClick={() => void travel()}
      >
        <span>Travel back home</span>
      </a>
      {errorMessage && <p className={styles.Error}>{errorMessage}</p>}
    </>
  );
};
