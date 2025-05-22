import React, { useEffect, useRef, useState, type FC } from "react";
import styles from "./MyInput.module.css";

interface MyInputProps {
    name: string;
    placeholder: string;
    value?: string;
    type?: string;
    required?: boolean;
    validation?: (value: string) => string | null;
    setError?: React.Dispatch<React.SetStateAction<boolean>>;
}

const MyInput: FC<MyInputProps> = ({
    name,
    placeholder,
    type = "text",
    required = true,
    validation,
    setError,
    value,
}) => {
    const [inputError, setInputError] = useState<string | null>(null);
    const [inputValue, setinputValue] = useState<string>("");
    const isFirstRun = useRef(true);

    const changeHandler = (value: string) => {
        setinputValue(value);

        let error: null | string = null;
        if (validation) error = validation(value);

        if (setError) setError(error ? true : false);
        if (!isFirstRun.current) setInputError(error);
    };

    const handleBlur = () => {
        isFirstRun.current = false;
        changeHandler(inputValue);
    };

    useEffect(() => {
        if (!isFirstRun.current) handleBlur();
        if (value) setinputValue(value);
    }, [validation, value]);

    return (
        <div className={styles.container}>
            <input
                value={inputValue}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                    changeHandler(e.target.value);
                }}
                name={name}
                className={styles.input}
                type={type}
                required={required}
                placeholder={placeholder}
                onBlur={() => handleBlur()}
            />
            {inputError ? <p className={styles.error}>{inputError}</p> : ""}
        </div>
    );
};

export default MyInput;
