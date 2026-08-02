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

import { trackEvent } from '@/utils/analytics/trackEvent';
import { THEME_STORAGE_KEY } from '@/utils/bootstrap/constants';
import { readInitialTheme } from '@/utils/bootstrap/read-client-preferences';
import { syncThemeCookie } from '@/utils/bootstrap/theme';
import { themeColors } from '@/utils/themeColors';

const inter = Inter({ subsets: ['latin'] });

type ThemeContextType = {
    mode: PaletteMode;
    toggleColorMode: (toggleLocation: string) => void;
};

const ThemeContext = createContext<ThemeContextType>({
    mode: 'light',
    toggleColorMode: (toggleLocation: string) => {},
});

export const useThemeContext = () => useContext(ThemeContext);

type ThemeRegistryProps = {
    children: React.ReactNode;
    initialTheme: PaletteMode;
};

export const ThemeRegistry: React.FC<ThemeRegistryProps> = ({
    children,
    initialTheme,
}) => {
    const [mode, setMode] = useState<PaletteMode>(initialTheme);

    useEffect(() => {
        const bootstrapTheme = readInitialTheme();
        if (bootstrapTheme !== mode) {
            setMode(bootstrapTheme);
        }
        // ponytail: one-shot reconcile when localStorage differs from SSR cookie
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    useEffect(() => {
        document.documentElement.setAttribute('data-theme', mode);
        localStorage.setItem(THEME_STORAGE_KEY, mode);
        syncThemeCookie(mode);
    }, [mode]);

    const toggleColorMode = (toggleLocation: string) => {
        trackEvent('click_target', {
            click_name: 'Theme Toggle',
            click_location: toggleLocation,
        });
        setMode((prevMode) => (prevMode === 'light' ? 'dark' : 'light'));
    };

    const contextValue = useMemo(
        () => ({
            mode,
            toggleColorMode,
        }),
        [mode]
    );

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
