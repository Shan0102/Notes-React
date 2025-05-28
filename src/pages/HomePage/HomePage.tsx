import { type FC } from "react";
import styles from "./HomePage.module.css";
import { useTranslation } from "react-i18next";

const HomePage: FC = () => {
    const { t } = useTranslation();
    return <div className={styles.home}>{t("HomePageTitle")}</div>;
};

export default HomePage;
