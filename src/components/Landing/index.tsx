import React, { Fragment } from 'react';
import SocialButtons from '../Socials';
import GlowingButton from '../ui/glowing-button';
import { MagicCard } from '../ui/magic-card';
import Link from 'next/link';
import Image from 'next/image';
import { StackGrid } from '../ui/stack-icon';
// import TechCloudDemo from '../ui/tech-example';
import { getClient } from '@/lib/apollo-client';
import { GET_Portfolio } from '@/graphql/queries/getPortfolio';

import type { Portfolio } from '@/types/landing';

const getRecommendedWorks = (portfolioItems: Portfolio[], limit = 6): Portfolio[] => {
    if (!portfolioItems?.length) return [];

    return portfolioItems
        .sort((a, b) => {
            const getScore = (item: Portfolio): number => {
                let score = 0;
                if (item.isFeatured) score += 4;
                if (item.isBreakThrough) score += 2;
                if (item.isSideProject) score += 1;

                if (item.isFeatured && item.isBreakThrough) score += 2;
                if (item.isBreakThrough && item.isSideProject) score += 1;

                return score;
            };

            return getScore(b) - getScore(a);
        })
        .slice(0, limit);
};

const Landing = async () => {
    const client = getClient();

    try {
        const { data } = await client.query({
            query: GET_Portfolio,
        });

        // Extract portfolio items
        const portfolioItems = data?.portfolios?.[0]?.Portfolio || [];
        const recommendedWorks = getRecommendedWorks(portfolioItems);

        const renderRecommendedWorks = () => {
            if (!recommendedWorks.length) return <Fragment />;

            return recommendedWorks.map((content, index) => (
                <Link key={index} href={`/portfolio/${content.slug}`}>
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
                                <div className="relative w-48 h-48 md:w-52 md:h-52 lg:w-80 lg:h-80 flex-shrink-0 group overflow-hidden rounded-lg">
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
                                    <div className="flex justify-center lg:justify-start mt-8">
                                        <div className="border-it-white border px-6 py-1.5 rounded hover:scale-95 hover:bg-it-white hover:text-it-dark-800 transition-all ease-in duration-300 font-semibold text-sm">
                                            Read More
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </MagicCard>
                </Link>
            ));
        };

        return (
            <Fragment>
                <section className="min-h-screen flex flex-col pt-0.5 md:pt-4 md:justify-center">
                    <div className="flex">
                        <div className="w-max">
                            <div className="flex flex-col font-inter gap-y-6">
                                <p>Hey, I&apos;m</p>
                                <h1 className="text-gradient text-4xl md:text-5xl lg:text-6xl font-figtree font-semibold tracking-wide">
                                    Ittisafur Rahman
                                </h1>
                                <p>
                                    I&apos;m a seasoned Full Stack Developer with over six years of
                                    experience, starting my tech journey in 2013 with HTML/CSS out
                                    of curiosity. From 2017 I&apos;ve worked as a freelancer. Since
                                    2019 I&apos;ve been working as a Professional Web Developer.
                                    I&apos;ve sharpened my skills across various tech stacks and
                                    frameworks through freelancing and contract work, always aiming
                                    to push technical boundaries and foster community growth.
                                    I&apos;m keen on exploring new opportunities and
                                    collaborations—let&apos;s connect and see how I can help propel
                                    your business forward!
                                </p>
                            </div>

                            <div className="flex justify-center lg:hidden py-12 lg:py-0 ">
                                <GlowingButton href="/contact" className="text-it-white min-w-56">
                                    Let&apos;s Talk
                                </GlowingButton>
                            </div>
                            <div className="mt-8 md:mt-24 lg:mt-52">
                                <SocialButtons />
                            </div>
                        </div>

                        {/* <div className="relative flex size-full max-w-lg items-center justify-center overflow-hidden rounded-lg border bg-background"> */}
                        {/* <IconCloud */}
                        {/*     icons={technologies.map((tech) => { */}
                        {/*         const Icon = () => ( */}
                        {/*             <div className="w-10 h-10 text-white flex items-center justify-center"> */}
                        {/*                 <TechCloud technologies={[tech]} /> */}
                        {/*             </div> */}
                        {/*         ); */}
                        {/*         return <Icon key={tech.title} />; */}
                        {/*     })} */}
                        {/* /> */}
                        {/* <TechCloudDemo /> */}
                        {/* </div> */}
                    </div>
                </section>

                <section>
                    <h2 className="text-gradient flex justify-center items-center mb-10 font-figtree uppercase font-semibold text-3xl lg:text-5xl w-full mx-auto text-center">
                        Featured Projects
                    </h2>
                    <div className="gap-4 grid grid-cols-1 xl:grid-cols-2">
                        {renderRecommendedWorks()}
                    </div>
                    <div className="my-8 flex justify-center items-center">
                        <Link href="/portfolio">
                            <div className="border-it-white border px-20 py-2.5 rounded hover:scale-95 hover:bg-it-white hover:text-it-dark-800 transition-all ease-in duration-300 font-semibold text-base">
                                View All
                            </div>
                        </Link>
                    </div>
                </section>
            </Fragment>
        );
    } catch (err) {
        console.error('Query Error:', err);
        return <div>Error fetching data</div>;
    }
};

export default Landing;
