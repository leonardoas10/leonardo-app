import { clientLogger } from './client-logger';

const sendCVLog = clientLogger.scope('sendCV');

export const SEND_CV_ERROR_CODES = {
    VALIDATION_FAILED: 'VALIDATION_FAILED',
    RECAPTCHA_FAILED: 'RECAPTCHA_FAILED',
    RATE_LIMIT_EXCEEDED: 'RATE_LIMIT_EXCEEDED',
    SERVER_ERROR: 'SERVER_ERROR',
} as const;

export type SendCVErrorCode =
    (typeof SEND_CV_ERROR_CODES)[keyof typeof SEND_CV_ERROR_CODES];

/** Maps errorCode → English message (Lambda) + i18n key (browser). */
export const SEND_CV_ERROR_CATALOG = {
    [SEND_CV_ERROR_CODES.VALIDATION_FAILED]: {
        message: 'The submitted CV request data is invalid.',
        i18nKey: 'cvModal.errors.validationFailed',
    },
    [SEND_CV_ERROR_CODES.RECAPTCHA_FAILED]: {
        message: 'reCAPTCHA verification failed.',
        i18nKey: 'cvModal.errors.captchaInvalid',
    },
    [SEND_CV_ERROR_CODES.RATE_LIMIT_EXCEEDED]: {
        message: 'Too many CV requests for this email address.',
        i18nKey: 'cvModal.errors.rateLimit',
    },
    [SEND_CV_ERROR_CODES.SERVER_ERROR]: {
        message: 'The CV request could not be processed.',
        i18nKey: 'cvModal.errors.serverError',
    },
} as const;

export function isSendCVSuccess(
    data: { id?: string | null; errorCode?: string | null } | null | undefined,
): data is { id: string; errorCode: '' | null | undefined } {
    return Boolean(data?.id) && !data?.errorCode;
}

export function isSendCVErrorCode(code: string): code is SendCVErrorCode {
    return code in SEND_CV_ERROR_CATALOG;
}

export function resolveSendCVErrorMessage(
    code: string,
    translate: (key: string) => string,
    fallbackKey = 'cvModal.errorSnackbar',
): string {
    if (isSendCVErrorCode(code)) {
        return translate(SEND_CV_ERROR_CATALOG[code].i18nKey);
    }

    return translate(fallbackKey);
}

/** Browser: logs in dev + returns translated snackbar copy. One call in catch blocks. */
export function getSendCVUserMessage(
    code: string,
    translate: (key: string) => string,
    meta: Record<string, unknown> = {},
): string {
    sendCVLog.error({ errorCode: code, ...meta });
    return resolveSendCVErrorMessage(code, translate);
}
