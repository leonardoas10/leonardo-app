import type { PaletteMode } from '@mui/material';

import type { SiteLocale } from '@/utils/seo/locale';

export const THEME_STORAGE_KEY = 'themeMode';
export const LANGUAGE_STORAGE_KEY = 'language';
export const LEGACY_LANGUAGE_STORAGE_KEY = 'userLanguage';

export const DEFAULT_THEME: PaletteMode = 'dark';
export const DEFAULT_LANGUAGE: SiteLocale = 'en';
