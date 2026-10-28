import React from "react";
import classNames from "classnames";
import styles from "./CollectAllButton.module.scss";

export const CollectAllButton: React.FC<{ onClick: () => void }> = ({
  onClick,
}) => {
  // Uses eRepublik's own button styles, like the rest of the weekly challenge
  return (
    <a
      className={classNames(
        "std_global_btn",
        "blueColor",
        "floatRight",
        "iconBtn",
        styles.Button,
      )}
      title="Get all rewards"
      onClick={onClick}
    >
      <img
        src="//www.erepublik.net/images/modules/weekly_challenge/collect-all.png"
        alt="Get all rewards"
      />
    </a>
  );
};
