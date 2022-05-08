import Switcher from '@/layouts/Front';
import bindClassNames from 'classnames/bind';
import type { NextPage } from 'next';
import { isMobile } from 'react-device-detect';
import { animated, useSpring } from 'react-spring';

import styles from '@/styles/index.module.scss';

const cx = bindClassNames.bind(styles);

const Home: NextPage = () => {
    const springProps = useSpring({
        config: { duration: 1000 },
        from: { opacity: 0, scale: 0.8 },
        to: { opacity: 1, scale: 1 },
    });

    return (
        <Switcher>
            <animated.div style={springProps} className={cx('wrapper', { isMobile: isMobile })}>
                <div className={cx('content')}>
                    <animated.div style={springProps}>
                        <h1>Creative FullStack Developer</h1>
                    </animated.div>
                </div>
            </animated.div>
        </Switcher>
    );
};

Home.displayName = 'Home';

export default Home;
