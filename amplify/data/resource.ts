import { type ClientSchema, a, defineData } from '@aws-amplify/backend';

import { cvRequestSchema } from './schemas';

const schema = a
    .schema({
        ...cvRequestSchema,
    })
    .authorization((allow) => [allow.publicApiKey()]);

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
