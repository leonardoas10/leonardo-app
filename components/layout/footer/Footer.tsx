'use client';

import { Box, Typography } from '@mui/material';

export const Footer: React.FC = () => {
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
            <Box
                component="a"
                href="https://github.com/leonardoas10"
                target="_blank"
                rel="noopener noreferrer"
                sx={{
                    textDecoration: 'none',
                    '&:hover': {
                        color: 'background.aws',
                    },
                }}
            >
                <Typography
                    component="span"
                    color="textPrimary"
                    display="inline"
                    sx={{
                        '&:hover': {
                            color: 'background.aws',
                        },
                    }}
                >
                    Github
                </Typography>{' '}
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
                }}
            >
                <Typography
                    component="span"
                    color="textPrimary"
                    display="inline"
                    sx={{
                        '&:hover': {
                            color: 'background.aws',
                        },
                    }}
                >
                    LinkedIn
                </Typography>{' '}
            </Box>
        </Box>
    );
};
