import type { User } from "../types";

const API_CREATE_USER_PATH = `${import.meta.env.VITE_SERVER_ENDPOINT}/api/users`;

type PostNewUserType = (
    form: HTMLFormElement,
    setIsLoading: React.Dispatch<React.SetStateAction<boolean>>
) => Promise<[user: User | null, error: string | null]>;

const postNewUser: PostNewUserType = async (form, setIsLoading) => {
    try {
        setIsLoading(true);

        const formData = new FormData(form);
        const user = {
            name: formData.get("name"),
            username: formData.get("username"),
            email: formData.get("email"),
            password: formData.get("password"),
        };

        const response = await fetch(API_CREATE_USER_PATH, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(user),
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

export default postNewUser;
