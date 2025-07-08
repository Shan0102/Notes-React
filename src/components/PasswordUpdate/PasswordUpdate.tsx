import { useRef, useState, type FC } from "react";

import MyInput from "../../components/MyInput/MyInput";
import MyButton from "../../components/MyButton/MyButton";
import LoadingDots from "../../components/LoadingDots/LoadingDots";

import { validatePassword } from "../../utils/validation";
import updatePassword from "../../api/updatePassword";

import styles from "./PasswordUpdate.module.css";
import { useTranslation } from "react-i18next";

interface PasswordUpdateProps {}

const PasswordUpdate: FC<PasswordUpdateProps> = () => {
    const { t } = useTranslation();

    const isPut = useRef(false);

    const [isNotValid, setIsNotValid] = useState(true);
    const [putPasswordError, setPutPasswordError] = useState<string | null>(null);
    const [isLoading, setIsLoading] = useState(false);

    const handlePasswordSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        const error = await updatePassword(e.currentTarget, setIsLoading);

        isPut.current = true;
        setPutPasswordError(error);
    };

    return (
        <div className={styles["password-update"]}>
            <h1 className={styles.title}>{t("UserPasswordTitle")}</h1>
            <form className={styles.form} onSubmit={handlePasswordSubmit}>
                <MyInput
                    type="password"
                    name="prev_password"
                    placeholder={t("UserNewPasswordPH")}
                    required={true}
                />
                <MyInput
                    type="password"
                    name="new_password"
                    placeholder={t("UserOldPasswordPH")}
                    validation={(value) => validatePassword(value, t)}
                    setError={setIsNotValid}
                    required={true}
                />
                <MyButton disabled={isNotValid} title={t("UserBtnSave")} type="submit" />
            </form>
            {isLoading ? <LoadingDots /> : ""}
            {isPut.current ? (
                <div className={putPasswordError ? styles.error : styles.success}>
                    {putPasswordError || t("PasswordUpdateSuccess")}
                </div>
            ) : (
                ""
            )}
        </div>
    );
};

export default PasswordUpdate;
