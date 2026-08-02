'use client';

import React from 'react';

import { LanguageProvider } from '@/contexts/LanguageContext';
import { ThemeRegistry } from '@/contexts/ThemeContext';
import type { SiteLocale } from '@/utils/seo/locale';

import type { PaletteMode } from '@mui/material';

type ProvidersProps = {
    children: React.ReactNode;
    initialTheme: PaletteMode;
    initialLanguage: SiteLocale;
};

export const Providers = ({
    children,
    initialTheme,
    initialLanguage,
}: ProvidersProps) => {
    return (
        <ThemeRegistry initialTheme={initialTheme}>
            <LanguageProvider initialLanguage={initialLanguage}>
                {children}
            </LanguageProvider>
        </ThemeRegistry>
    );
};
