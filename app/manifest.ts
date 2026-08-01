import { SITE_URL } from '@/utils/constants';
import { PWA_THEME_COLORS } from '@/utils/theme/pwa-colors';

import type { MetadataRoute } from 'next';

export default function manifest(): MetadataRoute.Manifest {
    return {
        name: 'Leonardo Aranguren',
        short_name: 'Leonardo Aranguren',
        description:
            'AWS Certified Cloud Engineer and Software Engineer portfolio.',
        start_url: '/',
        scope: '/',
        id: SITE_URL,
        display: 'standalone',
        background_color: PWA_THEME_COLORS.dark,
        theme_color: PWA_THEME_COLORS.dark,
        icons: [
            {
                src: '/icons/icon-192.png',
                sizes: '192x192',
                type: 'image/png',
            },
            {
                src: '/icons/icon-512.png',
                sizes: '512x512',
                type: 'image/png',
            },
        ],
    };
}
