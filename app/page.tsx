'use client';
import { Container, Grid, Typography, Box } from '@mui/material';
import Image from 'next/image';

import { ImageSlideshow } from '@/components/images/ImageSlideshow';
import { ExperienceTabs } from '@/components/tabs/ExperienceTabs';
import { ContactSection } from '@/components/contact/ContactSection';

import { CloudFrontURLs } from '@/utils/constants';
import { useTranslation } from '@/utils/hooks/useTranslation';

export default function Home() {
    const { t } = useTranslation('about');

    return (
        <Container maxWidth="lg" sx={{ py: 4 }}>
            <Grid container spacing={4} alignItems="center">
                <Grid size={{ xs: 12, md: 6 }}>
                    <Typography
                        variant="h4"
                        gutterBottom
                        sx={{
                            fontWeight: 'bold',
                            textAlign: { xs: 'center', md: 'left' },
                        }}
                    >
                        {t('homePage.aboutTitle')}
                    </Typography>
                    <Typography variant="body1" textAlign="justify">
                        {t('homePage.firstParagraph')}
                    </Typography>
                </Grid>

                <Grid
                    size={{ xs: 12, md: 6 }}
                    sx={{ display: 'flex', justifyContent: 'center' }}
                >
                    <Box
                        sx={{
                            position: 'relative',
                            width: '100%',
                            height: 350,
                            borderRadius: 2,
                            boxShadow: 3,
                            overflow: 'hidden',
                        }}
                    >
                        <Image
                            key="1"
                            src={`${CloudFrontURLs.IMAGES}/teide.webp`}
                            alt="Hiking"
                            fill
                            priority
                            style={{
                                objectFit: 'cover',
                            }}
                        />
                        <Box
                            sx={{
                                position: 'absolute',
                                bottom: 0,
                                left: 0,
                                right: 0,
                                backgroundColor: 'rgba(0,0,0,0.6)',
                                padding: '8px',
                                backdropFilter: 'blur(2px)',
                            }}
                        >
                            <Typography
                                variant="caption"
                                sx={{
                                    display: 'block',
                                    textAlign: 'center',
                                    color: 'white',
                                    fontSize: '0.7rem',
                                    lineHeight: 1,
                                }}
                            >
                                {t('homePage.teideCaption')}
                            </Typography>
                        </Box>
                    </Box>
                </Grid>
            </Grid>

            <Grid
                container
                spacing={4}
                alignItems="center"
                style={{ marginTop: '48px' }}
            >
                {/* Text content - will appear first on mobile */}
                <Grid size={{ xs: 12, md: 8 }} sx={{ order: { xs: 1, md: 2 } }}>
                    <Typography
                        variant="h4"
                        gutterBottom
                        sx={{
                            fontWeight: 'bold',
                            textAlign: { xs: 'center', md: 'left' },
                        }}
                    >
                        {t('homePage.discoveryTitle')}
                    </Typography>
                    <Typography variant="body1" textAlign="justify">
                        {t('homePage.secondParagraph')}
                    </Typography>
                </Grid>

                {/* Image slideshow - will appear second on mobile */}
                <Grid
                    size={{ xs: 12, md: 4 }}
                    sx={{
                        display: 'flex',
                        justifyContent: 'center',
                        order: { xs: 2, md: 1 },
                    }}
                >
                    <ImageSlideshow />
                </Grid>
            </Grid>

            <Grid
                container
                spacing={4}
                alignItems="center"
                style={{ marginTop: '48px' }}
            >
                <Grid size={{ xs: 12, md: 12 }}>
                    <Typography
                        variant="h4"
                        gutterBottom
                        sx={{
                            fontWeight: 'bold',
                            textAlign: { xs: 'center', md: 'center' },
                        }}
                    >
                        {t('homePage.experienceTitle')}
                    </Typography>

                    <ExperienceTabs />
                </Grid>
            </Grid>

            {/* Contact Section with Download CV Modal */}
            <Grid
                container
                spacing={4}
                alignItems="center"
                style={{ marginTop: '48px' }}
            >
                <Grid
                    size={{ xs: 12, md: 12 }}
                    sx={{ display: 'flex', justifyContent: 'center' }}
                >
                    <ContactSection size="large" />
                </Grid>
            </Grid>
        </Container>
    );
}
