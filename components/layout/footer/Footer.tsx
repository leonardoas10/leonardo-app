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
                GitHub:{' '}
                <a
                    href="https://github.com/yourusername"
                    target="_blank"
                    rel="noopener noreferrer"
                    style={{ color: 'inherit' }}
                >
                    yourusername
                </a>{' '}
                | LinkedIn:{' '}
                <a
                    href="https://linkedin.com/in/yourhandle"
                    target="_blank"
                    rel="noopener noreferrer"
                    style={{ color: 'inherit' }}
                >
                    yourhandle
                </a>{' '}
                | Email:{' '}
                <a href="mailto:you@example.com" style={{ color: 'inherit' }}>
                    you@example.com
                </a>
            </Typography>
        </Box>
    );
}
