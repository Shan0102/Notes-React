import { type FC } from "react";
import type { Note } from "../../types";
import { parseDate, parseTitle } from "../../utils/parseNote";

import styles from "./NoteItem.module.css";

interface NoteItemProps {
    note: Note;
    setCurrNote: React.Dispatch<React.SetStateAction<Note | null>>;
    isActive: boolean;
}

const NoteItem: FC<NoteItemProps> = ({ note, setCurrNote, isActive }) => {
    return (
        <div
            className={`${styles["note-item"]} ${isActive ? styles.active : ""}`}
            onClick={() => setCurrNote(note)}
        >
            <p className={`${styles.title} ${note.completed ? styles.done : ""}`}>
                {parseTitle(note.title)}
            </p>
            <p className={styles["last-change"]}>
                last change {parseDate(new Date(note.updated_at))}
            </p>
        </div>
    );
};

export default NoteItem;
