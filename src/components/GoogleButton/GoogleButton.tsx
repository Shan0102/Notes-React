import { type FC } from "react";
import styles from "./GoogleButton.module.css";
import getGoogleUrl from "../../utils/getGoogleUrl";
import { useTranslation } from "react-i18next";

interface GoogleButtonProps {
    type: "Login" | "SignUp";
}

const GoogleButton: FC<GoogleButtonProps> = ({ type }) => {
    const { t } = useTranslation();

    return (
        <a className={styles.btn} href={getGoogleUrl()}>
            <img className={styles.img} src="/google.svg" alt="" />
            <div>{t(`${type}Google`)}</div>
        </a>
    );
};

export default GoogleButton;
