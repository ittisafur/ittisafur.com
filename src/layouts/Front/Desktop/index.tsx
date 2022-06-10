import bindClassNames from 'classnames/bind';

import Navigation from './Navigation';
import styles from './index.module.scss';

const cx = bindClassNames.bind(styles);

const FrontLayout = ({ children }: { children: any }) => {
    return (
        <div className={cx('wrapper')}>
            <Navigation />
            <div className={cx('main')}>{children}</div>
        </div>
    );
};

FrontLayout.displayName = 'FrontLayout';

export default FrontLayout;
