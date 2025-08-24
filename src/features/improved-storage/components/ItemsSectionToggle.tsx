import React, { useEffect } from "react";
import styles from "./ItemsSectionToggle.module.scss";
import { ensure } from "../../../utils/utils";
import { useLocalStorage } from "../../../hooks/storage";

interface ItemsSectionToggleProps {
  sectionId: string;
  initialIsOpened?: boolean;
}

export const ItemsSectionToggle: React.FC<ItemsSectionToggleProps> = (
  props,
) => {
  const [isOpened, setIsOpened] = useLocalStorage(
    `inventory-section-${props.sectionId}-opened`,
    props.initialIsOpened ?? true
  );

  useEffect(() => {
    const section = ensure(document.getElementById(props.sectionId));
    const sectionWrapper = ensure(
      section.querySelector(".storage_section_wrapper"),
    );
    if (isOpened) {
      sectionWrapper.classList.remove(styles.Hidden);
    } else {
      sectionWrapper.classList.add(styles.Hidden);
    }
  }, [isOpened, props.sectionId]);

  return (
    <button
      className={styles.sectionToggle}
      onClick={() => setIsOpened(!isOpened)}
    >
      {isOpened ? "Hide" : "Show"}
    </button>
  );
};
