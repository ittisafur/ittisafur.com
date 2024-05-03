import PortfolioExcerpt from 'components/PortfolioExcept';
import React, { Fragment } from 'react';
import SEO from 'utils/SEO';

const Portfolio = (props: {}) => {
    return (
        <div className="bg-it-light-900">
            <SEO title="Portfolio Page" description="Portfolio Page" image="" keywords="" />
            <PortfolioExcerpt />
        </div>
    );
};

export default Portfolio;
