import { GET_Portfolio_Single } from '@/graphql/queries/getPortfolioSingle';
import { getClient } from '@/lib/apollo-client';
import React from 'react';
import Image from 'next/image';
import bindClassNames from 'classnames/bind';
import styles from './index.module.scss';
import { StackGrid } from '@/components/ui/stack-icon';
import VideoPlayer from '@/components/VideoPlayer';
import { notFound } from 'next/navigation';
const cx = bindClassNames.bind(styles);

type PortfolioParams = Promise<{ slug: string }>;

// type GenerateMetadataProps = {
//     params: PortfolioParams;
// };

const PortfolioSingle = async ({ params }: { params: PortfolioParams }) => {
    const { slug } = await params;
    const client = getClient();

    try {
        const { data } = await client.query({
            query: GET_Portfolio_Single,
            variables: {
                slug,
            },
        });

        const portfolio = data.portfolios[0].Portfolio[0];

        return (
            <div>
                <div className={cx('banner-container')}>
                    <Image
                        src={portfolio?.thumbnail.url}
                        alt={portfolio?.thumbnail.name}
                        layout="fill"
                        objectFit="cover"
                        objectPosition="center"
                    />
                </div>
                <div className={cx('content_wrapper')}>
                    <div className={cx('layout')}>
                        <div className={cx('title_status')}>
                            <h1 className={cx('title')}>{portfolio.title}</h1>
                            <div className={cx('status')}>
                                Status - {portfolio.isWorking ? 'Working' : 'Finished'}
                            </div>
                        </div>
                        <div className={cx('content')}>
                            <div className={cx('stack')}>
                                <h1 className={cx('head')}>Stack</h1>
                                <StackGrid technologies={portfolio.stack} showLabels={true} />
                            </div>
                            <div className={cx('summary')}>
                                <h2 className={cx('head')}>Summary</h2>
                                <p>{portfolio.summary}</p>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="container mx-auto py-8 px-4">
                    <h2 className="py-4 text-xl uppercase text-center font-bold">
                        Detailed Information
                    </h2>
                    <div
                        className="prose prose-lg prose-headings:text-it-white max-w-none text-it-white prose-p:text-it-white prose-li:text-it-white py-4"
                        dangerouslySetInnerHTML={{
                            __html: portfolio.description,
                        }}
                    />

                    <VideoPlayer url={portfolio.yt_demo} />

                    <div className="flex justify-center w-full">
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
                </div>
            </div>
        );
    } catch (err) {
        console.log('Error fetching Portfolio Single', err);
        notFound();
    }
};

export default PortfolioSingle;
