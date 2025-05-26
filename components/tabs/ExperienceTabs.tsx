'use client';

import React, { useState, SyntheticEvent } from 'react';
import {
    Box,
    Tabs,
    Tab,
    Typography,
    List,
    ListItem,
    ListItemText,
    Paper,
    useTheme,
} from '@mui/material';

interface TabPanelProps {
    children?: React.ReactNode;
    index: number;
    value: number;
}

interface ExperienceItem {
    primary: string;
}

interface ExperienceSection {
    title: string;
    icon: string;
    items: ExperienceItem[];
}

interface ExperienceTab {
    label: string;
    sections: ExperienceSection[];
}

interface ExperienceTabsProps {
    tabs: ExperienceTab[];
}

function TabPanel(props: TabPanelProps) {
    const { children, value, index, ...other } = props;

    return (
        <div
            role="tabpanel"
            hidden={value !== index}
            id={`experience-tabpanel-${index}`}
            aria-labelledby={`experience-tab-${index}`}
            {...other}
        >
            {value === index && <Box sx={{ p: 3 }}>{children}</Box>}
        </div>
    );
}

function a11yProps(index: number) {
    return {
        id: `experience-tab-${index}`,
        'aria-controls': `experience-tabpanel-${index}`,
    };
}

export const ExperienceTabs: React.FC<ExperienceTabsProps> = ({ tabs }) => {
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
                mt: 2,
                boxShadow: `0 4px 12px ${theme.palette.background.aws}`,
                borderRadius: 2,
                overflow: 'hidden',
            }}
        >
            <Box
                sx={{
                    borderBottom: 1,
                    borderColor: 'divider',
                    overflowX: 'auto',
                }}
            >
                <Tabs
                    value={value}
                    onChange={handleChange}
                    aria-label="experience tabs"
                    variant="scrollable"
                    scrollButtons="auto"
                    allowScrollButtonsMobile
                    sx={{
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
                            {...a11yProps(index)}
                        />
                    ))}
                </Tabs>
            </Box>

            {tabs.map((tab, index) => (
                <TabPanel key={index} value={value} index={index}>
                    <Box>
                        {tab.sections.map((section, sectionIndex) => (
                            <React.Fragment key={sectionIndex}>
                                <Typography
                                    variant="h6"
                                    sx={{
                                        color: 'textSecondary',
                                        mb: 2,
                                        mt: sectionIndex > 0 ? 2 : 0,
                                    }}
                                >
                                    {section.icon} {section.title}
                                </Typography>
                                <List dense>
                                    {section.items.map((item, itemIndex) => (
                                        <ListItem key={itemIndex}>
                                            <ListItemText
                                                primary={item.primary}
                                            />
                                        </ListItem>
                                    ))}
                                </List>
                            </React.Fragment>
                        ))}
                    </Box>
                </TabPanel>
            ))}
        </Paper>
    );
};

export const experienceData: ExperienceTab[] = [
    {
        label: 'Cloud Engineer',
        sections: [
            {
                title: 'Automation of CI/CD Pipelines',
                icon: '🔧',
                items: [
                    {
                        primary:
                            'Designed and implemented CI/CD workflows using GitHub Actions and AWS CodePipeline, reducing deployment time by 60%.',
                    },
                    {
                        primary:
                            'Built reusable workflows for multi-environment deployments with rollback support.',
                    },
                ],
            },
            {
                title: 'Serverless Architecture',
                icon: '☁️',
                items: [
                    {
                        primary:
                            'Developed scalable event-driven systems using AWS Lambda, Step Functions, and EventBridge.',
                    },
                    {
                        primary:
                            'Created robust observability tooling with custom CloudWatch dashboards and centralized log subscriptions.',
                    },
                ],
            },
        ],
    },
    {
        label: 'Software Developer',
        sections: [
            {
                title: 'Resilient and Secure Systems',
                icon: '🛡',
                items: [
                    {
                        primary:
                            'Led the migration of legacy services to a serverless architecture, increasing uptime and reducing maintenance costs.',
                    },
                    {
                        primary:
                            'Enforced security best practices through IAM least privilege, API Gateway WAF, and VPC configurations.',
                    },
                ],
            },
            {
                title: 'Full-Stack Development',
                icon: '💻',
                items: [
                    {
                        primary:
                            'Built responsive web applications using React, Next.js, and Material UI.',
                    },
                    {
                        primary:
                            'Developed backend services with Node.js, Python, and TypeScript.',
                    },
                ],
            },
        ],
    },
    {
        label: 'Technical Lead',
        sections: [
            {
                title: 'Intelligent Solutions',
                icon: '🧠',
                items: [
                    {
                        primary:
                            'Integrated OpenAI and AWS Bedrock services to build internal AI copilots that boosted productivity in support and dev teams.',
                    },
                    {
                        primary:
                            'Led architecture decisions for cloud-native applications, focusing on scalability and cost optimization.',
                    },
                ],
            },
            {
                title: 'Team Leadership',
                icon: '👥',
                items: [
                    {
                        primary:
                            'Mentored junior developers and conducted technical interviews for new team members.',
                    },
                    {
                        primary:
                            'Facilitated knowledge sharing sessions and promoted best practices across development teams.',
                    },
                ],
            },
        ],
    },
];
