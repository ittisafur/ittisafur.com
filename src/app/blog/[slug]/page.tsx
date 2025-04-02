import React from 'react';
import { generateSEO } from '@/components/SEO';
import { getClient } from '@/lib/apollo-client';
import { Metadata } from 'next';
import { MetaData } from '@/types/metadata';
import { GET_Blog_Single } from '@/graphql/queries/blog/getBlogSingle';
import { notFound } from 'next/navigation';
import BlogSingleContent from './BlogSingleContent';

type BlogParams = Promise<{ slug: string }>;

type GenerateMetadataProps = {
    params: BlogParams;
};

export async function generateMetadata({ params }: GenerateMetadataProps): Promise<Metadata> {
    const { slug } = await params;
    const client = getClient();

    try {
        const {
            data: { blogs },
        } = await client.query({
            query: GET_Blog_Single,
            variables: {
                slug,
            },
        });

        const metaData: Partial<MetaData> = blogs[0].metaData[0] || {};

        return generateSEO({
            title: metaData?.title || '',
            description: metaData?.description,
            keywords: metaData?.keywords?.map((keyword) => keyword.keyword).filter(Boolean),
            image: metaData?.image?.url,
            pathname: '/',
            noindex: false,
        });
    } catch {
        return generateSEO({
            title: '',
            description: '',
            pathname: '/',
        });
    }
}

const calculateReadingTime = (content: string): number => {
    const text = content.replace(/<[^>]*>/g, '');
    const wordsPerMinute = 225;
    const words = text.trim().split(/\s+/).length;
    const readingTime = Math.ceil(words / wordsPerMinute);
    return readingTime < 1 ? 1 : readingTime;
};

const BlogSingle = async ({ params }: { params: BlogParams }) => {
    const { slug } = await params;
    const client = getClient();

    try {
        const { data } = await client.query({
            query: GET_Blog_Single,
            variables: {
                slug,
            },
        });

        const blog = data?.blogs[0];
        if (!blog) {
            notFound();
        }

        const readingTime = calculateReadingTime(blog.content);

        // Pre-format the date instead of passing the function
        const formattedDate = new Date(blog.publishedAt).toLocaleDateString('en-US', {
            month: 'long',
            day: 'numeric',
            year: 'numeric',
        });

        return (
            <BlogSingleContent
                blog={blog}
                readingTime={readingTime}
                formattedDate={formattedDate}
            />
        );
    } catch (error) {
        console.error('Unable to fetch Blog Single Page', error);
        notFound();
    }
};

export default BlogSingle;
