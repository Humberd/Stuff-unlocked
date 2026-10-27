import React from "react";
import styles from "./Button.module.scss";
import classNames from "classnames";

type ButtonSize = "small" | "medium" | "large";

function buttonClassName(size: ButtonSize = "medium") {
  return classNames(styles.Button, {
    [styles.Small]: size === "small",
    [styles.Medium]: size === "medium",
    [styles.Large]: size === "large",
  });
}

interface ButtonProps {
  children: React.ReactNode;
  size?: ButtonSize;
  disabled?: boolean;
  onClick?: () => void;
}

export const Button: React.FC<ButtonProps> = (props) => {
  return (
    <button
      className={buttonClassName(props.size)}
      disabled={props.disabled}
      onClick={props.onClick}
    >
      {props.children}
    </button>
  );
};

export interface LinkButtonProps {
  children: React.ReactNode;
  size?: ButtonSize;
  href: string;
  target?: "_blank" | "_self";
  onClick?: () => void;
}

export const LinkButton: React.FC<LinkButtonProps> = (props) => {
  return (
    <a
      className={buttonClassName(props.size)}
      href={props.href}
      target={props.target}
      onClick={props.onClick}
    >
      {props.children}
    </a>
  );
};
