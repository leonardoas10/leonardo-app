import React, { useState } from 'react';
import Modal from '../common/Modal';
import { useTranslation } from '@/utils/hooks/useTranslation';
import { clientSideClient } from '@/utils/amplify-utils';

// Import FormData type from Modal
type FormData = Parameters<Parameters<typeof Modal>[0]['onSubmit']>[0];

interface CVModalProps {
    open: boolean;
    onClose: () => void;
}

const CVModal: React.FC<CVModalProps> = ({ open, onClose }) => {
    const { t } = useTranslation('contact');
    const [loading, setLoading] = useState(false);

    const handleSubmit = async (formData: FormData) => {
        setLoading(true);
        try {
            // Create CV request using Amplify Gen 2 API
            const result = await clientSideClient.models.CVRequest.create({
                name: formData.name,
                email: formData.email,
                company: formData.company || '',
                language: formData.language,
                format: formData.format,
                requestedAt: new Date().toISOString(),
                createdAt: new Date().toISOString(),
            });

            console.log('CV request created:', result);

            // In a real implementation, you would trigger a Lambda function here
            // to send an SNS notification about the new CV request

            return Promise.resolve();
        } catch (error) {
            console.error('Error submitting CV request:', error);
            return Promise.reject(error);
        } finally {
            setLoading(false);
        }
    };

    return (
        <Modal
            open={open}
            onClose={onClose}
            title={t('cvModal.title')}
            submitButtonText={t('cvModal.get')}
            onSubmit={handleSubmit}
            loading={loading}
            fields={[
                { name: 'name', label: t('cvModal.name'), required: true },
                {
                    name: 'email',
                    label: t('cvModal.email'),
                    type: 'email',
                    required: true,
                },
                { name: 'company', label: t('cvModal.company') },
                {
                    name: 'language',
                    label: t('cvModal.language'),
                    type: 'select',
                    options: [
                        { value: 'en', label: t('cvModal.english') },
                        { value: 'es', label: t('cvModal.spanish') },
                    ],
                    required: true,
                },
                {
                    name: 'format',
                    label: t('cvModal.format'),
                    type: 'select',
                    options: [
                        { value: 'pdf', label: 'PDF' },
                        { value: 'docx', label: t('cvModal.word') },
                    ],
                    required: true,
                },
            ]}
        />
    );
};

export default CVModal;
