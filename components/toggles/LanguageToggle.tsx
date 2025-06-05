'use client';

import { Box } from '@mui/material';
import React from 'react';

import { IOSSwitch } from '@/components/common/IOSSwitch';
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

    // Text size based on switch size
    const getFontSize = () => {
        if (size === 'small') return '9px';
        if (size === 'large') return '18px';
        return '16px';
    };

    // Create a language text element with the given text
    const createLanguageText = (text: string) => (
        <div
            style={{
                display: 'flex',
                backgroundColor: 'white',
                color: 'black',
                borderRadius: '50%',
                fontWeight: 'bold',
                fontSize: getFontSize(),
                marginTop: '1px',
                padding: '1.8px',
            }}
        >
            {text}
        </div>
    );

    // Create the EN and ES text elements
    const EnText = createLanguageText('EN');
    const EsText = createLanguageText('ES');

    return (
        <Box sx={{ display: 'flex', alignItems: 'center' }}>
            <IOSSwitch
                checked={language === 'en'}
                onChange={() => toggleLanguage(toggleLocation)}
                checkedIcon={EnText}
                uncheckedIcon={EsText}
                switchBaseMargin={
                    language === 'es' ? '2px 0px 2px 2px' : '2px 4px 2px 2px'
                }
                customSize={size}
                aria-label="Language toggle"
            />
        </Box>
    );
};
