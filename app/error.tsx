'use client';

import { Box, Button, Container, Stack, Typography } from '@mui/material';
import Link from 'next/link';
import { useEffect } from 'react';

import { useTranslation } from '@/utils/hooks/useTranslation';

type ErrorPageProps = {
    error: Error & { digest?: string };
    reset: () => void;
};

export default function ErrorPage({ error, reset }: ErrorPageProps) {
    const { t } = useTranslation('common');

    useEffect(() => {
        console.error(error);
    }, [error]);

    return (
        <Container maxWidth="sm" sx={{ py: { xs: 6, md: 10 } }}>
            <Box sx={{ textAlign: 'center' }} role="alert">
                <Typography
                    variant="h3"
                    component="h1"
                    gutterBottom
                    sx={{ color: 'textPrimary', fontWeight: 600 }}
                >
                    {t('errors.server.title')}
                </Typography>
                <Typography
                    variant="body1"
                    color="text.secondary"
                    sx={{ mb: 4 }}
                >
                    {t('errors.server.description')}
                </Typography>
                <Stack
                    direction={{ xs: 'column', sm: 'row' }}
                    spacing={2}
                    justifyContent="center"
                >
                    <Button variant="contained" onClick={reset}>
                        {t('errors.server.tryAgain')}
                    </Button>
                    <Button component={Link} href="/" variant="outlined">
                        {t('errors.server.goHome')}
                    </Button>
                </Stack>
            </Box>
        </Container>
    );
}
