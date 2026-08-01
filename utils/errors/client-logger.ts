type LogFn = (meta?: Record<string, unknown>) => void;

export type ScopedClientLogger = {
    warn: LogFn;
    error: LogFn;
};

function write(
    level: 'warn' | 'error',
    scope: string,
    meta?: Record<string, unknown>,
) {

    console[level](`[${scope}]`, meta ?? {});
}

/** Dev-only browser logger. Configure scope once with `.scope('sendCV')`, then `.error({ ... })`. */
export const clientLogger = {
    scope(scope: string): ScopedClientLogger {
        return {
            warn: (meta) => write('warn', scope, meta),
            error: (meta) => write('error', scope, meta),
        };
    },
    warn: (scope: string, meta?: Record<string, unknown>) =>
        write('warn', scope, meta),
    error: (scope: string, meta?: Record<string, unknown>) =>
        write('error', scope, meta),
};
