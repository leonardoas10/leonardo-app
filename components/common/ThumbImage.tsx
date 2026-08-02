import Image, { type ImageProps } from 'next/image';

import { blurDataURLFromSrc } from '@/utils/images/blur-data-url';

/** Temporary: set true to preview thumbhash blurs only. */
const PREVIEW_BLUR_ONLY = false;

export function ThumbImage({ src, alt, style, fill, ...props }: ImageProps) {
    const blurDataURL =
        typeof src === 'string' ? blurDataURLFromSrc(src) : undefined;

    if (PREVIEW_BLUR_ONLY && blurDataURL) {
        return (
            <img
                src={blurDataURL}
                alt={typeof alt === 'string' ? alt : 'Blur preview'}
                style={
                    fill
                        ? {
                              position: 'absolute',
                              inset: 0,
                              width: '100%',
                              height: '100%',
                              objectFit: 'cover',
                              ...style,
                          }
                        : style
                }
            />
        );
    }

    return (
        <Image
            src={src}
            alt={alt}
            fill={fill}
            style={style}
            {...(blurDataURL
                ? { placeholder: 'blur' as const, blurDataURL }
                : {})}
            {...props}
        />
    );
}
