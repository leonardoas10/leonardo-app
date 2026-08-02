import type { PaletteMode } from '@mui/material';

import { THEME_STORAGE_KEY } from '@/utils/bootstrap/constants';

export function parseTheme(value: string | undefined | null): PaletteMode {
    return value === 'light' ? 'light' : 'dark';
}

export function syncThemeCookie(theme: PaletteMode) {
    if (typeof document === 'undefined') {
        return;
    }

    document.cookie = `${THEME_STORAGE_KEY}=${theme};path=/;max-age=31536000;SameSite=Lax`;
}
