import type React from "react";

interface Route {
    path: string;
    element: React.ReactElement;
}

interface Link {
    path: string;
    title: string;
    disabled?: boolean;
    smallPicture: string
}

interface User {
    user_id: number;
    name: string;
    username: string; // unique
    email: string; // unique
    google_id: string | null; // unique
    role: string;
    memory_usage: number; // bytes
    updated_at: string;
    created_at: string;
}

interface Note {
    note_id: number;
    user_id: number;
    title: string;
    content: string;
    completed: 1 | 0;
    updated_at: string;
    created_at: string;
}

interface PostNote {
    title: string;
    content: string;
    completed: boolean;
}

interface UpdateUserInfo {
    name: string;
    username: string;
}

interface ModalData {
    content: React.ReactNode;
    id: string;
}

export type { Route, Link, User, Note, PostNote, ModalData, UpdateUserInfo };
