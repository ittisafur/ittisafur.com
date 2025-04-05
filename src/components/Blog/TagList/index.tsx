'use client';

import React from 'react';
import { useTransitionRouter } from 'next-view-transitions';
import { useTransition } from '@/providers/Transition';

// Define the tag interface
interface TagWithCount {
    name: string;
    slug: string;
    count: number;
}

interface TagListProps {
    tags: TagWithCount[];
}

const TagList: React.FC<TagListProps> = ({ tags }) => {
    const { startTransition, isTransitioning } = useTransition();
    const router = useTransitionRouter();

    const handleNavigation = (path: string): void => {
        if (isTransitioning) return; // Prevent multiple transitions

        startTransition(() => {
            // The actual navigation happens after the initial fade out
            // and SVG animation has started
            router.push(path);
        });
    };

    return (
        <div className="w-full bg-[#111111] text-[#F0F0F0] py-16 px-4 md:px-8">
            <div className="container mx-auto mb-16 text-center">
                <p className="text-xs tracking-widest uppercase mb-4 opacity-70">
                    Discover Content By
                </p>
                <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold uppercase tracking-wider mb-2">
                    <span className="text-gray-400">Blog</span> Tags
                </h1>
                <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold uppercase tracking-wider">
                    <span className="relative">
                        Collection
                        <span className="absolute bottom-1 left-0 w-full h-1 bg-blue-500"></span>
                    </span>
                </h2>

                <div className="mt-6">
                    <a
                        href="/blog"
                        onClick={(e: React.MouseEvent<HTMLAnchorElement>) => {
                            e.preventDefault();
                            handleNavigation(`/blog`);
                        }}
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
                    </a>
                </div>
            </div>

            {tags.length === 0 ? (
                <div className="text-center text-gray-400">
                    <p className="text-xl">No tags found</p>
                </div>
            ) : (
                <div className="container mx-auto">
                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5">
                        {tags.map((tag: TagWithCount) => (
                            <a
                                key={tag.slug}
                                href={`/blog/tag/${tag.slug}`}
                                onClick={(e: React.MouseEvent<HTMLAnchorElement>) => {
                                    e.preventDefault();
                                    handleNavigation(`/blog/tag/${tag.slug}`);
                                }}
                                className="group"
                            >
                                <div
                                    className="h-full flex flex-col flex-nowrap justify-start items-start
                                    rounded-xl overflow-hidden 
                                    backdrop-blur-[20px] 
                                    bg-[rgba(16,16,16,0.1)] 
                                    border border-[rgba(255,255,255,0.1)] 
                                    p-6
                                    transition-all duration-500 ease-in-out
                                    hover:bg-gradient-to-br hover:from-[rgba(23,23,23,0.8)] hover:to-[rgba(10,10,10,0.9)]
                                    hover:shadow-lg hover:border-blue-500/30"
                                >
                                    <div
                                        className="w-12 h-12 rounded-full bg-[rgba(30,30,30,0.6)] flex items-center justify-center mb-4
                                        transition-colors duration-300 group-hover:bg-[rgba(50,130,240,0.2)]"
                                    >
                                        <svg
                                            xmlns="http://www.w3.org/2000/svg"
                                            className="h-5 w-5 text-gray-400 group-hover:text-blue-400 transition-colors duration-300"
                                            fill="none"
                                            viewBox="0 0 24 24"
                                            stroke="currentColor"
                                        >
                                            <path
                                                strokeLinecap="round"
                                                strokeLinejoin="round"
                                                strokeWidth={2}
                                                d="M7 7h.01M7 3h5c.512 0 1.024.195 1.414.586l7 7a2 2 0 010 2.828l-7 7a2 2 0 01-2.828 0l-7-7A1.994 1.994 0 013 12V7a4 4 0 014-4z"
                                            />
                                        </svg>
                                    </div>

                                    <h3 className="text-xl font-bold uppercase tracking-wide mb-2 group-hover:text-blue-300 transition-colors duration-300">
                                        {tag.name}
                                    </h3>

                                    <p className="text-sm text-gray-400 mt-2">
                                        {tag.count} {tag.count === 1 ? 'article' : 'articles'}
                                    </p>

                                    <div className="mt-auto pt-4 w-full flex justify-end">
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
                                    </div>
                                </div>
                            </a>
                        ))}
                    </div>
                </div>
            )}
        </div>
    );
};

export default TagList;
