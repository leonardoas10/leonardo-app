'use client';
import { Container, Grid, Typography, Box, useTheme } from '@mui/material';
import Image from 'next/image';

import dynamic from 'next/dynamic';
import { Suspense } from 'react';
import { HighlightedText } from '@/components/common/HighlightedText';
import { ContactSection } from '@/components/contact/ContactSection';

// Dynamically import components that aren't needed immediately
const ImageSlideshow = dynamic(
    () =>
        import('@/components/images/ImageSlideshow').then(
            (mod) => mod.ImageSlideshow
        ),
    { ssr: true }
);

const ExperienceTabs = dynamic(
    () =>
        import('@/components/tabs/ExperienceTabs').then(
            (mod) => mod.ExperienceTabs
        ),
    { ssr: false }
);

import { CloudFrontURLs } from '@/utils/constants';
import { useTranslation } from '@/utils/hooks/useTranslation';

export default function Home() {
    const theme = useTheme();
    const { t } = useTranslation('about');

    return (
        <Container maxWidth="lg" sx={{ py: 4 }}>
            <Grid container spacing={4} alignItems="center">
                {/* Image - first on mobile */}
                <Grid
                    size={{ xs: 12, md: 6.5 }}
                    sx={{
                        display: 'flex',
                        justifyContent: 'center',
                        order: { xs: 1, md: 2 },
                    }}
                >
                    <Box
                        sx={{
                            position: 'relative',
                            width: '100%',
                            height: 350,
                            aspectRatio: '16/9',
                            borderRadius: 2,
                            boxShadow: `0 4px 12px ${theme.palette.background.aws}`,
                            overflow: 'hidden',
                        }}
                    >
                        <Image
                            key="1"
                            src={`${CloudFrontURLs.IMAGES}/teide.webp`}
                            alt="Hiking"
                            fill
                            priority
                            sizes="(max-width: 768px) 100vw, 50vw"
                            style={{
                                objectFit: 'cover',
                            }}
                            loading="eager"
                            fetchPriority="high"
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

                {/* First content - second on mobile */}
                <Grid
                    size={{ xs: 12, md: 5.5 }}
                    sx={{ order: { xs: 2, md: 1 } }}
                >
                    <Typography
                        variant="h4"
                        gutterBottom
                        sx={{
                            fontWeight: 'bold',
                            textAlign: { xs: 'center', md: 'left' },
                            fontSize: { xs: '1.75rem', md: '2.125rem' },
                        }}
                    >
                        {t('homePage.aboutTitle')}
                    </Typography>
                    <HighlightedText
                        text={t('homePage.firstParagraphPart1')}
                        highlightTerms={[]}
                        variant="body1"
                        paragraph
                    />
                    <HighlightedText
                        text={t('homePage.firstParagraphPart2')}
                        highlightTerms={[
                            'certifications',
                            'certificaciones',
                            'AWS',
                        ]}
                        variant="body1"
                        paragraph
                    />
                </Grid>
            </Grid>

            {/* Image slideshow - third on mobile */}
            <Grid
                container
                sx={{
                    mt: { xs: 8, md: 12 },
                    display: { xs: 'flex', md: 'none' }, // Only show on mobile
                }}
            >
                <Grid size={{ xs: 12 }}>
                    <Suspense
                        fallback={
                            <div style={{ height: 300, width: '100%' }}></div>
                        }
                    >
                        <ImageSlideshow />
                    </Suspense>
                </Grid>
            </Grid>

            {/* Desktop layout for second section */}
            <Grid
                container
                spacing={4}
                alignItems="center"
                sx={{
                    mt: { xs: 8, md: 12 },
                    display: { xs: 'none', md: 'flex' }, // Only show on desktop
                }}
            >
                {/* Image slideshow - desktop only */}
                <Grid
                    size={{ md: 5 }}
                    sx={{
                        display: 'flex',
                        justifyContent: 'center',
                    }}
                >
                    <Suspense
                        fallback={
                            <div style={{ height: 300, width: '100%' }}></div>
                        }
                    >
                        <ImageSlideshow />
                    </Suspense>
                </Grid>

                {/* Second content */}
                <Grid size={{ md: 7 }}>
                    <Typography
                        variant="h4"
                        gutterBottom
                        sx={{
                            fontWeight: 'bold',
                            textAlign: { xs: 'center', md: 'left' },
                            fontSize: { xs: '1.75rem', md: '2.125rem' },
                        }}
                    >
                        {t('homePage.discoveryTitle')}
                    </Typography>
                    <HighlightedText
                        text={t('homePage.secondParagraphPart1')}
                        highlightTerms={['scalable', 'escalables']}
                        variant="body1"
                        paragraph
                    />
                    <HighlightedText
                        text={t('homePage.secondParagraphPart2')}
                        highlightTerms={[]}
                        variant="body1"
                        paragraph
                    />
                </Grid>
            </Grid>

            {/* Mobile layout for second content - fourth on mobile */}
            <Grid
                container
                sx={{
                    mt: { xs: 8 },
                    display: { xs: 'flex', md: 'none' }, // Only show on mobile
                }}
            >
                <Grid size={{ xs: 12 }}>
                    <Typography
                        variant="h4"
                        gutterBottom
                        sx={{
                            fontWeight: 'bold',
                            textAlign: 'center',
                            fontSize: { xs: '1.75rem', md: '2.125rem' },
                        }}
                    >
                        {t('homePage.discoveryTitle')}
                    </Typography>
                    <HighlightedText
                        text={t('homePage.secondParagraphPart1')}
                        highlightTerms={['scalable']}
                        variant="body1"
                        paragraph
                    />
                    <HighlightedText
                        text={t('homePage.secondParagraphPart2')}
                        highlightTerms={[]}
                        variant="body1"
                        paragraph
                    />
                </Grid>
            </Grid>

            <Grid
                container
                spacing={4}
                alignItems="center"
                sx={{ mt: { xs: 8, md: 12 } }}
            >
                <Grid size={{ xs: 12, md: 12 }}>
                    <Typography
                        variant="h4"
                        gutterBottom
                        sx={{
                            fontWeight: 'bold',
                            textAlign: { xs: 'center', md: 'center' },
                            fontSize: { xs: '1.75rem', md: '2.125rem' },
                        }}
                    >
                        {t('homePage.experienceTitle')}
                    </Typography>

                    <Suspense
                        fallback={
                            <div style={{ height: 300, width: '100%' }}></div>
                        }
                    >
                        <ExperienceTabs />
                    </Suspense>
                </Grid>
            </Grid>

            {/* Contact Section with Download CV Modal */}
            <Grid
                container
                spacing={4}
                alignItems="center"
                sx={{ mt: { xs: 8, md: 12 } }}
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
