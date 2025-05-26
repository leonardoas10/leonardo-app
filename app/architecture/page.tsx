'use client';

import React, { useState, SyntheticEvent } from 'react';
import {
    Container,
    Typography,
    Box,
    Paper,
    Tabs,
    Tab,
    Grid,
    useTheme,
    useMediaQuery,
} from '@mui/material';
import CodeIcon from '@mui/icons-material/Code';
import StorageIcon from '@mui/icons-material/Storage';
import DataObjectIcon from '@mui/icons-material/DataObject';

import { Chip } from '@/components/common/Chip';

interface TabPanelProps {
    children?: React.ReactNode;
    index: number;
    value: number;
}

function TabPanel(props: TabPanelProps) {
    const { children, value, index, ...other } = props;

    return (
        <div
            role="tabpanel"
            hidden={value !== index}
            id={`architecture-tabpanel-${index}`}
            aria-labelledby={`architecture-tab-${index}`}
            {...other}
        >
            {value === index && <Box sx={{ p: 3 }}>{children}</Box>}
        </div>
    );
}

function a11yProps(index: number) {
    return {
        id: `architecture-tab-${index}`,
        'aria-controls': `architecture-tabpanel-${index}`,
    };
}

export default function ArchitecturePage() {
    const theme = useTheme();
    const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
    const [value, setValue] = useState(0);

    const handleChange = (event: SyntheticEvent, newValue: number) => {
        setValue(newValue);
    };

    return (
        <Container
            maxWidth="lg"
            sx={{ py: { xs: 4, md: 4 }, px: { xs: 2, sm: 3, md: 4 } }}
        >
            <Grid container spacing={4} sx={{ mb: 4 }}>
                <Grid size={{ xs: 12 }}>
                    <Typography
                        variant={isMobile ? 'h4' : 'h3'}
                        component="h1"
                        gutterBottom
                        sx={{
                            fontWeight: 'bold',
                            textAlign: { xs: 'center', md: 'left' },
                        }}
                    >
                        Architecture
                    </Typography>

                    <Typography
                        variant="body1"
                        sx={{
                            mb: 2,
                            textAlign: { xs: 'center', md: 'left' },
                        }}
                    >
                        This website leverages Next.js for server-side rendering
                        to optimize SEO performance, AWS Amplify for
                        cost-effective serverless backend operations, and
                        DynamoDB for fast, scalable data retrieval with minimal
                        latency.
                    </Typography>

                    <Box
                        sx={{
                            display: 'flex',
                            justifyContent: { xs: 'center', md: 'center' },
                            mb: 2,
                        }}
                    >
                        <Chip
                            label="GitHub Repository"
                            href="https://github.com/leonardoas10/leonardo-app"
                        />
                    </Box>
                </Grid>
            </Grid>

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
                        aria-label="architecture tabs"
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
                        <Tab
                            icon={<CodeIcon />}
                            label="Frontend"
                            {...a11yProps(0)}
                        />
                        <Tab
                            icon={<StorageIcon />}
                            label="Backend"
                            {...a11yProps(1)}
                        />
                        <Tab
                            icon={<DataObjectIcon />}
                            label="Database"
                            {...a11yProps(2)}
                        />
                    </Tabs>
                </Box>

                <TabPanel value={value} index={0}>
                    <Box>
                        <Typography
                            variant="h6"
                            sx={{ color: 'textSecondary', mb: 2 }}
                        >
                            🚀 Framework
                        </Typography>
                        <Typography variant="body1" paragraph>
                            The frontend is built with Next.js 14 using the App
                            Router architecture. Components are organized
                            following atomic design principles, with reusable UI
                            elements and page-specific components.
                        </Typography>

                        <Typography
                            variant="h6"
                            sx={{ color: 'textSecondary', mb: 2, mt: 3 }}
                        >
                            🎨 UI Components
                        </Typography>
                        <Typography variant="body1" paragraph>
                            Material UI provides a consistent design system with
                            responsive components that adapt to any screen size.
                            The theme system allows for seamless light/dark mode
                            switching.
                        </Typography>

                        <Typography
                            variant="h6"
                            sx={{ color: 'textSecondary', mb: 2, mt: 3 }}
                        >
                            📝 Type Safety
                        </Typography>
                        <Typography variant="body1" paragraph>
                            TypeScript ensures type safety throughout the
                            codebase, reducing runtime errors and improving
                            developer productivity.
                        </Typography>
                    </Box>
                </TabPanel>

                <TabPanel value={value} index={1}>
                    <Box>
                        <Typography
                            variant="h6"
                            sx={{ color: 'textSecondary', mb: 2 }}
                        >
                            ☁️ Hosting
                        </Typography>
                        <Typography variant="body1" paragraph>
                            The backend uses AWS Amplify for hosting and
                            continuous deployment. API routes in Next.js provide
                            serverless functions for handling data processing
                            and third-party integrations.
                        </Typography>

                        <Typography
                            variant="h6"
                            sx={{ color: 'textSecondary', mb: 2, mt: 3 }}
                        >
                            🔒 Authentication
                        </Typography>
                        <Typography variant="body1" paragraph>
                            Authentication is handled through AWS Cognito,
                            providing secure user management and access control.
                        </Typography>

                        <Typography
                            variant="h6"
                            sx={{ color: 'textSecondary', mb: 2, mt: 3 }}
                        >
                            🌐 Content Delivery
                        </Typography>
                        <Typography variant="body1" paragraph>
                            CloudFront CDN is used for content delivery,
                            ensuring fast loading times globally.
                        </Typography>
                    </Box>
                </TabPanel>

                <TabPanel value={value} index={2}>
                    <Box>
                        <Typography
                            variant="h6"
                            sx={{ color: 'textSecondary', mb: 2 }}
                        >
                            📊 NoSQL Database
                        </Typography>
                        <Typography variant="body1" paragraph>
                            Data is stored in Amazon DynamoDB, a NoSQL database
                            service that provides fast and predictable
                            performance with seamless scalability.
                        </Typography>

                        <Typography
                            variant="h6"
                            sx={{ color: 'textSecondary', mb: 2, mt: 3 }}
                        >
                            🗄️ Storage
                        </Typography>
                        <Typography variant="body1" paragraph>
                            S3 buckets are used for storing static assets like
                            images and documents, with proper CORS configuration
                            to ensure secure access.
                        </Typography>

                        <Typography
                            variant="h6"
                            sx={{ color: 'textSecondary', mb: 2, mt: 3 }}
                        >
                            ⚡ Performance
                        </Typography>
                        <Typography variant="body1" paragraph>
                            Data access patterns are optimized for common
                            queries, with appropriate indexes to ensure
                            efficient retrieval.
                        </Typography>
                    </Box>
                </TabPanel>
            </Paper>

            <Box sx={{ mt: 6, mb: 4 }}>
                <Typography variant="h5" gutterBottom>
                    Architecture Diagram
                </Typography>
                <Paper
                    elevation={2}
                    sx={{
                        p: 3,
                        height: 300,
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        bgcolor: 'background.paper',
                        borderRadius: 2,
                    }}
                >
                    <Typography variant="body2" color="text.secondary">
                        [Architecture Diagram Placeholder]
                    </Typography>
                </Paper>
            </Box>
        </Container>
    );
}
