export const CloudFrontURLs = {
    IMAGES: process.env.NEXT_PUBLIC_CLOUDFRONT_URL_IMAGES || '',
    HOSTNAME: process.env.NEXT_PUBLIC_CLOUDFRONT_URL_HOSTNAME || '',
} as const;

export const EnviromentVariables = {
    RECAPTCHA_SITE_KEY: process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY || '',
    GTM_ID: process.env.NEXT_PUBLIC_GTM_ID || '',
} as const;
