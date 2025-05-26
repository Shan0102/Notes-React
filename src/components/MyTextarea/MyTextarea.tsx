import React, { useEffect, useRef, type FC } from "react";
import styles from "./MyTextarea.module.css";

interface MyTextareaProps {
    name: string;
    placeholder: string;
    value: string;
    setValue: (value: string) => void;
    max?: number;
    auto?: boolean;
}

const MyTextarea: FC<MyTextareaProps> = ({
    name,
    placeholder,
    value,
    setValue,
    max = 255,
    auto = true,
}) => {
    const textareaRef = useRef<HTMLTextAreaElement>(null);

    useEffect(() => {
        autosize();
    }, [value]);

    const changeHandler = (textareaValue: string) => {
        setValue(textareaValue);
    };

    const autosize = (): void => {
        if (!auto) return;
        const element = textareaRef.current;

        if (element) {
            element.style.height = 0 + "px";
            element.style.height = element.scrollHeight + "px";
        }
    };

    return (
        <textarea
            className={`${styles.textarea} ${!auto ? styles.scroll : ""}`}
            name={name}
            placeholder={placeholder}
            value={value}
            maxLength={max}
            onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) => {
                changeHandler(e.target.value);
            }}
            ref={textareaRef}
        />
    );
};

export default MyTextarea;
