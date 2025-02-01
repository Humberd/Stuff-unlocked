import React from "react";
import styles from "./Button.module.scss";

interface ButtonProps {
  children: React.ReactNode;
  disabled?: boolean;
  onClick?: () => void;
}

export const Button: React.FC<ButtonProps> = (props) => {
  return (
    <button
      className={styles.Button}
      disabled={props.disabled}
      onClick={props.onClick}
    >
      {props.children}
    </button>
  );
};

export interface LinkButtonProps {
  children: React.ReactNode;
  href: string;
  target?: "_blank" | "_self";
}

export const LinkButton: React.FC<LinkButtonProps> = (props) => {
  return (
    <a
      className={styles.Button}
      href={props.href}
      target={props.target}
    >
      {props.children}
    </a>
  );
}
