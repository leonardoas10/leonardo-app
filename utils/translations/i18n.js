import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import LanguageDetector from 'i18next-browser-languagedetector';

//ES
import aboutES from './es/about.json';
import authES from './es/auth.json';
import categoriesES from './es/categories.json';
import commonES from './es/common.json';
import navigationES from './es/navigation.json';
import layoutES from './es/layout.json';
import imagesManagerES from './es/imagesManager.json';
import postES from './es/post.json';
import tagES from './es/tags.json';
import userES from './es/users.json';
//EN
import aboutEN from './en/about.json';
import authEN from './en/auth.json';
import categoriesEN from './en/categories.json';
import commonEN from './en/common.json';
import navigationEN from './en/navigation.json';
import layoutEN from './en/layout.json';
import imagesManagerEN from './en/imagesManager.json';
import postEN from './en/post.json';
import tagEN from './en/tags.json';
import userEN from './en/users.json';

i18n
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    fallbackLng: 'es',
    lng: 'en',
    resources: {
        es: {
            about: aboutES,
            auth: authES,
            categories: categoriesES,
            common: commonES,
            layout: layoutES,
            navigation: navigationES,
            post: postES,
            user: userES,
            tag: tagES,
            imagesManager: imagesManagerES,
        },
        en: {
            about: aboutEN,
            auth: authEN,
            categories: categoriesEN,
            common: commonEN,
            layout: layoutEN,
            navigation: navigationEN,
            post: postEN,
            user: userEN,
            tag: tagEN,
            imagesManager: imagesManagerEN,
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
