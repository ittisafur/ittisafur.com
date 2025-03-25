'use server';

import React, { Fragment } from 'react';
import Link from 'next/link';
import { generateSEO } from '@/components/SEO';
import { getClient } from '@/lib/apollo-client';
import { MetaData } from '@/types/metadata';
import { Metadata } from 'next';
import { GET_Blog_SEO_DATA } from '@/graphql/queries/meta';
import type { Blog, Category } from '@/types/blog';
import { GET_BLOGS_BY_TAG } from '@/graphql/queries/blog/getTags';

// Define the params as a Promise to match the BlogSingle pattern
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
    // Next.js 15 requires params to be awaited before accessing properties
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

    const formatDate = (dateString: string) => {
        const date = new Date(dateString);
        return new Intl.DateTimeFormat('en-US', {
            month: 'long',
            day: 'numeric',
            year: 'numeric',
        }).format(date);
    };

    return (
        <div className="w-full bg-[#111111] text-[#F0F0F0] py-16 px-4 md:px-8">
            <div className="container mx-auto mb-16 text-center">
                <p className="text-xs tracking-widest uppercase mb-4 opacity-70">Blog Tag</p>
                <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold uppercase tracking-wider mb-2">
                    <span className="text-gray-400">{tag?.name || slug}</span>
                </h1>
                <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold uppercase tracking-wider">
                    <span className="relative">
                        Articles
                        <span className="absolute bottom-1 left-0 w-full h-1 bg-blue-500"></span>
                    </span>
                </h2>

                <div className="mt-6">
                    <Link
                        href="/blog"
                        className="text-blue-400 hover:text-blue-300 transition-colors duration-300 flex items-center justify-center gap-2"
                    >
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            className="h-4 w-4"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                        >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                                d="M15 19l-7-7 7-7"
                            />
                        </svg>
                        Back to all articles
                    </Link>
                </div>
            </div>

            {blogItems.length === 0 ? (
                <div className="text-center text-gray-400">
                    <p className="text-xl">No blog posts found with this tag</p>
                </div>
            ) : (
                <div className="container mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {blogItems.map((item: Blog & { categories?: Category[] }, index: number) => {
                        return (
                            <article
                                key={item.slug + index}
                                className="flex flex-col flex-1 flex-nowrap justify-start items-start h-auto w-auto max-w-full 
                       rounded-xl overflow-hidden 
                       backdrop-blur-[20px] 
                       bg-[rgba(16,16,16,0.1)] 
                       border border-[rgba(255,255,255,0.1)] 
                       p-[50px_40px] 
                       gap-[45px]
                       group
                       transition-all duration-500 ease-in-out
                       hover:bg-gradient-to-br hover:from-[rgba(23,23,23,0.8)] hover:to-[rgba(10,10,10,0.9)]"
                            >
                                <div className="w-full">
                                    <div className="flex items-center">
                                        <div
                                            className="w-8 h-8 rounded-full bg-[rgba(30,30,30,0.6)] flex items-center justify-center mr-3
                               transition-colors duration-300 group-hover:bg-[rgba(50,130,240,0.2)]"
                                        >
                                            <svg
                                                xmlns="http://www.w3.org/2000/svg"
                                                className="h-4 w-4 text-gray-400 group-hover:text-blue-400 transition-colors duration-300"
                                                fill="none"
                                                viewBox="0 0 24 24"
                                                stroke="currentColor"
                                            >
                                                <path
                                                    strokeLinecap="round"
                                                    strokeLinejoin="round"
                                                    strokeWidth={2}
                                                    d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
                                                />
                                            </svg>
                                        </div>
                                        <span className="text-sm text-gray-300 uppercase tracking-wide">
                                            {formatDate(item.publishedAt as string)}
                                        </span>
                                    </div>

                                    <div className="w-full h-[1px] bg-white/10 my-1.5" />
                                </div>

                                <div className="w-full">
                                    <Link href={`/blog/${item.slug}`}>
                                        <h2 className="text-2xl font-bold mb-4 uppercase tracking-wide hover:text-blue-300 transition-colors duration-300">
                                            {item.title}
                                        </h2>
                                    </Link>

                                    <p className="text-gray-300 line-clamp-3">
                                        {item.excerpt ||
                                            'Explore the latest thoughts and insights on technology, philosophy, and the human experience.'}
                                    </p>
                                </div>

                                <div className="w-full mt-auto">
                                    {item.categories && item.categories.length > 0 && (
                                        <div className="w-full h-[1px] bg-white/10 my-1.5" />
                                    )}

                                    {item.categories && item.categories.length > 0 ? (
                                        <div className="flex justify-start items-center flex-wrap gap-x-2 gap-y-0.5">
                                            <h4 className="font-semibold text-xs uppercase">
                                                {' '}
                                                Category:{' '}
                                            </h4>
                                            {item.categories.map(
                                                (category: Category, index: number) => {
                                                    return (
                                                        <Link
                                                            key={index}
                                                            href={`/blog/category/${category.slug}`}
                                                        >
                                                            <div className="my-1.5">
                                                                <div className="inline-block px-3 py-1 rounded-full bg-[rgba(40,40,40,0.6)] text-blue-400 text-xs tracking-wider uppercase transition-all duration-300 hover:bg-blue-500/20">
                                                                    {category.name}
                                                                </div>
                                                            </div>
                                                        </Link>
                                                    );
                                                }
                                            )}
                                        </div>
                                    ) : (
                                        <Fragment />
                                    )}

                                    <div className="w-full h-[1px] bg-white/10 my-1.5" />

                                    <Link
                                        href={`/blog/${item.slug}`}
                                        className="flex justify-between items-center w-full group/link"
                                    >
                                        <span className="uppercase text-xs tracking-wider font-semibold text-gray-300 group-hover/link:text-blue-300 transition-colors duration-300">
                                            Read More
                                        </span>

                                        <div className="relative w-8 h-8 overflow-hidden">
                                            {/* Front face of the flipping element */}
                                            <div
                                                className="absolute inset-0 w-full h-full rounded-full bg-[rgba(30,30,30,0.6)] flex items-center justify-center
                               transition-all duration-500 ease-in-out transform group-hover:opacity-0 group-hover:rotate-90"
                                            >
                                                <svg
                                                    xmlns="http://www.w3.org/2000/svg"
                                                    className="h-3 w-3 text-gray-400"
                                                    fill="none"
                                                    viewBox="0 0 24 24"
                                                    stroke="currentColor"
                                                >
                                                    <path
                                                        strokeLinecap="round"
                                                        strokeLinejoin="round"
                                                        strokeWidth={2}
                                                        d="M9 5l7 7-7 7"
                                                    />
                                                </svg>
                                            </div>

                                            {/* Back face of the flipping element */}
                                            <div
                                                className="absolute inset-0 w-full h-full rounded-full bg-blue-500/20 flex items-center justify-center
                               transition-all duration-500 ease-in-out transform opacity-0 -rotate-90 group-hover:opacity-100 group-hover:rotate-0"
                                            >
                                                <svg
                                                    xmlns="http://www.w3.org/2000/svg"
                                                    className="h-3 w-3 text-blue-400"
                                                    fill="none"
                                                    viewBox="0 0 24 24"
                                                    stroke="currentColor"
                                                >
                                                    <path
                                                        strokeLinecap="round"
                                                        strokeLinejoin="round"
                                                        strokeWidth={2}
                                                        d="M9 5l7 7-7 7"
                                                    />
                                                </svg>
                                            </div>
                                        </div>
                                    </Link>
                                </div>
                            </article>
                        );
                    })}
                </div>
            )}
        </div>
    );
};

export default TagPage;
