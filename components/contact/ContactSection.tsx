'use client';

import React, { useState } from 'react';
import { Box } from '@mui/material';
import { Button } from '../common/Button';
import CVModal from './CVModal';

export const ContactSection: React.FC = () => {
    const [modalOpen, setModalOpen] = useState(false);

    return (
        <>
            <Box
                sx={{
                    mt: 6,
                    textAlign: 'center',
                    display: 'flex',
                    justifyContent: 'center',
                    gap: 2,
                }}
            >
                <Button onClick={() => setModalOpen(true)}>Download CV</Button>
            </Box>

            <CVModal open={modalOpen} onClose={() => setModalOpen(false)} />
        </>
    );
};
