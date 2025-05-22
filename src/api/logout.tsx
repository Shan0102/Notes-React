function logout(setIsAuth: (value: boolean) => void) {
    setIsAuth(false);

    localStorage.removeItem("token");
    localStorage.removeItem("tokenExpires");
    localStorage.removeItem("user_id");
}

export default logout;
