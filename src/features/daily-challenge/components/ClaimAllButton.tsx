import React, { useState } from "react";
import classNames from "classnames";
import styles from "./ClaimAllButton.module.scss";
import { claimAllAndClose } from "../claim-all";
import { error } from "../../../utils/utils";

export function createClaimAllButtonRootElement() {
  const rootElement = document.createElement("span");
  rootElement.classList.add(styles.RootElement);

  return rootElement;
}

export function findClaimAllButtonRootElement(parent: Element) {
  return parent.querySelector(`.${styles.RootElement}`);
}

export const ClaimAllButton: React.FC = () => {
  const [isClaiming, setIsClaiming] = useState(false);

  const onClick = async () => {
    if (isClaiming) {
      return;
    }
    setIsClaiming(true);
    try {
      await claimAllAndClose();
    } catch (e) {
      error("Failed to claim daily challenges", e);
    } finally {
      setIsClaiming(false);
    }
  };

  // Uses eRepublik's own button styles, so it looks like the rest of the popup.
  return (
    <a
      className={classNames("std_global_btn", "greenColor", "smallSize", {
        disabled: isClaiming,
        loading: isClaiming,
      })}
      onClick={() => void onClick()}
    >
      Claim All &amp; Close
    </a>
  );
};
