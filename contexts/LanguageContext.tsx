'use client';

import React, { createContext, useContext, useEffect, useState } from 'react';
import i18n from '@/utils/translations/i18n';

type Language = 'en' | 'es';

interface LanguageContextType {
    language: Language;
    setLanguage: (lang: Language) => void;
    isLanguageLoaded: boolean;
}

const LanguageContext = createContext<LanguageContextType>({
    language: 'en',
    setLanguage: () => {},
    isLanguageLoaded: false,
});

export const useLanguage = () => useContext(LanguageContext);

export const LanguageProvider: React.FC<{ children: React.ReactNode }> = ({
    children,
}) => {
    const [language, setLanguageState] = useState<Language>('en');
    const [isLanguageLoaded, setIsLanguageLoaded] = useState(false);
    const [firstRender, setFirstRender] = useState(false);

    // Function to detect user's language based on browser settings and country
    const detectUserLanguage = (): Language => {
        if (typeof navigator === 'undefined') return 'en';

        // Get browser language
        const browserLang = navigator.language.toLowerCase();

        // Check if the browser language starts with 'es' (Spanish)
        if (browserLang.startsWith('es')) {
            return 'es';
        }

        // Check for Spanish-speaking countries via timezone
        try {
            const userTimeZone =
                Intl.DateTimeFormat().resolvedOptions().timeZone;
            // Spanish-speaking regions timezones
            const spanishTimeZones = [
                'America/Mexico_City',
                'America/Bogota',
                'Europe/Madrid',
                'America/Argentina/Buenos_Aires',
                'America/Santiago',
                'America/Lima', // Peru
                'America/Caracas', // Venezuela
                'America/Montevideo', // Uruguay
                'America/Asuncion', // Paraguay
                'America/La_Paz', // Bolivia
                'America/Guayaquil', // Ecuador
                'America/Santo_Domingo', // Dominican Republic
                'America/Havana', // Cuba
                'America/Guatemala', // Guatemala
                'America/El_Salvador', // El Salvador
                'America/Tegucigalpa', // Honduras
                'America/Managua', // Nicaragua
                'America/Costa_Rica', // Costa Rica
                'America/Panama', // Panama
            ];

            if (spanishTimeZones.includes(userTimeZone)) {
                return 'es';
            }
        } catch (error) {
            console.error('Error detecting timezone:', error);
        }

        // Default to English if detection fails
        return 'en';
    };

    const setLanguage = (lang: Language) => {
        setLanguageState(lang);
    };

    // Load language from localStorage on initial render
    useEffect(() => {
        if (typeof window === 'undefined') return;

        const storedLanguage = localStorage.getItem('language');

        if (storedLanguage === 'en' || storedLanguage === 'es') {
            setLanguageState(storedLanguage as Language);
        } else {
            const detected = detectUserLanguage();
            setLanguageState(detected);
        }

        setIsLanguageLoaded(true);
    }, []);

    // Save language changes to localStorage after first render
    useEffect(() => {
        if (!firstRender) {
            return setFirstRender(true);
        }

        localStorage.setItem('language', language);
        i18n.changeLanguage(language);
    }, [language, firstRender]);

    const value = {
        language,
        setLanguage,
        isLanguageLoaded,
    };

    return (
        <LanguageContext.Provider value={value}>
            {children}
        </LanguageContext.Provider>
    );
};
