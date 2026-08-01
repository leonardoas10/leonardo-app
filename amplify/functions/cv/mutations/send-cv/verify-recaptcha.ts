const RECAPTCHA_VERIFY_URL = 'https://www.google.com/recaptcha/api/siteverify';
const MIN_RECAPTCHA_SCORE = 0.5;
const EXPECTED_ACTION = 'cv_form_submit';

type SiteverifyResponse = {
    success: boolean;
    score?: number;
    action?: string;
    'error-codes'?: string[];
};

export type RecaptchaVerifyResult =
    | { ok: true }
    | { ok: false; reason: string };

export async function verifyRecaptchaToken(
    token: string,
    secret: string,
): Promise<RecaptchaVerifyResult> {
    if (!token) {
        return { ok: false, reason: 'missing_token' };
    }

    if (!secret) {
        return { ok: false, reason: 'missing_secret' };
    }

    const response = await fetch(RECAPTCHA_VERIFY_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
        body: new URLSearchParams({ secret, response: token }),
    });

    const result = (await response.json()) as SiteverifyResponse;

    if (!result.success) {
        return { ok: false, reason: 'siteverify_rejected' };
    }

    if (result.action !== EXPECTED_ACTION) {
        return { ok: false, reason: 'action_mismatch' };
    }

    if ((result.score ?? 0) < MIN_RECAPTCHA_SCORE) {
        return { ok: false, reason: 'score_too_low' };
    }

    return { ok: true };
}