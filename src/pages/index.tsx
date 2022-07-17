import type { NextPage } from 'next';
import SEO from 'utils/SEO';

import bindClassNames from 'classnames/bind';

import styles from '@/styles/home.module.scss';
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

            <div className="font-ProximaNova">
                <h1>Welcome to Home, 'Hi'</h1>
            </div>

        </div>
    );
};

export default Home;
