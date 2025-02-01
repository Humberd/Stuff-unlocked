import React from "react";
import styles from "./Button.module.scss";
import classNames from "classnames";

interface ButtonProps {
  children: React.ReactNode;
  size?: "small" | "medium" | "large";
  disabled?: boolean;
  onClick?: () => void;
}

export const Button: React.FC<ButtonProps> = (props) => {
  const size = props.size || "medium";

  return (
    <button
      className={classNames(styles.Button, {
        [styles.Small]: size === "small",
        [styles.Medium]: size === "medium",
        [styles.Large]: size === "large",
      })}
      disabled={props.disabled}
      onClick={props.onClick}
    >
      {props.children}
    </button>
  );
};

export interface LinkButtonProps {
  children: React.ReactNode;
  size?: "small" | "medium" | "large";
  href: string;
  target?: "_blank" | "_self";
  onClick?: () => void;
}

export const LinkButton: React.FC<LinkButtonProps> = (props) => {
  const size = props.size || "medium";

  return (
    <a
      className={classNames(styles.Button, {
        [styles.Small]: size === "small",
        [styles.Medium]: size === "medium",
        [styles.Large]: size === "large",
      })}
      href={props.href}
      target={props.target}
      onClick={props.onClick}
    >
      {props.children}
    </a>
  );
};
