import { useContext, useEffect, useRef, useState, type FC } from "react";

import type { Note } from "../../types";
import getNotesByUserId from "../../api/getNotesByUserId";
import NoteItem from "../../components/NoteItem/NoteItem";
import NoteInterface from "../../components/NoteInterface/NoteInterface";
import MyButton from "../../components/MyButton/MyButton";
import createNewNote from "../../api/createNewNote";
import sortNotes from "../../utils/sortNotes";
import LoadingDots from "../../components/LoadingDots/LoadingDots";
import AuthContext from "../../context/contextAuth";
import Modals from "../../components/modals";

import styles from "./NotesPage.module.css";

interface NotesPageProps {}

const NotesPage: FC<NotesPageProps> = () => {
    const { isAuth } = useContext(AuthContext);

    const addModalRef = useRef<(text: string) => void>(null);
    const addModal = addModalRef.current ? addModalRef.current : () => {};

    const [isLoading, setIsLoading] = useState(false);

    const [notes, setNotes] = useState<Note[]>([]);
    const [currNote, setCurrNote] = useState<null | Note>(null);

    useEffect(() => {
        async function fetchNotes() {
            const [gotNotes, error] = await getNotesByUserId(setIsLoading);
            const sortedNotes = sortNotes(gotNotes);
            setNotes(sortedNotes);
            if (error) addModal(error);
        }

        fetchNotes();
    }, [isAuth]);

    const createAndSetNote = async () => {
        const [note, error] = await createNewNote(setIsLoading);
        if (error) addModal(error);
        if (note) {
            setCurrNote(note);
            insertNewNoteIntoNotes(note);
        }
    };

    const insertNewNoteIntoNotes = (note: Note): void => {
        const sortedNotes = sortNotes([...notes, note]);
        setNotes(sortedNotes);
    };

    const updateNote = (noteToUpdate: Note) => {
        setNotes((prev) => [
            noteToUpdate,
            ...prev.filter((note) => note.note_id !== noteToUpdate.note_id),
        ]);
    };

    return (
        <div className={styles["notes-page"]}>
            <Modals ref={addModalRef} />
            <div className={styles["notes-list"]}>
                <MyButton title="add new note+" onclick={createAndSetNote} disabled={isLoading} />
                {isLoading ? <LoadingDots /> : ""}
                {notes.map((note) => (
                    <NoteItem
                        note={note}
                        isActive={currNote?.note_id === note.note_id}
                        setCurrNote={setCurrNote}
                        key={note.note_id}
                    />
                ))}
            </div>
            <div className={styles["notes-interface-container"]}>
                {currNote ? (
                    <NoteInterface
                        note={currNote}
                        setCurrNote={setCurrNote}
                        update={updateNote}
                        addError={addModal}
                    />
                ) : (
                    ""
                )}
            </div>
        </div>
    );
};

export default NotesPage;
