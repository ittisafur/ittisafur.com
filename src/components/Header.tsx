import { Fragment, useState } from 'react';
import { Popover, Transition, Dialog } from '@headlessui/react';
import { Bars3Icon, XMarkIcon } from '@heroicons/react/24/outline';
import Link from 'next/link';
import Image from 'next/image';

import styles from '@/styles/header.module.scss';
import bindClassNames from 'classnames/bind';

const cx = bindClassNames.bind(styles);

function Header() {
    let [isOpen, setIsOpen] = useState(false);
    return (
        <div className={cx('nav')}>
            <div className={cx('nav-container')}>
                <div className={cx('navbar')}>
                    <div className={cx('logo')}>
                        <Image
                            src="/assets/svg/logo-white.svg"
                            alt="Ittisafur Logo"
                            width="100"
                            height="50"
                        />
                    </div>
                    <div className={cx('menu-toggle')} onClick={() => setIsOpen(!isOpen)}>
                        <div
                            className={cx('hambox', {
                                'ham-box-open': isOpen,
                            })}
                        >
                            <span
                                className={cx('line-top', {
                                    spin: isOpen,
                                })}
                            ></span>
                            <span className={cx('line-bottom', { spin: isOpen })}></span>
                        </div>
                    </div>
                </div>
                <div
                    className={cx('nav-overlay')}
                    style={{
                        top: isOpen ? '0' : '-100%',
                        transitionDelay: isOpen ? '0.3s' : '0s',
                    }}
                >
                    <ul className={cx('nav-links')}>
                        <li className={cx('items')}>
                            <Link
                                href="/"
                                className={cx('link')}
                                onClick={() => setIsOpen(!isOpen)}
                                style={{
                                    top: isOpen ? '0' : '7.5rem',
                                }}
                            >
                                Home
                            </Link>
                            <div className={cx('item-wrapper')} />
                        </li>

                        <li className={cx('items')}>
                            <Link
                                href="/"
                                className={cx('link')}
                                onClick={() => setIsOpen(!isOpen)}
                                style={{
                                    top: isOpen ? '0' : '7.5rem',
                                }}
                            >
                                Portfolio
                            </Link>
                            <div className={cx('item-wrapper')} />
                        </li>
                        {/* <li className={cx('items',)}> */}
                        {/*     <Link */}
                        {/*         href="/" */}
                        {/*         className={cx('link')} */}
                        {/*         onClick={() => setIsOpen(!isOpen)} */}
                        {/*         style={{ */}
                        {/*             top: isOpen ? '0' : '7.5rem', */}
                        {/*         }} */}
                        {/*     > */}
                        {/*         Service */}
                        {/*     </Link> */}
                        {/*     <div className={cx('item-wrapper')} /> */}
                        {/* </li> */}

                        {/* <li className={cx('items')}> */}
                        {/*     <Link */}
                        {/*         href="/" */}
                        {/*         className={cx('link')} */}
                        {/*         onClick={() => setIsOpen(!isOpen)} */}
                        {/*         style={{ */}
                        {/*             top: isOpen ? '0' : '7.5rem', */}
                        {/*         }} */}
                        {/*     > */}
                        {/*         Blog */}
                        {/*     </Link> */}
                        {/*     <div className={cx('item-wrapper')} /> */}
                        {/* </li> */}
                        {/* <li className={cx('items')}> */}
                        {/*     <Link */}
                        {/*         href="/" */}
                        {/*         className={cx('link')} */}
                        {/*         onClick={() => setIsOpen(!isOpen)} */}
                        {/*         style={{ */}
                        {/*             top: isOpen ? '0' : '7.5rem', */}
                        {/*         }} */}
                        {/*     > */}
                        {/*         Contact */}
                        {/*     </Link> */}
                        {/*     <div className={cx('item-wrapper')} /> */}
                        {/* </li> */}
                    </ul>
                </div>
            </div>
        </div>
    );
}

export default Header;
