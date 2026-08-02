'use client';

import { useTranslation as useI18nTranslation } from 'react-i18next';

import { useLanguage } from '@/contexts/LanguageContext';
import type { AppNamespace } from '@/utils/translations/i18n';

// Custom hook that combines react-i18next with our language context
export const useTranslation = <NS extends AppNamespace | AppNamespace[]>(
    namespace?: NS,
) => {
  const { language, isLanguageLoaded } = useLanguage();
  const { t, i18n } = useI18nTranslation(namespace);

  return {
    t,
    i18n,
    language,
    isLanguageLoaded
  };
};