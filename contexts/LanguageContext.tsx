'use client';

import React, { createContext, useContext, useEffect, useState } from 'react';

import { trackEvent } from '@/utils/analytics/trackEvent';
import { LANGUAGE_STORAGE_KEY } from '@/utils/bootstrap/constants';
import { readInitialLanguage } from '@/utils/bootstrap/read-client-preferences';
import { syncLanguageCookie, type SiteLocale } from '@/utils/seo/locale';
import i18n from '@/utils/translations/i18n';

type Language = SiteLocale;

interface LanguageContextType {
    language: Language;
    setLanguage: (lang: Language) => void;
    toggleLanguage: (toggleLocation: string) => void;
    isLanguageLoaded: boolean;
}

const LanguageContext = createContext<LanguageContextType>({
    language: 'en',
    setLanguage: () => {},
    toggleLanguage: (toggleLocation: string) => {},
    isLanguageLoaded: true,
});

export const useLanguage = () => useContext(LanguageContext);

type LanguageProviderProps = {
    children: React.ReactNode;
    initialLanguage: SiteLocale;
};

export const LanguageProvider: React.FC<LanguageProviderProps> = ({
    children,
    initialLanguage,
}) => {
    const [language, setLanguageState] = useState<Language>(() => {
        i18n.changeLanguage(initialLanguage);
        return initialLanguage;
    });

    useEffect(() => {
        const bootstrapLanguage = readInitialLanguage();
        if (bootstrapLanguage !== language) {
            setLanguageState(bootstrapLanguage);
            i18n.changeLanguage(bootstrapLanguage);
        }
        // ponytail: one-shot reconcile when localStorage differs from SSR cookie
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    const toggleLanguage = (toggleLocation: string) => {
        const newLanguage = language === 'es' ? 'en' : 'es';
        setLanguageState(newLanguage);
        trackEvent('click_target', {
            click_name: 'Language Toggle',
            click_location: toggleLocation,
        });
    };

    const setLanguage = (lang: Language) => {
        setLanguageState(lang);
    };

    useEffect(() => {
        localStorage.setItem(LANGUAGE_STORAGE_KEY, language);
        syncLanguageCookie(language);
        document.documentElement.lang = language;
        i18n.changeLanguage(language);
    }, [language]);

    const value = {
        language,
        setLanguage,
        toggleLanguage,
        isLanguageLoaded: true,
    };

    return (
        <LanguageContext.Provider value={value}>
            {children}
        </LanguageContext.Provider>
    );
};
