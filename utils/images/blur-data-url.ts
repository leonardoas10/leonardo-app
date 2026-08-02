import thumbhashes from '@/utils/images/thumbhashes.json';

import type { SiteImageFile } from '@/utils/images/site-images';

type ThumbhashEntry = {
    hash: string;
    blurDataURL: string;
};

const BLUR_DATA_URLS = thumbhashes as Record<SiteImageFile, ThumbhashEntry>;

export function blurDataURLFromSrc(src: string): string | undefined {
    const filename = src.split('/').pop()?.split('?')[0];
    if (!filename || !(filename in BLUR_DATA_URLS)) {
        return undefined;
    }
    return BLUR_DATA_URLS[filename as SiteImageFile].blurDataURL;
}
