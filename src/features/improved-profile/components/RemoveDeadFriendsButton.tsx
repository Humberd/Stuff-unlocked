import React from "react";
import classNames from "classnames";
import styles from "./RemoveDeadFriendsButton.module.scss";
import { useExternalProperty } from "../../../hooks/external-property";
import type {
  DeadFriendsRemover,
  DeadFriendsRemoverState,
} from "../dead-friends";

function getLabel(state: DeadFriendsRemoverState): string {
  switch (state.status) {
    case "idle":
      return "Remove dead friends";
    case "scanning":
      return `Scanning... ${state.percent.toFixed(1)}%`;
    case "confirming":
      return `Remove ${state.friendIds.length} dead ${state.friendIds.length === 1 ? "friend" : "friends"}?`;
    case "removing":
      return `Removing... ${state.left} left`;
    case "done":
      return state.removed > 0 ? "Done!" : "No dead friends";
    case "failed":
      return `Failed: ${state.message}`;
  }
}

export const RemoveDeadFriendsButton: React.FC<{
  remover: DeadFriendsRemover;
}> = ({ remover }) => {
  const state = useExternalProperty(remover.state);
  const isBusy = state.status === "scanning" || state.status === "removing";

  // The first click only looks for the dead friends, the second one removes them
  const onClick = () => {
    if (state.status === "confirming") {
      void remover.removeAll();
    } else {
      void remover.scan();
    }
  };

  return (
    <button
      type="button"
      className={classNames(styles.Button, {
        [styles.Busy]: isBusy,
        [styles.Confirming]: state.status === "confirming",
        [styles.Failed]: state.status === "failed",
      })}
      disabled={isBusy}
      onClick={onClick}
    >
      {getLabel(state)}
    </button>
  );
};
