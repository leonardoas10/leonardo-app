import { type ClientSchema, a, defineData } from '@aws-amplify/backend';

import { cvRequestSchema } from './schemas';
import { sendCVMutation } from '../functions/cv/mutations/send-cv/resource';

const schema = a
    .schema({
        ...cvRequestSchema,
    })
    .authorization((allow) => [allow.resource(sendCVMutation).to(['mutate'])]);

export type Schema = ClientSchema<typeof schema>;

export const data = defineData({
    name: 'LAS',
    schema,
    authorizationModes: {
        defaultAuthorizationMode: 'apiKey',
        apiKeyAuthorizationMode: {
            expiresInDays: 30,
        },
    },
});
