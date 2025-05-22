import { type FC } from "react";
import styles from "./MyButton.module.css";

interface MyButtonProps {
    title: string;
    disabled?: boolean;
    active?: boolean;
    type?: "button" | "submit" | "reset" | undefined;
    style?: "rounded" | "cube";
    size?: "s" | "m" | "l";
    onclick?: Function;
}

const MyButton: FC<MyButtonProps> = ({
    title,
    disabled = false,
    active,
    type = "button",
    style = "rounded",
    size = "m",
    onclick = () => {},
}) => {
    return (
        <button
            disabled={disabled}
            type={type}
            className={`${styles.btn} ${styles[style]} ${styles[size]} ${
                active ? styles.active : ""
            }`}
            onClick={() => onclick()}
        >
            {title}
        </button>
    );
};

export default MyButton;
