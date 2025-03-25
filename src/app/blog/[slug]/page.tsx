import React from 'react';
import { generateSEO } from '@/components/SEO';
import { getClient } from '@/lib/apollo-client';
import { Metadata } from 'next';
import { MetaData } from '@/types/metadata';
import { GET_Blog_Single } from '@/graphql/queries/blog/getBlogSingle';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import Image from 'next/image';
import { Clock, Calendar, Tag, FolderOpen } from 'lucide-react';
import type { Category, Tag as Tags } from '@/types/blog';

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

const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return new Intl.DateTimeFormat('en-US', {
        month: 'long',
        day: 'numeric',
        year: 'numeric',
    }).format(date);
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

        return (
            <div className="w-full bg-[#111111] text-[#F0F0F0] py-16 px-4 md:px-8 min-h-screen">
                <div className="container mx-auto">
                    <Link href="/blog" className="inline-flex items-center mb-8 group">
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
                                    d="M15 19l-7-7 7-7"
                                />
                            </svg>
                        </div>
                        <span className="uppercase text-xs tracking-wider font-semibold text-gray-300 group-hover:text-blue-300 transition-colors duration-300">
                            Back to Blog
                        </span>
                    </Link>

                    <header className="mb-12">
                        {blog.featuredImage && (
                            <div className="w-full h-[400px] md:h-[500px] relative rounded-xl overflow-hidden mb-8">
                                <Image
                                    src={blog.featuredImage.url}
                                    alt={blog.featuredImage.alternativeText || blog.title}
                                    fill
                                    sizes="(max-width: 768px) 100vw, 1200px"
                                    className="object-cover"
                                    priority
                                />
                            </div>
                        )}

                        <h1 className="text-3xl md:text-4xl font-bold uppercase tracking-wider mb-6 text-center underline">
                            {blog.title}
                        </h1>

                        <div className="flex flex-col md:flex-row justify-between mb-8">
                            {/* Categories and Tags - Left side */}
                            <div className="flex flex-col space-y-4 mb-4 md:mb-0">
                                {/* Categories */}
                                {blog.categories && blog.categories.length > 0 && (
                                    <div className="flex items-start">
                                        <div className="bg-[rgba(30,30,30,0.6)] p-2 rounded-full mr-3">
                                            <FolderOpen className="h-4 w-4 text-blue-400" />
                                        </div>
                                        <div>
                                            <span className="uppercase text-xs tracking-wider text-gray-400 block mb-2">
                                                Categories
                                            </span>
                                            <div className="flex flex-wrap gap-2">
                                                {blog.categories.map(
                                                    (category: Category, index: number) => (
                                                        <Link
                                                            href={`/blog/category/${category.slug}`}
                                                            key={`${category.slug}-${index}`}
                                                            className="inline-block px-3 py-1 rounded-full bg-[rgba(40,40,40,0.6)] text-blue-400 text-xs tracking-wider uppercase
                                     transition-all duration-300 hover:bg-blue-500/20"
                                                        >
                                                            {category.name}
                                                        </Link>
                                                    )
                                                )}
                                            </div>
                                        </div>
                                    </div>
                                )}

                                {blog.tags && blog.tags.length > 0 && (
                                    <div className="flex items-start">
                                        <div className="bg-[rgba(30,30,30,0.6)] p-2 rounded-full mr-3">
                                            <Tag className="h-4 w-4 text-blue-400" />
                                        </div>
                                        <div>
                                            <span className="uppercase text-xs tracking-wider text-gray-400 block mb-2">
                                                Tags
                                            </span>
                                            <div className="flex flex-wrap gap-2">
                                                {blog.tags.map((tag: Tags, index: number) => (
                                                    <Link
                                                        href={`/blog/tag/${tag.slug}`}
                                                        key={`${tag.slug}-${index}`}
                                                        className="inline-block px-3 py-1 rounded-full bg-[rgba(30,30,30,0.6)] text-gray-300 text-xs tracking-wider uppercase
                                     transition-all duration-300 hover:bg-[rgba(50,130,240,0.1)] hover:text-blue-300"
                                                    >
                                                        {tag.name}
                                                    </Link>
                                                ))}
                                            </div>
                                        </div>
                                    </div>
                                )}
                            </div>

                            <div className="flex flex-col space-y-4">
                                <div className="flex items-center">
                                    <div className="bg-[rgba(30,30,30,0.6)] p-2 rounded-full mr-3">
                                        <Calendar className="h-4 w-4 text-blue-400" />
                                    </div>
                                    <div>
                                        <span className="uppercase text-xs tracking-wider text-gray-400 block">
                                            Published
                                        </span>
                                        <span className="text-sm font-medium">
                                            {formatDate(blog.publishedAt)}
                                        </span>
                                    </div>
                                </div>

                                <div className="flex items-center">
                                    <div className="bg-[rgba(30,30,30,0.6)] p-2 rounded-full mr-3">
                                        <Clock className="h-4 w-4 text-blue-400" />
                                    </div>
                                    <div>
                                        <span className="uppercase text-xs tracking-wider text-gray-400 block">
                                            Reading Time
                                        </span>
                                        <span className="text-sm font-medium">
                                            {readingTime} min read
                                        </span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </header>

                    <article className="mb-12">
                        <div
                            className="prose prose-invert prose-lg max-w-none
                         prose-headings:uppercase prose-headings:tracking-wider prose-headings:font-bold
                         prose-h2:text-2xl prose-h3:text-xl
                         prose-a:text-blue-400 prose-a:no-underline hover:prose-a:text-blue-300
                         prose-img:rounded-xl"
                        >
                            <div dangerouslySetInnerHTML={{ __html: blog.content }} />
                        </div>
                    </article>
                </div>
            </div>
        );
    } catch (error) {
        console.error('Unable to fetch Blog Single Page', error);
        notFound();
    }
};

export default BlogSingle;
