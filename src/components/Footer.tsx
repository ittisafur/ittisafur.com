import bindClassNames from 'classnames/bind';

import styles from '@/styles/home.module.scss';
const cx = bindClassNames.bind(styles);

const Footer = () => {
    return (
        <div className="px-6 lg:px-2 container mx-auto my-4 ">
            <ul className="flex justify-end items-center space-x-4">
                <li>
                    <a href="#">
                        <img src="/assets/svg/twitter.svg" alt="Twitter" />
                    </a>
                </li>
                <li>
                    <a href="#">
                        <img src="/assets/svg/facebook.svg" alt="Facebook" />
                    </a>
                </li>
                <li>
                    <a href="#">
                        <img src="/assets/svg/linkedin.svg" alt="Linkedin" />
                    </a>
                </li>
            </ul>
        </div>
    );
};

export default Footer;
