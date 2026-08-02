import type { PaletteMode } from '@mui/material';

import { DEFAULT_LANGUAGE, DEFAULT_THEME } from '@/utils/bootstrap/constants';
import type { SiteLocale } from '@/utils/seo/locale';

/** Read theme applied by the bootstrap script on <html data-theme>. */
export function readInitialTheme(): PaletteMode {
    if (typeof document === 'undefined') {
        return DEFAULT_THEME;
    }

    return document.documentElement.getAttribute('data-theme') === 'light'
        ? 'light'
        : 'dark';
}

/** Read language applied by the bootstrap script on <html lang>. */
export function readInitialLanguage(): SiteLocale {
    if (typeof document === 'undefined') {
        return DEFAULT_LANGUAGE;
    }

    return document.documentElement.lang === 'es' ? 'es' : 'en';
}
