'use client';

import React, { createContext, useState, useMemo, useContext } from 'react';
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
    // Theme state management
    const [mode, setMode] = useState<PaletteMode>('dark');

    const toggleColorMode = () => {
        setMode((prevMode) => (prevMode === 'light' ? 'dark' : 'light'));
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
}