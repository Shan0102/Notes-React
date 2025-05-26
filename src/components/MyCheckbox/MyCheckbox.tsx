import React, { type FC } from "react";

import styles from "./MyCheckbox.module.css";

interface MyCheckboxProps {
    title: string;
    checked: boolean;
    setChecked: (checked: boolean) => void;
}

const MyCheckbox: FC<MyCheckboxProps> = ({ title, checked, setChecked }) => {
    return (
        <label className={styles["checkbox-container"]}>
            {title}
            <input
                checked={checked}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) => setChecked(e.target.checked)}
                type="checkbox"
                name="completed"
                id="completed"
                className={styles["checkbox"]}
            />
            <div className={styles["checkmark"]}></div>
        </label>
    );
};

export default MyCheckbox;
