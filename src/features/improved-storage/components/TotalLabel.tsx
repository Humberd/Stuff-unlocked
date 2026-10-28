import styles from "./TotalLabel.module.scss";
import type { MountOptions } from "../../../utils/render";
import {
  ExternalProperty,
  useExternalProperty,
} from "../../../hooks/external-property";
import { formatNumber } from "../../../utils/format";
import { getCitizenshipCurrencyName } from "../../../utils/erep-global-info";

export interface TotalLabelProps {
  total: ExternalProperty<number>;
}

export const totalLabelMountOptions: MountOptions = {
  className: styles.TotalLabelRoot,
};

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
