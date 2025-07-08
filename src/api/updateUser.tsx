import type { User, UpdateUserInfo } from "../types";

const API_UPDATE_USER_PATH = "http://localhost:3000/api/users/info/";

type UpdateUserType = (
    form: HTMLFormElement,
    setIsLoading: React.Dispatch<React.SetStateAction<boolean>>
) => Promise<[user: User | null, error: string | null]>;

const updateUser: UpdateUserType = async (form, setIsLoading) => {
    try {
        setIsLoading(true);

        const user_id = localStorage.getItem("user_id");
        const token = localStorage.getItem("token");

        const formData = new FormData(form);
        const dataToUpdate: UpdateUserInfo = {
            name: formData.get("name") as string,
            username: formData.get("username") as string,
        };

        const response = await fetch(API_UPDATE_USER_PATH + user_id, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
                authorization: `Bearer ${token ? token : -1}`,
            },
            body: JSON.stringify(dataToUpdate),
        });

        if (!response.ok) {
            const error = await response.json();
            return [null, error.Error];
        } else {
            const user = (await response.json()) as User;
            return [user, null];
        }
    } catch (error) {
        if (error instanceof Error) return [null, error.message];
        else return [null, "unknown error"];
    } finally {
        setIsLoading(false);
    }
};

export default updateUser;
