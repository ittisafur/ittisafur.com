import bindClassNames from 'classnames/bind';
import Link from 'next/link';
import { Fragment, FunctionComponent } from 'react';

import styles from './index.module.scss';

const cx = bindClassNames.bind(styles);

const FrontNavBar: FunctionComponent = () => {
    return (
        <Fragment>
            <div>
                <div className={cx('wrapper')}>
                    <ul>
                        <li>
                            <Link href="/">Home</Link>
                        </li>
                    </ul>
                </div>
            </div>
        </Fragment>
    );
};

FrontNavBar.displayName = 'Front NavBar';
export default FrontNavBar;
