import React from 'react';
import { generateSEO } from '@/components/SEO';
import { getClient } from '@/lib/apollo-client';
import { MetaData } from '@/types/metadata';
import { Metadata } from 'next';
import { GET_Blog_SEO_DATA } from '@/graphql/queries/meta';
import type { Blog } from '@/types/blog';
import { GET_BLOGS_BY_TAG } from '@/graphql/queries/blog/getTags';
import TagBlogList from '@/components/Blog/TagBlogList';

type TagParams = Promise<{ slug: string }>;

// Define the metadata props type
type GenerateMetadataProps = {
    params: TagParams;
};

export async function generateMetadata({ params }: GenerateMetadataProps): Promise<Metadata> {
    const { slug } = await params;

    const client = getClient();

    try {
        const {
            data: {
                blogSeo: { metaData: BlogSEO },
            },
        } = await client.query({
            query: GET_Blog_SEO_DATA,
        });

        const { data } = await client.query({
            query: GET_BLOGS_BY_TAG,
            variables: {
                filters: {
                    slug: { eq: slug },
                },
            },
        });

        const tagName = data.tags[0]?.name || slug;
        const metaData: Partial<MetaData> = BlogSEO || {};

        return generateSEO({
            title: `${tagName} - Blog Tag | ${metaData?.title || 'Blog'}`,
            description: metaData?.description
                ? `Explore all blog posts tagged with ${tagName}. ${metaData.description}`
                : `Explore all blog posts tagged with ${tagName}.`,
            keywords: metaData?.keywords?.map((keyword) => keyword.keyword).filter(Boolean),
            image: metaData?.image?.url,
            pathname: `/blog/tag/${slug}`,
            noindex: false,
        });
    } catch (error) {
        console.error('Error fetching tag SEO data:', error);
        return generateSEO({
            title: `Tag: ${slug}`,
            description: `Blog posts tagged with ${slug}`,
            pathname: `/blog/tag/${slug}`,
        });
    }
}

const TagPage = async ({ params }: { params: TagParams }) => {
    const { slug } = await params;
    const client = getClient();

    // Fetch blogs by tag slug
    const { data } = await client.query({
        query: GET_BLOGS_BY_TAG,
        variables: {
            filters: {
                slug: { eq: slug },
            },
        },
    });

    // Format the data
    const tag = data.tags[0];
    const blogItems =
        tag?.blogs?.map((item: Blog) => ({
            title: item.title,
            slug: item.slug,
            excerpt: item.excerpt,
            publishedAt: item.publishedAt,
            categories: item.categories || [],
        })) || [];

    // Pass the data to the client component
    return <TagBlogList tag={tag} blogItems={blogItems} slug={slug} />;
};

export default TagPage;
