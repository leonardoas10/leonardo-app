'use client';

import React, { createContext, useContext, useEffect, useState } from 'react';
import i18n from '@/utils/translations/i18n';

type Language = 'en' | 'es';

interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  isLanguageLoaded: boolean;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
};

export const LanguageProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [language, setLanguageState] = useState<Language>('en');
  const [isLanguageLoaded, setIsLanguageLoaded] = useState(false);

  // Function to detect user's language based on browser settings and country
  const detectUserLanguage = (): Language => {
    // Try to get language from localStorage first
    const storedLanguage = localStorage.getItem('userLanguage') as Language;
    if (storedLanguage && (storedLanguage === 'en' || storedLanguage === 'es')) {
      return storedLanguage;
    }

    // Try to detect language from navigator
    if (typeof navigator !== 'undefined') {
      // Get browser language
      const browserLang = navigator.language.toLowerCase();
      
      // Check if the browser language starts with 'es' (Spanish)
      if (browserLang.startsWith('es')) {
        return 'es';
      }
      
      // Optional: You could also use the Intl API to get the user's country
      // and map countries to languages if needed
      try {
        const userTimeZone = Intl.DateTimeFormat().resolvedOptions().timeZone;
        // Example: Map certain timezones/regions to Spanish
        const spanishTimeZones = [
          'America/Mexico_City',
          'America/Bogota',
          'Europe/Madrid',
          'America/Argentina/Buenos_Aires',
          // Add more Spanish-speaking regions as needed
        ];
        
        if (spanishTimeZones.includes(userTimeZone)) {
          return 'es';
        }
      } catch (error) {
        console.error('Error detecting timezone:', error);
      }
    }
    
    // Default to English if detection fails
    return 'en';
  };

  const setLanguage = (lang: Language) => {
    setLanguageState(lang);
    i18n.changeLanguage(lang);
    localStorage.setItem('userLanguage', lang);
  };

  useEffect(() => {
    // Run on client-side only
    if (typeof window !== 'undefined') {
      try {
        const detectedLanguage = detectUserLanguage();
        setLanguage(detectedLanguage);
      } catch (error) {
        console.error('Error setting initial language:', error);
        // Fallback to default language
        setLanguage('en');
      } finally {
        setIsLanguageLoaded(true);
      }
    }
  }, []);

  const value = {
    language,
    setLanguage,
    isLanguageLoaded
  };

  return (
    <LanguageContext.Provider value={value}>
      {children}
    </LanguageContext.Provider>
  );
};