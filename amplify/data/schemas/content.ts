import { a } from '@aws-amplify/backend';

export const contentSchema = {
    LanguageType: a.enum(['spanish', 'english']),
    Content: a
        .model({
            id: a.id(),
            page: a.string(),
            language: a.ref('LanguageType').required(),
            content: a.string(),
        })
        .authorization((allow) => [allow.publicApiKey()]),

    // ----------------------------------------------------------------------------------
    // Queries
    //
    // content: a
    //     .query()
    //     .arguments({
    //         id: a.id().required(),
    //     })
    //     .returns(a.ref('Content'))
    //     .authorization((allow) => [allow.custom()])
    //     .handler(a.handler.function(getContentFunction)),
};
