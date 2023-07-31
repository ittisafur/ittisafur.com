import { Fragment, FunctionComponent, memo } from 'react';
import { GetServerSideProps } from 'next';
import { Images, Portfolio } from '../../api/Portfolio/index.d';
import { PortfolioAPI } from 'pages/api/Portfolio';
import Image from 'next/image';

import bindClassNames from 'classnames/bind';
import styles from '../../../styles/portfolio.module.scss';

// Light Gallery
import { LightGallerySettings } from 'lightgallery/lg-settings';
import LightGallery from 'lightgallery/react';
import lgZoom from 'lightgallery/plugins/zoom';
// Light Gallery Styles
import 'lightgallery/css/lightgallery.css';
import 'lightgallery/css/lg-zoom.css';
import SEO from 'utils/SEO';

const cx = bindClassNames.bind(styles);

interface Props {
    content: Portfolio;
    settings: LightGallerySettings;
}

const Portfolio: FunctionComponent<Props> = ({ content, settings }) => {
    const { title, description, media, endDate, summary, stack, testimonial, url } = content;

    return (
        <section className={cx('wrapper')}>
            <SEO
                title={content?.title}
                description={content?.summary}
                image={content?.media?.thumbnail}
                keywords={content?.stack?.map((item) => item.title)}
            />

            <section className={cx('banner')}>
                <div className={cx('banner-container')}>
                    <Image
                        layout="fill"
                        src={media.thumbnail}
                        objectFit="cover"
                        objectPosition="center"
                        alt={content.title}
                    />
                </div>

                <div className={cx('content_wrapper')}>
                    <div className={cx('layout')}>
                        <div className={cx('title_status')}>
                            <h1 className={cx('title')}>{title}</h1>
                            <div className={cx('status')}>Status - Finished - {endDate}</div>
                        </div>
                        <div className={cx('content')}>
                            <div className={cx('stack')}>
                                <h2 className={cx('head')}>Stack</h2>
                                <div className={cx('list')}>
                                    {stack.map((item, index) => (
                                        <div key={index} className={cx('item')}>
                                            <div className={cx('skill', 'icon')}>
                                                <Image
                                                    src={item.icon}
                                                    alt={item.title}
                                                    layout="fill"
                                                    objectFit="contain"
                                                    objectPosition="center"
                                                    className={cx('icon')}
                                                />
                                            </div>
                                            <p className={cx('title')}>{item.title}</p>
                                        </div>
                                    ))}
                                </div>
                            </div>
                            <div className={cx('summary')}>
                                <h2 className={cx('head')}>Summary</h2>
                                <p>{summary}</p>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
            {/* <Gallery Media={media} /> */}
            <div className={cx('details')}>
                <h2 className={cx('head')}>Detailed Information</h2>
                <p>{description}</p>
            </div>
            <div className={cx('testimonial')}>
                <h2 className={cx('head')}> testimonial</h2>
                <p>{testimonial}</p>
            </div>
            <div className={cx('url')}>
                <a href={url} rel="noreferrer noopener" target="_blank">
                    Visit {title}
                </a>
            </div>
        </section>
    );
};

interface GalleryProps {
    Media: Images;
}

const Gallery: FunctionComponent<GalleryProps> = memo(({ Media }) => {
    return (
        <div className={cx('gallery')}>
            <h1 className={cx('title')}>Gallery</h1>
            <LightGallery plugins={[lgZoom]} mode="lg-fade" elementClassNames={cx('light_gallery')}>
                {Array.from(Array(6)).map((item, index) => (
                    <a
                        key={index}
                        data-lg-size="1406-1390"
                        data-pinterest-text="Shinimamiya, Osaka, Japan"
                        data-tweet-text="Shinimamiya, Osaka, Japan"
                        data-src={Media.thumbnail}
                        data-sub-html="<h4>Photo by - <a href='https://unsplash.com/@entrycube' >Diego Guzmán </a></h4> <p> Location - <a href='https://unsplash.com/s/photos/fushimi-inari-taisha-shrine-senbontorii%2C-68%E7%95%AA%E5%9C%B0-fukakusa-yabunouchicho%2C-fushimi-ward%2C-kyoto%2C-japan'>Fushimi Ward, Kyoto, Japan</a></p>"
                        className={cx('gallery-container')}
                    >
                        <Image
                            className={cx('image')}
                            src={Media.thumbnail}
                            layout="fill"
                            objectFit="cover"
                            objectPosition="center"
                            alt="Project Images"
                        />
                    </a>
                ))}
            </LightGallery>
        </div>
    );
});

export default Portfolio;

export const getServerSideProps: GetServerSideProps = async ({ params }) => {
    const content = PortfolioAPI.data.portfolio.find((item) => item.slug === params.slug);
    return {
        props: {
            content,
        },
    };
};
