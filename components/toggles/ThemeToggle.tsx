'use client';

import DarkModeIcon from '@mui/icons-material/DarkMode';
import LightModeIcon from '@mui/icons-material/LightMode';
import { Box } from '@mui/material';
import React from 'react';

import { IOSSwitch } from '@/components/common/IOSSwitch';
import { useThemeContext } from '@/contexts/ThemeContext';



interface ThemeToggleProps {
    size?: 'small' | 'medium' | 'large';
}

export const ThemeToggle: React.FC<ThemeToggleProps> = ({
    size = 'medium',
}) => {
    const { mode, toggleColorMode } = useThemeContext();

    return (
        <Box sx={{ display: 'flex', alignItems: 'center' }}>
            <IOSSwitch
                checked={mode === 'dark'}
                onChange={toggleColorMode}
                checkedIcon={<DarkModeIcon sx={{ mt: -0.2 }} />}
                uncheckedIcon={<LightModeIcon />}
                switchBaseMargin="4px 0px 2px 4px"
                customSize={size}
                aria-label="Theme toggle"
            />
        </Box>
    );
};
