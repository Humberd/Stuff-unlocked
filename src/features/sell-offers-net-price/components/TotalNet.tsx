import {
  type ExternalProperty,
  useExternalProperty,
} from "../../../hooks/external-property";
import type { MountOptions } from "../../../utils/render";
import { formatAmount } from "../net-price";
import styles from "./TotalNet.module.scss";

export const totalNetHeaderMountOptions: MountOptions = {
  tagName: "th",
  position: "after",
  className: styles.Header,
};

export const totalNetCellMountOptions: MountOptions = {
  tagName: "td",
  position: "after",
  className: styles.Cell,
};

export const totalNetFooterMountOptions: MountOptions = {
  tagName: "tfoot",
  position: "append",
  className: styles.Footer,
};

export const TotalNetHeader = () => (
  <strong className={styles.HeaderLabel}>Total Net</strong>
);

interface TotalNetProps {
  amount: number;
  currency: string;
  goldPrice: ExternalProperty<number | undefined>;
}

/** Net of an amount in the currency and in gold. */
export const TotalNet = (props: TotalNetProps) => {
  const goldPrice = useExternalProperty(props.goldPrice);
  return (
    <>
      <strong>{formatAmount(props.amount, 2)}</strong> {props.currency}
      {goldPrice !== undefined && (
        <>
          <br />
          <span className={styles.Gold}>
            {formatAmount(props.amount / goldPrice, 2)} g
          </span>
        </>
      )}
    </>
  );
};

export const TotalNetFooter = (props: TotalNetProps) => (
  <tr>
    <td colSpan={3} />
    <td className={styles.Cell}>
      <TotalNet {...props} />
    </td>
    <td colSpan={2} />
  </tr>
);
