import { type FC } from "react";

import styles from "./UserPage.module.css";
import UserUpdate from "../../components/UserUpdate/UserUpdate";
import PasswordUpdate from "../../components/PasswordUpdate/PasswordUpdate";

const UserPage: FC = () => {
    const hasGoogle = localStorage.getItem("google_id");
    console.log(hasGoogle);
    return (
        <div className={styles.container}>
            <UserUpdate />
            {hasGoogle === "false" ? <PasswordUpdate /> : ""}
        </div>
    );
};

export default UserPage;
