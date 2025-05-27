import React, { createContext, useState, useEffect, type FC } from "react";

interface SettingsContextType {
    language: string;
    setLanguage: (lang: string) => void;
    theme: string;
    setTheme: (theme: string) => void;
}

const SettingsContext = createContext<SettingsContextType>({
    language: "english",
    setLanguage: () => {},
    theme: "dark",
    setTheme: () => {},
});

const SettingsProvider: FC<{ children: React.ReactNode }> = ({ children }) => {
    const [language, setLanguage] = useState(localStorage.getItem("language") || "english");
    const [theme, setTheme] = useState(localStorage.getItem("theme") || "dark");

    useEffect(() => {
        localStorage.setItem("language", language);
        localStorage.setItem("theme", theme);
        document.documentElement.setAttribute("data-theme", theme); // For CSS variables
    }, [language, theme]);

    return (
        <SettingsContext.Provider value={{ language, setLanguage, theme, setTheme }}>
            {children}
        </SettingsContext.Provider>
    );
};

export { SettingsProvider, SettingsContext };
