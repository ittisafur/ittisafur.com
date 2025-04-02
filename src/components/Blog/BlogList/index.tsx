'use client';

import React from 'react';
import { useTransition } from '@/providers/Transition';
import { useRouter } from 'next/navigation';
import type { Blog } from '@/types/blog';
import BlogCard from '../BlogCard';

const BlogList = ({ blogItems }: { blogItems: Blog[] }) => {
    const { startTransition, isTransitioning } = useTransition();
    const router = useRouter();

    const formatDate = (dateString: string) => {
        const date = new Date(dateString);
        return new Intl.DateTimeFormat('en-US', {
            month: 'long',
            day: 'numeric',
            year: 'numeric',
        }).format(date);
    };

    const handleNavigation = (path: string): void => {
        if (isTransitioning) return; // Prevent multiple transitions

        startTransition(() => {
            router.push(path);
        });
    };

    if (blogItems.length === 0) {
        return (
            <div className="text-center text-gray-400">
                <p className="text-xl">No blog posts found</p>
            </div>
        );
    }

    return (
        <div
            className="container mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
            data-animate
            data-animate-order="2"
            data-animate-type="zoom-fade"
        >
            {blogItems.map((item: Blog, index: number) => (
                <div
                    key={item.slug + index}
                    data-animate
                    data-animate-order={index + 3}
                    data-animate-type="zoom-fade"
                >
                    <BlogCard
                        item={item}
                        formatDate={formatDate}
                        handleNavigation={handleNavigation}
                    />
                </div>
            ))}
        </div>
    );
};

export default BlogList;
