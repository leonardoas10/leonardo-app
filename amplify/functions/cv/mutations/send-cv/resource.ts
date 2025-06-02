import { defineFunction } from '@aws-amplify/backend';

export const sendCVMutation = defineFunction({
    name: 'send-cv-mutation',
    entry: './handler.ts',
    memoryMB: 128,
    timeoutSeconds: 15,
    runtime: 22,
    environment: {
        SNS_TOPIC_ARN: process.env.SNS_TOPIC_ARN || '',
    },
});
