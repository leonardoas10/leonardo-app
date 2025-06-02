import { env } from '$amplify/env/send-cv-mutation';
import { Logger } from '@aws-lambda-powertools/logger';

import type { Schema } from '@/data/resource';
import { getAmplifyClient } from '@/utils/graphql';

const client = await getAmplifyClient(env);

const logger = new Logger({
    serviceName: 'send-cv-mutation',
    logLevel: 'INFO',
});

export const handler: Schema['sendCV']['functionHandler'] = async (event) => {
    logger.info('event', JSON.stringify(event));

    const { name, email, company = '', language = 'en' } = event.arguments;

    const { data } = await client.models.CVRequest.create({
        name,
        email,
        company,
        language,
    });

    logger.info('event', JSON.stringify(data));

    return data;
};
