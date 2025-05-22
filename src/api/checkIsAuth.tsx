const CheckIsAuth = (): boolean => {
    if (
        localStorage.getItem("token") &&
        localStorage.getItem("tokenExpires") &&
        localStorage.getItem("user_id")
    )
        return true;
    else return false;
};

export default CheckIsAuth;
