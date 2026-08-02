import path from 'node:path';

import { defineConfig } from 'vitest/config';

export default defineConfig({
    test: {
        environment: 'node',
        include: ['amplify/**/*.test.ts'],
    },
    resolve: {
        alias: {
            '@': path.resolve(__dirname, 'amplify'),
            $amplify: path.resolve(__dirname, '.amplify/generated'),
        },
    },
});
