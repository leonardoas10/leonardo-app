import type { AmplifyClient } from '@/utils/graphql';

export const CV_RATE_LIMIT_MAX = 10;
export const CV_RATE_LIMIT_WINDOW_MS = 60 * 60 * 1000;

export const normalizeEmail = (email: string) => email.trim().toLowerCase();

export async function countRecentCvRequestsByEmail(
    client: AmplifyClient,
    email: string,
    windowStartIso: string,
): Promise<number> {
    const normalizedEmail = normalizeEmail(email);
    let count = 0;
    let nextToken: string | undefined;

    do {
        const { data, nextToken: token } =
            await client.models.CVRequest.listCVRequestByEmail(
                { email: normalizedEmail },
                {
                    filter: { createdAt: { ge: windowStartIso } },
                    limit: CV_RATE_LIMIT_MAX,
                    nextToken,
                }
            );

        count += data?.length ?? 0;
        if (count >= CV_RATE_LIMIT_MAX) {
            return count;
        }

        nextToken = token ?? undefined;
    } while (nextToken);

    return count;
}

export function isEmailRateLimited(count: number): boolean {
    return count >= CV_RATE_LIMIT_MAX;
}

if (process.env.PONYTAIL_SELF_CHECK === '1') {
    const assert = (condition: boolean, message: string) => {
        if (!condition) {
            throw new Error(message);
        }
    };

    assert(normalizeEmail('  Foo@Bar.COM ') === 'foo@bar.com', 'normalizeEmail');
    assert(isEmailRateLimited(3), 'at limit');
    assert(!isEmailRateLimited(2), 'under limit');
}
