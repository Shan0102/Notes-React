function validateName(name: string): string | null {
    if (name.trim().length < 3) {
        return "Name length must be at least 3";
    }
    if (name.trim().length > 30) {
        return "Name length must not be more than 30";
    }
    return null;
}

function validateEmail(email: string) {
    const regex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    if (!regex.test(email)) {
        return "Email format is invalid";
    }
    if (email.length > 255) {
        return "Email must be between 6 and 255 characters long";
    }
    return null;
}

function validatePassword(password: string) {
    if (password.length < 8 || password.length > 255) {
        return "Password length from 8 to 255 characters long.";
    }
    const regex =
        /^(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z])(?=.*[~`!@#$%^&*()_\-+={[}\]|\\:;"'<,>.?/]).+$/;
    if (!regex.test(password)) {
        return "At least one uppercase, one lowercase, one number, and one symbol.";
    }
    return null;
}

export { validateName, validateEmail, validatePassword };
