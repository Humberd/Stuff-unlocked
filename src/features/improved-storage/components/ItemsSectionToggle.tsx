import React, { useCallback, useEffect, useState } from "react";
import styles from "./ItemsSectionToggle.module.scss";
import { ensure, log } from "../../../utils/utils";

interface ItemsSectionToggleProps {
  sectionId: string;
}

export const ItemsSectionToggle: React.FC<ItemsSectionToggleProps> = (
  props,
) => {
  const [isOpened, setIsOpened] = useState(true);

  useEffect(() => {
    const section = ensure(document.getElementById(props.sectionId));
    const sectionWrapper = ensure(section.querySelector(".storage_section_wrapper"));
    console.log(sectionWrapper);
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
