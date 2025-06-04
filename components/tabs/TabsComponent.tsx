'use client';

import { Box, Tabs, Tab, Paper, useTheme } from '@mui/material';
import React, { useState, SyntheticEvent, ReactElement } from 'react';

interface TabPanelProps {
    children?: React.ReactNode;
    index: number;
    value: number;
    id?: string;
    'aria-labelledby'?: string;
}

export interface TabItem {
    label: string;
    icon?: ReactElement | string;
    content: React.ReactNode;
}

interface TabsComponentProps {
    tabs: TabItem[];
    tabsAriaLabel?: string;
    tabPanelPrefix?: string;
}

function TabPanel(props: TabPanelProps) {
    const { children, value, index, ...other } = props;

    return (
        <div
            role="tabpanel"
            hidden={value !== index}
            id={`tabpanel-${index}`}
            aria-labelledby={`tab-${index}`}
            {...other}
        >
            {value === index && <Box sx={{ p: 3 }}>{children}</Box>}
        </div>
    );
}

export const TabsComponent: React.FC<TabsComponentProps> = ({
    tabs,
    tabsAriaLabel = 'tabs',
    tabPanelPrefix = '',
}) => {
    const theme = useTheme();
    const [value, setValue] = useState(0);

    const handleChange = (event: SyntheticEvent, newValue: number) => {
        setValue(newValue);
    };

    return (
        <Paper
            elevation={3}
            sx={{
                width: '100%',
                boxShadow: `0 4px 12px ${theme.palette.background.aws}`,
                borderRadius: 2,
                overflow: 'hidden',
            }}
        >
            <Box
                sx={{
                    borderBottom: 1,
                    borderColor: 'divider',
                    display: 'flex',
                    justifyContent: 'center',
                }}
            >
                <Tabs
                    value={value}
                    onChange={handleChange}
                    aria-label={tabsAriaLabel}
                    variant="scrollable"
                    scrollButtons="auto"
                    allowScrollButtonsMobile
                    sx={{
                        maxWidth: { xs: '100%', md: '100%' },
                        '& .MuiTab-root': {
                            color:
                                theme.palette.mode === 'dark'
                                    ? 'white !important'
                                    : 'black !important',
                            minWidth: 120,
                        },
                        '& .MuiButtonBase-root.Mui-selected': {
                            color: `${theme.palette.textSecondary} !important`,
                        },
                        '& .MuiTabs-indicator': {
                            backgroundColor: theme.palette.textSecondary,
                        },
                    }}
                >
                    {tabs.map((tab, index) => (
                        <Tab
                            key={index}
                            label={tab.label}
                            icon={tab.icon}
                            id={`${tabPanelPrefix}tab-${index}`}
                            aria-controls={`${tabPanelPrefix}tabpanel-${index}`}
                        />
                    ))}
                </Tabs>
            </Box>

            {tabs.map((tab, index) => (
                <TabPanel 
                    key={index} 
                    value={value} 
                    index={index}
                    id={`${tabPanelPrefix}tabpanel-${index}`}
                    aria-labelledby={`${tabPanelPrefix}tab-${index}`}
                >
                    {tab.content}
                </TabPanel>
            ))}
        </Paper>
    );
};
