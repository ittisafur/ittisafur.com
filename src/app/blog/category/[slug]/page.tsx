import React from 'react';
import { generateSEO } from '@/components/SEO';
import { getClient } from '@/lib/apollo-client';
import { MetaData } from '@/types/metadata';
import { Metadata } from 'next';
import { GET_Blog_SEO_DATA } from '@/graphql/queries/meta';
import type { Blog } from '@/types/blog';
import { GET_BLOGS_BY_CATEGORY } from '@/graphql/queries/blog/getCategories';
import CategoryBlogList from '@/components/Blog/CategoryBlogList';

type CategoryParams = Promise<{ slug: string }>;

type GenerateMetadataProps = {
    params: CategoryParams;
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
            query: GET_BLOGS_BY_CATEGORY,
            variables: {
                filters: {
                    slug: { eq: slug },
                },
            },
        });

        const categoryName = data.categories[0]?.name || slug;
        const metaData: Partial<MetaData> = BlogSEO || {};

        return generateSEO({
            title: `${categoryName} - Blog Category | ${metaData?.title || 'Blog'}`,
            description: metaData?.description
                ? `Explore all blog posts in the ${categoryName} category. ${metaData.description}`
                : `Explore all blog posts in the ${categoryName} category.`,
            keywords: metaData?.keywords?.map((keyword) => keyword.keyword).filter(Boolean),
            image: metaData?.image?.url,
            pathname: `/blog/category/${slug}`,
            noindex: false,
        });
    } catch (error) {
        console.error('Error fetching category SEO data:', error);
        return generateSEO({
            title: `Category: ${slug}`,
            description: `Blog posts in the ${slug} category`,
            pathname: `/blog/category/${slug}`,
        });
    }
}

// Server Component that fetches data and passes it to client component
const CategoryPage = async ({ params }: { params: CategoryParams }) => {
    const { slug } = await params;
    const client = getClient();

    // Fetch blogs by category slug
    const { data } = await client.query({
        query: GET_BLOGS_BY_CATEGORY,
        variables: {
            filters: {
                slug: { eq: slug },
            },
        },
    });

    // Format the data
    const category = data.categories[0];
    const blogItems =
        category?.blog?.map((item: Blog) => ({
            title: item.title,
            slug: item.slug,
            excerpt: item.excerpt,
            publishedAt: item.publishedAt,
            tags: item.tags || [],
        })) || [];

    // Pass data to the client component
    return <CategoryBlogList category={category} blogItems={blogItems} slug={slug} />;
};

export default CategoryPage;
