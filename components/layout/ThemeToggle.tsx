'use client';

import React from 'react';
import { useThemeContext } from '@/contexts/ThemeContext';

import { Box } from '@mui/material';
import { IOSSwitch } from '@/components/common/IOSSwitch';
import DarkModeIcon from '@mui/icons-material/DarkMode';
import LightModeIcon from '@mui/icons-material/LightMode';

export const ThemeToggle: React.FC = () => {
    const { mode, toggleColorMode } = useThemeContext();

    return (
        <Box sx={{ display: 'flex', alignItems: 'center' }}>
            <IOSSwitch
                checked={mode === 'dark'}
                onChange={toggleColorMode}
                checkedIcon={<DarkModeIcon />}
                uncheckedIcon={<LightModeIcon />}
            />
        </Box>
    );
};
