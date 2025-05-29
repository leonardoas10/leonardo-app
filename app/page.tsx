'use client';
import { Container, Grid, Typography, Box, useTheme } from '@mui/material';
import Image from 'next/image';

import { ImageSlideshow } from '@/components/images/ImageSlideshow';
import { ExperienceTabs } from '@/components/tabs/ExperienceTabs';
import { ContactSection } from '@/components/contact/ContactSection';
import { HighlightedText } from '@/components/common/HighlightedText';

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
                        order: { xs: 1, md: 2 }
                    }}
                >
                    <Box
                        sx={{
                            position: 'relative',
                            width: '100%',
                            height: 350,
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
                        }}
                    >
                        {t('homePage.aboutTitle')}
                    </Typography>
                    <HighlightedText
                        text={t('homePage.firstParagraphPart1')}
                        highlightTerms={['AWS']}
                        variant="body1"
                        paragraph
                    />
                    <HighlightedText
                        text={t('homePage.firstParagraphPart2')}
                        highlightTerms={['certifications', 'certificaciones']}
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
                    display: { xs: 'flex', md: 'none' } // Only show on mobile
                }}
            >
                <Grid size={{ xs: 12 }}>
                    <ImageSlideshow />
                </Grid>
            </Grid>

            {/* Desktop layout for second section */}
            <Grid
                container
                spacing={4}
                alignItems="center"
                sx={{ 
                    mt: { xs: 8, md: 12 },
                    display: { xs: 'none', md: 'flex' } // Only show on desktop
                }}
            >
                {/* Image slideshow - desktop only */}
                <Grid
                    size={{ md: 5 }}
                    sx={{
                        display: 'flex',
                        justifyContent: 'center'
                    }}
                >
                    <ImageSlideshow />
                </Grid>

                {/* Second content */}
                <Grid size={{ md: 7 }}>
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
                    <HighlightedText
                        text={t('homePage.secondParagraph')}
                        highlightTerms={['cloud', 'soluciones', 'solutions']}
                        variant="body1"
                    />
                </Grid>
            </Grid>
            
            {/* Mobile layout for second content - fourth on mobile */}
            <Grid
                container
                sx={{ 
                    mt: { xs: 8 },
                    display: { xs: 'flex', md: 'none' } // Only show on mobile
                }}
            >
                <Grid size={{ xs: 12 }}>
                    <Typography
                        variant="h4"
                        gutterBottom
                        sx={{
                            fontWeight: 'bold',
                            textAlign: 'center',
                        }}
                    >
                        {t('homePage.discoveryTitle')}
                    </Typography>
                    <HighlightedText
                        text={t('homePage.secondParagraph')}
                        highlightTerms={['cloud', 'soluciones', 'solutions']}
                        variant="body1"
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
