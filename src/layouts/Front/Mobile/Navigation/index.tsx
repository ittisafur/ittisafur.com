import bindClassNames from 'classnames/bind';
import Image from 'next/image';
import Link from 'next/link';
import { Fragment, FunctionComponent } from 'react';

import styles from './index.module.scss';

const cx = bindClassNames.bind(styles);

const FrontNavBar = () => {
    return (
        <Fragment>
            <div className={cx('wrapper')}>
                <nav>
                    <ul className={cx('navigation')}>
                        <li>
                            <Link href="#">
                                <Image src="/assets/svg/search.svg" alt="Search" width={30} height={30} />
                            </Link>
                        </li>
                        <li>
                            <Link href="#">
                                <Image src="/assets/svg/home.svg" alt="Home" width={30} height={30} />
                            </Link>
                        </li>

                        <li>
                            <Link href="#">
                                <Image src="/assets/svg/projects.svg" alt="Projects" width={30} height={30} />
                            </Link>
                        </li>

                        <li>
                            <Link href="#">
                                <Image src="/assets/svg/services.svg" alt="Services" width={30} height={30} />
                            </Link>
                        </li>

                        <li>
                            <Link href="#">
                                <Image src="/assets/svg/blog.svg" alt="Blog" width={30} height={30} />
                            </Link>
                        </li>

                        <li>
                            <Link href="#">
                                <Image src="/assets/svg/contact.svg" alt="Contact" width={30} height={30} />
                            </Link>
                        </li>
                    </ul>
                </nav>
            </div>
        </Fragment>
    );
};

FrontNavBar.displayName = 'Front NavBar';
export default FrontNavBar;
