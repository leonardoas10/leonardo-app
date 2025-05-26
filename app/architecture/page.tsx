import { Container, Typography, Box, Grid, Paper } from '@mui/material';

import { Chip } from '@/components/common/Chip';
import { ArchitectureTabs } from '@/components/tabs/ArchitectureTabs';

export default function ArchitecturePage() {
    return (
        <Container
            maxWidth="lg"
            sx={{ py: { xs: 4, md: 4 }, px: { xs: 2, sm: 3, md: 4 } }}
        >
            <Grid container spacing={4} sx={{ mb: 4 }}>
                <Grid size={{ xs: 12 }}>
                    <Typography
                        variant="h3"
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

            <ArchitectureTabs />

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
