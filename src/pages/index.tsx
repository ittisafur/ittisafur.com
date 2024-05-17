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
import { PortfolioAPI } from './api/Portfolio';
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
                        keywords="React.js developer, Next.js development, Redux Toolkit expert, PHP web developer, Full stack React developer, JavaScript SPA developer, PHP and JavaScript developer, Responsive web design with React, Advanced React web applications, Custom PHP solutions"
                    />
                    <Intro />
                </div>
            </div>
            <AboutMe />
            <PortfolioExcept />
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
                        <span>Full Stack Engineer</span>
                        <span>skilled in</span>
                    </div>
                    <div className="grid grid-cols-3 md:grid-cols-4 xl:grid-cols-7 gap-x-12 md:gap-x-16 gap-y-8 py-8">
                        {skills.map((skill, index) => {
                            const { name, path } = skill;
                            const prefixedPath = `/assets/svg/${path}`;
                            return (
                                <div
                                    key={index}
                                    className="w-14 h-14 md:w-24 md:h-24 object-contain"
                                >
                                    <Image
                                        src={prefixedPath}
                                        alt={name}
                                        width={100}
                                        height={100}
                                        className="w-14 h-14 md:w-24 md:h-24 object-contain"
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
            <div className="container mx-auto w-full px-2 py-4 text-it-dark-800 flex flex-col">
                <div className="flex justify-center items-center text-3xl capitalize font-medium pb-12">
                    Bit about me
                </div>
                <div className="flex justify-center items-center w-full mx-auto text-center space-x-4 xl:space-x-12 space-y-12 xl:space-y-0 flex-col xl:flex-row">
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
                        {/* <p className="text-lg mb-4"> */}
                        {/*     Hey there! I’m a seasoned Full Stack Developer with a solid track record */}
                        {/*     of turning complex tech challenges into smooth, scalable solutions. */}
                        {/*     Starting my journey in 2013, I quickly moved from mastering the basics */}
                        {/*     of HTML and CSS to tackling dynamic projects with modern frameworks like */}
                        {/*     React.js and Next.js. Whether it’s optimizing build processes or */}
                        {/*     crafting interactive web applications, I bring a keen eye for detail and */}
                        {/*     a knack for pushing tech boundaries. I thrive in collaborative */}
                        {/*     environments, always eager to sync with cross-functional teams to */}
                        {/*     enhance project flow and smash goals. Over the years, I've contributed */}
                        {/*     my mix of technical expertise and leadership across various roles— from */}
                        {/*     optimizing web applications to enhancing user interactions with advanced */}
                        {/*     API integrations. */}
                        {/* </p> */}
                        {/* <p className="text-lg"> */}
                        {/*     I thrive in collaborative environments, always eager to sync with */}
                        {/*     cross-functional teams to enhance project flow and smash goals. Over the */}
                        {/*     years, I've contributed my mix of technical expertise and leadership */}
                        {/*     across various roles— from optimizing web applications to enhancing user */}
                        {/*     interactions with advanced API integrations. */}
                        {/* </p> */}
                        {/* <p className="text-lg"> */}
                        {/*     I'm all about leveraging my tech skills to drive innovation and am */}
                        {/*     constantly on the lookout for new opportunities to help businesses grow. */}
                        {/*     Let’s connect and explore how we can create something awesome together! */}
                        {/*     Check out my LinkedIn for a deeper dive into my professional journey or */}
                        {/*     grab my CV to see where I can fit into your next big project. */}
                        {/* </p> */}
                        <p>
                            Hey! I’m a seasoned Full Stack Developer with over six years of
                            experience, starting my tech journey in 2013 with HTML/CSS out of
                            curiosity. From 2017 I've worked as a freelancer. Since 2019 I've been
                            working as a Professional Web Developer. I've sharpened my skills across
                            various tech stacks and frameworks through freelancing and contract
                            work, always aiming to push technical boundaries and foster community
                            growth. I’m keen on exploring new opportunities and collaborations—let’s
                            connect and see how I can help propel your business forward!
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
};

const PortfolioExcept = () => {
    const Portfolio = PortfolioAPI.data.portfolio;
    console.log({ Portfolio });
    return <div>Hello</div>;
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
        path: 'typescript-stack.svg',
    },
    {
        name: 'React',
        path: 'react-stack.svg',
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
        path: 'tailwindcss-stack.svg',
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
