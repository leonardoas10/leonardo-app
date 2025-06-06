import { a } from '@aws-amplify/backend';

import { sendCVMutation } from '../../functions/cv/mutations/send-cv/resource';

export const cvRequestSchema = {
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
        })
        .returns(a.ref('CVRequest'))
        .authorization((allow) => [allow.publicApiKey()])
        .handler(a.handler.function(sendCVMutation)),
};
