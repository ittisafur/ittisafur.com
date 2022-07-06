import type { NextPage } from 'next';
import SEO from 'utils/SEO';

import bindClassNames from 'classnames/bind';

import styles from '@/styles/home.module.scss';
const cx = bindClassNames.bind(styles);

const Home: NextPage = () => {
    return (
        <div className={cx('wrapper')}>

            <SEO title="Welcome, Home" description="Your go to guy for business solution" image="/assets/svg/logo-white.svg" keywords="web design, website design, website builder, wordpress, web developer, web designer, website creator, responsive web design"  />

            <div className={cx('container')}>
                <div className="text-center">
                    <h1 className="text-4xl">
                        <span className="font-bold">Welcome</span>, I'm working on bringing a new
                        version pretty soon.
                    </h1>

                    <p className="my-4 text-xl">
                        In the meantime, if you are planning to contact me. I'm available at{' '}
                        <a
                            className="cursor-pointer hover:text-white transition-all duration-150 delay-75 ease-in"
                            href="mailto:ittisafur@gmail.com"
                        >
                            ittisafur@gmail.com
                        </a>
                    </p>
                </div>
            </div>

        </div>
    );
};

export default Home;
