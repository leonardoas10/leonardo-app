'use client';

import React from 'react';
import { Box, Typography } from '@mui/material';
import CodeIcon from '@mui/icons-material/Code';
import StorageIcon from '@mui/icons-material/Storage';
import DataObjectIcon from '@mui/icons-material/DataObject';
import IntegrationInstructionsIcon from '@mui/icons-material/IntegrationInstructions';

import { TabsComponent, TabItem } from './TabsComponent';

export const ArchitectureTabs: React.FC = () => {
    const tabs: TabItem[] = [
        {
            label: 'Frontend',
            icon: <CodeIcon />,
            content: (
                <Box>
                    <Typography
                        variant="h6"
                        sx={{ color: 'textSecondary', mb: 2 }}
                    >
                        🚀 Framework
                    </Typography>
                    <Typography variant="body1" paragraph>
                        The frontend is built with Next.js 14 using the App
                        Router architecture. Components are organized following
                        atomic design principles, with reusable UI elements and
                        page-specific components.
                    </Typography>

                    <Typography
                        variant="h6"
                        sx={{ color: 'textSecondary', mb: 2, mt: 3 }}
                    >
                        🎨 UI Components
                    </Typography>
                    <Typography variant="body1" paragraph>
                        Material UI provides a consistent design system with
                        responsive components that adapt to any screen size. The
                        theme system allows for seamless light/dark mode
                        switching.
                    </Typography>

                    <Typography
                        variant="h6"
                        sx={{ color: 'textSecondary', mb: 2, mt: 3 }}
                    >
                        📝 Type Safety
                    </Typography>
                    <Typography variant="body1" paragraph>
                        TypeScript ensures type safety throughout the codebase,
                        reducing runtime errors and improving developer
                        productivity.
                    </Typography>
                </Box>
            ),
        },
        {
            label: 'Backend',
            icon: <StorageIcon />,
            content: (
                <Box>
                    <Typography
                        variant="h6"
                        sx={{ color: 'textSecondary', mb: 2 }}
                    >
                        ☁️ Hosting
                    </Typography>
                    <Typography variant="body1" paragraph>
                        The backend uses AWS Amplify for hosting and continuous
                        deployment. API routes in Next.js provide serverless
                        functions for handling data processing and third-party
                        integrations.
                    </Typography>

                    <Typography
                        variant="h6"
                        sx={{ color: 'textSecondary', mb: 2, mt: 3 }}
                    >
                        🔒 Authentication
                    </Typography>
                    <Typography variant="body1" paragraph>
                        Authentication is handled through AWS Cognito, providing
                        secure user management and access control.
                    </Typography>

                    <Typography
                        variant="h6"
                        sx={{ color: 'textSecondary', mb: 2, mt: 3 }}
                    >
                        🌐 Content Delivery
                    </Typography>
                    <Typography variant="body1" paragraph>
                        CloudFront CDN is used for content delivery, ensuring
                        fast loading times globally.
                    </Typography>
                </Box>
            ),
        },
        {
            label: 'Database',
            icon: <DataObjectIcon />,
            content: (
                <Box>
                    <Typography
                        variant="h6"
                        sx={{ color: 'textSecondary', mb: 2 }}
                    >
                        📊 NoSQL Database
                    </Typography>
                    <Typography variant="body1" paragraph>
                        Data is stored in Amazon DynamoDB, a NoSQL database
                        service that provides fast and predictable performance
                        with seamless scalability.
                    </Typography>

                    <Typography
                        variant="h6"
                        sx={{ color: 'textSecondary', mb: 2, mt: 3 }}
                    >
                        🗄️ Storage
                    </Typography>
                    <Typography variant="body1" paragraph>
                        S3 buckets are used for storing static assets like
                        images and documents, with proper CORS configuration to
                        ensure secure access.
                    </Typography>

                    <Typography
                        variant="h6"
                        sx={{ color: 'textSecondary', mb: 2, mt: 3 }}
                    >
                        ⚡ Performance
                    </Typography>
                    <Typography variant="body1" paragraph>
                        Data access patterns are optimized for common queries,
                        with appropriate indexes to ensure efficient retrieval.
                    </Typography>
                </Box>
            ),
        },
        {
            label: 'CI/CD',
            icon: <IntegrationInstructionsIcon />,
            content: (
                <Box>
                    <Typography
                        variant="h6"
                        sx={{ color: 'textSecondary', mb: 2 }}
                    >
                        🔄 Amplify CI/CD
                    </Typography>
                    <Typography variant="body1" paragraph>
                        AWS Amplify provides a fully managed CI/CD workflow that
                        automatically builds, tests, and deploys the application
                        on every code push. This eliminates manual deployment
                        steps, ensures consistent environments, and enables
                        feature branch deployments for testing before merging to
                        production.
                    </Typography>

                    <Typography
                        variant="h6"
                        sx={{ color: 'textSecondary', mb: 2, mt: 3 }}
                    >
                        🪝 Husky Git Hooks
                    </Typography>
                    <Typography variant="body1" paragraph>
                        Husky is implemented to enforce code quality standards
                        by running pre-commit and pre-push hooks. These hooks
                        automatically run linters, type checking, and unit tests
                        before allowing commits or pushes, preventing
                        problematic code from entering the repository.
                    </Typography>

                    <Typography
                        variant="h6"
                        sx={{ color: 'textSecondary', mb: 2, mt: 3 }}
                    >
                        🏷️ GitHub Actions for PRs
                    </Typography>
                    <Typography variant="body1" paragraph>
                        GitHub Actions automatically label pull requests based
                        on their content (e.g.,{' '}
                        {'"feature", "bugfix", "documentation"'}) and run
                        validation workflows. This improves PR organization,
                        facilitates code review prioritization, and ensures all
                        changes meet quality standards before merging.
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
