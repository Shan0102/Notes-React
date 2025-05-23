import type { Note, PostNote } from "../types";

const API_CREATE_NEW_NOTE_PATH = "http://localhost:3000/api/notes";

type CreateNewNoteType = (
    setIsLoading: React.Dispatch<React.SetStateAction<boolean>>
) => Promise<[note: Note | null, error: string | null]>;

const createNewNote: CreateNewNoteType = async (setIsLoading) => {
    try {
        setIsLoading(true);

        const token = localStorage.getItem("token");

        const newNote: PostNote = {
            title: "",
            content: "",
            completed: false,
        };

        const response = await fetch(API_CREATE_NEW_NOTE_PATH, {
            method: "POST",
            headers: {
                authorization: `Bearer ${token ? token : -1}`,
                "Content-Type": "application/json",
            },
            body: JSON.stringify(newNote),
        });

        if (!response.ok) {
            const error = await response.json();
            return [null, error.Error];
        } else {
            const note = (await response.json()) as Note;
            return [note, null];
        }
    } catch (error) {
        if (error instanceof Error) return [null, error.message];
        else return [null, "unknown error"];
    } finally {
        setIsLoading(false);
    }
};

export default createNewNote;
