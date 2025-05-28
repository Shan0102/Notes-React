import { useRef, useState, type FC } from "react";

import MyInput from "../../components/MyInput/MyInput";
import MyButton from "../../components/MyButton/MyButton";
import LoadingDots from "../../components/LoadingDots/LoadingDots";

import { validateName } from "../../utils/validation";
import updateUser from "../../api/updateUser";

import styles from "./UserPage.module.css";
import { useTranslation } from "react-i18next";

const UserPage: FC = () => {
    const { t } = useTranslation();

    const isPut = useRef(false);

    const [isNotValid1, setIsNotValid1] = useState(true);
    const [isNotValid2, setIsNotValid2] = useState(true);

    const [putError, setPutError] = useState<string | null>(null);
    const [isLoading, setIsLoading] = useState(false);

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        const [updatedUser, error] = await updateUser(e.currentTarget, setIsLoading);

        isPut.current = true;
        setPutError(error);
    };

    return (
        <div className={styles.container}>
            <div className={styles["user-page"]}>
                <h1 className={styles.title}>{t("UserPageTitle")}</h1>
                <form className={styles.form} onSubmit={handleSubmit}>
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
                    <div className={putError ? styles.error : styles.success}>
                        {putError || t("UserUpdateSuccess")}
                    </div>
                ) : (
                    ""
                )}
            </div>
        </div>
    );
};

export default UserPage;
