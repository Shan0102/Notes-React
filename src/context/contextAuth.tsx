import { createContext } from "react";

interface AuthContextType {
    isAuth: boolean;
    setIsAuth: (value: boolean) => void;
}

const AuthContext = createContext<AuthContextType>({
    isAuth: false,
    setIsAuth: () => {},
});

export default AuthContext;
