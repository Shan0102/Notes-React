import { useEffect, useState, type FC } from "react";
import type { Note, PostNote } from "../../types";
import MyTextarea from "../MyTextarea/MyTextarea";

import styles from "./NoteInterface.module.css";
import MyButton from "../MyButton/MyButton";
import MyCheckbox from "../MyCheckbox/MyCheckbox";
import updateNote from "../../api/updateNote";
import LoadingDots from "../LoadingDots/LoadingDots";

interface NoteInterfaceProps {
    note: Note;
    update: (note: Note) => void;
    addError: (error: string) => void;
    setCurrNote: React.Dispatch<React.SetStateAction<Note | null>>;
}

const NoteInterface: FC<NoteInterfaceProps> = ({ note, update, addError, setCurrNote }) => {
    // addError("put error");
    const [noteTitle, setNoteTitle] = useState("");
    const [noteContent, setNoteContent] = useState("");
    const [noteCompleted, setNoteCompleted] = useState(false);

    const [isLoading, setIsLoading] = useState(false);

    useEffect(() => {
        setNoteTitle(note.title);
        setNoteContent(note.content);
        setNoteCompleted(note.completed === 1 ? true : false);
    }, [note]);

    // useEffect(() => {
    //     setCurrNote((prev) => {
    //         if (prev) {
    //             return {
    //                 ...prev,
    //                 title: noteTitle,
    //                 content: noteContent,
    //                 completed: noteCompleted ? 1 : 0,
    //             };
    //         }
    //         return null;
    //     });
    // }, [noteTitle, noteContent, noteCompleted]);

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
