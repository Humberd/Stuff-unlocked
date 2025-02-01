import React from "react";
import styles from "./WeeklyChallengeCalculatorButton.module.scss";
import { LinkButton } from "../../../common-components/button/Button";

interface WeeklyChallengeCalculatorButtonProps {}

export function createWeeklyChallengeCalculatorButtonRootElement() {
  const rootElement = document.createElement("p");
  rootElement.classList.add(styles.RootElement);

  return rootElement;
}

export const WeeklyChallengeCalculatorButton: React.FC<
  WeeklyChallengeCalculatorButtonProps
> = (props) => {
  return (
    <LinkButton
      href={"https://humberd.github.io/Weekly-Challenge-Calculator"}
      size={"small"}
      target="_blank"
    >
      ⭐ WC calculator
    </LinkButton>
  );
};
