'use client';

import DarkModeIcon from '@mui/icons-material/DarkMode';
import LightModeIcon from '@mui/icons-material/LightMode';
import { Box } from '@mui/material';
import React from 'react';

import { IOSSwitch, SwitchThumbContent } from '@/components/common/IOSSwitch';
import { useThemeContext } from '@/contexts/ThemeContext';

interface ThemeToggleProps {
    size?: 'small' | 'medium' | 'large';
    toggleLocation: string;
}

export const ThemeToggle: React.FC<ThemeToggleProps> = ({
    size = 'medium',
    toggleLocation,
}) => {
    const { mode, toggleColorMode } = useThemeContext();

    return (
        <Box sx={{ display: 'flex', alignItems: 'center' }}>
            <IOSSwitch
                checked={mode === 'dark'}
                onChange={() => toggleColorMode(toggleLocation)}
                checkedIcon={
                    <SwitchThumbContent customSize={size}>
                        <DarkModeIcon aria-hidden />
                    </SwitchThumbContent>
                }
                uncheckedIcon={
                    <SwitchThumbContent customSize={size}>
                        <LightModeIcon aria-hidden />
                    </SwitchThumbContent>
                }
                customSize={size}
                aria-label="Theme toggle"
            />
        </Box>
    );
};
