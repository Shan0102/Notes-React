import { type FC } from "react";
import styles from "./LoadingDots.module.css";

const LoadingDots: FC = () => {
    return (
        <div className={styles.loading}>
            <div className={styles.dot}></div>
            <div className={styles.dot}></div>
            <div className={styles.dot}></div>
        </div>
    );
};

export default LoadingDots;
