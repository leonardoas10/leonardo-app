import { CloudFrontURLs } from "@/utils/constants";

import type { NextConfig } from 'next';


const nextConfig: NextConfig = {
    reactStrictMode: true,
    poweredByHeader: false,
    compress: true,
    images: {
        remotePatterns: [
            {
                protocol: 'https',
                hostname: `${CloudFrontURLs.HOSTNAME}`,
                pathname: '/images/**',
            },
            {
                protocol: 'https',
                hostname: 'www.gstatic.com',
                pathname: '/recaptcha/**',
            },
        ],
        minimumCacheTTL: 31536000, // 1 year in seconds
        formats: ['image/webp'],
    },

    experimental: {
        optimizePackageImports: ['@mui/material', 'aws-amplify'],
        optimizeCss: true,
        optimizeServerReact: true,
        webpackBuildWorker: true,
    },
    async headers() {
        return [
            {
                source: '/_next/image/:path*',
                headers: [
                    {
                        key: 'Cache-Control',
                        value: 'public, max-age=31536000, immutable',
                    },
                ],
            },
            {
                source: '/images/:path*',
                headers: [
                    {
                        key: 'Cache-Control',
                        value: 'public, max-age=31536000, immutable',
                    },
                ],
            },
        ];
    },
};

export default nextConfig;
