'use client';

import { Box, Button, Container, Typography } from '@mui/material';
import Link from 'next/link';

import { useTranslation } from '@/utils/hooks/useTranslation';

export default function NotFoundPage() {
    const { t } = useTranslation('common');

    return (
        <Container maxWidth="sm" sx={{ py: { xs: 6, md: 10 } }}>
            <Box sx={{ textAlign: 'center' }}>
                <Typography
                    variant="h3"
                    component="h1"
                    gutterBottom
                    sx={{ color: 'textPrimary', fontWeight: 600 }}
                >
                    {t('errors.notFound.title')}
                </Typography>
                <Typography
                    variant="body1"
                    color="text.secondary"
                    sx={{ mb: 4 }}
                >
                    {t('errors.notFound.description')}
                </Typography>
                <Button component={Link} href="/" variant="contained">
                    {t('errors.notFound.goHome')}
                </Button>
            </Box>
        </Container>
    );
}
