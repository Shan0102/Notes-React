import type { Link } from "../../types";

const privateLinks: Link[] = [
    {
        path: "/",
        title: "Home",
    },
    {
        path: "/notes",
        title: "Notes",
    },
];

const publicLinks: Link[] = [
    {
        path: "/",
        title: "Home",
    },
    {
        path: "/notes",
        title: "Notes",
        disabled: true,
    },
    {
        path: "/signup",
        title: "Sign up",
    },
    {
        path: "/login",
        title: "Login",
    },
];

export { privateLinks, publicLinks };
