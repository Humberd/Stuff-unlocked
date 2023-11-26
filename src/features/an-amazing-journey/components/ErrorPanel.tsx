import styles from "./ErrorPanel.module.scss";
import { useRef } from "react";
import { HandleMapEvents } from "../hooks/HandleMapEvents";

interface ErrorPanelProps {
  errors: Error[];
  onClose: () => void;
}

export const ErrorPanel: React.FC<ErrorPanelProps> = (props) => {
  const panelRef = useRef<HTMLDivElement>(null);
  HandleMapEvents(panelRef);

  return (
    <section ref={panelRef} className={styles.panel}>
      <div className={styles.errors}>
        {props.errors.map((error, index) => (
          <p key={index} className={styles.error}>
            <span>{error.toString()}</span>
            {(error.cause || null) && (
              <span>
                <br />
                Caused by: {error.cause?.toString()}
              </span>
            )}
          </p>
        ))}
      </div>
      <button className={styles.close} title="Dismiss" onClick={props.onClose}>
        <svg
          width="24"
          height="24"
          viewBox="0 -960 960 960"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            fill="currentColor"
            d="m256-200-56-56 224-224-224-224 56-56 224 224 224-224 56 56-224 224 224 224-56 56-224-224-224 224Z"
          />
        </svg>
      </button>
    </section>
  );
};
