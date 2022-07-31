import bindClassNames from 'classnames/bind';

import styles from './index.module.scss';

import { Swiper, SwiperSlide } from 'swiper/react';

import { Autoplay } from 'swiper';

import 'swiper/css';
import { PortfolioAPI } from 'utils/portfolio';
import Image from 'next/image';
import Link from 'next/link';
import { Fragment, memo, useCallback } from 'react';

const cx = bindClassNames.bind(styles);

const PortfolioExcerpt = memo(() => {
    const Portfolio = PortfolioAPI.data.portfolio;

    const renderPortfolio = useCallback(() => {
        return Portfolio.map((item, index) => {
            return (
                <SwiperSlide key={index}>
                    <Link href={`/portfolio/${item.slug}`} passHref>
                        <a className={cx('link')}>
                            <div >
                                {item.images.map((image, index) => {
                                    return (
                                        <div className="relative" key={index}>
                                            <div className={cx('image-container')}>
                                                <Image
                                                    src={image}
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
                                                    {item.description}
                                                </p>
                                            </div>
                                        </div>
                                    );
                                })}
                            </div>
                        </a>
                    </Link>
                </SwiperSlide>
            );
        });
    }, [PortfolioAPI]);

    return (
        <Fragment>
            <Swiper
                spaceBetween={10}
                slidesPerView={3}
                className="w-full lg:w-4/6 mx-auto"
                autoplay={{
                    delay: 2500,
                    disableOnInteraction: false,
                }}
                modules={[Autoplay]}
                breakpoints={{
                    320: {
                        width: 320,
                        slidesPerView: 1,
                        spaceBetween: 0,
                        centeredSlides: true
                    },
                    425: {
                        width: 425,
                        slidesPerView: 2,
                        spaceBetween: 5,
                        centeredSlides: true
                    },
                    768: {
                        width: 768,
                        slidesPerView: 3,
                        spaceBetween: 20,
                    },
                    1024: {
                        width: 1024,
                        slidesPerView: 4,
                        spaceBetween: 20,
                    },
                    1440: {
                        width: 1440,
                        slidesPerView: 4,
                        spaceBetween: 30,
                    },
                }}
            >
                {renderPortfolio()}
            </Swiper>
        </Fragment>
    );
});

export default PortfolioExcerpt;
