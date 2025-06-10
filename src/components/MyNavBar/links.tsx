import type { Link } from "../../types";

const privateLinks: Link[] = [
    {
        path: "/",
        title: "Home",
        smallPicture: "/home.png",
    },
    {
        path: "/notes",
        title: "Notes",
        smallPicture: "/notes.png",
    },
];

const publicLinks: Link[] = [
    {
        path: "/",
        title: "Home",
        smallPicture: "/home.png",
    },
    {
        path: "/notes",
        title: "Notes",
        disabled: true,
        smallPicture: "/notes.png",
    },
    {
        path: "/signup",
        title: "Sign up",
        smallPicture: "/signup.png",
    },
    {
        path: "/login",
        title: "Login",
        smallPicture: "/login.png",
    },
];

export { privateLinks, publicLinks };
