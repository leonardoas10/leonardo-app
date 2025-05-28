'use client';

import React, { useState } from 'react';
import { Button } from '../common/Button';
import CVModal from './CVModal';
import { useTranslation } from '@/utils/hooks/useTranslation';

interface ContactSectionProps {
    size?: 'small' | 'medium' | 'large';
}

export const ContactSection: React.FC<ContactSectionProps> = ({ size = 'medium' }) => {
    const [modalOpen, setModalOpen] = useState(false);
    const { t } = useTranslation('contact');

    return (
        <>
            <Button onClick={() => setModalOpen(true)} size={size}>
                {t('contactSection.getCV')}
            </Button>

            <CVModal open={modalOpen} onClose={() => setModalOpen(false)} />
        </>
    );
};
