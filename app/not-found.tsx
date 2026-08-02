'use client';

import { Box, Container, Typography } from '@mui/material';

import { Button } from '@/components/common/Button';
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
                    sx={{ color: 'textSecondary', fontWeight: 600 }}
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
                <Button href="/">{t('errors.notFound.goHome')}</Button>
            </Box>
        </Container>
    );
}
