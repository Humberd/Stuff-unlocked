import type { MountOptions } from "../../../utils/render";
import { describeSalaryLimit } from "../../best-job-offer/best-job-offer";
import styles from "./SalaryLimit.module.scss";

export const salaryLimitMountOptions: MountOptions = {
  tagName: "span",
  position: "append",
  className: styles.Root,
};

export const SalaryLimit = ({ salaryLimit }: { salaryLimit: number }) => {
  const description = describeSalaryLimit(salaryLimit);
  return (
    <>
      <br />
      {description.charAt(0).toUpperCase() + description.slice(1)}
    </>
  );
};
