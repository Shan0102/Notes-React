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
import Modals from "../../components/Modals";

import styles from "./NotesPage.module.css";

interface NotesPageProps {}

const NotesPage: FC<NotesPageProps> = () => {
    const { isAuth } = useContext(AuthContext);

    const addModalRef = useRef<(content: React.ReactNode) => void>(null);
    const addModal = addModalRef.current ? addModalRef.current : () => {};

    const deleteTopModalRef = useRef<() => void>(null);
    const deleteTopModal = deleteTopModalRef.current ? deleteTopModalRef.current : () => {};

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

    const updateNoteList = (noteToUpdate: Note) => {
        setNotes((prev) => [
            noteToUpdate,
            ...prev.filter((note) => note.note_id !== noteToUpdate.note_id),
        ]);
    };

    const deleteNoteFromNotes = (note_id: number) => {
        setNotes((prev) => [...prev.filter((note) => note.note_id !== note_id)]);
    };

    const deleteNoteHandler = (deleteNoteCallback: () => void, note_id: number) => {
        const cb = () => {
            deleteTopModal();
            deleteNoteCallback();
            setCurrNote(null);
            deleteNoteFromNotes(note_id);
        };
        const modal = (
            <div>
                are you sure?
                <div>
                    <MyButton title="YES" onclick={cb} />
                    <MyButton title="NO" onclick={deleteTopModal} />
                </div>
            </div>
        );
        addModal(modal);
    };

    return (
        <div className={styles["notes-page"]}>
            <Modals addModalRef={addModalRef} deleteTopModalRef={deleteTopModalRef} />
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
                        update={updateNoteList}
                        addError={addModal}
                        deleteNoteHandler={deleteNoteHandler}
                    />
                ) : (
                    ""
                )}
            </div>
        </div>
    );
};

export default NotesPage;
