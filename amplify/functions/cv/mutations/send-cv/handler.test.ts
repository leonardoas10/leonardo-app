import { Readable } from 'node:stream';

import { beforeEach, describe, expect, it, vi } from 'vitest';

const mocks = vi.hoisted(() => ({
    sesSend: vi.fn(),
    s3Send: vi.fn(),
    create: vi.fn(),
    listCVRequestByEmail: vi.fn(),
    verifyRecaptchaToken: vi.fn(),
}));

vi.mock('@aws-sdk/client-ses', () => ({
    SESClient: vi.fn(function SESClientMock() {
        return { send: mocks.sesSend };
    }),
    SendRawEmailCommand: vi.fn(function SendRawEmailCommandMock(
        this: { input: unknown },
        input: unknown
    ) {
        this.input = input;
    }),
}));

vi.mock('@aws-sdk/client-s3', () => ({
    S3Client: vi.fn(function S3ClientMock() {
        return { send: mocks.s3Send };
    }),
    GetObjectCommand: vi.fn(function GetObjectCommandMock(
        this: { input: unknown },
        input: unknown
    ) {
        this.input = input;
    }),
}));

vi.mock('@/utils/graphql', () => ({
    getAmplifyClient: vi.fn().mockResolvedValue({
        models: {
            CVRequest: {
                create: (...args: unknown[]) => mocks.create(...args),
                listCVRequestByEmail: (...args: unknown[]) =>
                    mocks.listCVRequestByEmail(...args),
            },
        },
    }),
}));

vi.mock('./verify-recaptcha', () => ({
    verifyRecaptchaToken: (...args: unknown[]) =>
        mocks.verifyRecaptchaToken(...args),
}));

vi.mock('$amplify/env/send-cv-mutation', () => ({
    env: {
        AWS_REGION: 'eu-west-1',
        FROM_EMAIL_ADDRESS: 'from@example.com',
        CV_BUCKET_NAME: 'test-cv-bucket',
        ADMIN_EMAIL: 'admin@example.com',
        RECAPTCHA_SECRET_KEY: 'test-recaptcha-secret',
    },
}));

const { handler } = await import('./handler');

const validArguments = {
    name: 'Jane Doe',
    email: 'jane@example.com',
    company: 'Acme Corp',
    language: 'en',
    recaptchaToken: 'valid-token',
};

const createdRecord = {
    id: 'cv-request-1',
    name: validArguments.name,
    email: validArguments.email,
    company: validArguments.company,
    language: validArguments.language,
    createdAt: '2026-08-02T12:00:00.000Z',
    updatedAt: '2026-08-02T12:00:00.000Z',
};

function buildEvent(
    overrides: Partial<typeof validArguments> = {}
): Parameters<typeof handler>[0] {
    return {
        arguments: {
            ...validArguments,
            ...overrides,
        },
    } as Parameters<typeof handler>[0];
}

function mockSuccessfulDependencies() {
    mocks.verifyRecaptchaToken.mockResolvedValue({ ok: true });
    mocks.listCVRequestByEmail.mockResolvedValue({
        data: [],
        errors: undefined,
        nextToken: undefined,
    });
    mocks.create.mockResolvedValue({ data: createdRecord });
    mocks.s3Send.mockResolvedValue({
        Body: Readable.from(Buffer.from('pdf-content')),
    });
    mocks.sesSend.mockResolvedValue({});
}

describe('send-cv handler', () => {
    beforeEach(() => {
        vi.clearAllMocks();
        mockSuccessfulDependencies();
    });

    it('returns VALIDATION_FAILED and does not call SES when validation fails', async () => {
        const result = await handler(buildEvent({ name: 'J' }));

        expect(result.errorCode).toBe('VALIDATION_FAILED');
        expect(mocks.verifyRecaptchaToken).not.toHaveBeenCalled();
        expect(mocks.create).not.toHaveBeenCalled();
        expect(mocks.s3Send).not.toHaveBeenCalled();
        expect(mocks.sesSend).not.toHaveBeenCalled();
    });

    it('creates a CV request and sends email on success', async () => {
        const result = await handler(buildEvent());

        expect(result.errorCode).toBe('');
        expect(result.id).toBe(createdRecord.id);
        expect(mocks.create).toHaveBeenCalledWith({
            name: validArguments.name,
            email: validArguments.email,
            company: validArguments.company,
            language: validArguments.language,
        });
        expect(mocks.s3Send).toHaveBeenCalledTimes(1);
        expect(mocks.sesSend).toHaveBeenCalledTimes(2);
    });

    it('returns SERVER_ERROR when SES fails', async () => {
        mocks.sesSend.mockRejectedValueOnce(new Error('SES unavailable'));

        const result = await handler(buildEvent());

        expect(result.errorCode).toBe('SERVER_ERROR');
        expect(mocks.create).toHaveBeenCalledTimes(1);
    });
});
