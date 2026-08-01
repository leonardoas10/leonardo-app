export const EnviromentVariables = {
    CV_BUCKET_ARN: process.env.CV_BUCKET_ARN || '',
    SES_IDENTITY_ARN: process.env.SES_IDENTITY_ARN || '',
    SES_CONFIGURATION_SET_ARN: process.env.SES_CONFIGURATION_SET_ARN || '',
} as const;
