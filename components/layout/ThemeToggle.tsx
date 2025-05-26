'use client';

import React from 'react';
import { useThemeContext } from '@/contexts/ThemeContext';
import { IOSSwitch } from '@/components/common/IOSSwitch';
import { Box } from '@mui/material';

export const ThemeToggle: React.FC = () => {
    const { mode, toggleColorMode } = useThemeContext();

    return (
        <Box sx={{ display: 'flex', alignItems: 'center' }}>
            <IOSSwitch
                sx={{ m: 1 }}
                checked={mode === 'dark'}
                onChange={toggleColorMode}
            />
        </Box>
    );
};
