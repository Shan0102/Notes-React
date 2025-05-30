import HomePage from "../pages/HomePage/HomePage";
import LoginPage from "../pages/LoginPage/LoginPage";
import NotesPage from "../pages/NotesPage/NotesPage";
import OauthCallbackPage from "../pages/OauthCallbackPage";
import SignUpPage from "../pages/SignUpPage/SignUpPage";
import UserPage from "../pages/UserPage/UserPage";
import type { Route } from "../types";

const privateRoutes: Route[] = [
    { path: "/", element: <HomePage /> },
    { path: "/notes", element: <NotesPage /> },
    { path: "/user", element: <UserPage /> },
    { path: "*", element: <HomePage /> },
];

const publicRoutes: Route[] = [
    { path: "/", element: <HomePage /> },
    { path: "/signup", element: <SignUpPage /> },
    { path: "/login", element: <LoginPage /> },
    { path: "/oauth/callback", element: <OauthCallbackPage /> },
    { path: "*", element: <HomePage /> },
];

export { privateRoutes, publicRoutes };
