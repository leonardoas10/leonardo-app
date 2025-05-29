'use client';

import React, {
    createContext,
    useState,
    useMemo,
    useContext,
    useEffect,
} from 'react';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { PaletteMode } from '@mui/material';
import { Inter } from 'next/font/google';
import { themeColors } from '@/utils/themeColors';

const inter = Inter({ subsets: ['latin'] });

// Theme context type
type ThemeContextType = {
    mode: PaletteMode;
    toggleColorMode: () => void;
};

// Create the context
const ThemeContext = createContext<ThemeContextType>({
    mode: 'light',
    toggleColorMode: () => {},
});

// Custom hook to use the theme context
export const useThemeContext = () => useContext(ThemeContext);

export const ThemeRegistry: React.FC<{
    children: React.ReactNode;
}> = ({ children }) => {
    // Theme state management with localStorage persistence
    const [mode, setMode] = useState<PaletteMode>('dark');

    // Effect to handle client-side initialization
    useEffect(() => {
        const savedMode = localStorage.getItem('themeMode') as PaletteMode;
        if (savedMode === 'light' || savedMode === 'dark') {
            setMode(savedMode);
        }
    }, []);

    const toggleColorMode = () => {
        setMode((prevMode) => {
            const newMode = prevMode === 'light' ? 'dark' : 'light';
            localStorage.setItem('themeMode', newMode);
            return newMode;
        });
    };

    // Context value
    const contextValue = useMemo(
        () => ({
            mode,
            toggleColorMode,
        }),
        [mode]
    );

    // Create theme with current mode and Inter font
    const theme = useMemo(
        () =>
            createTheme({
                ...themeColors(mode),
                typography: {
                    fontFamily: inter.style.fontFamily,
                },
            }),
        [mode]
    );

    return (
        <ThemeContext.Provider value={contextValue}>
            <ThemeProvider theme={theme}>{children}</ThemeProvider>
        </ThemeContext.Provider>
    );
};
