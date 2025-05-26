'use client';

import React from 'react';
import { Box } from '@mui/material';
import { IOSSwitch } from '@/components/common/IOSSwitch';

interface LanguageToggleProps {
    size?: 'small' | 'medium' | 'large';
}

export const LanguageToggle: React.FC<LanguageToggleProps> = ({
    size = 'medium',
}) => {
    // This would typically come from a language context
    const [isSpanish, setIsSpanish] = React.useState(false);

    const toggleLanguage = () => {
        setIsSpanish(!isSpanish);
    };

    // Get switch size based on prop
    const getSwitchStyle = () => {
        if (size === 'small') {
            return {
                width: 36,
                height: 20,
                '& .MuiSwitch-thumb': { width: 16, height: 16 },
                '& .MuiSwitch-switchBase.Mui-checked': {
                    transform: 'translateX(16px)',
                },
            };
        } else if (size === 'large') {
            return {
                width: 48,
                height: 28,
                '& .MuiSwitch-thumb': { width: 24, height: 24 },
                '& .MuiSwitch-switchBase.Mui-checked': {
                    transform: 'translateX(20px)',
                },
            };
        }
        return {};
    };

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
                height: '100%',
                width: '100%',
                alignItems: 'center',
                justifyContent: 'center',
            }}
        >
            <div
                style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    backgroundColor: 'white',
                    color: 'black',
                    borderRadius: '50%',
                    fontWeight: 'bold',
                    fontSize: getFontSize(),
                    width: '100%',
                    height: '100%',
                    padding: '1px',
                }}
            >
                {text}
            </div>
        </div>
    );

    // Create the EN and ES text elements
    const EnText = createLanguageText('EN');
    const EsText = createLanguageText('ES');

    return (
        <Box sx={{ display: 'flex', alignItems: 'center' }}>
            <IOSSwitch
                checked={isSpanish}
                onChange={toggleLanguage}
                sx={getSwitchStyle()}
                checkedIcon={EnText}
                uncheckedIcon={EsText}
            />
        </Box>
    );
};
