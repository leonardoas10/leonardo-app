'use client';

import React, { useState } from 'react';
import Link from 'next/link';
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
    { name: 'About', href: '/about' },
    { name: 'Services', href: '/services' },
    { name: 'Contact', href: '/contact' },
];

const NavBar = () => {
    const [mobileOpen, setMobileOpen] = useState(false);

    const handleDrawerToggle = () => {
        setMobileOpen(!mobileOpen);
    };

    // Mobile drawer content
    const drawer = (
        <Box onClick={handleDrawerToggle} sx={{ textAlign: 'center' }}>
            <Typography variant="h6" sx={{ my: 2 }}>
                LOGO
            </Typography>
            <List className={styles.mobileMenu}>
                {pages.map((page) => (
                    <ListItem key={page.name} disablePadding>
                        <ListItemButton sx={{ textAlign: 'center' }}>
                            <Link
                                href={page.href}
                                passHref
                                style={{
                                    textDecoration: 'none',
                                    color: 'inherit',
                                    width: '100%',
                                }}
                            >
                                <ListItemText primary={page.name} />
                            </Link>
                        </ListItemButton>
                    </ListItem>
                ))}
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
            <AppBar position="static" className={styles.navbar}>
                <Container maxWidth="xl">
                    <Toolbar disableGutters>
                        {/* Logo - visible on all screens */}
                        <Typography
                            variant="h6"
                            noWrap
                            component="div"
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
                            {pages.map((page) => (
                                <Button
                                    key={page.name}
                                    component={Link}
                                    href={page.href}
                                    sx={{
                                        my: 2,
                                        color: 'white',
                                        display: 'block',
                                    }}
                                >
                                    {page.name}
                                </Button>
                            ))}
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
