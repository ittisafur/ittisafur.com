'use client';

import React, { useEffect, useCallback } from 'react';
import Image from 'next/image';
import { Clock, Calendar, Tag, FolderOpen } from 'lucide-react';
import type { Category, Tag as Tags } from '@/types/blog';
import { useAnimation } from '@/providers/AnimationProvider';
import { useTransition } from '@/providers/Transition';
import { useRouter } from 'next/navigation';
import gsap from 'gsap';
import type { Blog } from '@/types/blog';
import { BionicReadingToggle } from '@/components/BionicReadingToggle';
import { BionicReadingContent } from '@/components/BionicReadingContent';

interface BlogSingleContentProps {
    blog: Blog;
    readingTime: number;
    formattedDate: string;
}

const BlogSingleContent: React.FC<BlogSingleContentProps> = ({
    blog,
    readingTime,
    formattedDate,
}) => {
    const { animateElements } = useAnimation();
    const { startTransition } = useTransition();
    const router = useRouter();

    // Same setupBlogContentAnimations function as before
    const setupBlogContentAnimations = useCallback(() => {
        // Wait for content to be rendered
        setTimeout(() => {
            const content = document.querySelector('.blog-content');
            if (!content) return;

            // Headings: blur-to-sharp animation
            const headings = content.querySelectorAll('h2, h3, h4, h5, h6');
            headings.forEach((heading, index) => {
                heading.setAttribute('data-animate', '');
                heading.setAttribute('data-animate-order', (10 + index).toString());
                heading.setAttribute('data-animate-type', 'blur-to-sharp');
            });

            // Images: zoom-fade animation
            const images = content.querySelectorAll('img');
            images.forEach((img, index) => {
                img.setAttribute('data-animate', '');
                img.setAttribute('data-animate-order', (20 + index).toString());
                img.setAttribute('data-animate-type', 'zoom-fade');
            });

            // Paragraphs: line-by-line animation
            const paragraphs = content.querySelectorAll('p');
            paragraphs.forEach((p, index) => {
                p.setAttribute('data-animate', '');
                p.setAttribute('data-animate-order', (30 + index).toString());
                p.setAttribute('data-animate-type', 'line-by-line');
            });

            // Blockquotes: zoom-fade animation
            const quotes = content.querySelectorAll('blockquote');
            quotes.forEach((quote, index) => {
                quote.setAttribute('data-animate', '');
                quote.setAttribute('data-animate-order', (40 + index).toString());
                quote.setAttribute('data-animate-type', 'zoom-fade');
            });

            // Lists: default animation
            const lists = content.querySelectorAll('ul, ol');
            lists.forEach((list, index) => {
                list.setAttribute('data-animate', '');
                list.setAttribute('data-animate-order', (50 + index).toString());
            });

            // Re-run animations after setting attributes
            animateElements();
        }, 100);

        // Set up scroll-triggered animations
        setTimeout(() => {
            // Add subtle hover effects for images
            const images = document.querySelectorAll('.blog-content img');
            images.forEach((img) => {
                img.addEventListener('mouseenter', () => {
                    gsap.to(img, { scale: 1.02, duration: 0.4 });
                });
                img.addEventListener('mouseleave', () => {
                    gsap.to(img, { scale: 1, duration: 0.4 });
                });
            });

            // Add subtle underline effect to headings
            const headings = document.querySelectorAll('.blog-content h2, .blog-content h3');
            headings.forEach((heading) => {
                // Make sure heading is positioned relatively for the underline
                if (window.getComputedStyle(heading).position === 'static') {
                    (heading as HTMLElement).style.position = 'relative';
                }

                // Create and append underline element
                const underline = document.createElement('span');
                underline.classList.add('heading-underline');
                underline.style.position = 'absolute';
                underline.style.bottom = '0';
                underline.style.left = '0';
                underline.style.height = '2px';
                underline.style.width = '0';
                underline.style.backgroundColor = 'rgba(59, 130, 246, 0.6)';
                heading.appendChild(underline);

                // Animate on hover
                heading.addEventListener('mouseenter', () => {
                    gsap.to(underline, { width: '100%', duration: 0.4 });
                });

                heading.addEventListener('mouseleave', () => {
                    gsap.to(underline, { width: '0%', duration: 0.4 });
                });
            });
        }, 1000);
    }, [animateElements]);

    // Run animations when component mounts
    useEffect(() => {
        // Set up blog content animations
        setupBlogContentAnimations();

        // Trigger initial animations
        const timer = setTimeout(() => {
            animateElements();
        }, 200);

        return () => clearTimeout(timer);
    }, [animateElements, setupBlogContentAnimations]);

    // Handle navigation with transitions
    const handleNavigation = (path: string) => {
        startTransition(() => {
            router.push(path);
        });
    };

    return (
        <div className="w-full bg-[#111111] text-[#F0F0F0] py-16 px-4 md:px-8 min-h-screen">
            <div className="container mx-auto">
                <a
                    onClick={(e) => {
                        e.preventDefault();
                        handleNavigation('/blog');
                    }}
                    href="/blog"
                    className="inline-flex items-center mb-8 group"
                    data-animate
                    data-animate-order="1"
                >
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
                </a>

                <header className="mb-12">
                    {blog.featuredImage && (
                        <div
                            className="w-full h-[400px] md:h-[500px] relative rounded-xl overflow-hidden mb-8"
                            data-animate
                            data-animate-order="2"
                            data-animate-type="zoom-fade"
                        >
                            <Image
                                src={blog.featuredImage.url}
                                alt={blog?.featuredImage?.name || blog.title}
                                fill
                                sizes="(max-width: 768px) 100vw, 1200px"
                                className="object-cover"
                                priority
                            />
                        </div>
                    )}

                    <h1
                        className="text-3xl md:text-4xl font-bold uppercase tracking-wider mb-6 text-center underline"
                        data-animate
                        data-animate-order="3"
                        data-animate-type="blur-to-sharp"
                    >
                        {blog.title}
                    </h1>

                    <div className="flex flex-col md:flex-row justify-between mb-8">
                        {/* Categories and Tags - Left side */}
                        <div
                            className="flex flex-col space-y-4 mb-4 md:mb-0"
                            data-animate
                            data-animate-order="4"
                        >
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
                                                    <a
                                                        onClick={(e) => {
                                                            e.preventDefault();
                                                            handleNavigation(
                                                                `/blog/category/${category.slug}`
                                                            );
                                                        }}
                                                        href={`/blog/category/${category.slug}`}
                                                        key={`${category.slug}-${index}`}
                                                        className="inline-block px-3 py-1 rounded-full bg-[rgba(40,40,40,0.6)] text-blue-400 text-xs tracking-wider uppercase
                                 transition-all duration-300 hover:bg-blue-500/20"
                                                    >
                                                        {category.name}
                                                    </a>
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
                                                <a
                                                    onClick={(e) => {
                                                        e.preventDefault();
                                                        handleNavigation(`/blog/tag/${tag.slug}`);
                                                    }}
                                                    href={`/blog/tag/${tag.slug}`}
                                                    key={`${tag.slug}-${index}`}
                                                    className="inline-block px-3 py-1 rounded-full bg-[rgba(30,30,30,0.6)] text-gray-300 text-xs tracking-wider uppercase
                                 transition-all duration-300 hover:bg-[rgba(50,130,240,0.1)] hover:text-blue-300"
                                                >
                                                    {tag.name}
                                                </a>
                                            ))}
                                        </div>
                                    </div>
                                </div>
                            )}
                        </div>

                        <div
                            className="flex flex-col space-y-4"
                            data-animate
                            data-animate-order="5"
                        >
                            <div className="flex items-center">
                                <div className="bg-[rgba(30,30,30,0.6)] p-2 rounded-full mr-3">
                                    <Calendar className="h-4 w-4 text-blue-400" />
                                </div>
                                <div>
                                    <span className="uppercase text-xs tracking-wider text-gray-400 block">
                                        Published
                                    </span>
                                    <span className="text-sm font-medium">{formattedDate}</span>
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

                            {/* Add Bionic Reading Toggle here */}
                            <div className="flex items-center">
                                <div className="bg-[rgba(30,30,30,0.6)] p-2 rounded-full mr-3">
                                    <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        className="h-4 w-4 text-blue-400"
                                        fill="none"
                                        viewBox="0 0 24 24"
                                        stroke="currentColor"
                                    >
                                        <path
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            strokeWidth={2}
                                            d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                                        />
                                        <path
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            strokeWidth={2}
                                            d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
                                        />
                                    </svg>
                                </div>
                                <div>
                                    <span className="uppercase text-xs tracking-wider text-gray-400 block">
                                        Reading Mode
                                    </span>
                                    <div className="mt-1">
                                        <BionicReadingToggle />
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </header>

                <article className="mb-12" data-animate data-animate-order="6">
                    <div
                        className="prose prose-invert prose-lg max-w-none blog-content
                     prose-headings:uppercase prose-headings:tracking-wider prose-headings:font-bold
                     prose-h2:text-2xl prose-h3:text-xl
                     prose-a:text-blue-400 prose-a:no-underline hover:prose-a:text-blue-300
                     prose-img:rounded-xl"
                    >
                        <BionicReadingContent
                            content={blog.content as string}
                            isHtml={true}
                            className=""
                        />
                    </div>
                </article>
            </div>
        </div>
    );
};

export default BlogSingleContent;
