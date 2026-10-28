import React from "react";
import classNames from "classnames";
import styles from "./XpLeft.module.scss";
import {
  type ExternalProperty,
  useExternalProperty,
} from "../../../hooks/external-property";
import { formatNumber } from "../../../utils/format";
import { isXpLeftLow, xpLeftToNextLevel } from "../xp-left";

interface XpLeftProps {
  experiencePoints: ExternalProperty<number>;
}

export const XpLeft: React.FC<XpLeftProps> = (props) => {
  const xpLeft = xpLeftToNextLevel(useExternalProperty(props.experiencePoints));

  return (
    <div className={styles.XpLeft}>
      XP left:{" "}
      <span
        className={classNames(styles.Badge, {
          [styles.Low]: isXpLeftLow(xpLeft),
        })}
      >
        {formatNumber(xpLeft)}
      </span>
    </div>
  );
};
