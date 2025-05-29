'use client';

import {
    Container,
    Typography,
    Box,
    Grid,
    useTheme,
    Paper,
} from '@mui/material';
import Image from 'next/image';

import { Chip } from '@/components/common/Chip';
import { ArchitectureTabs } from '@/components/tabs/ArchitectureTabs';
import { useTranslation } from '@/utils/hooks/useTranslation';
import { CloudFrontURLs } from '@/utils/constants';

export default function ArchitecturePage() {
    const { t } = useTranslation('architecture');
    const theme = useTheme();
    const isDarkMode = theme.palette.mode === 'dark';

    return (
        <Container
            maxWidth="lg"
            sx={{ py: { xs: 4, md: 4 }, px: { xs: 2, sm: 3, md: 4 } }}
        >
            <Grid container spacing={4}>
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
                </Grid>

                <Grid size={{ xs: 12 }} sx={{ textAlign: 'center' }}>
                    <Box
                        sx={{
                            display: 'flex',
                            justifyContent: { xs: 'center', md: 'center' },
                            mb: 2,
                        }}
                    >
                        <Chip
                            size="medium"
                            label={t('page.githubRepository')}
                            href="https://github.com/leonardoas10/leonardo-app"
                        />
                    </Box>
                </Grid>

                <Grid size={{ xs: 12 }} sx={{ textAlign: 'center' }}>
                    <Typography
                        variant="h4"
                        gutterBottom
                        sx={{
                            fontWeight: 'bold',
                            textAlign: { xs: 'center' },
                        }}
                    >
                        {t('page.architectureDiagram')}
                    </Typography>
                    <Paper
                        elevation={2}
                        sx={{
                            p: 0.8,
                            bgcolor: 'background.paper',
                            borderRadius: 2,
                            overflow: 'hidden',
                            boxShadow: `0 4px 12px ${theme.palette.background.aws}`,
                        }}
                    >
                        <Box
                            sx={{
                                position: 'relative',
                                width: '100%',
                                height: { xs: 230, sm: 400, md: 500 },
                            }}
                        >
                            <Image
                                src={
                                    isDarkMode
                                        ? `${CloudFrontURLs.IMAGES}/architecture.webp`
                                        : `${CloudFrontURLs.IMAGES}/white-architecture.webp`
                                }
                                alt="Architecture Diagram"
                                fill
                                style={{ objectFit: 'contain' }}
                                priority
                            />
                        </Box>
                    </Paper>
                </Grid>

                <Grid size={{ xs: 12 }}>
                    <ArchitectureTabs />
                </Grid>
            </Grid>
        </Container>
    );
}
