import React, { useEffect, useState } from "react";
import styles from "./TotalLabel.module.scss";
import { ExternalProperty } from "../../../hooks/external-property";

export interface TotalLabelProps {
  total: ExternalProperty<number>
}

export function createTotalLabelRootElement() {
  const rootElement = document.createElement("div");
  rootElement.classList.add(styles.TotalLabelRoot);

  return rootElement;
}

export const TotalLabel = (props: TotalLabelProps) => {
  const [total, setTotal] = useState(0);
  useEffect(() => {
    props.total.onValueChange(setTotal);
  }, []);
  
  return (
    <>
      <span>Total:</span>
      <span>{total}</span>
    </>
  );
};
