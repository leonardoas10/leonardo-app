import { SITE_URL } from '@/utils/constants';

import type { MetadataRoute } from 'next';

export default function sitemap(): MetadataRoute.Sitemap {
    return [{ url: SITE_URL }, { url: `${SITE_URL}/architecture` }];
}
