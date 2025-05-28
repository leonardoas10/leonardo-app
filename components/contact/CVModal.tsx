import React from 'react';
import Modal from '../common/Modal';
import { useTranslation } from '@/utils/hooks/useTranslation';

interface FormData {
    name: string;
    email: string;
    company: string;
}

interface CVModalProps {
    open: boolean;
    onClose: () => void;
}

const CVModal: React.FC<CVModalProps> = ({ open, onClose }) => {
    const { t } = useTranslation('contact');
    
    const handleSubmit = async (formData: FormData) => {
        // Simulate API call with a delay
        return new Promise<void>((resolve) => {
            setTimeout(() => {
                console.log('Form submitted:', formData);
                resolve();
            }, 1000);
        });
    };

    return (
        <Modal
            open={open}
            onClose={onClose}
            title={t('cvModal.title')}
            submitButtonText={t('cvModal.download')}
            onSubmit={handleSubmit}
        />
    );
};

export default CVModal;
