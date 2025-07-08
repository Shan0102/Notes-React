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
import { useTranslation } from "react-i18next";

interface NotesPageProps {}

const NotesPage: FC<NotesPageProps> = () => {
    const { t } = useTranslation();

    const [isListShown, setIsListShown] = useState(true);

    const listRef = useRef<HTMLDivElement>(null);
    const interfaceRef = useRef<HTMLDivElement>(null);

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
                {t("ModalQuestion")}
                <div>
                    <MyButton title={t("ModalYes")} onclick={cb} />
                    <MyButton title={t("ModalNo")} onclick={deleteTopModal} />
                </div>
            </div>
        );
        addModal(modal);
    };

    const handleShowList = () => {
        if (isListShown) {
            setIsListShown(false);
            if (listRef.current && interfaceRef.current) {
                listRef.current.style.display = "none";
                interfaceRef.current.setAttribute("hidden", "false");
            }
        } else {
            setIsListShown(true);
            if (listRef.current && interfaceRef.current) {
                listRef.current.style.display = "block";
                interfaceRef.current.setAttribute("hidden", "true");
            }
        }
    };

    return (
        <div className={styles["notes-page"]}>
            <Modals addModalRef={addModalRef} deleteTopModalRef={deleteTopModalRef} />
            <div className={styles["notes-list"]} ref={listRef}>
                <MyButton title={t("AddNoteBtn")} onclick={createAndSetNote} disabled={isLoading} />
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
            <button onClick={handleShowList} className={styles["show-btn"]}>
                <img src={isListShown ? "./left-arrow.png" : "./right-arrow.png"} alt="" />
            </button>
            <div className={styles["notes-interface-container"]} ref={interfaceRef}>
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
