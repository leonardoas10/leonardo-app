'use client';

import { Box } from '@mui/material';
import React from 'react';

import { IOSSwitch, SwitchThumbContent } from '@/components/common/IOSSwitch';
import { useLanguage } from '@/contexts/LanguageContext';

interface LanguageToggleProps {
    size?: 'small' | 'medium' | 'large';
    toggleLocation: string;
}

export const LanguageToggle: React.FC<LanguageToggleProps> = ({
    size = 'medium',
    toggleLocation,
}) => {
    const { language, toggleLanguage } = useLanguage();

    return (
        <Box sx={{ display: 'flex', alignItems: 'center' }}>
            <IOSSwitch
                checked={language === 'en'}
                onChange={() => toggleLanguage(toggleLocation)}
                checkedIcon={
                    <SwitchThumbContent customSize={size}>EN</SwitchThumbContent>
                }
                uncheckedIcon={
                    <SwitchThumbContent customSize={size}>ES</SwitchThumbContent>
                }
                customSize={size}
                aria-label="Language toggle"
            />
        </Box>
    );
};
