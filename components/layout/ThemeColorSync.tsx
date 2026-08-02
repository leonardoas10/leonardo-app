'use client';

import { useEffect } from 'react';

import { useThemeContext } from '@/contexts/ThemeContext';
import { setClientThemeColor } from '@/utils/theme/client-theme-color';
import { PWA_THEME_COLORS } from '@/utils/theme/pwa-colors';

export function ThemeColorSync() {
    const { mode } = useThemeContext();

    useEffect(() => {
        setClientThemeColor(PWA_THEME_COLORS[mode]);
    }, [mode]);

    return null;
}
