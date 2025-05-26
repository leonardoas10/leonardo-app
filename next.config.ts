import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
    images: {
        remotePatterns: [
            {
                protocol: 'https',
                hostname: 'content.leonardoaranguren.com',
            },
            {
                protocol: 'https',
                hostname: 'd37rk2a86awu3g.cloudfront.net',
            },
        ],
    },
};

export default nextConfig;
