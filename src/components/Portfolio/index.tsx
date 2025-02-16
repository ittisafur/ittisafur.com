import { GET_Portfolio } from '@/graphql/queries/getPortfolio';
import { getClient } from '@/lib/apollo-client';
import React from 'react';
import PortfolioShared from '../shared/Portfolio';
import type { Portfolio } from '@/types/portfolio';

const PortfolioLanding = async () => {
    const client = getClient();

    const { data } = await client.query({
        query: GET_Portfolio,
    });

    const portfolioItems = data?.portfolios?.[0]?.Portfolio || [];

    const renderPortfolio = () => {
        return portfolioItems.map((content: Portfolio, index: number) => {
            return <PortfolioShared content={content} key={index} />;
        });
    };

    return (
        <div className="container mx-auto">
            <div className="gap-4 grid grid-cols-1 xl:grid-cols-2">{renderPortfolio()}</div>
        </div>
    );
};

export default PortfolioLanding;
