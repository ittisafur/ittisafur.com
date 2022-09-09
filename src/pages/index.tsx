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
                title="Welcome, Home"
                description="Your go to guy for business solution"
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
            <div className="mt-16 text-left h-full flex flex-col justify-center">
                <div className="font-ProximaNovaBold text-3xl text-cyan  ">
                    <h4 className="my-2">Hi, I'm Ittisafur. I specialize in</h4>
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
                <div className="text-base tracking-wide my-6">
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
            <div className="w-full text-center lg:w-2/6 ">
                <h1 className="font-ProximaNovaBold text-3xl uppercase text-cyan tracking-wider">
                    Recent Works
                </h1>
                <p className="-ml-3">Check out my most recent works.</p>

                <div className="transform rotate-[270deg]">
                    <Lottie
                        isClickToPauseDisabled={true}
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
            </div>
            <PortfolioExcerpt />
        </div>
    );
};

export default Home;
