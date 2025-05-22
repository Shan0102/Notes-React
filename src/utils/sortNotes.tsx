import type { Note } from "../types";

const sortNotes = (notes: Note[]): Note[] => {
    notes.sort((a, b) => new Date(b.updated_at).getTime() - new Date(a.updated_at).getTime());
    return notes;
};

export default sortNotes;
