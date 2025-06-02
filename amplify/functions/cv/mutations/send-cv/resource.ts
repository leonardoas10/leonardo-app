import { defineFunction } from '@aws-amplify/backend';

export const sendCVMutation = defineFunction({
    name: 'send-cv-mutation',
    entry: './handler.ts',
    memoryMB: 256, // Increased for handling file operations
    timeoutSeconds: 30, // Increased for email sending
    runtime: 22,
    environment: {
        FROM_EMAIL_ADDRESS: process.env.FROM_EMAIL_ADDRESS!,
        CV_BUCKET_NAME: process.env.CV_BUCKET_NAME!,
        ADMIN_EMAIL: 'your-admin-email@example.com',
    },
});
