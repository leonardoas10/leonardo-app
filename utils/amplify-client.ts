import { Amplify } from 'aws-amplify';
import { generateClient } from 'aws-amplify/data';

import type { Schema } from '@/amplify/data/resource';
import outputs from '@/amplify_outputs.json';

let isConfigured = false;

/** Idempotent — safe to call from layout and client components. */
export function configureAmplify(): void {
    if (isConfigured) {
        return;
    }

    Amplify.configure(outputs, { ssr: true });
    isConfigured = true;
}

configureAmplify();

export const amplifyDataClient = generateClient<Schema>();
