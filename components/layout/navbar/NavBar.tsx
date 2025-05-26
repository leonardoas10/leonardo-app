'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import {
    AppBar,
    Avatar,
    Box,
    Toolbar,
    IconButton,
    Typography,
    Container,
    Drawer,
    List,
    ListItem,
    ListItemButton,
    ListItemText,
} from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import styles from './NavBar.module.css';
import { ThemeToggle } from '@/components/layout/ThemeToggle';

// Navigation items
const pages = [
    { name: 'Home', href: '/' },
    { name: 'Architecture', href: '/architecture' },
    { name: 'CV', href: '/contact' },
];

export const NavBar: React.FC = () => {
    const [mobileOpen, setMobileOpen] = useState(false);
    const pathname = usePathname();

    const handleDrawerToggle = () => {
        setMobileOpen(!mobileOpen);
    };

    // Mobile drawer content
    const drawer = (
        <Box onClick={handleDrawerToggle} sx={{ textAlign: 'center' }}>
            <List className={styles.mobileMenu}>
                {pages.map((page) => {
                    const isActive = pathname === page.href;
                    return (
                        <ListItem key={page.name} disablePadding>
                            <ListItemButton
                                sx={{
                                    textAlign: 'center',
                                    bgcolor: isActive
                                        ? 'rgba(255, 255, 255, 0.1)'
                                        : 'transparent',
                                }}
                            >
                                <Link
                                    href={page.href}
                                    passHref
                                    style={{
                                        textDecoration: 'none',
                                        color: 'inherit',
                                        width: '100%',
                                        fontWeight: isActive
                                            ? 'bold'
                                            : 'normal',
                                    }}
                                >
                                    <ListItemText
                                        color="textPrimary"
                                        primary={page.name}
                                    />
                                </Link>
                            </ListItemButton>
                        </ListItem>
                    );
                })}
                <ListItem disablePadding>
                    <ListItemButton
                        sx={{ justifyContent: 'center' }}
                        onClick={(e) => e.stopPropagation()}
                    >
                        <ThemeToggle />
                    </ListItemButton>
                </ListItem>
            </List>
        </Box>
    );

    return (
        <Box component="nav">
            <AppBar
                position="static"
                className={styles.navbar}
                sx={{
                    py: { xs: 2, md: 0 },
                    backgroundColor: 'background.default',
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
                            }}
                        >
                            <Avatar
                                alt="L"
                                src={
                                    'https://content.leonardoaranguren.com/app-images/me.png'
                                }
                                sx={{
                                    width: { xs: 60, md: 50 },
                                    height: { xs: 60, md: 50 },
                                }}
                            />
                            <Link href="/" className={styles.logo}>
                                <Typography
                                    variant="h6"
                                    noWrap
                                    component="div"
                                    color="textPrimary"
                                    sx={{
                                        fontSize: {
                                            xs: '1.3rem',
                                            md: '1.25rem',
                                        },
                                        textAlign: { xs: 'center', md: 'left' },
                                    }}
                                >
                                    LEONARDO ARANGUREN
                                </Typography>
                            </Link>
                        </Box>

                        {/* Right side: Navigation and Toggle */}
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
                                                {page.name}
                                            </Box>
                                        </Box>
                                    );
                                })}
                                <ThemeToggle />
                            </Box>

                            {/* Mobile menu button */}
                            <IconButton
                                aria-label="open drawer"
                                edge="end"
                                onClick={handleDrawerToggle}
                                className={styles.menuButton}
                                sx={{
                                    display: { md: 'none' },
                                    color: 'background.aws',
                                }}
                            >
                                <MenuIcon />
                            </IconButton>
                        </Box>
                    </Toolbar>
                </Container>

                {/* Mobile drawer */}
                <Drawer
                    anchor="right"
                    open={mobileOpen}
                    onClose={handleDrawerToggle}
                    ModalProps={{
                        keepMounted: true, // Better mobile performance
                    }}
                    sx={{
                        color: 'textPrimary',
                        display: { xs: 'block', md: 'none' },
                        '& .MuiDrawer-paper': {
                            boxSizing: 'border-box',
                            width: 240,
                        },
                    }}
                >
                    {drawer}
                </Drawer>
            </AppBar>
        </Box>
    );
};
