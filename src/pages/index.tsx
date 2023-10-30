import type { NextPage } from 'next';
import SEO from 'utils/SEO';
import Typewriter from 'typewriter-effect';
import Lottie from 'react-lottie';
import FadingArrow from '../assets/lottie/fading-arrow.json';
import Image from 'next/image';

import bindClassNames from 'classnames/bind';

import styles from 'assets/styles/home.module.scss';

// Import Swiper styles
import 'swiper/css';
import { Fragment, memo } from 'react';
import PortfolioExcerpt from 'components/PortfolioExcept';
const cx = bindClassNames.bind(styles);

const Home: NextPage = () => {
    return (
        <Fragment>
            <div className={cx('wrapper')}>
                <div className={cx('contain')}>
                    <SEO
                        title="Welcome to Ittisafur's Portfolio"
                        description="Engineering that drives results."
                        image="/assets/svg/logo-white.svg"
                        keywords="web design, website design, website builder, wordpress, web developer, web designer, website creator, responsive web design"
                    />
                    <Intro />
                </div>
            </div>
            <AboutMe />
        </Fragment>
    );
};

const Intro = memo(() => {
    return (
        <div className={cx('intro')}>
            <div className={cx('content-wrapper')}>
                <div className={cx('content')}>
                    <div className={cx('headline')}>
                        <span>Hi, I'm</span>
                        <span>Ittisafur</span>
                    </div>

                    <div className={cx('expertism')}>
                        <span>Frontend Engineer</span>
                        <span>skilled in</span>
                    </div>
                    <div className="grid grid-cols-3 md:grid-cols-4 xl:grid-cols-7 gap-x-16 gap-y-8">
                        {skills.map((skill, index) => {
                            const { name, path } = skill;
                            const prefixedPath = `/assets/svg/${path}`;
                            return (
                                <div key={index} className="w-24 h-24 object-contain">
                                    <Image
                                        src={prefixedPath}
                                        alt={name}
                                        width={100}
                                        height={100}
                                        className="w-24 h-24 object-contain"
                                    />
                                </div>
                            );
                        })}
                    </div>
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

const AboutMe = () => {
    return (
        <div className={cx('about_wrapper', 'py-16')}>
            <div className="container mx-auto w-full px-2 py-4 text-it-dark-800">
                <div className="flex justify-center items-center text-3xl capitalize font-medium pb-12">
                    Bit about me
                </div>
                <div className="flex justify-center items-center w-full mx-auto text-center space-x-12">
                    <div className="max-w-xl">
                        <div className="w-60 h-60 object-contain rounded-full">
                            <Image
                                src="/assets/images/itti.jpg"
                                width={500}
                                height={500}
                                alt="Picture of the author"
                                className="rounded-full"
                            />
                        </div>
                    </div>
                    <div className="max-w-xl flex flex-col justify-start text-left">
                        <p className="text-lg mb-4">
                            With over 6 years in Web Development, I've honed my skills from the
                            foundational tech stacks to modern frameworks. My journey started in
                            2013 with HTML/CSS, eventually diving into WordPress in 2015. Over the
                            years, I've freelanced and worked on contract jobs, always with an aim
                            to contribute to the community and drive technical growth.
                        </p>
                        <p className="text-lg">
                            I'm open to new opportunities and collaborations. Let's connect and see
                            how I can help your business grow!
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
};

const skills = [
    {
        name: 'PHP',
        path: 'php.svg',
    },
    {
        name: 'JavaScript',
        path: 'js.svg',
    },

    {
        name: 'Typescript',
        path: 'typescript.svg',
    },
    {
        name: 'React',
        path: 'react.svg',
    },
    {
        name: 'Redux.js/Redux-toolkit',
        path: 'redux.svg',
    },
    {
        name: 'Express.js',
        path: 'expressjs.svg',
    },
    {
        name: 'Node.js',
        path: 'nodejs.svg',
    },
    {
        name: 'Tailwindcss',
        path: 'tailwindcss.svg',
    },
    {
        name: 'Ubuntu',
        path: 'ubuntu.svg',
    },
    {
        name: 'GCP',
        path: 'gcp.svg',
    },
    {
        name: 'Github',
        path: 'github.svg',
    },
    { name: 'Laravel', path: 'laravel.svg' },
    {
        name: 'Figma',
        path: 'figma.svg',
    },
    {
        name: 'Sass',
        path: 'sass.svg',
    },
];

export default Home;
