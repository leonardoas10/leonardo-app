export const CloudFrontURLs = {
    IMAGES: process.env.NEXT_PUBLIC_CLOUDFRONT_URL_IMAGES || '',
} as const;

export const EnviromentVariables = {
    RECAPTCHA_SITE_KEY: process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY || '',
} as const;
