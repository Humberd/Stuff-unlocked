import React from "react";
import styles from "./StorageInfo.module.scss";
import { formatNumber } from "../../../utils/format";

interface StorageInfoProps {
  current: number;
  total: number;
  free: number;
}

export const StorageInfo: React.FC<StorageInfoProps> = (props) => {
  return (
    <div className={styles.StorageInfo}>
      <div className={styles.MainRow}>
        <img
          className={styles.Image}
          src="https://www.erepublik.com/images/modules/manager/storage_build_icon.png"
          alt="Storage"
        />
        <div>
          <strong className={styles.MainText}>{formatNumber(props.free)} </strong>
          <span className={styles.SecondaryText}>FREE</span>
        </div>
      </div>
      <div className={styles.SupportingRow}>
        {formatNumber(props.current)}/{formatNumber(props.total)}
      </div>
    </div>
  );
};
