import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import LanguageDetector from "i18next-browser-languagedetector";

i18n.use(LanguageDetector) // Automatically detect the user's language
    .use(initReactI18next) // Pass i18n instance to react-i18next
    .init({
        resources: {
            english: {
                // {t('ValidationNameTooShort')}
                translation: {
                    // home page
                    HomePageTitle: "Home Page",

                    // settings
                    SettingsTitle: "Settings",
                    SettingsChooseLang: "Choose a language",
                    SettingsChooseTheme: "Choose a theme",
                    SettingsEnglishLang: "english",
                    SettingsRussianLang: "russian",
                    SettingsDarkTheme: "dark",
                    SettingsLightTheme: "light",

                    // navbar
                    NavLinkHome: "Home",
                    NavLinkNotes: "Notes",
                    "NavLinkSign up": "Sign up",
                    NavLinkLogin: "Login",
                    NavLinkUser: "User",
                    NavBtnLogout: "Logout",

                    // modal
                    ModalQuestion: "are you sure?",
                    ModalYes: "YES",
                    ModalNo: "NO",

                    // notes
                    AddNoteBtn: "add new note+",
                    NoteBtnSave: "SAVE",
                    NoteBtnDelete: "DELETE",
                    NoteCompleted: "completed",
                    NoteTitlePlaceholder: "note's title",
                    NoteContentPlaceholder: "note's content",
                    NoteLastChange: "last change",

                    // update user
                    UserPageTitle: "You can change user info",
                    UserNamePH: "name",
                    UserUsernamePH: "username",
                    UserBtnSave: "Save changes",
                    UserUpdateSuccess: "User updated succesfully",

                    // login page
                    LoginBtnUsername: "username",
                    LoginBtnEmail: "email",
                    ["Login-username-PH"]: "username",
                    ["Login-email-PH"]: "email",
                    LoginPasswordPH: "password",
                    LoginBtnSubmit: "Login",

                    // signup page
                    SignUpNamePH: "name you see",
                    SignUpUsernamePH: "username for login",
                    SignUpEmailPH: "your email",
                    SignUpPasswordPH: "password",
                    SignUpBtnCreate: "Create user",
                    SignUpSubmitSuccess: "User created succesfully",

                    // validation
                    ValidationNameTooShort: "Name length must be at least 3",
                    ValidationNameTooLong: "Name length must not be less than 30",
                    ValidationEmailInvalid: "Email format is invalid",
                    ValidationEmailTooLong: "Email must be between 6 and 255 characters long",
                    ValidationPasswordLength: "Password length from 8 to 255 characters long.",
                    ValidationPasswordComplexity:
                        "At least one uppercase, one lowercase, one number and symbol.",
                },
            },
            russian: {
                translation: {
                    // home page
                    HomePageTitle: "Домашняя страница",

                    // settings
                    SettingsTitle: "Настройки",
                    SettingsChooseLang: "Выберите язык",
                    SettingsChooseTheme: "Выберите тему",
                    SettingsEnglishLang: "английский",
                    SettingsRussianLang: "русский",
                    SettingsDarkTheme: "темная",
                    SettingsLightTheme: "светлая",

                    // navbar
                    NavLinkHome: "Главная",
                    NavLinkNotes: "Заметки",
                    "NavLinkSign up": "Зарегистрироваться",
                    NavLinkLogin: "Войти",
                    NavLinkUser: "Пользователь",
                    NavBtnLogout: "Выйти",

                    // modal
                    ModalQuestion: "Вы уверены",
                    ModalYes: "ДА",
                    ModalNo: "НЕТ",

                    // notes
                    AddNoteBtn: "добавить заметку+",
                    NoteBtnSave: "СОХРАНИТЬ",
                    NoteBtnDelete: "УДАЛИТЬ",
                    NoteCompleted: "завершена",
                    NoteTitlePlaceholder: "заголовок",
                    NoteContentPlaceholder: "содержимое",
                    NoteLastChange: "изменено",

                    // update user
                    UserPageTitle: "Изменить информацию о вас",
                    UserNamePH: "имя",
                    UserUsernamePH: "имя пользователя",
                    UserBtnSave: "Сохранить",
                    UserUpdateSuccess: "Изменения сохранены",

                    // login page
                    LoginBtnUsername: "пользователь",
                    LoginBtnEmail: "почта",
                    ["Login-username-PH"]: "имя пользователя",
                    ["Login-email-PH"]: "почта",
                    LoginPasswordPH: "пароль",
                    LoginBtnSubmit: "Войти",

                    // signup page
                    SignUpNamePH: "отображаемое имя",
                    SignUpUsernamePH: "имя пользователя",
                    SignUpEmailPH: "твоя почта",
                    SignUpPasswordPH: "пароль",
                    SignUpBtnCreate: "Создать аккаунт",
                    SignUpSubmitSuccess: "Аккаунт создан",

                    // validation
                    ValidationNameTooShort: "Имя должно быть не менее 3 символов",
                    ValidationNameTooLong: "Имя должно быть не более 30 символов",
                    ValidationEmailInvalid: "Неверный формат электронной почты",
                    ValidationEmailTooLong: "Почта должна быть от 6 до 255 символов",
                    ValidationPasswordLength: "Пароль должен быть от 8 до 255 символов",
                    ValidationPasswordComplexity:
                        "Минимум одна заглавную и одну строчную буквы, одну цифру и символ",
                },
            },
        },
        fallbackLng: "english", // Default language if the user's language is not available
        interpolation: {
            escapeValue: false, // React already escapes values
        },
    });

export default i18n;
