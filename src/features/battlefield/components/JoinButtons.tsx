import { useEffect, useState } from "react";
import styles from "./JoinButtons.module.scss";
import * as BattlefieldTravel from "../../../requests/battlefield-travel-request";
import {
  getCountryPermalink,
  getCsrfToken,
} from "../../../utils/erep-global-info";
import { error } from "../../../utils/utils";

interface JoinButtonsProps {
  battleId: number;
  battleZoneId: number;
  leftCountryId: number;
  rightCountryId: number;
  /** A player already fighting can only switch to the right side. */
  canJoinLeft: boolean;
}

/** Joins a side of the battle, travelling to its region if needed. */
export const JoinButtons = (props: JoinButtonsProps) => {
  const [isBehindMap, setIsBehindMap] = useState(false);

  useEffect(() => {
    const mapTrigger = document.querySelector("#trigger_campaignMap");
    const controller = new AbortController();
    mapTrigger?.addEventListener("click", () => setIsBehindMap(true), {
      signal: controller.signal,
    });
    return () => controller.abort();
  }, []);

  return (
    <div
      className={`${styles.JoinButtons} ${isBehindMap ? styles.BehindMap : ""}`}
    >
      <JoinButton
        {...props}
        countryId={props.leftCountryId}
        isHidden={!props.canJoinLeft}
        isFlagFirst
      />
      <JoinButton {...props} countryId={props.rightCountryId} />
    </div>
  );
};

interface JoinButtonProps {
  battleId: number;
  battleZoneId: number;
  countryId: number;
  isHidden?: boolean;
  isFlagFirst?: boolean;
}

const JoinButton = ({
  battleId,
  battleZoneId,
  countryId,
  isHidden,
  isFlagFirst,
}: JoinButtonProps) => {
  const [errorMessage, setErrorMessage] = useState<string>();

  const join = async () => {
    const response = await BattlefieldTravel.sendRequest({
      _token: getCsrfToken(),
      battleId,
      battleZoneId,
      sideCountryId: countryId,
    });
    if (response.error) {
      setErrorMessage(response.message);
      return;
    }
    window.location.assign(`/en/military/battlefield/${battleId}`);
  };

  const flag = (
    <img
      src={`//www.erepublik.net/images/flags_png/L/${getCountryPermalink(countryId)}.png`}
      alt=""
    />
  );

  return (
    <span
      role="button"
      className={`${styles.JoinButton} ${isHidden ? styles.Hidden : ""}`}
      title={errorMessage}
      onClick={() => {
        join().catch((e) => error("Failed to join the battle", e));
      }}
    >
      {isFlagFirst && flag}
      {errorMessage ?? "Join"}
      {!isFlagFirst && flag}
    </span>
  );
};
