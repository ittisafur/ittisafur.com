import { Fragment } from 'react';
import { Popover, Transition } from '@headlessui/react';
import { MenuIcon, XIcon } from '@heroicons/react/outline';
import Link from 'next/link';
import Image from 'next/image';

import styles from '@/styles/header.module.scss';
import bindClassNames from 'classnames/bind';

const cx = bindClassNames.bind(styles);

function Header() {
    return (
        <Popover className={cx('wrapper')}>
            <div className={cx('menu')}>
                <div className={cx('left')}>
                    <Link href="/" passHref>
                            <span className={cx('screen-reader')}>
                                Ittisafur - Full Stack Developer
                            </span>
                            <Image
                                src="/assets/svg/logo-white.svg"
                                alt="Ittisafur Logo"
                                width={100}
                                height={100}
                            />
                    </Link>
                </div>

                {/* <div className="-mr-2 -my-2 md:hidden"> */}
                {/*     <Popover.Button className="rounded-md p-2 inline-flex items-center justify-center hover:text-secondary hover:text-opacity-70 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-secondary"> */}
                {/*         <span className={cx('screen-reader')}>Open menu</span> */}
                {/*         <MenuIcon className={cx('icon')} aria-hidden="true" /> */}
                {/*     </Popover.Button> */}
                {/* </div> */}

                {/* <Popover.Group as="nav" className={cx('right')}> */}
                {/*     <Link href="/portfolio"> */}
                {/*         <a className={cx('link')}>Portfolio</a> */}
                {/*     </Link> */}

                {/*     <Link href="/"> */}
                {/*         <a className={cx('link')}>Contact</a> */}
                {/*     </Link> */}
                {/* </Popover.Group> */}
            </div>

            <Transition
                as={Fragment}
                enter="duration-200 ease-out"
                enterFrom="opacity-0 scale-95"
                enterTo="opacity-100 scale-100"
                leave="duration-100 ease-in"
                leaveFrom="opacity-100 scale-100"
                leaveTo="opacity-0 scale-95"
            >
                <Popover.Panel focus className={cx('mobile')}>
                    <div className="rounded-lg shadow-lg ring-1 ring-black ring-opacity-5 bg-primary divide-y-2 divide-gray-50">
                        <div className="pt-5 pb-6 px-2">
                            <div className="flex items-center justify-end">
                                <div className="-mr-2">
                                    <Popover.Button className="bg-primary rounded-md p-2 inline-flex items-center justify-center text-gray-400 hover:text-gray-500 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-secondary">
                                        <span className={cx('screen-reacer')}>Close menu</span>
                                        <XIcon className={cx('icon')} aria-hidden="true" />
                                    </Popover.Button>
                                </div>
                            </div>
                        </div>
                        <div className="py-6 px-2 space-y-6">
                            <div className="grid grid-cols-1 gap-y-4 gap-x-8 justify-items-center">
                                <Link href="/portfolio" className={cx('link')}>
                                    Portfolio
                                </Link>

                                <Link href="/" className={cx('link')}>
                                    Contact
                                </Link>
                            </div>
                        </div>
                    </div>
                </Popover.Panel>
            </Transition>
        </Popover>
    );
}

export default Header;
