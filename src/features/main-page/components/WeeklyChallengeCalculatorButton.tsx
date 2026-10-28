import React from "react";
import styles from "./WeeklyChallengeCalculatorButton.module.scss";
import type { MountOptions } from "../../../utils/render";
import { LinkButton } from "../../../common-components/button/Button";
import { Analytics } from "../../../analytics/posthog";

export const weeklyChallengeCalculatorButtonMountOptions: MountOptions = {
  tagName: "p",
  className: styles.RootElement,
};

export const WeeklyChallengeCalculatorButton: React.FC = () => {
  const onClick = () => {
    Analytics.postWcCalculatorOpenedEvent();
  };

  return (
    <LinkButton
      href={"https://humberd.github.io/Weekly-Challenge-Calculator"}
      size={"small"}
      target="_blank"
      onClick={onClick}
    >
      ⭐ WC calculator
    </LinkButton>
  );
};
