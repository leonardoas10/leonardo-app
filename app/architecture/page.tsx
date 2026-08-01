import { cookies } from 'next/headers';

import { ArchitecturePage } from '@/components/architecture/ArchitecturePage';
import { SITE_URL } from '@/utils/constants';
import { DEFAULT_LOCALE, parseSiteLocale } from '@/utils/seo/locale';
import architectureEN from '@/utils/translations/en/architecture.json';
import architectureES from '@/utils/translations/es/architecture.json';

import type { Metadata } from 'next';

const ARCHITECTURE_METADATA = {
    en: {
        title: architectureEN.page.title,
        description: architectureEN.page.description,
    },
    es: {
        title: architectureES.page.title,
        description: architectureES.page.description,
    },
} as const;

export async function generateMetadata(): Promise<Metadata> {
    const cookieStore = await cookies();
    const locale = parseSiteLocale(cookieStore.get('language')?.value);
    const { title, description } =
        ARCHITECTURE_METADATA[locale] ?? ARCHITECTURE_METADATA[DEFAULT_LOCALE];

    const pageTitle = `${title} | Leonardo Aranguren`;

    return {
        title: pageTitle,
        description,
        openGraph: {
            title: pageTitle,
            description,
            url: `${SITE_URL}/architecture`,
        },
    };
}

export default function ArchitectureRoutePage() {
    return <ArchitecturePage />;
}
