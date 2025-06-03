import { env } from '$amplify/env/send-cv-mutation';
import { Logger } from '@aws-lambda-powertools/logger';
import { SESClient, SendRawEmailCommand } from '@aws-sdk/client-ses';
import { S3Client, GetObjectCommand } from '@aws-sdk/client-s3';
import { createHash } from 'crypto';

import type { Schema } from '@/data/resource';
import { getAmplifyClient } from '@/utils/graphql';
import { EnviromentVariables } from '@/utils/constants';

const client = await getAmplifyClient(env);
const sesClient = new SESClient({ region: EnviromentVariables.AWS_REGION });
const s3Client = new S3Client({ region: EnviromentVariables.AWS_REGION });

const logger = new Logger({
    serviceName: 'send-cv-mutation',
    logLevel: 'INFO',
});

// Validation functions
const validateName = (name: string): boolean => {
    // Name should be at least 2 characters and contain only letters and spaces
    return !!name && name.length >= 2 && /^[A-Za-z\s]+$/.test(name);
};

const validateEmail = (email: string): boolean => {
    // Basic email validation
    return !!email && /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
};

const validateLanguage = (language: string): boolean => {
    // Language should be a valid language code (e.g., 'en', 'es')
    const validLanguages = ['en', 'es'];
    return validLanguages.includes(language);
};

// Helper function to convert stream to buffer
async function streamToBuffer(stream: any): Promise<Buffer> {
    return new Promise<Buffer>((resolve, reject) => {
        const chunks: Uint8Array[] = [];
        stream.on('data', (chunk: Uint8Array) => chunks.push(chunk));
        stream.on('error', reject);
        stream.on('end', () => resolve(Buffer.concat(chunks)));
    });
}

export const handler: Schema['sendCV']['functionHandler'] = async (event) => {
    logger.info('event', JSON.stringify(event));

    const { name, email, company = '', language = 'en' } = event.arguments;

    // Validate all fields
    const isNameValid = validateName(name);
    const isEmailValid = validateEmail(email);
    const isLanguageValid = validateLanguage(language);
    const isCompanyValid = !company || company.length >= 2;

    // If any validation fails, return empty data with the same shape
    if (!isNameValid || !isEmailValid || !isLanguageValid || !isCompanyValid) {
        logger.warn('Validation failed', {
            isNameValid,
            isEmailValid,
            isLanguageValid,
            isCompanyValid,
        });

        return {
            id: '',
            name: '',
            email: '',
            company: '',
            language: '',
            createdAt: '',
            updatedAt: '',
        };
    }

    try {
        // Step 1: Create the CV request in DynamoDB
        const { data } = await client.models.CVRequest.create({
            name,
            email,
            company,
            language,
        });

        logger.info('CV request created', JSON.stringify(data));

        // Step 2: Send email with attachment
        // Ensure required environment variables are available
        if (
            !EnviromentVariables.FROM_EMAIL_ADDRESS ||
            !EnviromentVariables.CV_BUCKET_NAME
        ) {
            throw new Error(
                'Required environment variables are not configured'
            );
        }

        // Get CV file from S3 based on language
        const cvKey = `cv/leonardo-cv-${language}.pdf`;

        // Get the CV file from S3
        const cvFile = await s3Client.send(
            new GetObjectCommand({
                Bucket: EnviromentVariables.CV_BUCKET_NAME,
                Key: cvKey,
            })
        );

        // Convert the CV file to buffer
        const cvBuffer = await streamToBuffer(cvFile.Body);
        const cvBase64 = cvBuffer.toString('base64');

        // Generate a boundary for the MIME message
        const boundary = `----=_Part_${createHash('md5').update(Date.now().toString()).digest('hex')}`;

        // Prepare email content based on language
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

        // Construct raw email with attachment using MIME
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

        // Send raw email with attachment
        await sesClient.send(
            new SendRawEmailCommand({
                RawMessage: { Data: Buffer.from(rawEmail) },
            })
        );

        logger.info('Email with CV attachment sent successfully', {
            recipient: email,
        });

        // Also send notification to admin (optional)
        if (EnviromentVariables.ADMIN_EMAIL) {
            const adminSubject = `New CV Request: ${name} (${email})`;
            const adminBody = `New CV request details:\nName: ${name}\nEmail: ${email}\nCompany: ${company || 'Not provided'}\nLanguage: ${language}\nRequest ID: ${data!.id}\nTime: ${new Date().toISOString()}`;

            // Simple email without attachment for admin notification
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

        return data;
    } catch (error) {
        logger.error('Error in CV request process', { error });

        // If any part fails (DynamoDB or email sending), return empty data
        return {
            id: '',
            name: '',
            email: '',
            company: '',
            language: '',
            createdAt: '',
            updatedAt: '',
        };
    }
};
