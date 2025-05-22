import { BrowserRouter } from "react-router-dom";
import AuthContext from "./context/contextAuth";
import { useEffect, useState } from "react";
import AppRouter from "./components/AppRouter";
import checkIsAuth from "./api/checkIsAuth";

function App() {
    const [isAuth, setIsAuth] = useState(false);

    useEffect(() => {
        setIsAuth(checkIsAuth);
    }, []);

    return (
        <AuthContext.Provider value={{ isAuth, setIsAuth }}>
            <BrowserRouter>
                <AppRouter />
            </BrowserRouter>
        </AuthContext.Provider>
    );
}

export default App;
