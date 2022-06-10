import Switcher from '@/layouts/Front';
import bindClassNames from 'classnames/bind';
import { shuffle } from 'lodash';
import type { NextPage } from 'next';
import Image from 'next/image';
import Masonry from 'react-masonry-css';
import { Portfolio } from 'utils/portfolio';

import styles from '@/styles/index.module.scss';

const cx = bindClassNames.bind(styles);
const Home: NextPage = () => {
    const ShuffledPortfolio = shuffle(Portfolio);
    return (
        <Switcher>
            <div className={cx('wrapper')}>
                <Masonry breakpointCols={3} className={cx('masonry')} columnClassName={cx('masonry-column')}>
                    {ShuffledPortfolio.map((item, index: number) => (
                        <div key={index} className={cx('item')}>
                            <span className={cx('image-container')}>
                                <Image
                                    src={item.image}
                                    layout="fill"
                                    objectFit="cover"
                                    objectPosition="center"
                                    className={cx('image')}
                                />
                            </span>
                            <h1 className={cx('title')}>{item.title}</h1>
                        </div>
                    ))}
                </Masonry>
            </div>
        </Switcher>
    );
};

Home.displayName = 'Home';

export default Home;
