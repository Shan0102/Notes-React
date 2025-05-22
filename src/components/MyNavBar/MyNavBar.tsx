import { useContext, type FC } from "react";
import { NavLink, Outlet } from "react-router-dom";

import logout from "../../api/logout";
import AuthContext from "../../context/contextAuth";
import { privateLinks, publicLinks } from "./links";

import styles from "./MyNavBar.module.css";

function disable(disabled: boolean) {
    if (disabled) {
        return (e: React.MouseEvent<HTMLAnchorElement>) => {
            e.preventDefault();
        };
    } else return () => {};
}

const MyNavBar: FC = () => {
    const { isAuth, setIsAuth } = useContext(AuthContext);
    const links = isAuth ? privateLinks : publicLinks;

    return (
        <>
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
                        {link.title}
                    </NavLink>
                ))}
                {links === privateLinks ? (
                    <button className={styles.link} onClick={() => logout(setIsAuth)}>
                        Logout
                    </button>
                ) : (
                    ""
                )}
            </div>
            <Outlet />
        </>
    );
};

export default MyNavBar;
