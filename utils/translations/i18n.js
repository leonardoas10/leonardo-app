import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

import { DEFAULT_LANGUAGE } from '@/utils/bootstrap/constants';

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

i18n.use(initReactI18next).init({
    fallbackLng: DEFAULT_LANGUAGE,
    lng: DEFAULT_LANGUAGE,
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
    interpolation: {
        escapeValue: false,
    },
});

export default i18n;
