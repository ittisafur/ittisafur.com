import React from 'react';
import { generateSEO } from '@/components/SEO';
import { getClient } from '@/lib/apollo-client';
import { Metadata } from 'next';
import { MetaData } from '@/types/metadata';
import { GET_Blog_SEO_DATA } from '@/graphql/queries/meta';
import { GET_ALL_TAGS } from '@/graphql/queries/blog/getTags';
import { Tag } from '@/types/blog';
import TagList from '@/components/Blog/TagList';

// Define types for the tag with count
interface TagWithCount extends Tag {
    count: number;
}

// Define extended Tag interface to match API response
interface TagWithBlogs extends Tag {
    blogs?: Array<{ documentId: string }>;
}

// Define the blog tag in the response
interface BlogTag {
    name: string;
    slug: string;
    blogs?: Array<{ documentId: string }>;
}

// Define the blog in the response
interface BlogWithTags {
    tags?: BlogTag[];
}

// Define the category in the response
interface CategoryWithBlog {
    blog?: BlogWithTags[];
}

// Define the response type from the GraphQL query
interface TagResponse {
    categories: CategoryWithBlog[];
}

// Generate metadata for the page
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
            title: `Blog Tags | ${metaData?.title || 'Blog'}`,
            description: metaData?.description
                ? `Browse all blog tags. ${metaData.description}`
                : 'Browse all blog tags and discover articles on various topics.',
            keywords: metaData?.keywords?.map((keyword) => keyword.keyword).filter(Boolean),
            image: metaData?.image?.url,
            pathname: '/blog/tag',
            noindex: false,
        });
    } catch (error) {
        console.error('Error fetching blog SEO data:', error);
        return generateSEO({
            title: 'Blog Tags',
            description: 'Browse all blog tags and discover articles on various topics.',
            pathname: '/blog/tag',
        });
    }
}

const TagIndexPage = async () => {
    const client = getClient();

    // Fetch all tags with count
    const { data } = await client.query<TagResponse>({
        query: GET_ALL_TAGS,
    });

    // Process and deduplicate tags from the nested structure
    const tagMap = new Map<string, TagWithCount>();

    // Loop through all categories
    data.categories.forEach((category: CategoryWithBlog) => {
        // Check if category has blog posts
        if (category.blog && Array.isArray(category.blog)) {
            // Loop through all blog posts in each category
            category.blog.forEach((blog: BlogWithTags) => {
                // Check if blog has tags
                if (blog.tags && Array.isArray(blog.tags)) {
                    // Loop through all tags in each blog post
                    blog.tags.forEach((tag: TagWithBlogs) => {
                        // Check if we've already seen this tag
                        if (!tagMap.has(tag.slug)) {
                            // Count the number of blogs with this tag
                            const count =
                                tag.blogs && Array.isArray(tag.blogs) ? tag.blogs.length : 0;

                            // Add new tag to our map with its count
                            tagMap.set(tag.slug, {
                                name: tag.name,
                                slug: tag.slug,
                                count: count,
                            });
                        }
                    });
                }
            });
        }
    });

    // Convert map to array
    const tags = Array.from(tagMap.values()) as TagWithCount[];

    // Sort tags by count (most posts first)
    tags.sort((a, b) => b.count - a.count);

    // Pass processed tags to the client component
    return <TagList tags={tags} />;
};

export default TagIndexPage;
