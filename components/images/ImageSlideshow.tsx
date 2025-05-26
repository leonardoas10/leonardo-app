'use client';

import React, { useState, useEffect } from 'react';
import {
    Box,
    Chip,
    IconButton,
    Stack,
    useTheme,
    useMediaQuery,
} from '@mui/material';
import Image from 'next/image';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import FiberManualRecordIcon from '@mui/icons-material/FiberManualRecord';
import OpenInNewIcon from '@mui/icons-material/OpenInNew';

import { CloudFrontURLs } from '@/utils/constants';
// Define the images array
const images = [
    {
        alt: 'AWS Certified Developer Associate Badge',
        imageUrl: `${CloudFrontURLs.IMAGES}/developer-associate-badge.webp`,
        title: 'Developer Associate',
        url: 'https://aws.amazon.com/es/certification/certified-developer-associate/',
    },
    {
        alt: 'AWS Certified Solutions Architect Badge',
        imageUrl: `${CloudFrontURLs.IMAGES}/solutions-architect-badge.webp`,
        title: 'Solutions Architect',
        url: 'https://aws.amazon.com/es/certification/certified-solutions-architect-associate/',
    },
    {
        alt: 'AWS Cloud Quest: Generative AI Badge',
        imageUrl: `${CloudFrontURLs.IMAGES}/cq-generative-ai.webp`,
        title: 'Cloud Quest: Generative AI',
        url: 'https://www.credly.com/badges/3a6f064a-fd6d-4537-9826-2883261e8fa4',
    },
    {
        alt: 'AWS Cloud Quest: Serverless Developer Badge',
        imageUrl: `${CloudFrontURLs.IMAGES}/cq-serverless.webp`,
        title: 'Cloud Quest: Serverless',
        url: 'https://www.credly.com/badges/3a6f064a-fd6d-4537-9826-2883261e8fa4',
    },
    {
        alt: 'AWS Cloud Quest: Data Analytics Badge',
        imageUrl: `${CloudFrontURLs.IMAGES}/cq-data-analytics.webp`,
        title: 'Cloud Quest: Data Analytics',
        url: 'https://www.credly.com/badges/3a6f064a-fd6d-4537-9826-2883261e8fa4',
    },
    {
        alt: 'AWS Cloud Quest: Networking Badge',
        imageUrl: `${CloudFrontURLs.IMAGES}/cq-networking.webp`,
        title: 'Cloud Quest: Networking',
        url: 'https://www.credly.com/badges/3a6f064a-fd6d-4537-9826-2883261e8fa4',
    },
    {
        alt: 'AWS Cloud Quest: Security Badge',
        imageUrl: `${CloudFrontURLs.IMAGES}/cq-security.webp`,
        title: 'Cloud Quest: Security',
        url: 'https://www.credly.com/badges/3a6f064a-fd6d-4537-9826-2883261e8fa4',
    },
    {
        alt: 'AWS Cloud Quest: Solutions Architect Badge',
        imageUrl: `${CloudFrontURLs.IMAGES}/cq-solutions-architect.webp`,
        title: 'Cloud Quest: Solutions Architect',
        url: 'https://www.credly.com/badges/3a6f064a-fd6d-4537-9826-2883261e8fa4',
    },
    {
        alt: 'AWS Cloud Quest: Cloud Practitioner Badge',
        imageUrl: `${CloudFrontURLs.IMAGES}/cq-cloud-practitioner.webp`,
        title: 'Cloud Quest: Cloud Practitioner',
        url: 'https://www.credly.com/badges/3a6f064a-fd6d-4537-9826-2883261e8fa4',
    },
    {
        alt: 'AWS Serverless Certification Badge',
        imageUrl: `${CloudFrontURLs.IMAGES}/serverless-badge.webp`,
        title: 'Serverless',
        url: 'https://www.credly.com/badges/7083c9f0-5eed-484d-abfc-34df82fce7ec',
    },
    {
        alt: 'AWS EKS Certification Badge',
        imageUrl: `${CloudFrontURLs.IMAGES}/amazon-eks-badge.webp`,
        title: 'EKS',
        url: 'https://www.credly.com/badges/3a6f064a-fd6d-4537-9826-2883261e8fa4',
    },
    {
        alt: 'AWS Networking Core Certification Badge',
        imageUrl: `${CloudFrontURLs.IMAGES}/networking-core-badge.webp`,
        title: 'Networking Core',
        url: 'https://credly.com/badges/153c3ce9-5443-4f1d-9fe7-a961c1920d16',
    },
    {
        alt: 'AWS Certified Cloud Practitioner Badge',
        imageUrl: `${CloudFrontURLs.IMAGES}/cloud-practitioner-badge.webp`,
        title: 'Cloud Practitioner',
        url: 'https://aws.amazon.com/es/certification/certified-cloud-practitioner/',
    },
];

export const ImageSlideshow: React.FC = () => {
    const theme = useTheme();
    const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
    const [currentImageIndex, setCurrentImageIndex] = useState(0);
    const [isHovering, setIsHovering] = useState(false);
    const [touchStart, setTouchStart] = useState(0);
    const [touchEnd, setTouchEnd] = useState(0);

    useEffect(() => {
        const interval = setInterval(() => {
            setCurrentImageIndex((prevIndex) =>
                prevIndex < images.length - 1 ? prevIndex + 1 : 0
            );
        }, 5000);

        return () => clearInterval(interval);
    }, []);

    const handleNext = () => {
        setCurrentImageIndex((prevIndex) =>
            prevIndex < images.length - 1 ? prevIndex + 1 : 0
        );
    };

    const handlePrev = () => {
        setCurrentImageIndex((prevIndex) =>
            prevIndex > 0 ? prevIndex - 1 : images.length - 1
        );
    };

    const handleTouchStart = (e: React.TouchEvent) => {
        setTouchStart(e.targetTouches[0].clientX);
    };

    const handleTouchMove = (e: React.TouchEvent) => {
        setTouchEnd(e.targetTouches[0].clientX);
    };

    const handleTouchEnd = () => {
        if (touchStart - touchEnd > 50) {
            // Swipe left, go to next
            handleNext();
        }

        if (touchStart - touchEnd < -50) {
            // Swipe right, go to previous
            handlePrev();
        }
    };

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
            <a
                href="https://www.credly.com/users/leonardo-aranguren-s"
                target="_blank"
                rel="noopener noreferrer"
                style={{
                    position: 'absolute',
                    top: 8,
                    right: 8,
                    zIndex: 3,
                    textDecoration: 'none',
                }}
            >
                <Chip
                    icon={<OpenInNewIcon fontSize="small" />}
                    label="Credly Badges"
                    size="small"
                    color="primary"
                    clickable
                    sx={{
                        backgroundColor: 'gray',
                        fontWeight: 'bold',
                        '&:hover': {
                            boxShadow: 1,
                            backgroundColor: 'background.aws',
                        },
                        paddingBottom: 0.5,
                    }}
                />
            </a>
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
