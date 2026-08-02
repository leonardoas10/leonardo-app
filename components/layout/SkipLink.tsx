'use client';

import { useTranslation } from '@/utils/hooks/useTranslation';

export function SkipLink() {
    const { t } = useTranslation('common');

    return (
        <a href="#main-content" className="skip-link">
            {t('skipLink')}
        </a>
    );
}
