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
                title={content.title}
                description={content.summary}
                image={content.media.thumbnail}
                keywords={content.stack.map((item) => item.title)}
            />

            <section className="relative">
                <div className={cx('image-container')}>
                    <Image
                        layout="fill"
                        src={media.thumbnail}
                        objectFit="cover"
                        objectPosition="center"
                    />
                </div>

                <div className="absolute top-0 left-0 z-30 w-full h-full">
                    <div className="container mx-auto px-2 py-4 w-full flex flex-col justify-center items-stretch h-full">
                        <div className="flex flex-col justify-center items-center">
                            <h1 className={cx('title')}>{title}</h1>
                            <div className={cx('status')}>Status - Finished - {endDate}</div>
                        </div>
                        <div className={cx('content')}>
                            <div className={cx('stack')}>
                                <h2 className={cx('head')}>Stack</h2>
                                <div className={cx('list')}>
                                    {stack.map((item, index) => (
                                        <div
                                            key={index}
                                            className="flex flex-col justify-center items-center space-y-2"
                                        >
                                            <div className="relative overflow-hidden w-9 h-9 mx-auto object-contain">
                                                <Image
                                                    src={item.icon}
                                                    alt={item.title}
                                                    layout="fill"
                                                    objectFit="contain"
                                                    objectPosition="center"
                                                    className="w-9 h-9 mx-auto"
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
            <Gallery Media={media} />
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
            <h1 className="flex px-2 justify-center lg:px-0 items-center text-xl uppercase font-ProximaNovaBold mb-8 w-full text-center md:text-left">
                Gallery
            </h1>
            <LightGallery
                plugins={[lgZoom]}
                mode="lg-fade"
                elementClassNames="container mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-y-4"
            >
                {Array.from(Array(6)).map((item, index) => (
                    <a
                        key={index}
                        data-lg-size="1406-1390"
                        data-pinterest-text="Shinimamiya, Osaka, Japan"
                        data-tweet-text="Shinimamiya, Osaka, Japan"
                        data-src={Media.thumbnail}
                        data-sub-html="<h4>Photo by - <a href='https://unsplash.com/@entrycube' >Diego Guzmán </a></h4> <p> Location - <a href='https://unsplash.com/s/photos/fushimi-inari-taisha-shrine-senbontorii%2C-68%E7%95%AA%E5%9C%B0-fukakusa-yabunouchicho%2C-fushimi-ward%2C-kyoto%2C-japan'>Fushimi Ward, Kyoto, Japan</a></p>"
                        className="mx-auto relative overflow-hidden w-72 md:w-80 lg:w-80 xl:w-96 2xl:w-[30rem] h-56 2xl:h-64 cursor-pointer "
                    >
                        <Image
                            className="object-cover object-center max-w-xs rounded-md backdrop-blur-lg"
                            src={Media.thumbnail}
                            layout="fill"
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
