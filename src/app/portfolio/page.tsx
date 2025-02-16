import PortfolioLanding from '@/components/Portfolio';
import React from 'react';
import { generateSEO } from '@/components/SEO';
import { Metadata } from 'next';
import { getClient } from '@/lib/apollo-client';
import { MetaData } from '@/types/metadata';
import { GET_Portfolio_SEO_DATA } from '@/graphql/queries/meta';


export async function generateMetadata(): Promise<Metadata> {
    const client = getClient();

    try {
        const {
            data: {
                landing: { metaData: LandingSEO },
            },
        } = await client.query({
            query: GET_Portfolio_SEO_DATA,
        });

        const metaData: Partial<MetaData> = LandingSEO || {};


        return generateSEO({
            title: metaData?.title || '',
            description: metaData?.description,
            keywords: metaData?.keywords?.map((keyword) => keyword.keyword).filter(Boolean),
            image: metaData?.image?.url,
            pathname: '/',
            noindex: false,
        });
    } catch {
        return generateSEO({
            title: 'Portfolio',
            description: '',
            pathname: '/',
        });
    }
}

const Portfolio = () => {
    return <PortfolioLanding />;
};

export default Portfolio;
