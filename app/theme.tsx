'use client';

import { createTheme, ThemeProvider } from '@mui/material/styles';
import { Inter } from 'next/font/google';
import { useMemo } from 'react';
import { themeColors } from '../utils/themeColors';
import { useThemeContext } from '../contexts/ThemeContext';

const inter = Inter({ subsets: ['latin'] });

export default function ThemeRegistry({
    children,
}: {
    children: React.ReactNode;
}) {
    const { mode } = useThemeContext();

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

    return <ThemeProvider theme={theme}>{children}</ThemeProvider>;
}
