import type { MountOptions } from "../../../utils/render";
import styles from "./OfferNet.module.scss";

export const offerNetMountOptions: MountOptions = {
  tagName: "span",
  position: "append",
  className: styles.Root,
};

/** Net price per unit of an offer. */
export const OfferNet = (props: { net: number; currency: string }) => (
  <>
    <br />
    Net: {props.net.toFixed(4)} {props.currency}
  </>
);
