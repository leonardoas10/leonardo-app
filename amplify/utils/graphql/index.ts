import { getAmplifyDataClientConfig } from '@aws-amplify/backend/function/runtime';
import { DataClientEnv } from '@aws-amplify/backend-function/runtime';
import { Amplify } from 'aws-amplify';
import { generateClient } from 'aws-amplify/data';

import type { Schema } from '@/data/resource';

export const getAmplifyClient = async (env: DataClientEnv) => {
    const { resourceConfig, libraryOptions } =
        await getAmplifyDataClientConfig(env);
    Amplify.configure(resourceConfig, libraryOptions);

    return generateClient<Schema>();
};

// Export the return type of getAmplifyClient
export type AmplifyClient = ReturnType<typeof generateClient<Schema>>;
