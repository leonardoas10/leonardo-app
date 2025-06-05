'use client';

import { PaletteMode } from '@mui/material';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { Inter } from 'next/font/google';
import React, {
    createContext,
    useState,
    useMemo,
    useContext,
    useEffect,
} from 'react';

import { themeColors } from '@/utils/themeColors';
import { trackEvent } from '@/utils/analytics/trackEvent';

const inter = Inter({ subsets: ['latin'] });

// Theme context type
type ThemeContextType = {
    mode: PaletteMode;
    toggleColorMode: (toggleLocation: string) => void;
};

// Create the context
const ThemeContext = createContext<ThemeContextType>({
    mode: 'light',
    toggleColorMode: (toggleLocation: string) => {},
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

    // Effect to update data-theme attribute on HTML element
    useEffect(() => {
        document.documentElement.setAttribute('data-theme', mode);
    }, [mode]);

    const toggleColorMode = (toggleLocation: string) => {
        trackEvent('toggle_click', {
            toggle_name: 'Theme Toggle',
            toggle_location: toggleLocation,
        });
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
