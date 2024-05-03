import Image from 'next/legacy/image';
import Link from 'next/link';
import { Fragment, memo, useCallback, useEffect, useState } from 'react';
import { PortfolioAPI } from 'pages/api/Portfolio';

import bindClassNames from 'classnames/bind';
import styles from './index.module.scss';
const cx = bindClassNames.bind(styles);

const PortfolioExcerpt = memo(() => {
    const Portfolio = PortfolioAPI.data.portfolio;

    // const renderPortfolio = useCallback(() => {
    //     return Portfolio.map((item, index) => {
    //         return (
    //             <SwiperSlide key={index}>
    //                 <Link
    //                     href={{
    //                         pathname: `/portfolio/${item.slug}`,
    //                     }}
    //                     passHref
    //                     className={cx('link')}
    //                 >
    //                     <div>
    //                         {item.media?.thumbnail && (
    //                             <div className="relative" key={index}>
    //                                 <div className={cx('image-container')}>
    //                                     <Image
    //                                         src={item.media.thumbnail}
    //                                         layout="fill"
    //                                         className={cx('image')}
    //                                         objectFit="cover"
    //                                         objectPosition="center"
    //                                         alt={item.title}
    //                                     />
    //                                 </div>
    //                                 <div className={cx('content')}>
    //                                     <h3 className={cx('title')}>{item.title}</h3>
    //                                     <p className={cx('description')}>{item.description}</p>
    //                                 </div>
    //                             </div>
    //                         )}
    //                     </div>
    //                 </Link>
    //             </SwiperSlide>
    //         );
    //     });
    // }, [Portfolio]);

    const renderPortfolio = useCallback(() => {
        return Portfolio.map((item, index) => {
            return (
                <div key={index}>
                    <Link
                        href={{
                            pathname: `/portfolio/${item.slug}`,
                        }}
                        passHref
                        className={cx('link')}
                    >
                        {item.media?.thumbnail && (
                            <Fragment>
                                <div className={cx('image-container')}>
                                    <Image
                                        src={item.media.thumbnail}
                                        layout="fill"
                                        className={cx('image')}
                                        objectFit="cover"
                                        objectPosition="center"
                                        alt={item.title}
                                    />
                                </div>
                                <div className={cx('content')}>
                                    <h3 className={cx('title')}>{item.title}</h3>
                                    <p className={cx('description')}>
                                        {item.description.slice(0, 100) + '...'}
                                    </p>
                                </div>
                            </Fragment>
                        )}
                    </Link>
                </div>
            );
        });
    }, [Portfolio]);
    const [name, setName] = useState('Itti');

    return (
        <Fragment>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                {renderPortfolio()}
                {name}
            </div>
        </Fragment>
    );
});

export default PortfolioExcerpt;
