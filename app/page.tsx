'use client';
import { Container, Grid, Typography, Box, useTheme } from '@mui/material';
import dynamic from 'next/dynamic';
import Image from 'next/image';
import { Suspense } from 'react';

import { HighlightedText } from '@/components/common/HighlightedText';
import { ContactSection } from '@/components/contact/ContactSection';
import { CloudFrontURLs } from '@/utils/constants';
import { useTranslation } from '@/utils/hooks/useTranslation';

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
                        <Box
                            sx={{
                                display: { xs: 'none', md: 'block' },
                                height: '100%',
                                width: '100%',
                                position: 'relative',
                            }}
                        >
                            <Image
                                src={`${CloudFrontURLs.IMAGES}/teide.webp`}
                                alt="Teide, Terife, Spain"
                                fill
                                priority
                                sizes="50vw"
                                style={{ objectFit: 'cover' }}
                                placeholder="blur"
                                blurDataURL="9E F7 0D 35 8A 95 88 67 5F 76 87 95 89 47 77 77 78 60 95 06 56"
                                quality={80}
                            />
                        </Box>
                        <Box
                            sx={{
                                display: { xs: 'block', md: 'none' },
                                height: '100%',
                                width: '100%',
                                position: 'relative',
                            }}
                        >
                            <Image
                                src={`${CloudFrontURLs.IMAGES}/small-teide.webp`}
                                alt="Teide, Terife, Spain"
                                fill
                                priority
                                sizes="(max-width: 600px) 95vw, 50vw"
                                style={{ objectFit: 'cover' }}
                                placeholder="blur"
                                blurDataURL="9E F7 0D 35 8A 96 88 67 5F 76 87 95 89 47 77 77 78 60 95 06 56"
                                quality={60}
                                loading="eager"
                            />
                        </Box>
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
                    <ContactSection size="large" buttonLocation="Home" />
                </Grid>
            </Grid>
        </Container>
    );
}
