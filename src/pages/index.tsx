import type { NextPage } from 'next';
import SEO from 'utils/SEO';
import Typewriter from 'typewriter-effect';
import Lottie from 'react-lottie';
import FadingArrow from '../assets/lottie/fading-arrow.json';

import bindClassNames from 'classnames/bind';

import styles from '@/styles/home.module.scss';

// Import Swiper styles
import 'swiper/css';
import { memo } from 'react';
import PortfolioExcerpt from 'components/PortfolioExcept';
const cx = bindClassNames.bind(styles);

const Home: NextPage = () => {
    return (
        <div className={cx('wrapper')}>
            <SEO
                title="Welcome to Ittisafur's Portfolio"
                description="Custom web development that drives results."
                image="/assets/svg/logo-white.svg"
                keywords="web design, website design, website builder, wordpress, web developer, web designer, website creator, responsive web design"
            />
            <Intro />
            <RecentWorks />
        </div>
    );
};

const Intro = memo(() => {
    return (
        <div className={cx('intro')}>
            <div className={cx('content-wrapper')}>
                <div className={cx('content')}>
                    <h4>Hi, I'm Ittisafur. I specialize in</h4>
                    <Typewriter
                        options={{
                            strings: [
                                'Fullstack Development',
                                'Frontend Development',
                                'React.js/Next.js',
                                'TypeScript',
                                'Express.js',
                                'Firebase',
                            ],
                            autoStart: true,
                            loop: true,
                            cursor: '_',
                        }}
                    />
                </div>
                <div className={cx('paragraphs')}>
                    <p>
                        Primarily focused on building modern, responsive websites and web
                        accessibility websites. Love to experiment with new technologies and build
                        awesome stuff.
                    </p>
                    <p>Take a look at my portfolio and get in touch if you have any questions.</p>
                </div>
            </div>
            <Lottie
                isClickToPauseDisabled={true}
                onClick={() => console.log('clicked')}
                options={{
                    loop: true,
                    autoplay: true,
                    animationData: FadingArrow,
                    rendererSettings: {
                        preserveAspectRatio: 'xMidYMid slice',
                    },
                }}
                height={100}
                width={100}
            />
        </div>
    );
});

const RecentWorks = () => {
    return (
        <div className={cx('recent-works')}>
            <div className={cx('recent-works-wrapper')}>
                <h1 className={cx('heading')}>Recent Works</h1>
                <p>Check out my most recent works.</p>

                {/* <div className={cx('lottie-wrapper')}> */}
                {/*     <Lottie */}
                {/*         isClickToPauseDisabled={true} */}
                {/*         options={{ */}
                {/*             loop: true, */}
                {/*             autoplay: true, */}
                {/*             animationData: FadingArrow, */}
                {/*             rendererSettings: { */}
                {/*                 preserveAspectRatio: 'xMidYMid slice', */}
                {/*             }, */}
                {/*         }} */}
                {/*         height={100} */}
                {/*         width={100} */}
                {/*     /> */}
                {/* </div> */}
            </div>
            <PortfolioExcerpt />
        </div>
    );
};

export default Home;
