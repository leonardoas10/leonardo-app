'use client';

import React from 'react';
import {
    Box,
    Typography,
    List,
    ListItem,
    ListItemText,
} from '@mui/material';

import { TabsComponent, TabItem } from './TabsComponent';

interface ExperienceItem {
    primary: string;
}

interface ExperienceSection {
    title: string;
    icon: string;
    items: ExperienceItem[];
}

export interface ExperienceTab {
    label: string;
    sections: ExperienceSection[];
}

interface ExperienceTabsProps {
    tabs: ExperienceTab[];
}

export const ExperienceTabs: React.FC<ExperienceTabsProps> = ({ tabs }) => {
    const tabItems: TabItem[] = tabs.map(tab => ({
        label: tab.label,
        content: (
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
        )
    }));

    return <TabsComponent tabs={tabItems} tabsAriaLabel="experience tabs" tabPanelPrefix="experience-" />;
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