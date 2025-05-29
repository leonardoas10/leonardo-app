'use client';

import React from 'react';
import { Box, Typography, List, ListItem, ListItemText } from '@mui/material';

import { TabsComponent, TabItem } from './TabsComponent';
import { useTranslation } from '@/utils/hooks/useTranslation';
import { TFunction } from 'i18next';

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
    tabs?: ExperienceTab[];
}

export const ExperienceTabs: React.FC<ExperienceTabsProps> = ({ tabs }) => {
    const { t } = useTranslation('about');
    
    const experienceTabs = tabs || getExperienceData(t);

    const tabItems: TabItem[] = experienceTabs.map((tab) => ({
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
                            {section.items.map(
                                (item: ExperienceItem, itemIndex: number) => (
                                    <ListItem key={itemIndex}>
                                        <ListItemText 
                                            primary={item.primary}
                                            primaryTypographyProps={{ align: 'justify' }}
                                        />
                                    </ListItem>
                                )
                            )}
                        </List>
                    </React.Fragment>
                ))}
            </Box>
        ),
    }));

    return (
        <TabsComponent
            tabs={tabItems}
            tabsAriaLabel="experience tabs"
            tabPanelPrefix="experience-"
        />
    );
};

const getExperienceData = (t: TFunction) => {
    return [
        {
            label: t('experienceTabs.cloudEngineer.label'),
            sections: [
                {
                    title: t(
                        'experienceTabs.cloudEngineer.sections.cicd.title'
                    ),
                    icon: t('experienceTabs.cloudEngineer.sections.cicd.icon'),
                    items: (t(
                        'experienceTabs.cloudEngineer.sections.cicd.items',
                        { returnObjects: true }
                    ) as string[]).map((item: string) => ({ primary: item })),
                },
                {
                    title: t(
                        'experienceTabs.cloudEngineer.sections.serverless.title'
                    ),
                    icon: t(
                        'experienceTabs.cloudEngineer.sections.serverless.icon'
                    ),
                    items: (t(
                        'experienceTabs.cloudEngineer.sections.serverless.items',
                        { returnObjects: true }
                    ) as string[]).map((item: string) => ({ primary: item })),
                },
            ],
        },
        {
            label: t('experienceTabs.softwareDeveloper.label'),
            sections: [
                {
                    title: t(
                        'experienceTabs.softwareDeveloper.sections.resilient.title'
                    ),
                    icon: t(
                        'experienceTabs.softwareDeveloper.sections.resilient.icon'
                    ),
                    items: (t(
                        'experienceTabs.softwareDeveloper.sections.resilient.items',
                        { returnObjects: true }
                    ) as string[]).map((item: string) => ({ primary: item })),
                },
                {
                    title: t(
                        'experienceTabs.softwareDeveloper.sections.fullstack.title'
                    ),
                    icon: t(
                        'experienceTabs.softwareDeveloper.sections.fullstack.icon'
                    ),
                    items: (t(
                        'experienceTabs.softwareDeveloper.sections.fullstack.items',
                        { returnObjects: true }
                    ) as string[]).map((item: string) => ({ primary: item })),
                },
            ],
        },
        {
            label: t('experienceTabs.technicalLead.label'),
            sections: [
                {
                    title: t(
                        'experienceTabs.technicalLead.sections.intelligent.title'
                    ),
                    icon: t(
                        'experienceTabs.technicalLead.sections.intelligent.icon'
                    ),
                    items: (t(
                        'experienceTabs.technicalLead.sections.intelligent.items',
                        { returnObjects: true }
                    ) as string[]).map((item: string) => ({ primary: item })),
                },
                {
                    title: t(
                        'experienceTabs.technicalLead.sections.leadership.title'
                    ),
                    icon: t(
                        'experienceTabs.technicalLead.sections.leadership.icon'
                    ),
                    items: (t(
                        'experienceTabs.technicalLead.sections.leadership.items',
                        { returnObjects: true }
                    ) as string[]).map((item: string) => ({ primary: item })),
                },
            ],
        },
    ];
};
