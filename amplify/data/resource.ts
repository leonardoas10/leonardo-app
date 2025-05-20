import { type ClientSchema, a, defineData } from '@aws-amplify/backend';

import { contentSchema } from './schemas';

const schema = a
    .schema({
        ...contentSchema,
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
