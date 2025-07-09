import { useRef, useState, type FC } from "react";

import MyInput from "../../components/MyInput/MyInput";
import MyButton from "../../components/MyButton/MyButton";
import LoadingDots from "../../components/LoadingDots/LoadingDots";

import { validateName } from "../../utils/validation";
import updateUser from "../../api/updateUser";

import styles from "./UserUpdate.module.css";
import { useTranslation } from "react-i18next";

interface UserUpdateProps {}

const UserUpdate: FC<UserUpdateProps> = () => {
    const { t } = useTranslation();

    const isPut = useRef(false);

    const [isNotValid1, setIsNotValid1] = useState(true);
    const [isNotValid2, setIsNotValid2] = useState(true);

    const [putUserInfoError, setPutUserInfoError] = useState<string | null>(null);
    const [isLoading, setIsLoading] = useState(false);

    const handleUserInfoSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        const [, error] = await updateUser(e.currentTarget, setIsLoading);

        isPut.current = true;
        setPutUserInfoError(error);
    };

    return (
        <div className={styles["user-update"]}>
            <h1 className={styles.title}>{t("UserInfoTitle")}</h1>
            <form className={styles.form} onSubmit={handleUserInfoSubmit}>
                <MyInput
                    name="name"
                    placeholder={t("UserNamePH")}
                    validation={(value) => validateName(value, t)}
                    setError={setIsNotValid1}
                />
                <MyInput
                    name="username"
                    placeholder={t("UserUsernamePH")}
                    validation={(value) => validateName(value, t)}
                    setError={setIsNotValid2}
                />
                <MyButton
                    disabled={isNotValid1 || isNotValid2}
                    title={t("UserBtnSave")}
                    type="submit"
                />
            </form>
            {isLoading ? <LoadingDots /> : ""}
            {isPut.current ? (
                <div className={putUserInfoError ? styles.error : styles.success}>
                    {putUserInfoError || t("UserUpdateSuccess")}
                </div>
            ) : (
                ""
            )}
        </div>
    );
};

export default UserUpdate;
