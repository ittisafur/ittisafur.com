import React from 'react';
import { generateSEO } from '@/components/SEO';
import { Metadata } from 'next';
import { getClient } from '@/lib/apollo-client';
import { MetaData } from '@/types/metadata';
import { GET_Portfolio_SEO_DATA } from '@/graphql/queries/meta';
import { GET_Portfolio } from '@/graphql/queries/getPortfolio';
import PortfolioLanding from '@/components/Portfolio';

export async function generateMetadata(): Promise<Metadata> {
    const client = getClient();
    try {
        const {
            data: {
                portfolioSeo: { metaData: PortfolioSEO },
            },
        } = await client.query({
            query: GET_Portfolio_SEO_DATA,
        });
        const metaData: Partial<MetaData> = PortfolioSEO || {};
        return generateSEO({
            title: metaData?.title || '',
            description: metaData?.description,
            keywords: metaData?.keywords?.map((keyword) => keyword.keyword).filter(Boolean),
            image: metaData?.image?.url,
            pathname: '/portfolio',
            noindex: false,
        });
    } catch (error: string | unknown) {
        console.error('Error fetching Portfolio SEO data:', error);
        return generateSEO({
            title: 'Portfolio',
            description: '',
            pathname: '/portfolio',
        });
    }
}

const Portfolio = async () => {
    const client = getClient();
    const { data } = await client.query({
        query: GET_Portfolio,
    });

    // Extract portfolio items from GraphQL response
    const portfolioItems = data?.portfolios?.[0]?.Portfolio || [];

    return <PortfolioLanding portfolioItems={portfolioItems} />;
};

export default Portfolio;
