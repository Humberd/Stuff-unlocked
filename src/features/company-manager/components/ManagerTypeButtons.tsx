import type { MountOptions } from "../../../utils/render";
import styles from "./ManagerTypeButtons.module.scss";

export const managerTypeButtonsMountOptions: MountOptions = {
  position: "append",
  className: styles.Root,
};

export interface CompanyType {
  /** The company picture, the same for every company of the type. */
  imageUrl: string;
  name: string;
}

interface ManagerTypeButtonsProps {
  types: CompanyType[];
  onSelect: (type: CompanyType) => void;
}

export const ManagerTypeButtons = ({
  types,
  onSelect,
}: ManagerTypeButtonsProps) => (
  <>
    <strong className={styles.Label}>Work as Manager</strong>
    {types.map((type) => (
      <span
        key={type.imageUrl}
        className={styles.Type}
        onClick={() => onSelect(type)}
      >
        <img className={styles.Image} src={type.imageUrl} title={type.name} />
      </span>
    ))}
  </>
);
