'use client';

import React, { FC } from 'react';
import Image from 'next/image';
import type { Portfolio } from '@/types/portfolio';
import { MagicCard } from '@/components/ui/magic-card';
import { StackGrid } from '@/components/ui/stack-icon';
import { useTransitionRouter } from 'next-view-transitions';
import { useTransition } from '@/providers/Transition';
import { getJobType, getTenure } from '@/utils/portfolio';
import { usePortfolioTracking } from '@/hooks/useAnalytics';
import { Icon } from '@/components/ui/icon';

const PortfolioShared: FC<{
    content: Portfolio;
}> = ({ content }) => {
    usePortfolioTracking(content);

    const { startTransition, isTransitioning } = useTransition();
    const router = useTransitionRouter();
    const jobType = getJobType(content);
    const tenure = getTenure(content);

    console.log({ content });

    const handleNavigation = (path: string): void => {
        if (isTransitioning) return; // Prevent multiple transitions

        startTransition(() => {
            // The actual navigation happens after the initial fade out
            // and SVG animation has started
            router.push(path);
        });
    };

    return (
        <a
            key={content.id}
            href={`/portfolio/${content.slug}`}
            onClick={(e: React.MouseEvent<HTMLAnchorElement>) => {
                e.preventDefault();
                handleNavigation(`/portfolio/${content.slug}`);
            }}
        >
            <MagicCard
                className="cursor-pointer shadow-2xl rounded-none w-full overflow-hidden"
                gradientColor={'#2C2C2C'}
                gradientSize={200}
                gradientOpacity={0.8}
                gradientFrom="#9E7AFF"
                gradientTo="#FE8BBB"
            >
                <div className="relative z-30">
                    <div className="flex flex-col lg:flex-row items-center gap-6 p-6">
                        <div className="relative w-full h-48 md:w-full md:h-64 lg:w-80 lg:h-80 flex-shrink-0 group overflow-hidden rounded-md">
                            {content.thumbnail && (
                                <Image
                                    src={`${content?.thumbnail.url} `}
                                    fill
                                    alt={content.title}
                                    className="object-cover transition-all duration-500 ease-in-out filter saturate-[0.3] brightness-[0.9] group-hover:saturate-100 group-hover:brightness-100 group-hover:scale-105"
                                    sizes="(max-width: 768px) 100vw, 256px"
                                    priority
                                    quality={95}
                                />
                            )}
                            <div className="absolute inset-0 bg-gradient-to-tr from-it-dark-800/80 via-transparent to-transparent transition-opacity duration-500 ease-in-out group-hover:opacity-0" />
                        </div>
                        <div className="flex-1 flex flex-col gap-4 py-2">
                            <div className="space-y-4 flex flex-col min-h-[15.9rem]">
                                <div className="space-y-2">
                                    <h2 className="text-2xl lg:text-3xl uppercase font-bold hover:bg-it-white hover:text-it-dark-800 transition-all ease-in duration-300 w-full text-center lg:text-auto lg:text-left lg:w-max">
                                        {content.title}
                                    </h2>

                                    {/* Project metadata with job type badge and tenure text */}
                                    <div className="flex flex-wrap items-center gap-3 justify-center lg:justify-start">
                                        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full border border-gray-500/30">
                                            <Icon name={jobType.icon} className="w-3.5 h-3.5" />
                                            <span className="text-sm font-medium">
                                                {jobType.label}
                                            </span>
                                        </div>

                                        {tenure && (
                                            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full border border-gray-500/30">
                                                <Icon
                                                    name="calendar"
                                                    className="w-3.5 h-3.5 mr-1"
                                                />
                                                <span className="text-sm font-medium">
                                                    {tenure}
                                                </span>
                                            </div>
                                        )}
                                    </div>
                                </div>

                                <p className="text-sm text-gray-300 font-inter text-center lg:text-left">
                                    {content.summary}
                                </p>

                                {content.stack && (
                                    <div className="flex flex-wrap gap-3 justify-center lg:justify-start">
                                        <StackGrid technologies={content.stack} limit="medium" />
                                    </div>
                                )}
                            </div>
                            <div className="flex justify-center lg:justify-start mt-2.5">
                                <div className="border-it-white border px-6 py-1.5 rounded hover:scale-95 hover:bg-it-white hover:text-it-dark-800 transition-all ease-in duration-300 font-semibold text-sm">
                                    Read More
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </MagicCard>
        </a>
    );
};

export default PortfolioShared;
