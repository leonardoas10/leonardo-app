'use client';

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { usePathname } from 'next/navigation';
import { AppBar, Box, Toolbar, Typography, Container } from '@mui/material';
import styles from './NavBar.module.css';
import { ThemeToggle } from '@/components/toggles/ThemeToggle';
import { LanguageToggle } from '@/components/toggles/LanguageToggle';
import { CloudFrontURLs } from '@/utils/constants';
import { ContactSection } from '@/components/contact/ContactSection';
import { useTranslation } from '@/utils/hooks/useTranslation';

// Navigation items with translation keys
const pages = [
    { key: 'home', href: '/' },
    { key: 'architecture', href: '/architecture' },
];

export const NavBar: React.FC = () => {
    const pathname = usePathname();
    const { t } = useTranslation('navigation');

    return (
        <Box component="nav">
            <AppBar
                position="static"
                className={styles.navbar}
                sx={{
                    py: { xs: 2, md: 0 },
                    backgroundColor: 'background.paper',
                    transition: 'background-color 2s ease, color 2s ease',
                }}
            >
                <Container maxWidth="xl">
                    <Toolbar
                        disableGutters
                        sx={{
                            justifyContent: 'space-between',
                        }}
                    >
                        {/* Left side: Avatar and Name */}
                        <Box
                            sx={{
                                display: 'flex',
                                alignItems: 'center',
                                gap: 2,
                                width: { xs: '100%', md: 'auto' },
                                justifyContent: {
                                    xs: 'center',
                                    md: 'flex-start',
                                },
                            }}
                        >
                            <Box
                                sx={{
                                    width: { md: 75 },
                                    height: { md: 55 },
                                    display: { xs: 'none', md: 'flex' },
                                    borderRadius: '50%',
                                    overflow: 'hidden',
                                    position: 'relative',
                                }}
                            >
                                <Image
                                    alt="L"
                                    src={`${CloudFrontURLs.IMAGES}/me.webp`}
                                    fill
                                    sizes="50px"
                                    style={{ objectFit: 'cover' }}
                                    loading="lazy"
                                    priority={false}
                                />
                            </Box>
                            <Link
                                href="/"
                                className={styles.logo}
                                style={{ width: '100%' }}
                            >
                                <Typography
                                    variant="h6"
                                    noWrap
                                    component="div"
                                    color="textPrimary"
                                    sx={{
                                        fontSize: {
                                            xs: '1.8rem',
                                            md: '1.25rem',
                                        },
                                        textAlign: { xs: 'center', md: 'left' },
                                        width: { xs: '100%', md: 'auto' },
                                    }}
                                >
                                    LEONARDO ARANGUREN
                                </Typography>
                            </Link>
                        </Box>

                        {/* Right side: Navigation and Toggle - Desktop only */}
                        <Box sx={{ display: 'flex', alignItems: 'center' }}>
                            <Box
                                className={styles.desktopMenu}
                                sx={{
                                    display: { xs: 'none', md: 'flex' },
                                    alignItems: 'center',
                                    gap: 2,
                                }}
                            >
                                {pages.map((page, index) => {
                                    const isActive = pathname === page.href;
                                    return (
                                        <Box
                                            key={index}
                                            sx={{
                                                display: 'flex',
                                                alignItems: 'center',
                                            }}
                                        >
                                            <Box
                                                component={Link}
                                                href={page.href}
                                                sx={{
                                                    color: 'text.primary',
                                                    textDecoration: 'none',
                                                    fontWeight: isActive
                                                        ? 'bold'
                                                        : 'normal',
                                                    borderBottom: isActive
                                                        ? '2px solid'
                                                        : 'none',
                                                    borderColor:
                                                        'background.aws',
                                                }}
                                            >
                                                {t(
                                                    `navigationList.${page.key}`
                                                )}
                                            </Box>
                                        </Box>
                                    );
                                })}
                                <ContactSection size="medium" />
                                <LanguageToggle size="large" />
                                <ThemeToggle size="large" />
                            </Box>
                        </Box>
                    </Toolbar>
                </Container>

                {/* Mobile navigation - three sections */}
                <Box
                    sx={{
                        display: { xs: 'flex', md: 'none' },
                        justifyContent: 'space-between',
                        alignItems: 'center',
                        width: '100%',
                        mt: 1,
                        mb: 1,
                    }}
                >
                    {/* Links - left aligned */}
                    <Box sx={{ display: 'flex', gap: 2, ml: 1 }}>
                        {pages.map((page, index) => {
                            const isActive = pathname === page.href;
                            return (
                                <Box
                                    key={index}
                                    component={Link}
                                    href={page.href}
                                    sx={{
                                        color: 'text.primary',
                                        textDecoration: 'none',
                                        fontWeight: isActive
                                            ? 'bold'
                                            : 'normal',
                                        borderBottom: isActive
                                            ? '2px solid'
                                            : 'none',
                                        borderColor: 'background.aws',
                                        fontSize: '0.9rem',
                                    }}
                                >
                                    {t(`navigationList.${page.key}`)}
                                </Box>
                            );
                        })}
                    </Box>

                    <Box
                        sx={{
                            display: 'flex',
                            justifyContent: 'center',
                            mx: 1,
                        }}
                    >
                        <ContactSection size="small" />
                    </Box>

                    {/* Switches - right aligned */}
                    <Box sx={{ display: 'flex', alignItems: 'center', mr: 1 }}>
                        <Box sx={{ mr: 1 }}>
                            <LanguageToggle size="large" />
                        </Box>
                        <Box>
                            <ThemeToggle size="large" />
                        </Box>
                    </Box>
                </Box>
            </AppBar>
        </Box>
    );
};
