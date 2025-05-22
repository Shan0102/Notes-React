import { useContext, type FC } from "react";
import AuthContext from "../context/contextAuth";
import { privateRoutes, publicRoutes } from "../routers/router";
import { Route, Routes } from "react-router-dom";
import MyNavBar from "./MyNavBar/MyNavBar";

const AppRouter: FC = () => {
    const { isAuth } = useContext(AuthContext);

    return isAuth ? (
        <Routes>
            <Route element={<MyNavBar />}>
                {privateRoutes.map((route) => (
                    <Route key={route.path} path={route.path} element={route.element} />
                ))}
            </Route>
        </Routes>
    ) : (
        <Routes>
            <Route element={<MyNavBar />}>
                {publicRoutes.map((route) => (
                    <Route key={route.path} path={route.path} element={route.element} />
                ))}
            </Route>
        </Routes>
    );
};

export default AppRouter;
