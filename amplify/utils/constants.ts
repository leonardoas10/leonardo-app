export const CloudFrontURLs = {
    IMAGES: process.env.NEXT_PUBLIC_CLOUDFRONT_URL_IMAGES || '',
} as const;

export const EnviromentVariables = {
    RECAPTCHA_SITE_KEY: process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY || '',
    AWS_REGION: process.env.AWS_REGION || 'us-east-1',
    CV_BUCKET_NAME: process.env.CV_BUCKET_NAME || '',
    CV_BUCKET_ARN: process.env.CV_BUCKET_ARN || '',
    FROM_EMAIL_ADDRESS: process.env.FROM_EMAIL_ADDRESS || '',
    ADMIN_EMAIL: process.env.ADMIN_EMAIL || ''
} as const;
