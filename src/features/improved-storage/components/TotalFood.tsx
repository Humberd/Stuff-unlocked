import React from "react";
import styles from "./TotalFood.module.scss";
import { formatNumber } from "../../../utils/format";

interface TotalFoodProps {
  totalEnergy: number;
}

export const TotalFood: React.FC<TotalFoodProps> = (props) => {
  return (
    <div>
      <div className={styles.ValueSection}>
        <img
          className={styles.FoodIcon}
          src="https://www.erepublik.net/images/icons/industry/1/q1.png"
          alt="Food"
        />
        <span className={styles.EnergyValue}>
          {formatNumber(props.totalEnergy)} HP
        </span>
      </div>
    </div>
  );
};
