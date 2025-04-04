'use client';

import React, { Fragment } from 'react';
import type { Blog, Category, Tag as Tags } from '@/types/blog';

interface BlogCardProps {
    item: Blog;
    formatDate: (dateString: string) => string;
    handleNavigation: (path: string) => void;
}

const BlogCard: React.FC<BlogCardProps> = ({ item, formatDate, handleNavigation }) => {
    return (
        <article
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
                    <span
                        className="text-sm text-gray-300 uppercase tracking-wide"
                        data-animate
                        data-animate-type="blur-to-sharp"
                    >
                        {formatDate(item.publishedAt as string)}
                    </span>
                </div>

                <div className="w-full h-[1px] bg-white/10 my-1.5" />
            </div>

            <div className="w-full">
                <a
                    onClick={(e: React.MouseEvent<HTMLAnchorElement>) => {
                        e.preventDefault();
                        handleNavigation(`/blog/${item.slug}`);
                    }}
                    href={`/blog/${item.slug}`}
                >
                    <h2
                        className="text-2xl font-bold mb-4 uppercase tracking-wide hover:text-blue-300 transition-colors duration-300 line-clamp-2"
                        data-animate
                        data-animate-type="blur-to-sharp"
                    >
                        {item.title}
                    </h2>
                </a>

                <p
                    className="text-gray-300 line-clamp-3"
                    data-animate
                    data-animate-type="line-by-line"
                >
                    {item.excerpt ||
                        'Explore the latest thoughts and insights on technology, philosophy, and the human experience.'}
                </p>
            </div>

            <div className="w-full mt-auto">
                {item.categories && item.categories.length > 0 && (
                    <div className="w-full h-[1px] bg-white/10 my-1.5" />
                )}

                {item.categories && item.categories.length > 0 ? (
                    <div className="flex justify-start items-center gap-x-2 gap-y-0.5">
                        <h4 className="font-semibold text-xs uppercase"> Category: </h4>
                        {item.categories.map((category: Category, index: number) => {
                            return (
                                <a
                                    onClick={(e: React.MouseEvent<HTMLAnchorElement>) => {
                                        e.preventDefault();
                                        handleNavigation(`/blog/category/${category.slug}`);
                                    }}
                                    href={`/blog/category/${category.slug}`}
                                    key={index}
                                >
                                    <div className="my-1.5" key={index}>
                                        <div className="inline-block px-3 py-1 rounded-full bg-[rgba(40,40,40,0.6)] text-blue-400 text-xs tracking-wider uppercase transition-all duration-300 hover:bg-blue-500/20 ">
                                            {category.name}
                                        </div>
                                    </div>
                                </a>
                            );
                        })}
                    </div>
                ) : (
                    <Fragment />
                )}

                {item.tags && item.tags.length > 0 && (
                    <div className="w-full h-[1px] bg-white/10 my-1.5" />
                )}

                {item.tags && item.tags.length > 0 ? (
                    <div className="flex justify-start items-center gap-x-2 gap-y-0.5">
                        <h4 className="font-semibold text-xs uppercase"> Tags: </h4>
                        {item.tags.map((tag: Tags, index: number) => {
                            return (
                                <a
                                    onClick={(e: React.MouseEvent<HTMLAnchorElement>) => {
                                        e.preventDefault();
                                        handleNavigation(`/blog/tag/${tag.slug}`);
                                    }}
                                    href={`/blog/tag/${tag.slug}`}
                                    key={index}
                                >
                                    <div className="my-1.5" key={index}>
                                        <div className="inline-block px-3 py-1 rounded-full bg-[rgba(40,40,40,0.6)] text-blue-400 text-xs tracking-wider uppercase transition-all duration-300 hover:bg-blue-500/20 ">
                                            {tag.name}
                                        </div>
                                    </div>
                                </a>
                            );
                        })}
                    </div>
                ) : (
                    <Fragment />
                )}

                <div className="w-full h-[1px] bg-white/10 my-1.5" />

                <a
                    onClick={(e: React.MouseEvent<HTMLAnchorElement>) => {
                        e.preventDefault();
                        handleNavigation(`/blog/${item.slug}`);
                    }}
                    href={`/blog/${item.slug}`}
                    className="flex justify-between items-center w-full group/link"
                >
                    <span className="uppercase text-xs tracking-wider font-semibold text-gray-300 group-hover/link:text-blue-300 transition-colors duration-300">
                        Read More
                    </span>

                    <div className="relative w-8 h-8 overflow-hidden">
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
                </a>
            </div>
        </article>
    );
};

export default BlogCard;
