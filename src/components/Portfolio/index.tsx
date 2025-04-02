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
        <div className="container mx-auto px-4">
<div 
                className="container mx-auto mb-16 text-center"
                data-animate
                data-animate-order="1"
                data-animate-type="blur-to-sharp"
            >
                <p className="text-xs tracking-widest uppercase mb-4 opacity-70">
                    Featured Work
                </p>
                <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold uppercase tracking-wider mb-2">
                    Creative <span className="text-gray-400">Projects</span>
                </h1>
                <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold uppercase tracking-wider">
                    Crafted With{' '}
                    <span className="relative">
                        Precision.
                        <span className="absolute bottom-1 left-0 w-full h-1 bg-blue-500"></span>
                    </span>
                </h2>
            </div>
            <div className="gap-4 grid grid-cols-1 xl:grid-cols-2">{renderPortfolio()}</div>
        </div>
    );
};

export default PortfolioLanding;
