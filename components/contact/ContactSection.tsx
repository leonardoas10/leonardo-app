'use client';

import React, { useState } from 'react';
import { Button } from '../common/Button';
import CVModal from './CVModal';

interface ContactSectionProps {
    size?: 'small' | 'medium' | 'large';
}

export const ContactSection: React.FC<ContactSectionProps> = ({ size = 'medium' }) => {
    const [modalOpen, setModalOpen] = useState(false);

    return (
        <>
            <Button onClick={() => setModalOpen(true)} size={size}>
                Get CV
            </Button>

            <CVModal open={modalOpen} onClose={() => setModalOpen(false)} />
        </>
    );
};
