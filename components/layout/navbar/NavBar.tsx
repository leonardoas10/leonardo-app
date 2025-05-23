'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import {
    AppBar,
    Box,
    Toolbar,
    IconButton,
    Typography,
    Container,
    Button,
    Drawer,
    List,
    ListItem,
    ListItemButton,
    ListItemText,
} from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import styles from './NavBar.module.css';
import ThemeToggle from '@/components/layout/ThemeToggle';

// Navigation items
const pages = [
    { name: 'Home', href: '/' },
    { name: 'Architecture', href: '/website-architecture' },
    { name: 'CV', href: '/contact' },
];

const NavBar = () => {
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
                    <ListItemButton sx={{ justifyContent: 'center' }}>
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
                    <Toolbar disableGutters>
                        {/* Logo - visible on all screens */}
                        <Typography
                            variant="h6"
                            noWrap
                            component="div"
                            color="textPrimary"
                            sx={{ flexGrow: 1 }}
                        >
                            <Link href="/" className={styles.logo}>
                                LEONARDO ARANGUREN SUAREZ
                            </Link>
                        </Typography>

                        {/* Desktop menu */}
                        <Box
                            className={styles.desktopMenu}
                            sx={{ display: { xs: 'none', md: 'flex' } }}
                        >
                            {pages.map((page, index) => {
                                const isActive = pathname === page.href;
                                return (
                                    <Link href={page.href} passHref key={index}>
                                        <Box
                                            component="a"
                                            sx={{
                                                color: 'text.primary',
                                                fontWeight: isActive
                                                    ? 'bold'
                                                    : 'normal',
                                                borderBottom: isActive
                                                    ? (theme) =>
                                                          `2px solid ${theme.palette.text.primary}`
                                                    : 'none',
                                                textDecoration: 'none',
                                                mx: 1,
                                            }}
                                        >
                                            {page.name}
                                        </Box>
                                    </Link>
                                );
                            })}
                        </Box>

                        {/* Theme toggle switch */}
                        <Box
                            sx={{ ml: 2, display: { xs: 'none', md: 'flex' } }}
                        >
                            <ThemeToggle />
                        </Box>

                        {/* Mobile menu button */}
                        <IconButton
                            color="inherit"
                            aria-label="open drawer"
                            edge="end"
                            onClick={handleDrawerToggle}
                            className={styles.menuButton}
                            sx={{ display: { md: 'none' } }}
                        >
                            <MenuIcon />
                        </IconButton>
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

export default NavBar;
