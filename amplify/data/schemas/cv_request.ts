import { a } from '@aws-amplify/backend';

import { sendCVMutation } from '../../functions/cv/mutations/send-cv/resource';

export const cvRequestSchema = {
    SendCVResult: a.customType({
        id: a.string().required(),
        name: a.string().required(),
        email: a.string().required(),
        company: a.string().required(),
        language: a.string().required(),
        createdAt: a.string().required(),
        updatedAt: a.string().required(),
        errorCode: a.string().required(),
    }),

    CVRequest: a
        .model({
            id: a.id(),
            name: a.string().required(),
            email: a.string().required(),
            company: a.string(),
            language: a.string().required(),
        })
        .authorization((allow) => [allow.publicApiKey().to(['create'])]),

    sendCV: a
        .mutation()
        .arguments({
            name: a.string().required(),
            email: a.string().required(),
            company: a.string(),
            language: a.string().required(),
            recaptchaToken: a.string().required(),
        })
        .returns(a.ref('SendCVResult'))
        .authorization((allow) => [allow.publicApiKey()])
        .handler(a.handler.function(sendCVMutation)),
};
