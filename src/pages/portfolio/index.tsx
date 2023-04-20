import PortfolioExcerpt from 'components/PortfolioExcept';
import React, { Fragment } from 'react';
import SEO from 'utils/SEO';

const Portfolio = (props: {}) => {
    return (
        <Fragment>
            <SEO title="Portfolio Page" description="Portfolio Page" image="" keywords="" />
            <PortfolioExcerpt />
        </Fragment>
    );
};

export default Portfolio;
