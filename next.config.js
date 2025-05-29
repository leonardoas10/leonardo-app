/** @type {import('next').NextConfig} */
const nextConfig = {
    reactStrictMode: true,
    images: {
        remotePatterns: [
            {
                protocol: 'https',
                hostname: 'd37rk2a86awu3g.cloudfront.net',
                pathname: '/images/**',
            },
        ],
        minimumCacheTTL: 31536000, // 1 year in seconds
        formats: ['image/webp'],
    },

    experimental: {
        optimizePackageImports: ['@mui/material', 'aws-amplify'],
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

module.exports = nextConfig;
