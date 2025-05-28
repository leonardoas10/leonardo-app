'use client';

import { Container, Typography, Box, Grid, Paper } from '@mui/material';

import { Chip } from '@/components/common/Chip';
import { ArchitectureTabs } from '@/components/tabs/ArchitectureTabs';
import { useTranslation } from '@/utils/hooks/useTranslation';

export default function ArchitecturePage() {
    const { t } = useTranslation('architecture');
    
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
                        {t('page.title')}
                    </Typography>

                    <Typography
                        variant="body1"
                        sx={{
                            mb: 2,
                            textAlign: { xs: 'center', md: 'left' },
                        }}
                    >
                        {t('page.description')}
                    </Typography>

                    <Box
                        sx={{
                            display: 'flex',
                            justifyContent: { xs: 'center', md: 'center' },
                            mb: 2,
                        }}
                    >
                        <Chip
                            label={t('page.githubRepository')}
                            href="https://github.com/leonardoas10/leonardo-app"
                        />
                    </Box>
                </Grid>
            </Grid>

            <ArchitectureTabs />

            <Box sx={{ mt: 6, mb: 4 }}>
                <Typography variant="h5" gutterBottom>
                    {t('page.architectureDiagram')}
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
                        {t('page.diagramPlaceholder')}
                    </Typography>
                </Paper>
            </Box>
        </Container>
    );
}
