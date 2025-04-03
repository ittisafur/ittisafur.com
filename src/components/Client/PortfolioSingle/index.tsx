'use client';

import React, { useEffect, useRef, useCallback } from 'react';
import Image from 'next/image';
import { Fragment } from 'react';
import { StackGrid } from '@/components/ui/stack-icon';
import HeroVideoDialog from '@/components/magicui/hero-video-dialog';
import bindClassNames from 'classnames/bind';
import { useTransitionRouter } from 'next-view-transitions';
import { useTransition } from '@/providers/Transition';
import { useAnimation } from '@/providers/AnimationProvider';
import DOMPurify from 'isomorphic-dompurify';
import gsap from 'gsap';

// Import the portfolio types
import type { Portfolio as PortfolioType } from '@/types/portfolio';

// Define a type for SCSS modules
interface StylesModule {
    readonly [key: string]: string;
}

interface PortfolioSingleContentProps {
    portfolio: PortfolioType;
    styles: StylesModule;
}

const PortfolioSingleContent: React.FC<PortfolioSingleContentProps> = ({ portfolio, styles }) => {
    const cx = bindClassNames.bind(styles);
    const contentRef = useRef<HTMLDivElement>(null);
    const router = useTransitionRouter();
    const { startTransition } = useTransition();
    const { animateElements } = useAnimation();

    // Memoize the handleNavigation function with useCallback
    const handleNavigation = useCallback(
        (path: string) => {
            startTransition(() => {
                router.push(path);
            });
        },
        [startTransition, router]
    );

    // Setup animations exactly like the blog component
    const setupPortfolioContentAnimations = useCallback(() => {
        // Wait for content to be rendered
        setTimeout(() => {
            const content = document.querySelector('.portfolio-content');
            if (!content) return;

            // Headings: blur-to-sharp animation
            const headings = content.querySelectorAll('h2, h3, h4, h5, h6');
            headings.forEach((heading, index) => {
                heading.setAttribute('data-animate', '');
                heading.setAttribute('data-animate-order', (10 + index).toString());
                heading.setAttribute('data-animate-type', 'blur-to-sharp');
            });

            // Process links in the HTML content
            const links = content.querySelectorAll('a');
            links.forEach((link) => {
                const href = link.getAttribute('href');

                // Skip if href is null or empty
                if (!href) return;

                // Style all links - white with underline by default
                link.style.color = '#FFFFFF';
                link.style.textDecoration = 'underline';
                link.style.transition = 'color 0.3s ease';

                // Add hover effects for all links
                link.addEventListener('mouseenter', () => {
                    link.style.color = 'rgba(59, 130, 246, 0.9)'; // blue color on hover
                });

                link.addEventListener('mouseleave', () => {
                    link.style.color = '#FFFFFF'; // back to white on mouse leave
                });

                // Check if it's an internal link (doesn't start with http, mailto, tel, etc.)
                if (
                    !href.startsWith('http') &&
                    !href.startsWith('mailto:') &&
                    !href.startsWith('tel:')
                ) {
                    // It's an internal link, add click handler for transitions
                    link.addEventListener('click', (e) => {
                        e.preventDefault();
                        handleNavigation(href);
                    });
                } else if (href.startsWith('http')) {
                    // External link - add icon if not already present
                    if (!link.querySelector('.external-icon')) {
                        const iconSpan = document.createElement('span');
                        iconSpan.classList.add('external-icon', 'inline-block', 'ml-1');
                        iconSpan.innerHTML = `<svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="inline-block"><path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"></path><polyline points="15 3 21 3 21 9"></polyline><line x1="10" y1="14" x2="21" y2="3"></line></svg>`;
                        link.appendChild(iconSpan);
                    }

                    // For external links, ensure they open in a new tab
                    link.setAttribute('target', '_blank');
                    link.setAttribute('rel', 'noopener noreferrer');
                    // No need to add onClick event handler - let them behave normally
                }
            });
            // Re-run animations after setting attributes
            animateElements();
        }, 100);

        // Set up scroll-triggered animations
        setTimeout(() => {
            // Add subtle hover effects for images
            const images = document.querySelectorAll('.portfolio-content img');
            images.forEach((img) => {
                img.addEventListener('mouseenter', () => {
                    gsap.to(img, { scale: 1.02, duration: 0.4 });
                });
                img.addEventListener('mouseleave', () => {
                    gsap.to(img, { scale: 1, duration: 0.4 });
                });
            });

            // Add subtle underline effect to headings
            const headings = document.querySelectorAll(
                '.portfolio-content h2, .portfolio-content h3'
            );
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

            // Add similar underline effect to bold items (as requested)
            const boldItems = document.querySelectorAll(
                '.portfolio-content strong, .portfolio-content b'
            );
            boldItems.forEach((bold) => {
                // Ensure bold text is white
                (bold as HTMLElement).style.color = '#FFFFFF';

                // Make sure bold element is positioned relatively for the underline
                if (window.getComputedStyle(bold).position === 'static') {
                    (bold as HTMLElement).style.position = 'relative';
                }

                // Create and append underline element for hover effect
                const underline = document.createElement('span');
                underline.classList.add('bold-underline');
                underline.style.position = 'absolute';
                underline.style.bottom = '0';
                underline.style.left = '0';
                underline.style.height = '2px';
                underline.style.width = '0';
                underline.style.backgroundColor = 'rgba(59, 130, 246, 0.6)';
                bold.appendChild(underline);

                // Animate on hover - like headings
                bold.addEventListener('mouseenter', () => {
                    gsap.to(bold, { color: 'rgba(147, 197, 253, 1)', duration: 0.3 });
                    gsap.to(underline, { width: '100%', duration: 0.4 });
                });

                bold.addEventListener('mouseleave', () => {
                    gsap.to(bold, { color: '#FFFFFF', duration: 0.3 });
                    gsap.to(underline, { width: '0%', duration: 0.4 });
                });
            });
        }, 1000);
    }, [animateElements, handleNavigation]); // handleNavigation is now properly memoized

    // Run animations when component mounts
    useEffect(() => {
        // Set up portfolio content animations
        setupPortfolioContentAnimations();

        // Trigger initial animations
        const timer = setTimeout(() => {
            animateElements();
        }, 200);

        return () => clearTimeout(timer);
    }, [animateElements, setupPortfolioContentAnimations]);

    // Safely sanitize HTML content
    const sanitizedDescription = portfolio.description
        ? DOMPurify.sanitize(portfolio.description)
        : '';

    return (
        <div>
            {/* Back button */}
            <div className="container mx-auto pt-6 pb-2">
                <a
                    onClick={(e) => {
                        e.preventDefault();
                        handleNavigation('/portfolio');
                    }}
                    href="/portfolio"
                    className="inline-flex items-center group"
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
                        Back to Portfolio
                    </span>
                </a>
            </div>

            {/* Banner image */}
            <div className={cx('banner-container')}>
                <Image
                    src={portfolio?.thumbnail?.url || ''}
                    alt={portfolio?.thumbnail?.name || ''}
                    layout="fill"
                    objectFit="cover"
                    objectPosition="center"
                    data-animate
                    data-animate-order="2"
                    data-animate-type="zoom-fade"
                />
            </div>

            {/* Content wrapper */}
            <div className={cx('content_wrapper')}>
                <div className={cx('layout')}>
                    {/* Title and status */}
                    <div className={cx('title_status')}>
                        <h1
                            className={cx('title')}
                            data-animate
                            data-animate-order="3"
                            data-animate-type="blur-to-sharp"
                        >
                            {portfolio.title}
                        </h1>
                        <div className={cx('status')} data-animate data-animate-order="4">
                            Status - {portfolio.isWorking ? 'Working' : 'Finished'}
                        </div>
                    </div>

                    {/* Stack and summary */}
                    <div className={cx('content')}>
                        {portfolio.stack && (
                            <div className={cx('stack')} data-animate data-animate-order="5">
                                <h1 className={cx('head')}>Stack</h1>
                                <StackGrid technologies={portfolio?.stack} showLabels={true} />
                            </div>
                        )}
                        <div className={cx('summary')} data-animate data-animate-order="6">
                            <h2 className={cx('head')}>Summary</h2>
                            <p>{portfolio.summary}</p>
                        </div>
                    </div>
                </div>
            </div>

            {/* Detailed information */}
            <div className="container mx-auto py-8 px-4">
                <h2
                    className="py-4 text-xl uppercase text-center font-bold"
                    data-animate
                    data-animate-order="7"
                >
                    Detailed Information
                </h2>
                <div
                    ref={contentRef}
                    className="prose prose-lg prose-headings:text-it-white max-w-none text-it-white prose-p:text-it-white prose-li:text-it-white prose-strong:text-it-white py-4 portfolio-content blog-content"
                    dangerouslySetInnerHTML={{
                        __html: sanitizedDescription,
                    }}
                    data-animate
                    data-animate-order="8"
                />

                {/* Video demo section */}
                {portfolio.yt_demo ? (
                    <div className="relative py-6" data-animate data-animate-order="9">
                        <h2 className="flex justify-center items-center text-3xl text-center font-bold py-3.5">
                            Small Video Demo
                        </h2>
                        <HeroVideoDialog
                            className="block dark:hidden"
                            animationStyle="from-center"
                            videoSrc={portfolio.yt_demo}
                            thumbnailSrc={portfolio.thumbnail?.url || ''}
                            thumbnailAlt={portfolio.title}
                        />
                        <HeroVideoDialog
                            className="hidden dark:block"
                            animationStyle="from-center"
                            videoSrc={portfolio.yt_demo}
                            thumbnailSrc={portfolio.thumbnail?.url || ''}
                            thumbnailAlt={portfolio.title}
                        />
                    </div>
                ) : (
                    <Fragment />
                )}

                {/* Visit link */}
                {portfolio.url && (
                    <div
                        className="flex justify-center w-full"
                        data-animate
                        data-animate-order="10"
                    >
                        <div className="border-it-white border px-20 py-2.5 rounded hover:scale-95 hover:bg-it-white hover:text-it-dark-800 transition-all ease-in duration-300 font-semibold text-base cursor-pointer text-center">
                            <a
                                href={portfolio.url}
                                rel="noreferrer noopener"
                                target="_blank"
                                className="text-center block"
                            >
                                Visit {portfolio.title}
                            </a>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};

export default PortfolioSingleContent;
