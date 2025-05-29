'use client';

import React from 'react';
import { Box, Typography } from '@mui/material';
import CodeIcon from '@mui/icons-material/Code';
import StorageIcon from '@mui/icons-material/Storage';
import DataObjectIcon from '@mui/icons-material/DataObject';
import IntegrationInstructionsIcon from '@mui/icons-material/IntegrationInstructions';

import { TabsComponent, TabItem } from './TabsComponent';
import { useTranslation } from '@/utils/hooks/useTranslation';

export const ArchitectureTabs: React.FC = () => {
    const { t } = useTranslation('architecture');
    
    const tabs: TabItem[] = [
        {
            label: t('tabs.frontend.label'),
            icon: <CodeIcon />,
            content: (
                <Box>
                    <Typography
                        variant="h6"
                        sx={{ color: 'textSecondary', mb: 2 }}
                    >
                        {t('tabs.frontend.sections.framework.title')}
                    </Typography>
                    <Typography variant="body1" paragraph textAlign="justify">
                        {t('tabs.frontend.sections.framework.content')}
                    </Typography>

                    <Typography
                        variant="h6"
                        sx={{ color: 'textSecondary', mb: 2, mt: 3 }}
                    >
                        {t('tabs.frontend.sections.ui.title')}
                    </Typography>
                    <Typography variant="body1" paragraph textAlign="justify">
                        {t('tabs.frontend.sections.ui.content')}
                    </Typography>

                    <Typography
                        variant="h6"
                        sx={{ color: 'textSecondary', mb: 2, mt: 3 }}
                    >
                        {t('tabs.frontend.sections.typeSafety.title')}
                    </Typography>
                    <Typography variant="body1" paragraph textAlign="justify">
                        {t('tabs.frontend.sections.typeSafety.content')}
                    </Typography>
                </Box>
            ),
        },
        {
            label: t('tabs.backend.label'),
            icon: <StorageIcon />,
            content: (
                <Box>
                    <Typography
                        variant="h6"
                        sx={{ color: 'textSecondary', mb: 2 }}
                    >
                        {t('tabs.backend.sections.hosting.title')}
                    </Typography>
                    <Typography variant="body1" paragraph textAlign="justify">
                        {t('tabs.backend.sections.hosting.content')}
                    </Typography>

                    <Typography
                        variant="h6"
                        sx={{ color: 'textSecondary', mb: 2, mt: 3 }}
                    >
                        {t('tabs.backend.sections.authentication.title')}
                    </Typography>
                    <Typography variant="body1" paragraph textAlign="justify">
                        {t('tabs.backend.sections.authentication.content')}
                    </Typography>

                    <Typography
                        variant="h6"
                        sx={{ color: 'textSecondary', mb: 2, mt: 3 }}
                    >
                        {t('tabs.backend.sections.contentDelivery.title')}
                    </Typography>
                    <Typography variant="body1" paragraph textAlign="justify">
                        {t('tabs.backend.sections.contentDelivery.content')}
                    </Typography>
                </Box>
            ),
        },
        {
            label: t('tabs.database.label'),
            icon: <DataObjectIcon />,
            content: (
                <Box>
                    <Typography
                        variant="h6"
                        sx={{ color: 'textSecondary', mb: 2 }}
                    >
                        {t('tabs.database.sections.nosql.title')}
                    </Typography>
                    <Typography variant="body1" paragraph textAlign="justify">
                        {t('tabs.database.sections.nosql.content')}
                    </Typography>

                    <Typography
                        variant="h6"
                        sx={{ color: 'textSecondary', mb: 2, mt: 3 }}
                    >
                        {t('tabs.database.sections.storage.title')}
                    </Typography>
                    <Typography variant="body1" paragraph textAlign="justify">
                        {t('tabs.database.sections.storage.content')}
                    </Typography>

                    <Typography
                        variant="h6"
                        sx={{ color: 'textSecondary', mb: 2, mt: 3 }}
                    >
                        {t('tabs.database.sections.performance.title')}
                    </Typography>
                    <Typography variant="body1" paragraph textAlign="justify">
                        {t('tabs.database.sections.performance.content')}
                    </Typography>
                </Box>
            ),
        },
        {
            label: t('tabs.cicd.label'),
            icon: <IntegrationInstructionsIcon />,
            content: (
                <Box>
                    <Typography
                        variant="h6"
                        sx={{ color: 'textSecondary', mb: 2 }}
                    >
                        {t('tabs.cicd.sections.amplify.title')}
                    </Typography>
                    <Typography variant="body1" paragraph textAlign="justify">
                        {t('tabs.cicd.sections.amplify.content')}
                    </Typography>

                    <Typography
                        variant="h6"
                        sx={{ color: 'textSecondary', mb: 2, mt: 3 }}
                    >
                        {t('tabs.cicd.sections.husky.title')}
                    </Typography>
                    <Typography variant="body1" paragraph textAlign="justify">
                        {t('tabs.cicd.sections.husky.content')}
                    </Typography>

                    <Typography
                        variant="h6"
                        sx={{ color: 'textSecondary', mb: 2, mt: 3 }}
                    >
                        {t('tabs.cicd.sections.github.title')}
                    </Typography>
                    <Typography variant="body1" paragraph textAlign="justify">
                        {t('tabs.cicd.sections.github.content')}
                    </Typography>
                </Box>
            ),
        },
    ];

    return (
        <TabsComponent
            tabs={tabs}
            tabsAriaLabel="architecture tabs"
            tabPanelPrefix="architecture-"
        />
    );
};
