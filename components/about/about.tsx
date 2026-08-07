'use client';
import {
    Container,
    Grid,
    Typography,
    Box,
    useTheme,
    useMediaQuery,
} from '@mui/material';
import dynamic from 'next/dynamic';
import { Suspense, useEffect, useRef, useState } from 'react';

import { HighlightedText } from '@/components/common/HighlightedText';
import { ContactSection } from '@/components/contact/ContactSection';
import { splitEmojiLabel } from '@/components/tabs/TabsComponent';
import { useTranslation } from '@/utils/hooks/useTranslation';

const ImageSlideshow = dynamic(
    () =>
        import('@/components/images/ImageSlideshow').then(
            (mod) => mod.ImageSlideshow
        ),
    { ssr: true }
);

interface AboutProps {
    experienceTabs: React.ReactNode;
    teideImage: React.ReactNode;
}

export function About({ experienceTabs, teideImage }: AboutProps) {
    const theme = useTheme();
    const isMdUp = useMediaQuery(theme.breakpoints.up('md'));
    const expertiseContentRef = useRef<HTMLDivElement>(null);
    const [slideshowHeight, setSlideshowHeight] = useState<number>();
    const { t } = useTranslation('about');
    const coreExpertiseItems = t('homePage.coreExpertiseItems', {
        returnObjects: true,
    }) as string[];

    useEffect(() => {
        const node = expertiseContentRef.current;
        if (!node || !isMdUp) {
            setSlideshowHeight(undefined);
            return;
        }

        const syncHeight = () => {
            setSlideshowHeight(node.getBoundingClientRect().height);
        };

        syncHeight();

        const observer = new ResizeObserver(syncHeight);
        observer.observe(node);

        return () => observer.disconnect();
    }, [isMdUp]);

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
                                height: '100%',
                                width: '100%',
                                position: 'relative',
                            }}
                        >
                            {teideImage}
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
                    <Box
                        component="h1"
                        sx={{
                            mb: 2,
                            textAlign: { xs: 'center', md: 'left' },
                        }}
                    >
                        <Typography
                            component="span"
                            display="block"
                            sx={{
                                fontWeight: 'bold',
                                fontSize: { xs: '1.5rem', md: '1.75rem' },
                                lineHeight: 1.2,
                                textWrap: 'balance',
                            }}
                        >
                            {t('homePage.aboutTitlePrimary')}
                        </Typography>
                        <Typography
                            component="span"
                            display="block"
                            sx={{
                                fontWeight: 'bold',
                                fontSize: { xs: '1.125rem', md: '1.375rem' },
                                lineHeight: 1.3,
                                mt: 0.5,
                                textWrap: 'balance',
                            }}
                        >
                            {t('homePage.aboutTitleSecondary')}
                        </Typography>
                    </Box>
                    <HighlightedText
                        text={t('homePage.firstParagraphPart1')}
                        highlightTerms={[]}
                        variant="body1"
                        paragraph
                    />
                    <HighlightedText
                        text={t('homePage.firstParagraphPart2')}
                        highlightTerms={[
                            'AWS Certified',
                            'certificado en AWS',
                        ]}
                        variant="body1"
                        paragraph
                    />
                </Grid>
            </Grid>

            {/* Core expertise: slideshow + copy in one horizontal block */}
            <Box
                sx={{
                    mt: { xs: 8, md: 12 },
                    display: 'flex',
                    flexDirection: { xs: 'column', md: 'row' },
                    alignItems: { xs: 'stretch', md: 'flex-start' },
                    gap: { xs: 7, md: 4 },
                }}
            >
                <Box
                    sx={{
                        flex: { md: '0 0 38%' },
                        width: '100%',
                        minWidth: 0,
                        minHeight: { xs: 280 },
                        mb: { xs: 2, md: 0 },
                        height: {
                            xs: 'auto',
                            md: slideshowHeight ? `${slideshowHeight}px` : 'auto',
                        },
                    }}
                >
                    <Suspense
                        fallback={
                            <Box sx={{ width: '100%', minHeight: 280 }} />
                        }
                    >
                        <ImageSlideshow
                            fillHeight
                            height={isMdUp ? slideshowHeight : undefined}
                        />
                    </Suspense>
                </Box>

                <Box ref={expertiseContentRef} sx={{ flex: 1, minWidth: 0 }}>
                        <Typography
                            variant="h4"
                            component="h2"
                            sx={{
                                fontWeight: 'bold',
                                textAlign: { xs: 'center', md: 'left' },
                                fontSize: { xs: '1.5rem', md: '1.75rem' },
                                lineHeight: 1.2,
                                textWrap: 'balance',
                                mb: 1.5,
                            }}
                        >
                            {t('homePage.coreExpertiseTitle')}
                        </Typography>
                        <HighlightedText
                            text={t('homePage.coreExpertiseIntro')}
                            highlightTerms={[
                                'cloud-native',
                                'enterprise AI platforms',
                                'plataformas de IA empresariales',
                            ]}
                            variant="body1"
                            paragraph
                        />
                        <Box
                            component="ul"
                            sx={{
                                listStyle: 'none',
                                p: 0,
                                m: 0,
                                mt: 2,
                                display: 'grid',
                                gridTemplateColumns: {
                                    xs: '1fr',
                                    sm: 'repeat(2, 1fr)',
                                },
                                gap: 1.5,
                            }}
                        >
                            {coreExpertiseItems.map((item, index) => {
                                const { emoji, text } = splitEmojiLabel(item);

                                return (
                                    <Box
                                        component="li"
                                        key={index}
                                        tabIndex={0}
                                        sx={{
                                            display: 'flex',
                                            alignItems: 'center',
                                            gap: 1,
                                            minWidth: 0,
                                            px: 1.5,
                                            py: 1,
                                            borderRadius: 1,
                                            border: 1,
                                            borderColor: 'divider',
                                            bgcolor: 'background.default',
                                            boxShadow:
                                                '0 6px 12px -4px var(--theme-accent)',
                                            outline: 'none',
                                            transition: 'none !important',
                                            '@media (hover: hover)': {
                                                '&:hover': {
                                                    transform: 'scale(1.03)',
                                                    boxShadow:
                                                        '0 0 14px var(--theme-accent), 0 0 28px -4px var(--theme-accent)',
                                                },
                                            },
                                            '&:focus-visible': {
                                                transform: 'scale(1.03)',
                                                boxShadow:
                                                    '0 0 14px var(--theme-accent), 0 0 28px -4px var(--theme-accent)',
                                                outline:
                                                    '2px solid var(--theme-accent)',
                                                outlineOffset: 2,
                                            },
                                            '@media (prefers-reduced-motion: reduce)': {
                                                '@media (hover: hover)': {
                                                    '&:hover': {
                                                        transform: 'none',
                                                    },
                                                },
                                                '&:focus-visible': {
                                                    transform: 'none',
                                                },
                                            },
                                        }}
                                    >
                                        {emoji ? (
                                            <Box
                                                component="span"
                                                aria-hidden="true"
                                                sx={{
                                                    lineHeight: 1.4,
                                                    flexShrink: 0,
                                                }}
                                            >
                                                {emoji}
                                            </Box>
                                        ) : null}
                                        <Typography
                                            component="span"
                                            variant="body1"
                                            sx={{
                                                color: 'var(--theme-accent)',
                                                fontWeight: 500,
                                                lineHeight: 1.3,
                                                whiteSpace: 'nowrap',
                                                fontSize: {
                                                    sm: 'clamp(0.75rem, 1.6vw, 0.8125rem)',
                                                },
                                            }}
                                        >
                                            {text}
                                        </Typography>
                                    </Box>
                                );
                            })}
                        </Box>
                    </Box>
            </Box>

            <Grid
                container
                spacing={4}
                alignItems="center"
                sx={{ mt: { xs: 8, md: 12 } }}
            >
                <Grid size={{ xs: 12, md: 12 }}>
                    <Typography
                        variant="h4"
                        component="h2"
                        gutterBottom
                        sx={{
                            fontWeight: 'bold',
                            textAlign: { xs: 'center', md: 'center' },
                            fontSize: { xs: '1.75rem', md: '2.125rem' },
                        }}
                    >
                        {t('homePage.experienceTitle')}
                    </Typography>

                    {experienceTabs}
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
