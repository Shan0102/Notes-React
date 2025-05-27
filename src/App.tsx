import { BrowserRouter } from "react-router-dom";
import AuthContext from "./context/contextAuth";
import { useEffect, useState } from "react";
import AppRouter from "./components/AppRouter";
import checkIsAuth from "./api/checkIsAuth";
import { SettingsProvider } from "./context/SettingsContext";

function App() {
    const [isAuth, setIsAuth] = useState(false);

    useEffect(() => {
        setIsAuth(checkIsAuth);
    }, []);

    return (
        <AuthContext.Provider value={{ isAuth, setIsAuth }}>
            <SettingsProvider>
                <BrowserRouter>
                    <AppRouter />
                </BrowserRouter>
            </SettingsProvider>
        </AuthContext.Provider>
    );
}

export default App;
