import React, { type FC } from "react";

import styles from "./PopUp.module.css";

interface PopUpProps {
    visible: boolean;
    setVisible: React.Dispatch<React.SetStateAction<boolean>>;
    children: React.ReactNode;
}

const PopUp: FC<PopUpProps> = ({ visible, setVisible, children }) => {
    return (
        <div
            className={`${styles["popup-container"]} ${visible ? styles.active : ""}`}
            onClick={() => setVisible(false)}
        >
            <div className={styles.popup} onClick={(e: React.MouseEvent) => e.stopPropagation()}>
                <button onClick={() => setVisible(false)} className={`${styles["popup-btn"]}`}>
                    &#10006;
                </button>
                {children}
            </div>
        </div>
    );
};

export default PopUp;
