import React, { FC } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import type { Portfolio } from '@/types/portfolio';
import { MagicCard } from '@/components/ui/magic-card';
import { StackGrid } from '@/components/ui/stack-icon';

const PortfolioShared: FC<{
    content: Portfolio;
}> = ({ content }) => {
    return (
        <Link key={content.id} href={`/portfolio/${content.slug}`}>
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
                            <Image
                                src={`${content.thumbnail.url}`}
                                fill
                                alt={content.title}
                                className="object-cover transition-all duration-500 ease-in-out filter saturate-[0.3] brightness-[0.9] group-hover:saturate-100 group-hover:brightness-100 group-hover:scale-105"
                                sizes="(max-width: 768px) 100vw, 256px"
                                priority
                                quality={95}
                            />
                            <div className="absolute inset-0 bg-gradient-to-tr from-it-dark-800/80 via-transparent to-transparent transition-opacity duration-500 ease-in-out group-hover:opacity-0" />
                        </div>
                        <div className="flex-1 flex flex-col gap-4 py-2">
                            <div className="space-y-4 flex flex-col min-h-[15.9rem]">
                                <h2 className="text-2xl lg:text-3xl uppercase font-bold hover:bg-it-white hover:text-it-dark-800 transition-all ease-in duration-300 w-full text-center lg:text-auto lg:text-left lg:w-max">
                                    {content.title}
                                </h2>
                                <p className="text-sm text-gray-300 font-inter text-center lg:text-left">
                                    {content.summary}
                                </p>
                                <div className="flex flex-wrap gap-3 justify-center lg:justify-start">
                                    <StackGrid technologies={content.stack} />
                                </div>
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
        </Link>
    );
};

export default PortfolioShared;
