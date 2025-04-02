import { Metadata } from 'next';

interface SEOProps {
    title: string;
    description?: string;
    keywords?: string[];
    image?: string;
    pathname?: string;
    type?: 'website' | 'article';
    publishedTime?: string;
    modifiedTime?: string;
    noindex?: boolean;
}

export function generateSEO({
    title,
    description,
    keywords = [],
    image,
    pathname = '',
    type = 'website',
    publishedTime,
    modifiedTime,
    noindex = false,
}: SEOProps): Metadata {
    const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://ittisafur.com';
    const siteImage = image || '';
    const brandName = process.env.NEXT_PUBLIC_BRAND_NAME || '';
    const siteTitle = title ? `${title} | ${brandName}` : brandName;

    return {
        title: siteTitle,
        description,
        keywords,
        metadataBase: new URL(baseUrl),

        robots: {
            index: !noindex,
            follow: !noindex,
        },

        openGraph: {
            title: siteTitle,
            description,
            url: `${baseUrl}${pathname}`,
            siteName: brandName,
            locale: 'en_US',
            type,
            images: [
                {
                    url: siteImage,
                    width: 1200,
                    height: 630,
                    alt: title,
                },
            ],
            ...(publishedTime && { publishedTime }),
            ...(modifiedTime && { modifiedTime }),
        },

        twitter: {
            card: 'summary_large_image',
            title: siteTitle,
            description,
            images: [siteImage],
            creator: '@ittisafur',
        },

        verification: {
            google: process.env.NEXT_PUBLIC_GOOGLE_VERIFICATION,
        },

        alternates: {
            canonical: `${baseUrl}${pathname}`,
        },
    };
}
