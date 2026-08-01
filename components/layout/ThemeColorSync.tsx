'use client';

import { useEffect } from 'react';

import { useThemeContext } from '@/contexts/ThemeContext';
import { PWA_THEME_COLORS } from '@/utils/theme/pwa-colors';

export function ThemeColorSync() {
    const { mode } = useThemeContext();

    useEffect(() => {
        document
            .querySelectorAll('meta[name="theme-color"]')
            .forEach((meta) => meta.remove());

        const meta = document.createElement('meta');
        meta.name = 'theme-color';
        meta.content = PWA_THEME_COLORS[mode];
        document.head.appendChild(meta);
    }, [mode]);

    return null;
}
