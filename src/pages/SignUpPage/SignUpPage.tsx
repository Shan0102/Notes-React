import React, { useRef, useState, type FC } from "react";
import MyInput from "../../components/MyInput/MyInput";
import MyButton from "../../components/MyButton/MyButton";
import styles from "./SignUpPage.module.css";
import { validateName, validateEmail, validatePassword } from "../../utils/validation";
import postNewUser from "../../api/postNewUser";
import LoadingDots from "../../components/LoadingDots/LoadingDots";
import { useTranslation } from "react-i18next";

const SignUpPage: FC = () => {
    const { t } = useTranslation();

    const isPosted = useRef(false);

    const [error1, setError1] = useState(true);
    const [error2, setError2] = useState(true);
    const [error3, setError3] = useState(true);
    const [error4, setError4] = useState(true);

    const [postError, setPostError] = useState<null | string>(null);
    const [isLoading, setIsLoading] = useState(false);

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const [user, error] = await postNewUser(e.currentTarget, setIsLoading);
        console.log(user);

        isPosted.current = true;
        setPostError(error);
    };

    return (
        <div className={styles.container}>
            <form className={styles.form} onSubmit={handleSubmit}>
                <MyInput
                    name="name"
                    placeholder={t("SignUpNamePH")}
                    validation={validateName}
                    setError={setError1}
                />
                <MyInput
                    name="username"
                    placeholder={t("SignUpUsernamePH")}
                    validation={validateName}
                    setError={setError2}
                />
                <MyInput
                    name="email"
                    type="email"
                    placeholder={t("SignUpEmailPH")}
                    validation={validateEmail}
                    setError={setError3}
                />
                <MyInput
                    name="password"
                    type="password"
                    placeholder={t("SignUpPasswordPH")}
                    validation={validatePassword}
                    setError={setError4}
                />
                <MyButton
                    disabled={error1 || error2 || error3 || error4}
                    title={t("SignUpBtnCreate")}
                    type="submit"
                />
                {isLoading ? <LoadingDots /> : ""}
                {isPosted.current ? (
                    <div className={postError ? styles.error : styles.success}>
                        {postError || t("SignUpSubmitSuccess")}
                    </div>
                ) : (
                    ""
                )}
            </form>
        </div>
    );
};

export default SignUpPage;
