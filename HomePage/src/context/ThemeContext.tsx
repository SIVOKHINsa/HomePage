import { createContext, useState, useContext, useEffect, ReactNode } from 'react';

type Theme = 'light' | 'dark';

const ThemeKey = 'theme';

interface ThemeContextProps {
    theme: Theme;
    toggleTheme: () => void;
}

export const ThemeContext = createContext<ThemeContextProps>({
    theme: 'light',
    toggleTheme: () => {},
});

interface ThemeProviderProps {
    children: ReactNode;
}

const isValidTheme = (theme: string | null): theme is Theme => {
    return theme === 'light' || theme === 'dark';
};

export const ThemeProvider = ({ children }: ThemeProviderProps) => {
    const [theme, setTheme] = useState<Theme>(() => {
        const storedTheme = localStorage.getItem(ThemeKey);
        return isValidTheme(storedTheme) ? storedTheme : 'light';
    });

    const toggleTheme = () => {
        const newTheme = theme === 'light' ? 'dark' : 'light';
        setTheme(newTheme);
        localStorage.setItem(ThemeKey, newTheme);
    };

    useEffect(() => {
        document.body.setAttribute('data-theme', theme)

        return () => {
            document.body.removeAttribute('data-theme');
        };
    }, [theme]);

    return (
        <ThemeContext.Provider value={{ theme, toggleTheme }}>
            {children}
        </ThemeContext.Provider>
    );
};

export const useTheme = () => {
    const context = useContext(ThemeContext);
    return context;
};
