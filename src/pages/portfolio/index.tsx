import PortfolioExcerpt from 'components/PortfolioExcept';
import React, { Fragment } from 'react';
import SEO from 'utils/SEO';

import styles from './index.module.scss';
import bindClassNames from 'classnames/bind';

const cx = bindClassNames.bind(styles);

const Portfolio = (props: {}) => {
    return (
        <div className={cx('wrapper')}>
            <SEO title="Portfolio Page" description="Portfolio Page" image="" keywords="" />
            <PortfolioExcerpt />
        </div>
    );
};

export default Portfolio;
