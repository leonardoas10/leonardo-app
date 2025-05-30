import './globals.css';
import { Amplify } from 'aws-amplify';
import outputs from '@/amplify_outputs.json';
import type { Metadata } from 'next';

import { NavBar } from '@/components/layout/navbar/NavBar';
import { Footer } from '@/components/layout/footer/Footer';
import { Providers } from './providers';
import { ThemeTransitionEnabler } from '@/components/layout/ThemeTransitionEnabler';

import { CloudFrontURLs } from '@/utils/constants';

// Configure Amplify on the client side
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
        title: 'Leonardo Aranguren | Cloud Engineer - Software Enginner - Technical Led',
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
            <body>
                <Providers>
                    <ThemeTransitionEnabler />
                    <NavBar />
                    <main>{children}</main>
                    <Footer />
                </Providers>
            </body>
        </html>
    );
}
