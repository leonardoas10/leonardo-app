'use client';

import React from 'react';
import {
    Container,
    Typography,
    Box,
    Paper,
    Card,
    CardContent,
    CardHeader,
    Divider,
    List,
    ListItem,
    ListItemIcon,
    ListItemText,
    useTheme,
    useMediaQuery,
} from '@mui/material';
import Grid from '@mui/material/Grid';
import CodeIcon from '@mui/icons-material/Code';
import ArchitectureIcon from '@mui/icons-material/Architecture';
import StorageIcon from '@mui/icons-material/Storage';
import SpeedIcon from '@mui/icons-material/Speed';
import SecurityIcon from '@mui/icons-material/Security';
import DevicesIcon from '@mui/icons-material/Devices';

export default function WebsiteArchitecturePage() {
    const theme = useTheme();
    const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

    return (
        <Container
            maxWidth="lg"
            sx={{ py: { xs: 4, md: 4 }, px: { xs: 0, sm: 0, md: 0 } }}
        >
            <Paper elevation={3} sx={{ p: { xs: 2, sm: 4, md: 4 }, mb: 4 }}>
                <Typography
                    variant={isMobile ? 'h4' : 'h3'}
                    component="h1"
                    gutterBottom
                    sx={{ fontWeight: 'bold' }}
                >
                    Website Architecture
                </Typography>

                <Typography variant="body1" paragraph sx={{ mb: 4 }}>
                    This comprehensive guide outlines the architecture of our
                    modern web application, built with Next.js, Material UI, and
                    TypeScript. Our architecture prioritizes performance,
                    scalability, and developer experience while maintaining
                    excellent user experience across all devices.
                </Typography>

                <Divider sx={{ my: 4 }} />

                <Grid container spacing={4}>
                    <Grid size={{ xs: 12, md: 6 }}>
                        <Card elevation={2} sx={{ height: '100%' }}>
                            <CardHeader
                                title="Frontend Architecture"
                                titleTypographyProps={{ variant: 'h5' }}
                                avatar={<CodeIcon color="primary" />}
                            />
                            <CardContent>
                                <Typography variant="body1" paragraph>
                                    Our frontend architecture leverages the
                                    power of Next.js App Router for efficient
                                    server-side rendering and client-side
                                    navigation. The component structure follows
                                    atomic design principles, organizing
                                    elements from atoms to templates to pages.
                                </Typography>
                                <Typography variant="body1" paragraph>
                                    Material UI provides a consistent design
                                    system with responsive components that adapt
                                    to any screen size. The theme system allows
                                    for seamless light/dark mode switching and
                                    consistent styling across the application.
                                </Typography>
                                <Typography variant="body1" paragraph>
                                    TypeScript ensures type safety throughout
                                    the codebase, reducing runtime errors and
                                    improving developer productivity with
                                    enhanced IDE support and autocompletion.
                                </Typography>
                            </CardContent>
                        </Card>
                    </Grid>

                    <Grid size={{ xs: 12, md: 6 }}>
                        <Card elevation={2} sx={{ height: '100%' }}>
                            <CardHeader
                                title="Backend Integration"
                                titleTypographyProps={{ variant: 'h5' }}
                                avatar={<StorageIcon color="primary" />}
                            />
                            <CardContent>
                                <Typography variant="body1" paragraph>
                                    The application connects to backend services
                                    through a combination of REST APIs and
                                    GraphQL endpoints. API routes in Next.js
                                    provide serverless functions for handling
                                    authentication, data processing, and
                                    third-party integrations.
                                </Typography>
                                <Typography variant="body1" paragraph>
                                    Data fetching strategies include Server
                                    Components for initial page loads, Client
                                    Components for interactive elements, and a
                                    mix of SWR and React Query for efficient
                                    data caching and revalidation.
                                </Typography>
                                <Typography variant="body1" paragraph>
                                    Authentication is handled through JWT tokens
                                    with secure HTTP-only cookies, providing a
                                    balance of security and user experience.
                                </Typography>
                            </CardContent>
                        </Card>
                    </Grid>
                </Grid>

                <Box sx={{ my: 6 }}>
                    <Typography variant="h4" gutterBottom sx={{ mb: 3 }}>
                        Key Architectural Components
                    </Typography>

                    <List>
                        {[
                            {
                                icon: <ArchitectureIcon color="primary" />,
                                primary: 'Component Structure',
                                secondary:
                                    'Organized using atomic design principles with shared components, layouts, and page-specific elements. This structure promotes reusability and maintainability across the application.',
                            },
                            {
                                icon: <DevicesIcon color="primary" />,
                                primary: 'Responsive Design',
                                secondary:
                                    "Fully responsive layouts using MUI's Grid system and responsive typography. Custom breakpoints ensure optimal display across mobile, tablet, and desktop devices with no horizontal scrolling.",
                            },
                            {
                                icon: <SpeedIcon color="primary" />,
                                primary: 'Performance Optimization',
                                secondary:
                                    'Implemented code splitting, image optimization, and font loading strategies. Server components reduce JavaScript bundle size, while static generation improves loading times for content-heavy pages.',
                            },
                            {
                                icon: <SecurityIcon color="primary" />,
                                primary: 'Security Measures',
                                secondary:
                                    'Content Security Policy implementation, input sanitization, and protection against common web vulnerabilities. Regular security audits and dependency updates maintain a secure environment.',
                            },
                        ].map((item, index) => (
                            <React.Fragment key={index}>
                                <ListItem
                                    alignItems="flex-start"
                                    sx={{ py: 2 }}
                                >
                                    <ListItemIcon>{item.icon}</ListItemIcon>
                                    <ListItemText
                                        primary={
                                            <Typography variant="h6">
                                                {item.primary}
                                            </Typography>
                                        }
                                        secondary={
                                            <Typography
                                                variant="body2"
                                                color="text.secondary"
                                            >
                                                {item.secondary}
                                            </Typography>
                                        }
                                    />
                                </ListItem>
                                {index < 3 && (
                                    <Divider variant="inset" component="li" />
                                )}
                            </React.Fragment>
                        ))}
                    </List>
                </Box>

                <Divider sx={{ my: 4 }} />

                <Typography variant="h4" gutterBottom>
                    Technical Stack
                </Typography>

                <Grid container spacing={3} sx={{ mb: 4 }}>
                    {[
                        {
                            title: 'Framework',
                            content: 'Next.js 15 with App Router',
                        },
                        { title: 'UI Library', content: 'Material UI v7' },
                        { title: 'Language', content: 'TypeScript 5.8' },
                        {
                            title: 'State Management',
                            content: 'React Context API, SWR',
                        },
                        {
                            title: 'Styling',
                            content: 'MUI Styled Components, CSS Modules',
                        },
                        {
                            title: 'Testing',
                            content: 'Jest, React Testing Library',
                        },
                    ].map((item, index) => (
                        <Grid size={{ xs: 12, sm: 6, md: 4 }} key={index}>
                            <Paper elevation={1} sx={{ p: 2, height: '100%' }}>
                                <Typography
                                    variant="subtitle1"
                                    fontWeight="bold"
                                >
                                    {item.title}
                                </Typography>
                                <Typography variant="body2">
                                    {item.content}
                                </Typography>
                            </Paper>
                        </Grid>
                    ))}
                </Grid>

                <Box sx={{ my: 6 }}>
                    <Typography variant="h4" gutterBottom>
                        Development Workflow
                    </Typography>
                    <Typography variant="body1" paragraph>
                        Our development workflow emphasizes collaboration, code
                        quality, and continuous integration. Feature branches
                        are created from the main branch, developed with
                        comprehensive tests, and merged back through pull
                        requests.
                    </Typography>
                    <Typography variant="body1" paragraph>
                        Code reviews ensure adherence to project standards and
                        best practices. Automated CI/CD pipelines run tests,
                        linting, and type checking on every commit, with
                        deployment previews for each pull request.
                    </Typography>
                    <Typography variant="body1" paragraph>
                        Documentation is maintained alongside code, with
                        component stories in Storybook and API documentation
                        generated from TypeScript types. This ensures that
                        developers have access to up-to-date information about
                        the codebase.
                    </Typography>
                    <Typography variant="body1" paragraph>
                        Performance monitoring tools track key metrics like Core
                        Web Vitals, helping identify and address issues before
                        they impact users. Regular performance audits guide
                        optimization efforts and ensure the application remains
                        fast and responsive.
                    </Typography>
                </Box>

                <Box sx={{ my: 6 }}>
                    <Typography variant="h4" gutterBottom>
                        Future Roadmap
                    </Typography>
                    <Typography variant="body1" paragraph>
                        As we continue to evolve our architecture, several key
                        initiatives are planned for future development cycles:
                    </Typography>
                    <Typography variant="body1" paragraph>
                        Implementation of micro-frontends for larger scale
                        applications, allowing teams to work independently on
                        different sections of the application. This approach
                        will improve scalability and enable more rapid feature
                        development across multiple teams.
                    </Typography>
                    <Typography variant="body1" paragraph>
                        Exploration of server components and streaming SSR to
                        further improve performance and user experience,
                        particularly for data-heavy pages. These Next.js
                        features will reduce time-to-interactive and improve
                        perceived performance.
                    </Typography>
                    <Typography variant="body1" paragraph>
                        Integration with edge functions for geographically
                        distributed computing, reducing latency for users around
                        the world. This will be particularly beneficial for API
                        routes and dynamic content generation.
                    </Typography>
                </Box>

                <Box
                    sx={{
                        mt: 8,
                        p: 4,
                        bgcolor: 'background.paper',
                        borderRadius: 2,
                    }}
                >
                    <Typography variant="h5" gutterBottom align="center">
                        Architecture Diagram
                    </Typography>
                    <Typography
                        variant="body2"
                        paragraph
                        align="center"
                        color="text.secondary"
                    >
                        This simplified diagram illustrates the key components
                        and data flow in our application architecture. For a
                        more detailed view, please refer to the technical
                        documentation.
                    </Typography>
                    <Box
                        sx={{
                            height: { xs: 200, sm: 300, md: 400 },
                            bgcolor: 'action.hover',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            borderRadius: 1,
                            mb: 2,
                        }}
                    >
                        <Typography variant="body2" color="text.secondary">
                            [Architecture Diagram Placeholder]
                        </Typography>
                    </Box>
                </Box>
            </Paper>
        </Container>
    );
}
