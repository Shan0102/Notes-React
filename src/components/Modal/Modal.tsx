import React, { type FC } from "react";

import styles from "./Modal.module.css";

interface ModalProps {
    children: React.ReactNode;
    remove: () => void;
    isTop: boolean;
}

const Modal: FC<ModalProps> = ({ children, remove, isTop }) => {
    return (
        <div className={styles.modal}>
            {children}
            <button
                onClick={() => remove()}
                className={`${styles["modal-btn"]} ${isTop ? styles.top : ""}`}
            >
                &#10006;
            </button>
        </div>
    );
};

export default Modal;
