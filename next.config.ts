import type { NextConfig } from 'next';

const strapiUrl = process.env.NEXT_PUBLIC_MEDIA_API || 'http://localhost:1337';

const url = new URL(strapiUrl);
const nextConfig: NextConfig = {
    /* config options here */
    images: {
        remotePatterns: [
            {
                protocol: 'https',
                hostname: 'res.cloudinary.com',
            },

            {
                protocol: url.protocol === 'https:' ? 'https' : 'http',
                hostname: url.hostname,
                port: url.port || '1337',
                pathname: '/uploads/**',
            },
        ],
    },
};

export default nextConfig;
