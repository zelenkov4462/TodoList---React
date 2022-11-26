import React, { FC } from "react";
import styles from "./Modal.module.css";

interface ModalProps {
  children: React.ReactNode;
  close: () => void;
}

export const Modal: FC<ModalProps> = ({ children, close }) => {
  return (
    <div className={styles.modalWrap} onClick={close}>
      <div
        onClick={(e: any) => e.stopPropagation()}
        className={styles.modalContent}
      >
        {children}
      </div>
    </div>
  );
};
