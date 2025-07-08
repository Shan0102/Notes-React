import type { Note } from "../types";

const API_GET_NOTES_PATH = `${import.meta.env.VITE_SERVER_ENDPOINT}/api/notes/user/`;

type getNotesByUserIdType = (
    setIsLoading: React.Dispatch<React.SetStateAction<boolean>>
) => Promise<[notes: Note[], error: string | null]>;

const getNotesByUserId: getNotesByUserIdType = async (setIsLoading) => {
    try {
        setIsLoading(true);

        const user_id = localStorage.getItem("user_id");
        const token = localStorage.getItem("token");

        const response = await fetch(
            API_GET_NOTES_PATH + (user_id !== null ? user_id : (-1).toString()),
            {
                method: "GET",
                headers: {
                    authorization: `Bearer ${token ? token : -1}`,
                },
            }
        );

        if (!response.ok) {
            const error = await response.json();
            return [[], error.Error];
        } else {
            const notes = (await response.json()) as Note[];
            return [notes, null];
        }
    } catch (error) {
        if (error instanceof Error) return [[], error.message];
        else return [[], "unknown error"];
    } finally {
        setIsLoading(false);
    }
};

export default getNotesByUserId;
