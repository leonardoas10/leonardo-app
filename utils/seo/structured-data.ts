import { SITE_URL } from '@/utils/constants';

const PERSON_SAME_AS = [
    'https://github.com/leonardoas10',
    'https://www.linkedin.com/in/leonardoas10/',
] as const;

export function buildSiteStructuredData() {
    return {
        '@context': 'https://schema.org',
        '@graph': [
            {
                '@type': 'WebSite',
                name: 'Leonardo Aranguren',
                url: SITE_URL,
            },
            {
                '@type': 'Person',
                name: 'Leonardo Aranguren',
                url: SITE_URL,
                jobTitle: 'AWS Cloud Engineer & Software Engineer',
                sameAs: [...PERSON_SAME_AS],
            },
        ],
    };
}
