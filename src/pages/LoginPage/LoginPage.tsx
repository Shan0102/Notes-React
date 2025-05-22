import { useContext, useState, type FC } from "react";
import MyButton from "../../components/MyButton/MyButton";
import MyInput from "../../components/MyInput/MyInput";

import { validateName, validateEmail } from "../../utils/validation";
import loginUser from "../../api/loginUser";

import styles from "./LoginPage.module.css";
import AuthContext from "../../context/contextAuth";
import LoadingDots from "../../components/LoadingDots/LoadingDots";

interface LoginPageProps {}

const LoginPage: FC<LoginPageProps> = () => {
    const { setIsAuth } = useContext(AuthContext);

    const [dataType, setDataType] = useState<"username" | "email">("username");
    const [dataValidation, setDataValidation] = useState(() => validateName);

    const [loginError, setLoginError] = useState<string | null>(null);
    const [error, setError] = useState(true);
    const [isLoading, setIsLoading] = useState(false);

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const [userInfo, error] = await loginUser(e.currentTarget, setIsLoading);
        setLoginError(error);

        if (userInfo) {
            setIsAuth(true);

            const expiresIn = new Date().getTime() + 24 * 60 * 60 * 1000;
            localStorage.setItem("user_id", userInfo.user.user_id.toString());
            localStorage.setItem("token", userInfo.token);
            localStorage.setItem("tokenExpires", expiresIn.toString());
        }
    };

    const setUsername = () => {
        setDataType("username");
        setDataValidation(() => validateName);
    };
    const setEmail = () => {
        setDataType("email");
        setDataValidation(() => validateEmail);
    };

    return (
        <div className={styles.container}>
            <form className={styles.form} onSubmit={handleSubmit}>
                <div className={styles["btn-container"]}>
                    <MyButton
                        title="username"
                        active={dataType === "username"}
                        onclick={setUsername}
                    />
                    <MyButton title="email" active={dataType === "email"} onclick={setEmail} />
                </div>
                <input name="data-type" type="hidden" value={dataType}></input>
                <MyInput
                    name="data"
                    placeholder={dataType + " for login"}
                    validation={dataValidation}
                    setError={setError}
                />
                <MyInput name="password" type="password" placeholder="password" />
                <MyButton disabled={error} title="Login" type="submit" />
                {isLoading ? <LoadingDots /> : ""}
                {loginError ? <div className={styles.result}>{loginError}</div> : ""}
            </form>
        </div>
    );
};

export default LoginPage;
