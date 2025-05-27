import { useContext, type FC } from "react";
import MyButton from "../MyButton/MyButton";

import styles from "./SettingsBlock.module.css";
import { SettingsContext } from "../../context/SettingsContext";

interface SettingsBlockProps {}

const SettingsBlock: FC<SettingsBlockProps> = () => {
    const { language, setLanguage, theme, setTheme } = useContext(SettingsContext);

    return (
        <div className={styles.settings}>
            <h2 className={styles["settings_title"]}>Settings</h2>
            <div className={styles["settings_block"]}>
                <h3 className={styles["settings_subtitle"]}>Choose a language</h3>
                <div className={styles["settings_btn-controls"]}>
                    <MyButton
                        title="russian"
                        onclick={() => setLanguage("russian")}
                        active={language === "russian"}
                    />
                    <MyButton
                        title="english"
                        onclick={() => setLanguage("english")}
                        active={language === "english"}
                    />
                </div>
            </div>
            <div className={styles["settings_block"]}>
                <h3 className={styles["settings_subtitle"]}>Choose a theme</h3>
                <div className={styles["settings_btn-controls"]}>
                    <MyButton
                        title="dark"
                        onclick={() => setTheme("dark")}
                        active={theme === "dark"}
                    />
                    <MyButton
                        title="light"
                        onclick={() => setTheme("light")}
                        active={theme === "light"}
                    />
                </div>
            </div>
        </div>
    );
};

export default SettingsBlock;
