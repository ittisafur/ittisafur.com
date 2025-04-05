import React from 'react';
import { generateSEO } from '@/components/SEO';
import { getClient } from '@/lib/apollo-client';
import { Metadata } from 'next';
import { MetaData } from '@/types/metadata';
import { GET_Blog_SEO_DATA } from '@/graphql/queries/meta';
import { GET_ALL_CATEGORIES } from '@/graphql/queries/blog/getCategories';
import { Category } from '@/types/blog';
import CategoryLanding from '@/components/Client/Category';

interface CategoryWithCount extends Category {
    count: number;
}

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
            title: `Blog Categories | ${metaData?.title || 'Blog'}`,
            description: metaData?.description
                ? `Browse all blog categories. ${metaData.description}`
                : 'Browse all blog categories and discover articles on various topics.',
            keywords: metaData?.keywords?.map((keyword) => keyword.keyword).filter(Boolean),
            image: metaData?.image?.url,
            pathname: '/blog/category',
            noindex: false,
        });
    } catch (error) {
        console.error('Error fetching blog SEO data:', error);
        return generateSEO({
            title: 'Blog Categories',
            description: 'Browse all blog categories and discover articles on various topics.',
            pathname: '/blog/category',
        });
    }
}

// This is a Server Component that fetches data and passes it to a Client Component
const CategoryIndexPage = async () => {
    const client = getClient();

    const { data } = await client.query({
        query: GET_ALL_CATEGORIES,
    });

    const categories = data.categories.map((category: Category) => {
        const count = Array.isArray(category.blog) ? category.blog.length : 0;

        return {
            name: category.name,
            slug: category.slug,
            count: count,
        };
    }) as CategoryWithCount[];

    categories.sort((a, b) => b.count - a.count);

    // Pass the data to the client component
    return <CategoryLanding categories={categories} />;
};

export default CategoryIndexPage;
