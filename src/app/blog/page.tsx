import { generateSEO } from '@/components/SEO';
import { GET_Blog_SEO_DATA } from '@/graphql/queries/meta';
import { getClient } from '@/lib/apollo-client';
import { MetaData } from '@/types/metadata';
import { Metadata } from 'next';
import React from 'react';
import BlogLanding from '@/components/Blog';

export async function generateMetadata(): Promise<Metadata> {
    const client = getClient();

    try {
        const {
            data: {
                blogSeo: { metaData: BlogSEO },
            },
        } = await client.query({
            query: GET_Blog_SEO_DATA,
        });

        const metaData: Partial<MetaData> = BlogSEO || {};

        return generateSEO({
            title: metaData?.title || '',
            description: metaData?.description,
            keywords: metaData?.keywords?.map((keyword) => keyword.keyword).filter(Boolean),
            image: metaData?.image?.url,
            pathname: '/',
            noindex: false,
        });
    } catch (error: string | unknown) {
        console.error('Error fetching Portfolio SEO data:', error);
        return generateSEO({
            title: 'Blog',
            description: '',
            pathname: '/',
        });
    }
}

const BlogPage = () => {
    return <BlogLanding />;
};

export default BlogPage;
