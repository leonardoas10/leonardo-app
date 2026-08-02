'use client';

import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import FiberManualRecordIcon from '@mui/icons-material/FiberManualRecord';
import {
    Box,
    IconButton,
    Stack,
    useTheme,
    useMediaQuery,
} from '@mui/material';
import React, { useState, useEffect, useMemo, useCallback } from 'react';

import { Chip } from '@/components/common/Chip';
import { ThumbImage } from '@/components/common/ThumbImage';
import { CloudFrontURLs } from '@/utils/constants';

const SLIDE_INTERVAL_MS = 5000;

function getVisibleSlideIndices(current: number, total: number): number[] {
    const prev = (current - 1 + total) % total;
    const next = (current + 1) % total;
    return [prev, current, next];
}

export const ImageSlideshow: React.FC = () => {
    const theme = useTheme();
    const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
    const prefersReducedMotion = useMediaQuery('(prefers-reduced-motion: reduce)');
    const [currentImageIndex, setCurrentImageIndex] = useState(0);
    const [isHovering, setIsHovering] = useState(false);
    const [isFocused, setIsFocused] = useState(false);
    const [touchStart, setTouchStart] = useState(0);
    const [touchEnd, setTouchEnd] = useState(0);

    const isPaused = isHovering || isFocused;
    
    // Memoize the images array
    const images = useMemo(() => [
        {
            alt: 'AWS Certified Developer Associate Badge',
            imageUrl: `${CloudFrontURLs.IMAGES}/developer-associate-badge.webp`,
        },
        {
            alt: 'AWS Certified Solutions Architect Badge',
            imageUrl: `${CloudFrontURLs.IMAGES}/solutions-architect-badge.webp`,
        },
        {
            alt: 'AWS Cloud Quest: Generative AI Badge',
            imageUrl: `${CloudFrontURLs.IMAGES}/cq-generative-ai.webp`,
        },
        {
            alt: 'AWS Cloud Quest: Serverless Developer Badge',
            imageUrl: `${CloudFrontURLs.IMAGES}/cq-serverless.webp`,
        },
        {
            alt: 'AWS Cloud Quest: Data Analytics Badge',
            imageUrl: `${CloudFrontURLs.IMAGES}/cq-data-analytics.webp`,
        },
        {
            alt: 'AWS Cloud Quest: Networking Badge',
            imageUrl: `${CloudFrontURLs.IMAGES}/cq-networking.webp`,
        },
        {
            alt: 'AWS Cloud Quest: Security Badge',
            imageUrl: `${CloudFrontURLs.IMAGES}/cq-security.webp`,
        },
        {
            alt: 'AWS Cloud Quest: Solutions Architect Badge',
            imageUrl: `${CloudFrontURLs.IMAGES}/cq-solutions-architect.webp`,
        },
        {
            alt: 'AWS Cloud Quest: Cloud Practitioner Badge',
            imageUrl: `${CloudFrontURLs.IMAGES}/cq-cloud-practitioner.webp`,
        },
        {
            alt: 'AWS Serverless Certification Badge',
            imageUrl: `${CloudFrontURLs.IMAGES}/serverless-badge.webp`,
        },
        {
            alt: 'AWS EKS Certification Badge',
            imageUrl: `${CloudFrontURLs.IMAGES}/amazon-eks-badge.webp`,
        },
        {
            alt: 'AWS Networking Core Certification Badge',
            imageUrl: `${CloudFrontURLs.IMAGES}/networking-core-badge.webp`,
        },
        {
            alt: 'AWS Certified Cloud Practitioner Badge',
            imageUrl: `${CloudFrontURLs.IMAGES}/cloud-practitioner-badge.webp`,
        },
    ], []);

    const visibleIndices = useMemo(
        () => getVisibleSlideIndices(currentImageIndex, images.length),
        [currentImageIndex, images.length]
    );

    const imageTransition = prefersReducedMotion
        ? 'none'
        : 'opacity 0.5s ease-in-out';

    useEffect(() => {
        if (isPaused || prefersReducedMotion) {
            return;
        }

        const interval = setInterval(() => {
            setCurrentImageIndex((prevIndex) =>
                prevIndex < images.length - 1 ? prevIndex + 1 : 0
            );
        }, SLIDE_INTERVAL_MS);

        return () => clearInterval(interval);
    }, [images.length, isPaused, prefersReducedMotion]);

    // Memoize event handlers
    const handleNext = useCallback(() => {
        setCurrentImageIndex((prevIndex) =>
            prevIndex < images.length - 1 ? prevIndex + 1 : 0
        );
    }, [images.length]);

    const handlePrev = useCallback(() => {
        setCurrentImageIndex((prevIndex) =>
            prevIndex > 0 ? prevIndex - 1 : images.length - 1
        );
    }, [images.length]);

    const handleTouchStart = useCallback((e: React.TouchEvent) => {
        setTouchStart(e.targetTouches[0].clientX);
    }, []);

    const handleTouchMove = useCallback((e: React.TouchEvent) => {
        setTouchEnd(e.targetTouches[0].clientX);
    }, []);

    const handleTouchEnd = useCallback(() => {
        if (touchStart - touchEnd > 50) {
            // Swipe left, go to next
            handleNext();
        }

        if (touchStart - touchEnd < -50) {
            // Swipe right, go to previous
            handlePrev();
        }
    }, [touchStart, touchEnd, handleNext, handlePrev]);

    const handleContainerBlur = useCallback((e: React.FocusEvent) => {
        if (!e.currentTarget.contains(e.relatedTarget as Node)) {
            setIsFocused(false);
        }
    }, []);

    const handleDotKeyDown = useCallback(
        (index: number) => (e: React.KeyboardEvent) => {
            if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                setCurrentImageIndex(index);
                return;
            }
            if (e.key === 'ArrowLeft') {
                e.preventDefault();
                handlePrev();
                return;
            }
            if (e.key === 'ArrowRight') {
                e.preventDefault();
                handleNext();
            }
        },
        [handlePrev, handleNext]
    );

    return (
        <Box
            onMouseEnter={() => setIsHovering(true)}
            onMouseLeave={() => setIsHovering(false)}
            onFocus={() => setIsFocused(true)}
            onBlur={handleContainerBlur}
            onTouchStart={handleTouchStart}
            onTouchMove={handleTouchMove}
            onTouchEnd={handleTouchEnd}
            sx={{
                position: 'relative',
                width: '100%',
                height: 300,
                overflow: 'hidden',
                borderRadius: 2,
                boxShadow: `0 4px 8px ${theme.palette.background.aws}`,
                bgcolor: theme.palette.background.paper,
            }}
        >
            <div style={{
                position: 'absolute',
                top: 8,
                right: 8,
                zIndex: 3,
            }}>
                <Chip
                    label="Credly Badges"
                    href="https://www.credly.com/users/leonardo-aranguren-s"
                />
            </div>
            {visibleIndices.map((index) => {
                const image = images[index];
                return (
                    <ThumbImage
                        key={index}
                        src={image.imageUrl}
                        alt={image.alt}
                        fill
                        sizes="(max-width: 600px) 100vw, 600px"
                        style={{
                            position: 'absolute',
                            objectFit: 'contain',
                            opacity: index === currentImageIndex ? 1 : 0,
                            transition: imageTransition,
                        }}
                        priority={index === 0}
                        aria-hidden={index !== currentImageIndex}
                    />
                );
            })}

            <Box
                sx={{
                    position: 'absolute',
                    bottom: 0,
                    left: 0,
                    right: 0,
                    zIndex: 1,
                    display: 'flex',
                    justifyContent: 'center',
                    padding: '4px 0',
                    backgroundColor: 'rgba(0,0,0,0.6)',
                    backdropFilter: 'blur(2px)',
                }}
            >
                <Stack direction="row" spacing={0.5}>
                    {images.map((_, index) => (
                        <FiberManualRecordIcon
                            key={index}
                            onClick={() => setCurrentImageIndex(index)}
                            onKeyDown={handleDotKeyDown(index)}
                            role="button"
                            aria-label={`Show image ${index + 1}`}
                            aria-current={
                                index === currentImageIndex ? 'true' : undefined
                            }
                            tabIndex={0}
                            sx={{
                                cursor: 'pointer',
                                color:
                                    index === currentImageIndex
                                        ? theme.palette.background.aws
                                        : 'rgba(255,255,255,0.5)',
                                fontSize:
                                    index === currentImageIndex ? 12 : 8,
                                lineHeight: 1,
                            }}
                        />
                    ))}
                </Stack>
            </Box>

            {!isMobile && (
                <>
                    <IconButton
                        onClick={handlePrev}
                        aria-label="Previous image"
                        sx={{
                            position: 'absolute',
                            left: 8,
                            top: '50%',
                            transform: 'translateY(-50%)',
                            bgcolor:
                                theme.palette.mode === 'dark'
                                    ? 'rgba(255,255,255,0.2)'
                                    : 'rgba(0,0,0,0.2)',
                            color:
                                theme.palette.mode === 'dark'
                                    ? 'white'
                                    : 'black',
                            '&:hover': {
                                bgcolor: theme.palette.background.aws,
                            },
                            zIndex: 2,
                            opacity: isHovering ? 1 : 0,
                            transition: prefersReducedMotion
                                ? 'none'
                                : 'opacity 0.3s ease',
                        }}
                        size="small"
                    >
                        <ArrowBackIcon />
                    </IconButton>

                    <IconButton
                        onClick={handleNext}
                        aria-label="Next image"
                        sx={{
                            position: 'absolute',
                            right: 8,
                            top: '50%',
                            transform: 'translateY(-50%)',
                            bgcolor:
                                theme.palette.mode === 'dark'
                                    ? 'rgba(255,255,255,0.2)'
                                    : 'rgba(0,0,0,0.2)',
                            color:
                                theme.palette.mode === 'dark'
                                    ? 'white'
                                    : 'black',
                            '&:hover': {
                                bgcolor: theme.palette.background.aws,
                            },
                            zIndex: 2,
                            opacity: isHovering ? 1 : 0,
                            transition: prefersReducedMotion
                                ? 'none'
                                : 'opacity 0.3s ease',
                        }}
                        size="small"
                    >
                        <ArrowForwardIcon />
                    </IconButton>
                </>
            )}
        </Box>
    );
};

export default ImageSlideshow;