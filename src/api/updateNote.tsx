import type { Note, PostNote } from "../types";

const token = localStorage.getItem("token");

const API_UPDATE_NOTE_PATH = "http://localhost:3000/api/notes/";

type UpdateNoteType = (
    note: PostNote,
    note_id: number,
    setIsLoading: React.Dispatch<React.SetStateAction<boolean>>
) => Promise<[note: Note | null, error: string | null]>;

const updateNote: UpdateNoteType = async (note, note_id, setIsLoading) => {
    try {
        setIsLoading(true);

        const response = await fetch(API_UPDATE_NOTE_PATH + note_id, {
            method: "PUT",
            headers: {
                authorization: `Bearer ${token ? token : -1}`,
                "Content-Type": "application/json",
            },
            body: JSON.stringify(note),
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

export default updateNote;
