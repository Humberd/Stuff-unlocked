import type { MountOptions } from "../../../utils/render";
import styles from "./CostPerHealthPoint.module.scss";

export const costPerHealthPointMountOptions: MountOptions = {
  tagName: "span",
  position: "append",
  className: styles.Root,
};

export const CostPerHealthPoint = ({ cost }: { cost: number }) => (
  <>
    <br />
    {cost.toFixed(4)} cc/hp
  </>
);
