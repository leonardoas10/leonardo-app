'use client';

import { Box, Typography } from '@mui/material';

export default function Footer() {
    return (
        <Box
            component="footer"
            sx={{
                mt: 6,
                textAlign: 'center',
                fontSize: '0.875rem',
                color: 'text.secondary',
                py: 2,
            }}
        >
            <Typography color="textPrimary">
                <Box
                    component="a"
                    href="https://github.com/leonardoas10"
                    target="_blank"
                    rel="noopener noreferrer"
                    sx={{
                        color: 'white',
                        textDecoration: 'none',
                        '&:hover': {
                            color: 'background.aws',
                        },
                    }}
                >
                    GitHub
                </Box>{' '}
                <Typography
                    component="span"
                    sx={{ color: 'textSecondary' }}
                    display="inline"
                >
                    |
                </Typography>{' '}
                <Box
                    component="a"
                    href="https://www.linkedin.com/in/leonardoas10/"
                    target="_blank"
                    rel="noopener noreferrer"
                    sx={{
                        color: 'white',
                        textDecoration: 'none',
                        '&:hover': {
                            color: 'background.aws',
                        },
                    }}
                >
                    LinkedIn
                </Box>
            </Typography>
        </Box>
    );
}
