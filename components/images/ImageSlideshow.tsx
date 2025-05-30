'use client';

import React, { useState, useEffect, useMemo, useCallback } from 'react';
import {
    Box,
    IconButton,
    Stack,
    useTheme,
    useMediaQuery,
} from '@mui/material';
import Image from 'next/image';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import FiberManualRecordIcon from '@mui/icons-material/FiberManualRecord';
import { Chip } from '@/components/common/Chip';
import { CloudFrontURLs } from '@/utils/constants';

export const ImageSlideshow: React.FC = () => {
    const theme = useTheme();
    const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
    const [currentImageIndex, setCurrentImageIndex] = useState(0);
    const [isHovering, setIsHovering] = useState(false);
    const [touchStart, setTouchStart] = useState(0);
    const [touchEnd, setTouchEnd] = useState(0);
    
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
    // eslint-disable-next-line react-hooks/exhaustive-deps
    ], []);

    useEffect(() => {
        const interval = setInterval(() => {
            setCurrentImageIndex((prevIndex) =>
                prevIndex < images.length - 1 ? prevIndex + 1 : 0
            );
        }, 5000);

        return () => clearInterval(interval);
    }, [images.length]);

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

    return (
        <Box
            onMouseEnter={() => setIsHovering(true)}
            onMouseLeave={() => setIsHovering(false)}
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
            {images.map((image, index) => (
                <Image
                    key={index}
                    src={image.imageUrl}
                    alt={image.alt}
                    fill
                    style={{
                        position: 'absolute',
                        objectFit: 'contain',
                        opacity: index === currentImageIndex ? 1 : 0,
                        transition: 'opacity 0.5s ease-in-out',
                    }}
                    priority={index === 0}
                />
            ))}

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
                {useMemo(() => (
                    <Stack direction="row" spacing={0.5}>
                        {images.map((_, index) => (
                            <FiberManualRecordIcon
                                key={index}
                                onClick={() => setCurrentImageIndex(index)}
                                sx={{
                                    cursor: 'pointer',
                                    color:
                                        index === currentImageIndex
                                            ? theme.palette.background.aws
                                            : 'rgba(255,255,255,0.5)',
                                    fontSize: index === currentImageIndex ? 12 : 8,
                                    lineHeight: 1,
                                }}
                            />
                        ))}
                    </Stack>
                ), [currentImageIndex, theme.palette.background.aws, images])}
            </Box>

            {!isMobile && (
                <>
                    <IconButton
                        onClick={handlePrev}
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
                            transition: 'opacity 0.3s ease',
                        }}
                        size="small"
                    >
                        <ArrowBackIcon />
                    </IconButton>

                    <IconButton
                        onClick={handleNext}
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
                            transition: 'opacity 0.3s ease',
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