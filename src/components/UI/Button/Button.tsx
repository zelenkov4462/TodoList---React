import React, { ButtonHTMLAttributes, DetailedHTMLProps, FC } from "react";
import cn from "classnames";
import styles from "./Button.module.css";

interface ButtonProps
  extends DetailedHTMLProps<
    ButtonHTMLAttributes<HTMLButtonElement>,
    HTMLButtonElement
  > {
  children: React.ReactNode;
  onClick: () => void;
  appearance: "add" | "edit" | "delete" | "file";
}

const Button: FC<ButtonProps> = ({
  children,
  onClick,
  appearance = "add",
  ...props
}) => {
  return (
    <button
      className={cn(styles.button, {
        [styles.add]: appearance === "add",
        [styles.edit]: appearance === "edit",
        [styles.delete]: appearance === "delete",
        [styles.file]: appearance === "file",
      })}
      onClick={onClick}
      {...props}
    >
      {children}
    </button>
  );
};

export default Button;
