'use client';

import { AppBar, Box, Toolbar, Container } from '@mui/material';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import React from 'react';

import { ContactSection } from '@/components/contact/ContactSection';
import { LanguageToggle } from '@/components/toggles/LanguageToggle';
import { ThemeToggle } from '@/components/toggles/ThemeToggle';
import { useTranslation } from '@/utils/hooks/useTranslation';

import styles from './NavBar.module.css';

// Navigation items with translation keys
const pages = [
    { key: 'home', href: '/' },
    { key: 'architecture', href: '/architecture' },
] as const;

type NavigationPageKey = (typeof pages)[number]['key'];
type NavigationListKey = `navigationList.${NavigationPageKey}`;

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
                }}
            >
                <Container maxWidth="xl">
                    <Toolbar
                        disableGutters
                        sx={{
                            justifyContent: 'space-between',
                        }}
                    >
                        {/* Left side: site title */}
                        <Box
                            sx={{
                                display: 'flex',
                                alignItems: 'center',
                                width: { xs: '100%', md: 'auto' },
                                minWidth: 0,
                                justifyContent: {
                                    xs: 'center',
                                    md: 'flex-start',
                                },
                            }}
                        >
                            <Link
                                href="/"
                                className={styles.logo}
                                aria-label="Leonardo Aranguren — Home"
                            >
                                <span className={styles.siteTitle}>
                                    Leonardo Aranguren
                                </span>
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
                                                    `navigationList.${page.key}` as NavigationListKey
                                                )}
                                            </Box>
                                        </Box>
                                    );
                                })}
                                <ContactSection
                                    size="medium"
                                    buttonLocation="Navbar"
                                />
                                <LanguageToggle
                                    size="large"
                                    toggleLocation="Navbar"
                                />
                                <ThemeToggle
                                    size="large"
                                    toggleLocation="Navbar"
                                />
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
                                    {t(
                                        `navigationList.${page.key}` as NavigationListKey
                                    )}
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
                        <ContactSection size="small" buttonLocation="Navbar" />
                    </Box>

                    {/* Switches - right aligned */}
                    <Box
                        sx={{
                            display: 'flex',
                            alignItems: 'center',
                            flexShrink: 0,
                            mr: 1,
                        }}
                    >
                        <Box sx={{ mr: 1 }}>
                            <LanguageToggle
                                size="large"
                                toggleLocation="Navbar"
                            />
                        </Box>
                        <Box>
                            <ThemeToggle size="large" toggleLocation="Navbar" />
                        </Box>
                    </Box>
                </Box>
            </AppBar>
        </Box>
    );
};
