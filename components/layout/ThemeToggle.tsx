'use client';

import React from 'react';
import { useThemeContext } from '@/contexts/ThemeContext';

import { Box } from '@mui/material';
import { IOSSwitch } from '@/components/common/IOSSwitch';
import DarkModeIcon from '@mui/icons-material/DarkMode';
import LightModeIcon from '@mui/icons-material/LightMode';

interface ThemeToggleProps {
    size?: 'small' | 'medium' | 'large';
}

export const ThemeToggle: React.FC<ThemeToggleProps> = ({
    size = 'medium',
}) => {
    const { mode, toggleColorMode } = useThemeContext();

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

    return (
        <Box sx={{ display: 'flex', alignItems: 'center' }}>
            <IOSSwitch
                checked={mode === 'dark'}
                onChange={toggleColorMode}
                checkedIcon={<DarkModeIcon />}
                uncheckedIcon={<LightModeIcon />}
                sx={getSwitchStyle()}
            />
        </Box>
    );
};
