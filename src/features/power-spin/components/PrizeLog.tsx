import React, { useLayoutEffect, useRef } from "react";
import styles from "./PrizeLog.module.scss";
import { useExternalProperty } from "../../../hooks/external-property";
import { prizeLog } from "../wheel-of-fortune";

export const PrizeLog: React.FC = () => {
  const entries = useExternalProperty(prizeLog);
  const entriesRef = useRef<HTMLDivElement>(null);
  // Keep following new prizes, unless the user scrolled up to look at older ones
  const isScrolledToBottomRef = useRef(true);

  const onScroll = () => {
    const element = entriesRef.current;
    if (!element) {
      return;
    }
    const tolerance = 1;
    isScrolledToBottomRef.current =
      element.scrollTop >=
      element.scrollHeight - element.clientHeight - tolerance;
  };

  useLayoutEffect(() => {
    const element = entriesRef.current;
    if (element && isScrolledToBottomRef.current) {
      element.scrollTop = element.scrollHeight;
    }
  }, [entries]);

  return (
    <div className={styles.PrizeLog}>
      <div className={styles.Header}>Power Spin Log</div>
      <div ref={entriesRef} className={styles.Entries} onScroll={onScroll}>
        {entries.map((entry, index) => (
          <div key={index} className={styles.Entry}>
            <span>{entry.cost}: </span>
            <img className={styles.Icon} src={entry.iconUrl} alt="" />
            <span>{entry.name}</span>
          </div>
        ))}
      </div>
    </div>
  );
};
