'use client';

import { useEffect } from 'react';

import { useLanguage } from '@/contexts/LanguageContext';

export function HtmlLangSync() {
    const { language, isLanguageLoaded } = useLanguage();

    useEffect(() => {
        if (isLanguageLoaded) {
            document.documentElement.lang = language;
        }
    }, [language, isLanguageLoaded]);

    return null;
}
