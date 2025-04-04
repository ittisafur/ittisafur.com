import { GET_Portfolio_Single } from '@/graphql/queries/getPortfolioSingle';
import { getClient } from '@/lib/apollo-client';
import React from 'react';
import styles from './index.module.scss';
import { notFound } from 'next/navigation';
import { generateSEO } from '@/components/SEO';
import { Metadata } from 'next';
import { MetaData } from '@/types/metadata';
import dynamic from 'next/dynamic';

const PortfolioSingleContent = dynamic(() => import('../../../components/Client/PortfolioSingle'), {
    ssr: true,
});

type PortfolioParams = Promise<{ slug: string }>;

type GenerateMetadataProps = {
    params: PortfolioParams;
};

export async function generateMetadata({ params }: GenerateMetadataProps): Promise<Metadata> {
    const { slug } = await params;
    const client = getClient();

    try {
        const {
            data: { portfolios },
        } = await client.query({
            query: GET_Portfolio_Single,
            variables: {
                slug,
            },
        });

        const metaData: Partial<MetaData> = portfolios[0].Portfolio[0].metaData || {};

        return generateSEO({
            title: metaData?.title || portfolios[0].Portfolio[0].title || '',
            description: metaData?.description || portfolios[0].Portfolio[0].summary || '',
            keywords: metaData?.keywords?.map((keyword) => keyword.keyword).filter(Boolean),
            image: metaData?.image?.url || portfolios[0].Portfolio[0].thumbnail?.url || '',
            pathname: `/portfolio/${slug}`,
            noindex: false,
        });
    } catch (error) {
        console.error('Error generating metadata for portfolio:', error);
        return generateSEO({
            title: 'Portfolio Details',
            description: 'View project details and case study',
            pathname: `/portfolio/${slug}`,
        });
    }
}

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

        // Check if we have valid data
        if (!data?.portfolios?.length || !data.portfolios[0]?.Portfolio?.length) {
            notFound();
        }

        const portfolio = data.portfolios[0].Portfolio[0];

        // Pass the portfolio data and styles to the client component
        return <PortfolioSingleContent portfolio={portfolio} styles={styles} />;
    } catch (err) {
        console.error('Error fetching Portfolio Single:', err);
        notFound();
    }
};

export default PortfolioSingle;

