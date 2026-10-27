import styles from "./TotalLabel.module.scss";
import {
  ExternalProperty,
  useExternalProperty,
} from "../../../hooks/external-property";
import { formatNumber } from "../../../utils/format";
import { getCitizenshipCurrencyName } from "../../../utils/erep-global-info";

export interface TotalLabelProps {
  total: ExternalProperty<number>;
}

export function createTotalLabelRootElement() {
  const rootElement = document.createElement("div");
  rootElement.classList.add(styles.TotalLabelRoot);

  return rootElement;
}

export const TotalLabel = (props: TotalLabelProps) => {
  const total = useExternalProperty(props.total);

  return (
    <>
      <span>Total: </span>
      <span className={styles.TotalValue}>
        {formatNumber(Math.floor(total))} {getCitizenshipCurrencyName()}
      </span>
    </>
  );
};
