import React from "react";
import styles from "./TotalLabel.module.scss";

export interface TotalLabelProps {
  total: number;
}

export function createTotalLabelRootElement() {
  const rootElement = document.createElement("div");
  rootElement.classList.add(styles.TotalLabelRoot);

  return rootElement;
}

export const TotalLabel = (props: TotalLabelProps) => {
  return (
    <>
      <span>Total:</span>
      <span>{props.total}</span>
    </>
  );
};
