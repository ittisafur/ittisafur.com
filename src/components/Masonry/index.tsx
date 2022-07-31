import Masonry from 'react-masonry-css';

import bindClassNames from 'classnames/bind';

import styles from '@/styles/home.module.scss';
import { memo } from 'react';

const cx = bindClassNames.bind(styles);

const PortfolioMasonry = memo(() => {
    return (
        <Masonry
            breakpointCols={3}
            className={cx('masonry-grid')}
            columnClassName={cx('masonry-grid-column')}
        ></Masonry>
    );
});

export default PortfolioMasonry;
