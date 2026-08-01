import { createHash } from 'crypto';

import { EnviromentVariables } from '@/utils/constants';
import { Logger } from '@aws-lambda-powertools/logger';
import { S3Client, GetObjectCommand } from '@aws-sdk/client-s3';
import { SESClient, SendRawEmailCommand } from '@aws-sdk/client-ses';

import type { Schema } from '@/data/resource';
import { getAmplifyClient } from '@/utils/graphql';

import { verifyRecaptchaToken } from './verify-recaptcha';

import { env } from '$amplify/env/send-cv-mutation';

const client = await getAmplifyClient(env);
const sesClient = new SESClient({ region: EnviromentVariables.AWS_REGION });
const s3Client = new S3Client({ region: EnviromentVariables.AWS_REGION });

const logger = new Logger({
    serviceName: 'send-cv-mutation',
    logLevel: 'INFO',
});

const ERROR_CODE = {
    VALIDATION: 'VALIDATION_FAILED',
    RECAPTCHA: 'RECAPTCHA_FAILED',
    SERVER: 'SERVER_ERROR',
} as const;

type SendCVResult = {
    id: string;
    name: string;
    email: string;
    company: string;
    language: string;
    createdAt: string;
    updatedAt: string;
    errorCode: string;
};

const toString = (value: string | null | undefined) => value ?? '';

const toSendCVResult = (
    record: Partial<
        Record<keyof Omit<SendCVResult, 'errorCode'>, string | null | undefined>
    >,
    errorCode: string
): SendCVResult => ({
    id: toString(record.id),
    name: toString(record.name),
    email: toString(record.email),
    company: toString(record.company),
    language: toString(record.language),
    createdAt: toString(record.createdAt),
    updatedAt: toString(record.updatedAt),
    errorCode,
});

const emptyResult = (errorCode: string): SendCVResult =>
    toSendCVResult({}, errorCode);

const validateName = (name: string): boolean => {
    return !!name && name.length >= 2 && /^[A-Za-z\s]+$/.test(name);
};

const validateEmail = (email: string): boolean => {
    return !!email && /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
};

const validateLanguage = (language: string): boolean => {
    return ['en', 'es'].includes(language);
};

async function streamToBuffer(stream: NodeJS.ReadableStream): Promise<Buffer> {
    return new Promise<Buffer>((resolve, reject) => {
        const chunks: Uint8Array[] = [];
        stream.on('data', (chunk: Uint8Array) => chunks.push(chunk));
        stream.on('error', reject);
        stream.on('end', () => resolve(Buffer.concat(chunks)));
    });
}

export const handler: Schema['sendCV']['functionHandler'] = async (event) => {
    logger.info('event', JSON.stringify(event));

    const {
        name,
        email,
        company = '',
        language = 'en',
        recaptchaToken,
    } = event.arguments;

    const isNameValid = validateName(name);
    const isEmailValid = validateEmail(email);
    const isLanguageValid = validateLanguage(language);
    const isCompanyValid = !company || company.length >= 2;

    if (!isNameValid || !isEmailValid || !isLanguageValid || !isCompanyValid) {
        logger.warn('Validation failed', {
            isNameValid,
            isEmailValid,
            isLanguageValid,
            isCompanyValid,
        });
        return emptyResult(ERROR_CODE.VALIDATION);
    }

    const recaptchaResult = await verifyRecaptchaToken(
        recaptchaToken,
        EnviromentVariables.RECAPTCHA_SECRET_KEY
    );

    if (!recaptchaResult.ok) {
        logger.warn('reCAPTCHA verification failed', {
            reason: recaptchaResult.reason,
        });
        return emptyResult(ERROR_CODE.RECAPTCHA);
    }

    try {
        const { data } = await client.models.CVRequest.create({
            name,
            email,
            company,
            language,
        });

        logger.info('CV request created', JSON.stringify(data));

        if (
            !EnviromentVariables.FROM_EMAIL_ADDRESS ||
            !EnviromentVariables.CV_BUCKET_NAME
        ) {
            throw new Error(
                'Required environment variables are not configured'
            );
        }

        const cvKey = `cv/leonardo-cv-${language}.pdf`;

        const cvFile = await s3Client.send(
            new GetObjectCommand({
                Bucket: EnviromentVariables.CV_BUCKET_NAME,
                Key: cvKey,
            })
        );

        const cvBuffer = await streamToBuffer(cvFile.Body as NodeJS.ReadableStream);
        const cvBase64 = cvBuffer.toString('base64');

        const boundary = `----=_Part_${createHash('md5').update(Date.now().toString()).digest('hex')}`;

        const subject =
            language === 'es'
                ? `Curriculum Vitae de Leonardo - Solicitado por ${name}`
                : `Leonardo's CV - Requested by ${name}`;

        const textBody =
            language === 'es'
                ? `Gracias por solicitar mi CV\n\nHola ${name},\n\nAdjunto encontrarás mi curriculum vitae actualizado.\n\nSi tienes alguna pregunta, no dudes en contactarme.\n\nSaludos cordiales,\nLeonardo`
                : `Thank you for requesting my CV\n\nHello ${name},\n\nPlease find attached my updated curriculum vitae.\n\nIf you have any questions, please don't hesitate to contact me.\n\nBest regards,\nLeonardo`;

        const htmlBody =
            language === 'es'
                ? `<html><body><h2>Gracias por solicitar mi CV</h2><p>Hola ${name},</p><p>Adjunto encontrarás mi curriculum vitae actualizado.</p><p>Si tienes alguna pregunta, no dudes en contactarme.</p><p>Saludos cordiales,<br/>Leonardo</p></body></html>`
                : `<html><body><h2>Thank you for requesting my CV</h2><p>Hello ${name},</p><p>Please find attached my updated curriculum vitae.</p><p>If you have any questions, please don't hesitate to contact me.</p><p>Best regards,<br/>Leonardo</p></body></html>`;

        const rawEmail = [
            `From: ${EnviromentVariables.FROM_EMAIL_ADDRESS}`,
            `To: ${email}`,
            `Subject: ${subject}`,
            'MIME-Version: 1.0',
            `Content-Type: multipart/mixed; boundary="${boundary}"`,
            '',
            `--${boundary}`,
            'Content-Type: multipart/alternative; boundary="alt-boundary"',
            '',
            '--alt-boundary',
            'Content-Type: text/plain; charset=utf-8',
            '',
            textBody,
            '',
            '--alt-boundary',
            'Content-Type: text/html; charset=utf-8',
            '',
            htmlBody,
            '',
            '--alt-boundary--',
            '',
            `--${boundary}`,
            'Content-Type: application/pdf',
            'Content-Transfer-Encoding: base64',
            `Content-Disposition: attachment; filename="Leonardo-CV-${language}.pdf"`,
            '',
            cvBase64,
            '',
            `--${boundary}--`,
        ].join('\r\n');

        await sesClient.send(
            new SendRawEmailCommand({
                RawMessage: { Data: Buffer.from(rawEmail) },
            })
        );

        logger.info('Email with CV attachment sent successfully', {
            recipient: email,
        });

        if (EnviromentVariables.ADMIN_EMAIL) {
            const adminSubject = `New CV Request: ${name} (${email})`;
            const adminBody = `New CV request details:\nName: ${name}\nEmail: ${email}\nCompany: ${company || 'Not provided'}\nLanguage: ${language}\nRequest ID: ${data!.id}\nTime: ${new Date().toISOString()}`;

            const adminRawEmail = [
                `From: ${EnviromentVariables.FROM_EMAIL_ADDRESS}`,
                `To: ${EnviromentVariables.ADMIN_EMAIL}`,
                `Subject: ${adminSubject}`,
                'MIME-Version: 1.0',
                'Content-Type: text/plain; charset=utf-8',
                '',
                adminBody,
            ].join('\r\n');

            await sesClient.send(
                new SendRawEmailCommand({
                    RawMessage: { Data: Buffer.from(adminRawEmail) },
                })
            );

            logger.info('Admin notification sent');
        }

        return toSendCVResult(data!, '');
    } catch (error) {
        logger.error('Error in CV request process', { error });
        return emptyResult(ERROR_CODE.SERVER);
    }
};
