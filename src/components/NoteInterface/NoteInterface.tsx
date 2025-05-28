import { useEffect, useState, type FC } from "react";
import type { Note, PostNote } from "../../types";
import MyTextarea from "../MyTextarea/MyTextarea";

import styles from "./NoteInterface.module.css";
import MyButton from "../MyButton/MyButton";
import MyCheckbox from "../MyCheckbox/MyCheckbox";
import updateNote from "../../api/updateNote";
import LoadingDots from "../LoadingDots/LoadingDots";
import deleteNoteByNoteId from "../../api/deleteNote";
import { deleteDraft, getDraftKey, updateDraft } from "../../utils/storeUnsavedChanges";
import { useTranslation } from "react-i18next";

interface NoteInterfaceProps {
    note: Note;
    update: (note: Note) => void;
    addError: (error: string) => void;
    deleteNoteHandler: (deleteNoteCallback: () => void, note_id: number) => void;
}

const NoteInterface: FC<NoteInterfaceProps> = ({ note, update, addError, deleteNoteHandler }) => {
    const { t } = useTranslation();

    const [noteTitle, setNoteTitle] = useState("");
    const [noteContent, setNoteContent] = useState("");
    const [noteCompleted, setNoteCompleted] = useState(false);

    const [isLoading, setIsLoading] = useState(false);

    const setInitialValues = () => {
        setNoteTitle(note.title);
        setNoteContent(note.content);
        setNoteCompleted(note.completed === 1);
    };

    useEffect(() => {
        const key = getDraftKey(note.note_id);
        const draft = localStorage.getItem(key);

        if (draft) {
            try {
                const parsed = JSON.parse(draft);
                setNoteTitle(parsed.title ?? note.title);
                setNoteContent(parsed.content ?? note.content);
                setNoteCompleted(parsed.completed ?? note.completed === 1);
            } catch {
                setInitialValues();
            }
        } else setInitialValues();
    }, [note]);

    const handleTitleChange = (value: string) => {
        setNoteTitle(value);
        updateDraft(note.note_id, value, noteContent, noteCompleted);
    };
    const handleContentChange = (value: string) => {
        setNoteContent(value);
        updateDraft(note.note_id, noteTitle, value, noteCompleted);
    };
    const handleCompletedChange = (checked: boolean) => {
        setNoteCompleted(checked);
        updateDraft(note.note_id, noteTitle, noteContent, checked);
    };

    const saveChanges = async () => {
        const noteToUpdate: PostNote = {
            title: noteTitle,
            content: noteContent,
            completed: noteCompleted,
        };

        const [updatedNote, error] = await updateNote(noteToUpdate, note.note_id, setIsLoading);
        if (error) addError(error);
        if (updatedNote) {
            update(updatedNote);
            deleteDraft(note.note_id);
        }
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
                    title={t("NoteCompleted")}
                    checked={noteCompleted}
                    setChecked={handleCompletedChange}
                />
                <div style={{ display: "flex", gap: "20px", alignItems: "center" }}>
                    {isLoading ? <LoadingDots /> : ""}
                    <MyButton title={t("NoteBtnSave")} onclick={saveChanges} />
                    <MyButton title={t("NoteBtnDelete")} onclick={() => deleteNote(note.note_id)} />
                </div>
            </div>
            <div className={styles["note-areas"]}>
                <MyTextarea
                    name="title"
                    placeholder={t("NoteTitlePlaceholder")}
                    value={noteTitle}
                    setValue={handleTitleChange}
                />
                <MyTextarea
                    auto={false}
                    name="content"
                    placeholder={t("NoteContentPlaceholder")}
                    value={noteContent}
                    setValue={handleContentChange}
                    max={10000}
                />
            </div>
        </div>
    );
};

export default NoteInterface;
