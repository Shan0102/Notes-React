const API_DELETE_NOTE_PATH = "http://localhost:3000/api/notes/";

type DeleteNoteByNoteIdType = (
    note_id: number,
    setIsLoading: React.Dispatch<React.SetStateAction<boolean>>
) => Promise<string | null>;

const deleteNoteByNoteId: DeleteNoteByNoteIdType = async (note_id, setIsLoading) => {
    try {
        setIsLoading(true);

        const token = localStorage.getItem("token");

        const response = await fetch(API_DELETE_NOTE_PATH + note_id, {
            method: "DELETE",
            headers: {
                authorization: `Bearer ${token ? token : -1}`,
            },
        });

        if (!response.ok) {
            const error = await response.json();
            return error.Error;
        } else {
            return null;
        }
    } catch (error) {
        if (error instanceof Error) return error.message;
        else return "unknown error";
    } finally {
        setIsLoading(false);
    }
};

export default deleteNoteByNoteId;
