import i18n from 'i18next';
import LanguageDetector from 'i18next-browser-languagedetector';
import { initReactI18next } from 'react-i18next';

import aboutEN from './en/about.json';
import architectureEN from './en/architecture.json';
import commonEN from './en/common.json';
import contactEN from './en/contact.json';
import navigationEN from './en/navigation.json';
import aboutES from './es/about.json';
import architectureES from './es/architecture.json';
import commonES from './es/common.json';
import contactES from './es/contact.json';
import navigationES from './es/navigation.json';

i18n.use(LanguageDetector)
    .use(initReactI18next)
    .init({
        fallbackLng: 'es',
        lng: 'en',
        resources: {
            es: {
                about: aboutES,
                common: commonES,
                navigation: navigationES,
                architecture: architectureES,
                contact: contactES,
            },
            en: {
                about: aboutEN,
                common: commonEN,
                navigation: navigationEN,
                architecture: architectureEN,
                contact: contactEN,
            },
        },
        detection: {
            // Order of detection methods
            order: ['localStorage', 'navigator'],
            // Keys to lookup language in localStorage
            lookupLocalStorage: 'userLanguage',
            // Cache user language in localStorage
            caches: ['localStorage'],
        },
        interpolation: {
            escapeValue: false, // React already safes from XSS
        },
    });

export default i18n;
