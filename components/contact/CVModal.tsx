import React, { useState } from 'react';
import Modal from '../common/Modal';
import { useTranslation } from '@/utils/hooks/useTranslation';
import { clientSideClient } from '@/utils/amplify-client-utils';
import { useLanguage } from '@/contexts/LanguageContext';

// Import FormData type from Modal
type FormData = Parameters<Parameters<typeof Modal>[0]['onSubmit']>[0];

interface CVModalProps {
    open: boolean;
    onClose: () => void;
}

const CVModal: React.FC<CVModalProps> = ({ open, onClose }) => {
    const { t } = useTranslation('contact');
    const { language } = useLanguage();
    const [loading, setLoading] = useState(false);

    const handleSubmit = async (formData: FormData) => {
        setLoading(true);
        try {
            // Create CV request using Amplify Gen 2 API
            const result = await clientSideClient.models.CVRequest.create({
                name: formData.name,
                email: formData.email,
                company: formData.company || '',
                language: formData.language || language,
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
            key={`modal-${language}`}
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
                    defaultValue: language,
                    required: false,
                },
            ]}
        />
    );
};

export default CVModal;
