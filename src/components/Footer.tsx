import bindClassNames from 'classnames/bind';
import Image from 'next/image';

import styles from '@/styles/home.module.scss';
const cx = bindClassNames.bind(styles);

const Footer = () => {
    return (
        <div className="px-6 lg:px-2 container mx-auto my-4 ">
            <ul className="flex justify-end items-center space-x-4">
                <li>
                    <a
                        href="https://twitter.com/ittisafur"
                        target="_blank"
                        rel="noreferrer noopener"
                    >
                        <Image src="/assets/svg/twitter.svg" alt="Twitter" width={22} height={22} />
                    </a>
                </li>
                <li>
                    <a
                        href="https://www.facebook.com/ittisafur"
                        target="_blank"
                        rel="noreferrer noopener"
                    >
                        <Image
                            src="/assets/svg/facebook.svg"
                            alt="Facebook"
                            width={22}
                            height={22}
                        />
                    </a>
                </li>
                <li>
                    <a
                        href="https://www.linkedin.com/in/ittisafur"
                        target="_blank"
                        rel="noreferrer noopener"
                    >
                        <Image
                            src="/assets/svg/linkedin.svg"
                            alt="Linkedin"
                            width={22}
                            height={22}
                        />
                    </a>
                </li>
            </ul>
        </div>
    );
};

export default Footer;
