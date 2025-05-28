import { type TFunction } from "i18next";

function validateName(name: string, t: TFunction): string | null {
    if (name.trim().length < 3) {
        return t("ValidationNameTooShort");
    }
    if (name.trim().length > 30) {
        return t("ValidationNameTooLong");
    }
    return null;
}

function validateEmail(email: string, t: TFunction) {
    const regex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    if (!regex.test(email)) {
        return t("ValidationEmailInvalid");
    }
    if (email.length > 255) {
        return t("ValidationEmailTooLong");
    }
    return null;
}

function validatePassword(password: string, t: TFunction) {
    if (password.length < 8 || password.length > 255) {
        return t("ValidationPasswordLength");
    }
    const regex =
        /^(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z])(?=.*[~`!@#$%^&*()_\-+={[}\]|\\:;"'<,>.?/]).+$/;
    if (!regex.test(password)) {
        return t("ValidationPasswordComplexity");
    }
    return null;
}

export { validateName, validateEmail, validatePassword };
