import { useContext, useEffect, type FC } from "react";
import { useNavigate } from "react-router-dom";
import AuthContext from "../context/contextAuth";

const OauthCallbackPage: FC = () => {
    const navigate = useNavigate();
    const { setIsAuth } = useContext(AuthContext);

    useEffect(() => {
        const params = new URLSearchParams(window.location.search);
        const token = params.get("token");

        const userStr = params.get("user");
        const user = userStr === null ? null : JSON.parse(userStr);

        if (user && token) {
            setIsAuth(true);

            const expiresIn = new Date().getTime() + 24 * 60 * 60 * 1000;
            localStorage.setItem("user_id", user.user_id.toString());
            localStorage.setItem("token", token);
            localStorage.setItem("tokenExpires", expiresIn.toString());

            navigate("/");
        } else {
            navigate("/login");
        }
    }, [navigate]);

    return <div>Processing...</div>;
};

export default OauthCallbackPage;
