import './globals.css';
// import { GoogleTagManager } from '@next/third-parties/google';
import { Amplify } from 'aws-amplify';
import Script from 'next/script';

import outputs from '@/amplify_outputs.json';
import { Footer } from '@/components/layout/footer/Footer';
import { NavBar } from '@/components/layout/navbar/NavBar';
import { ThemeTransitionEnabler } from '@/components/layout/ThemeTransitionEnabler';
import { Providers } from '@/contexts/Providers';
import { EnviromentVariables } from '@/utils/constants';
import { CloudFrontURLs } from '@/utils/constants';

import type { Metadata } from 'next';

Amplify.configure(outputs, { ssr: true });

export const metadata: Metadata = {
    title: 'Leonardo Aranguren | AWS Cloud Engineer & Software Enginner',
    description:
        'Leonardo Aranguren is an AWS Certified Cloud Engineer and Software Enginner specializing in serverless architecture, React, TypeScript, Python, Go, NodeJS, NextJS and cloud-native solutions. Explore my portfolio, projects, and professional experience.',
    keywords:
        'AWS, Cloud Engineer, Software Enginner, React, TypeScript, Serverless, Python, Portfolio, Leonardo Aranguren',
    authors: [{ name: 'Leonardo Aranguren' }],
    creator: 'Leonardo Aranguren',
    openGraph: {
        title: 'Leonardo Aranguren | Cloud Engineer - Software Enginner - Technical Lead',
        description:
            'AWS Certified Cloud Engineer and Software Enginner specializing in serverless architecture, React, TypeScript, Python, Go, NodeJS, NextJS and cloud-native solutions.',
        url: 'https://leonardoaranguren.com',
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

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html lang="en">
            {/* Google Tag Manager - Optimized with @next/third-parties */}
            <head>
                <Script
                    src={`https://www.googletagmanager.com/gtm.js?id=${EnviromentVariables.GTM_ID}`}
                    strategy="lazyOnload"
                />
            </head>
            <body>
                <noscript>
                    <iframe
                        src={`https://www.googletagmanager.com/ns.html?id=${EnviromentVariables.GTM_ID}`}
                        height="0"
                        width="0"
                        style={{ display: 'none', visibility: 'hidden' }}
                    />
                </noscript>
                {/* Google Tag Manager (noscript) */}
                <Providers>
                    <ThemeTransitionEnabler />
                    <NavBar />
                    <main>{children}</main>
                    <Footer />
                </Providers>
                {/* <GoogleTagManager gtmId={EnviromentVariables.GTM_ID} /> */}
            </body>
        </html>
    );
}
