import './globals.css';
// import { GoogleTagManager } from '@next/third-parties/google';
import { AppRouterCacheProvider } from '@mui/material-nextjs/v15-appRouter';
import { Amplify } from 'aws-amplify';
import { cookies } from 'next/headers';
import Script from 'next/script';

import outputs from '@/amplify_outputs.json';
import { Footer } from '@/components/layout/footer/Footer';
import { NavBar } from '@/components/layout/navbar/NavBar';
import { ThemeColorSync } from '@/components/layout/ThemeColorSync';
import { ThemeTransitionEnabler } from '@/components/layout/ThemeTransitionEnabler';
import { Providers } from '@/contexts/Providers';
import { CLIENT_PREFERENCES_SCRIPT } from '@/utils/bootstrap/client-preferences-script';
import {
    LANGUAGE_STORAGE_KEY,
    THEME_STORAGE_KEY,
} from '@/utils/bootstrap/constants';
import { parseTheme } from '@/utils/bootstrap/theme';
import {
    CloudFrontURLs,
    EnvironmentVariables,
    SITE_URL,
} from '@/utils/constants';
import { parseSiteLocale } from '@/utils/seo/locale';
import { buildSiteStructuredData } from '@/utils/seo/structured-data';
import { PWA_THEME_COLORS } from '@/utils/theme/pwa-colors';

import type { Metadata, Viewport } from 'next';

Amplify.configure(outputs, { ssr: true });

const siteStructuredData = buildSiteStructuredData();

export const metadata: Metadata = {
    metadataBase: new URL(SITE_URL),
    title: 'Leonardo Aranguren | AWS Cloud Engineer & Software Engineer',
    description:
        'Leonardo Aranguren is an AWS Certified Cloud Engineer and Software Engineer specializing in serverless architecture, React, TypeScript, Python, Go, NodeJS, NextJS and cloud-native solutions. Explore my portfolio, projects, and professional experience.',
    keywords:
        'AWS, Cloud Engineer, Software Engineer, React, TypeScript, Serverless, Python, Portfolio, Leonardo Aranguren',
    authors: [{ name: 'Leonardo Aranguren' }],
    creator: 'Leonardo Aranguren',
    openGraph: {
        title: 'Leonardo Aranguren | Cloud Engineer - Software Engineer - Technical Lead',
        description:
            'AWS Certified Cloud Engineer and Software Engineer specializing in serverless architecture, React, TypeScript, Python, Go, NodeJS, NextJS and cloud-native solutions.',
        url: SITE_URL,
        siteName: 'Leonardo Aranguren',
        images: [
            {
                url: `${CloudFrontURLs.IMAGES}/me.webp`,
                width: 800,
                height: 600,
                alt: 'Leonardo Aranguren',
            },
        ],
        type: 'website',
    },
    applicationName: 'Leonardo Aranguren',
};

export const viewport: Viewport = {
    themeColor: [
        { media: '(prefers-color-scheme: light)', color: PWA_THEME_COLORS.light },
        { media: '(prefers-color-scheme: dark)', color: PWA_THEME_COLORS.dark },
    ],
};

export default async function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    const cookieStore = await cookies();
    const initialTheme = parseTheme(cookieStore.get(THEME_STORAGE_KEY)?.value);
    const initialLanguage = parseSiteLocale(
        cookieStore.get(LANGUAGE_STORAGE_KEY)?.value
    );

    return (
        <html
            lang={initialLanguage}
            data-theme={initialTheme}
            suppressHydrationWarning
        >
            <Script id="client-preferences" strategy="beforeInteractive">
                {CLIENT_PREFERENCES_SCRIPT}
            </Script>
            <body>
                <AppRouterCacheProvider>
                <script
                    type="application/ld+json"
                    dangerouslySetInnerHTML={{
                        __html: JSON.stringify(siteStructuredData),
                    }}
                />
                <noscript>
                    <iframe
                        src={`https://www.googletagmanager.com/ns.html?id=${EnvironmentVariables.GTM_ID}`}
                        height="0"
                        width="0"
                        style={{ display: 'none', visibility: 'hidden' }}
                    />
                </noscript>
                <Providers
                    initialTheme={initialTheme}
                    initialLanguage={initialLanguage}
                >
                    <ThemeColorSync />
                    <ThemeTransitionEnabler />
                    <NavBar />
                    <main>{children}</main>
                    <Footer />
                </Providers>
            </AppRouterCacheProvider>
                <Script id="google-tag-manager" strategy="afterInteractive">
                    {`
                        (function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
                        new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
                        j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
                        'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
                        })(window,document,'script','dataLayer','${EnvironmentVariables.GTM_ID}');
                    `}
                </Script>
            </body>
        </html>
    );
}
