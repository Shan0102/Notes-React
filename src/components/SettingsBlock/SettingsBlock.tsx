import { useContext, type FC } from "react";
import MyButton from "../MyButton/MyButton";

import styles from "./SettingsBlock.module.css";
import { SettingsContext } from "../../context/SettingsContext";
import { useTranslation } from "react-i18next";

interface SettingsBlockProps {}

const SettingsBlock: FC<SettingsBlockProps> = () => {
    const { t } = useTranslation();
    const { language, setLanguage, theme, setTheme } = useContext(SettingsContext);

    return (
        <div className={styles.settings}>
            <h2 className={styles["settings_title"]}>{t("SettingsTitle")}</h2>
            <div className={styles["settings_block"]}>
                <h3 className={styles["settings_subtitle"]}>{t("SettingsChooseLang")}</h3>
                <div className={styles["settings_btn-controls"]}>
                    <MyButton
                        title={t("SettingsRussianLang")}
                        onclick={() => setLanguage("russian")}
                        active={language === "russian"}
                    />
                    <MyButton
                        title={t("SettingsEnglishLang")}
                        onclick={() => setLanguage("english")}
                        active={language === "english"}
                    />
                </div>
            </div>
            <div className={styles["settings_block"]}>
                <h3 className={styles["settings_subtitle"]}>{t("SettingsChooseTheme")}</h3>
                <div className={styles["settings_btn-controls"]}>
                    <MyButton
                        title={t("SettingsDarkTheme")}
                        onclick={() => setTheme("dark")}
                        active={theme === "dark"}
                    />
                    <MyButton
                        title={t("SettingsLightTheme")}
                        onclick={() => setTheme("light")}
                        active={theme === "light"}
                    />
                </div>
            </div>
        </div>
    );
};

export default SettingsBlock;
