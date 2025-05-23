import React, { type FC } from "react";

import styles from "./Modal.module.css";

interface ModalProps {
    children: React.ReactNode;
    remove: () => void;
    isTop: boolean;
}

const Modal: FC<ModalProps> = ({ children, remove, isTop }) => {
    return (
        <div className={`${styles.modal}  ${isTop ? styles.top : ""}`}>
            {children}
            <button onClick={() => remove()} className={`${styles["modal-btn"]}`}>
                &#10006;
            </button>
        </div>
    );
};

export default Modal;
