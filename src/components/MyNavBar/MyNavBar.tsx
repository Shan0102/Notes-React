import { useContext, useState, type FC } from "react";
import { NavLink, Outlet } from "react-router-dom";

import logout from "../../api/logout";
import AuthContext from "../../context/contextAuth";
import { privateLinks, publicLinks } from "./links";

import styles from "./MyNavBar.module.css";
import PopUp from "../PopUp/PopUp";
import SettingsBlock from "../SettingsBlock/SettingsBlock";
import { useTranslation } from "react-i18next";

function disable(disabled: boolean) {
    if (disabled) {
        return (e: React.MouseEvent<HTMLAnchorElement>) => {
            e.preventDefault();
        };
    } else return () => {};
}

const MyNavBar: FC = () => {
    const { t } = useTranslation();

    const { isAuth, setIsAuth } = useContext(AuthContext);
    const links = isAuth ? privateLinks : publicLinks;

    const [visible, setVisible] = useState(false);

    return (
        <>
            <div className={styles.nav}>
                <div className={styles.links}>
                    {links.map((link) => (
                        <NavLink
                            key={link.title}
                            to={link.path}
                            className={({ isActive }) => {
                                return `${styles.link} ${isActive ? styles.active : ""} ${
                                    link.disabled ? styles.disabled : ""
                                }`;
                            }}
                            onClick={disable(link.disabled ? true : false)}
                        >
                            {t(`NavLink${link.title}`)}
                        </NavLink>
                    ))}
                </div>
                <div className={styles["user-actions"]}>
                    {links === privateLinks ? (
                        <>
                            <NavLink
                                to={"/user"}
                                className={({ isActive }) => {
                                    return `${styles.link} ${isActive ? styles.active : ""}`;
                                }}
                            >
                                {t("NavLinkUser")}
                            </NavLink>
                            <button className={styles.link} onClick={() => logout(setIsAuth)}>
                                {t("NavBtnLogout")}
                            </button>
                        </>
                    ) : (
                        ""
                    )}
                    <button className={`${styles.settings}`} onClick={() => setVisible(true)}>
                        &#9881;
                    </button>
                </div>
            </div>
            <PopUp visible={visible} setVisible={setVisible}>
                <SettingsBlock />
            </PopUp>
            <Outlet />
        </>
    );
};

export default MyNavBar;
