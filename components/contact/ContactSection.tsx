'use client';

import React, { useState } from 'react';

import { trackEvent } from '@/utils/analytics/trackEvent';
// import { sendGTMEvent } from '@next/third-parties/google';
import { useTranslation } from '@/utils/hooks/useTranslation';

import { Button } from '../common/Button';

import CVModal from './CVModal';

interface ContactSectionProps {
    size?: 'small' | 'medium' | 'large';
    buttonLocation: string;
}

export const ContactSection: React.FC<ContactSectionProps> = ({
    size = 'medium',
    buttonLocation,
}) => {
    const [modalOpen, setModalOpen] = useState(false);
    const { t } = useTranslation('contact');

    const handleOpenModal = () => {
        // Send event to Google Tag Manager
        trackEvent('button_click', {
            button_name: 'Get CV',
            button_location: buttonLocation,
        });
        setModalOpen(true);
    };

    return (
        <>
            <Button onClick={handleOpenModal} size={size}>
                {t('contactSection.getCV')}
            </Button>

            <CVModal open={modalOpen} onClose={() => setModalOpen(false)} />
        </>
    );
};
