import { useEffect, useState, type FC } from "react";
import type { Note, PostNote } from "../../types";
import MyTextarea from "../MyTextarea/MyTextarea";

import styles from "./NoteInterface.module.css";
import MyButton from "../MyButton/MyButton";
import MyCheckbox from "../MyCheckbox/MyCheckbox";
import updateNote from "../../api/updateNote";
import LoadingDots from "../LoadingDots/LoadingDots";
import deleteNoteByNoteId from "../../api/deleteNote";

interface NoteInterfaceProps {
    note: Note;
    update: (note: Note) => void;
    addError: (error: string) => void;
    deleteNoteHandler: (deleteNoteCallback: () => void, note_id: number) => void;
}

const NoteInterface: FC<NoteInterfaceProps> = ({ note, update, addError, deleteNoteHandler }) => {
    const [noteTitle, setNoteTitle] = useState("");
    const [noteContent, setNoteContent] = useState("");
    const [noteCompleted, setNoteCompleted] = useState(false);

    const [isLoading, setIsLoading] = useState(false);

    useEffect(() => {
        setNoteTitle(note.title);
        setNoteContent(note.content);
        setNoteCompleted(note.completed === 1 ? true : false);
    }, [note]);

    const saveChanges = async () => {
        const noteToUpdate: PostNote = {
            title: noteTitle,
            content: noteContent,
            completed: noteCompleted,
        };

        const [updatedNote, error] = await updateNote(noteToUpdate, note.note_id, setIsLoading);
        if (error) addError(error);
        if (updatedNote) update(updatedNote);
    };

    const deleteNote = async (note_id: number) => {
        const cb = async () => {
            const error = await deleteNoteByNoteId(note_id, setIsLoading);
            if (error) addError(error);
        };
        deleteNoteHandler(cb, note_id);
    };

    return (
        <div className={styles["note-interface"]}>
            <div className={styles["note-controllers"]}>
                <MyCheckbox
                    title="completed"
                    checked={noteCompleted}
                    setChecked={setNoteCompleted}
                />
                <div style={{ display: "flex", gap: "20px", alignItems: "center" }}>
                    {isLoading ? <LoadingDots /> : ""}
                    <MyButton title="SAVE" onclick={saveChanges} />
                    <MyButton title="DELETE" onclick={() => deleteNote(note.note_id)} />
                </div>
            </div>
            <div className={styles["note-areas"]}>
                <MyTextarea
                    name="title"
                    placeholder="note's title"
                    value={noteTitle}
                    setValue={setNoteTitle}
                />
                <MyTextarea
                    auto={false}
                    name="content"
                    placeholder="note's content"
                    value={noteContent}
                    setValue={setNoteContent}
                    max={10000}
                />
            </div>
        </div>
    );
};

export default NoteInterface;
