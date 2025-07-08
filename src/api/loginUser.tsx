import type { User } from "../types";

const API_LOGIN_USER_PATH = `${import.meta.env.VITE_SERVER_ENDPOINT}/api/users/login`;

type LoginUserType = (
    form: HTMLFormElement,
    setIsLoading: React.Dispatch<React.SetStateAction<boolean>>
) => Promise<
    [
        {
            user: User;
            token: string;
        } | null,
        string | null
    ]
>;

const loginUser: LoginUserType = async (form, setIsLoading) => {
    try {
        setIsLoading(true);

        const formData = new FormData(form);
        const user = {
            data: formData.get("data"),
            dataType: formData.get("data-type"),
            password: formData.get("password"),
        };

        const response = await fetch(API_LOGIN_USER_PATH, {
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
            const { user, token } = await response.json();
            return [{ user, token }, null];
        }
    } catch (error) {
        if (error instanceof Error) return [null, error.message];
        else return [null, "unknown error"];
    } finally {
        setIsLoading(false);
    }
};

export default loginUser
