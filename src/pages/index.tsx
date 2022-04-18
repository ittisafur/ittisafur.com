import FrontLayout from '@/layouts/Front';
import styles from '@/styles/index.module.scss';
import bindClassNames from 'classnames/bind';
import type { NextPage } from 'next';
import { animated, useSpring } from 'react-spring';

const cx = bindClassNames.bind(styles);

const Home: NextPage = () => {
    const springProps = useSpring({
        to: { opacity: 1, scale: 1 },
        from: { opacity: 0, scale: 0.8 },
        config: { duration: 1000 },
    });
    return (
        <FrontLayout>
            <animated.div style={springProps} className={cx('wrapper')}>
                <div className={cx('content')}>
                    <animated.div style={springProps}>
                        <h1>Creative FullStack Developer</h1>
                    </animated.div>
                </div>
            </animated.div>
        </FrontLayout>
    );
};

Home.displayName = 'Home';

export default Home;
