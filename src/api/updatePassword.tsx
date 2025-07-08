import type { PasswordsBody } from "../types";

const API_UPDATE_PASSWORD_PATH = "http://localhost:3000/api/users/password/";

type UpdatePasswordType = (
    form: HTMLFormElement,
    setIsLoading: React.Dispatch<React.SetStateAction<boolean>>
) => Promise<string | null>;

const updatePassword: UpdatePasswordType = async (form, setIsLoading) => {
    try {
        setIsLoading(true);

        const user_id = localStorage.getItem("user_id");
        const token = localStorage.getItem("token");

        const formData = new FormData(form);
        const dataToUpdate: PasswordsBody = {
            prev_password: formData.get("prev_password") as string,
            new_password: formData.get("new_password") as string,
        };

        const response = await fetch(API_UPDATE_PASSWORD_PATH + user_id, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
                authorization: `Bearer ${token ? token : -1}`,
            },
            body: JSON.stringify(dataToUpdate),
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

export default updatePassword;
