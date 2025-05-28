import { a } from '@aws-amplify/backend';

export const cvRequestSchema = {
    CVRequest: a
        .model({
            id: a.id(),
            name: a.string().required(),
            email: a.string().required(),
            company: a.string(),
            language: a.string().required(),
            format: a.string().required(),
            requestedAt: a.datetime().required(),
            createdAt: a.datetime().required(),
        })
        .authorization((allow) => [allow.publicApiKey().to(['create'])]),
};
