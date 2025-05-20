import { a } from '@aws-amplify/backend';

export const postSchema = {
    LanguageType: a.enum(['spanish', 'english']),
    Post: a
        .model({
            id: a.id(),
            page: a.string(),
            language: a.ref('LanguageType').required(),
            post: a.string(),
        })
        .authorization((allow) => [allow.publicApiKey()]),

    // ----------------------------------------------------------------------------------
    // Queries
    //
    // post: a
    //     .query()
    //     .arguments({
    //         id: a.id().required(),
    //     })
    //     .returns(a.ref('post'))
    //     .authorization((allow) => [allow.custom()])
    //     .handler(a.handler.function(getpostFunction)),
};
