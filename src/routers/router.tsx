import HomePage from "../pages/HomePage/HomePage";
import LoginPage from "../pages/LoginPage/LoginPage";
import NotesPage from "../pages/NotesPage/NotesPage";
import SignUpPage from "../pages/SignUpPage/SignUpPage";
import type { Route } from "../types";

const privateRoutes: Route[] = [
    { path: "/", element: <HomePage /> },
    { path: "/notes", element: <NotesPage /> },
    { path: "*", element: <HomePage /> },
];

const publicRoutes: Route[] = [
    { path: "/", element: <HomePage /> },
    { path: "/signup", element: <SignUpPage /> },
    { path: "/login", element: <LoginPage /> },
    { path: "*", element: <HomePage /> },
];

export { privateRoutes, publicRoutes };
