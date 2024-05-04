import bindClassNames from 'classnames/bind';
import Image from 'next/image';

import styles from './index.module.scss';
import Link from 'next/link';
const cx = bindClassNames.bind(styles);

const Footer = () => {
    return (
        <footer className={cx('footer')}>
            <div className="px-6 lg:px-2 container mx-auto flex flex-col py-14 space-y-4">
                <div className="w-full flex justify-start items-baseline space-x-12">
                    <div>
                        <h3 className="text-base uppercase mb-1">Links</h3>
                        <ul>
                            {links.map((link, index) => {
                                return (
                                    <li key={index} className="capitalize py-1">
                                        <Link href={link.slug}>{link.name}</Link>
                                    </li>
                                );
                            })}
                        </ul>
                    </div>
                    <div>
                        <h3 className="text-base uppercase mb-1">Contact</h3>
                        <ul>
                            {contacts.map((contact, index) => {
                                return (
                                    <li key={index} className="py-1">
                                        <Link href={contact.slug}>{contact.name}</Link>
                                    </li>
                                );
                            })}
                        </ul>
                    </div>
                </div>
                <div className="pt-8">
                    <p>All Rights Reserved.</p>
                </div>
            </div>
        </footer>
    );
};

export default Footer;

const links = [
    {
        name: 'portfolio',
        slug: 'portfolio',
    },
];

const contacts = [
    {
        name: 'ittisafur@gmail.com',
        slug: 'mailto:ittisafur@gmail.com',
    },
    {
        name: '+880 1984992255',
        slug: 'tel:+8801984992255',
    },
];
