'use client';

import {
    Box,
    Tabs,
    Tab,
    Paper,
    useTheme,
    useMediaQuery,
} from '@mui/material';
import React, { useState, SyntheticEvent, ReactElement } from 'react';

export function splitEmojiLabel(label: string): { emoji: string; text: string } {
    const spaceIndex = label.indexOf(' ');

    if (spaceIndex === -1) {
        return { emoji: '', text: label };
    }

    return {
        emoji: label.slice(0, spaceIndex),
        text: label.slice(spaceIndex + 1).trim(),
    };
}

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
            {value === index && (
                <Box sx={{ p: { xs: 2, md: 3 } }}>{children}</Box>
            )}
        </div>
    );
}

export const TabsComponent: React.FC<TabsComponentProps> = ({
    tabs,
    tabsAriaLabel = 'tabs',
    tabPanelPrefix = '',
}) => {
    const theme = useTheme();
    const isMobile = useMediaQuery(theme.breakpoints.down('md'));
    const [value, setValue] = useState(0);

    const handleChange = (_event: SyntheticEvent, newValue: number) => {
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
                    variant={isMobile ? 'scrollable' : 'standard'}
                    centered={!isMobile}
                    scrollButtons="auto"
                    allowScrollButtonsMobile
                    sx={{
                        width: isMobile ? '100%' : 'auto',
                        minHeight: { xs: 72, md: 48 },
                        '& .MuiTabs-flexContainer': {
                            minHeight: { xs: 72, md: 48 },
                            justifyContent: isMobile ? 'flex-start' : 'center',
                        },
                        '& .MuiTab-root': {
                            color:
                                theme.palette.mode === 'dark'
                                    ? 'white !important'
                                    : 'black !important',
                            minWidth: { xs: 96, md: 120 },
                            maxWidth: 'none',
                            flexShrink: 0,
                            px: { xs: 1.5, md: 2 },
                            py: { xs: 1, md: 1.5 },
                            minHeight: { xs: 72, md: 48 },
                            fontSize: { xs: '0.7rem', md: '0.875rem' },
                            lineHeight: 1.2,
                            textTransform: 'none',
                            whiteSpace: 'normal',
                        },
                        '& .MuiTab-icon': {
                            fontSize: { xs: '1.25rem', md: '1.125rem' },
                            mb: { xs: 0.5, md: 0 },
                            mr: { xs: 0, md: 1 },
                        },
                        '& .MuiButtonBase-root.Mui-selected': {
                            color: `${theme.palette.textSecondary} !important`,
                        },
                        '& .MuiTabs-indicator': {
                            backgroundColor: theme.palette.textSecondary,
                            height: 3,
                        },
                    }}
                >
                    {tabs.map((tab, index) => (
                        <Tab
                            key={index}
                            label={tab.label}
                            icon={tab.icon}
                            iconPosition={
                                isMobile && tab.icon ? 'top' : 'start'
                            }
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
