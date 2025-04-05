import React from 'react';
import Image from 'next/image';
import { useTransitionRouter } from 'next-view-transitions';
import { useTransition } from '@/providers/Transition';
import { Icon } from '@/components/ui/icon';

const Footer = () => {
    const date = new Date().getFullYear();
    const { startTransition, isTransitioning } = useTransition();
    const router = useTransitionRouter();

    const socials = [
        {
            name: 'LinkedIn',
            icon: 'linkedin',
            href: 'https://www.linkedin.com/in/ittisafur/',
        },
        {
            name: 'GitHub',
            icon: 'github',
            href: 'https://github.com/ittisafur/',
        },
        {
            name: 'X',
            icon: 'x',
            href: 'https://x.com/ittisafur',
        },
    ];

    const handleNavigation = (path: string): void => {
        if (isTransitioning) return;
        startTransition(() => {
            router.push(path);
        });
    };

    return (
        <footer className="p-4">
            <hr className="border-muted-foreground w-full" />
            <div className="flex flex-col lg:flex-row justify-between items-center py-8">
                <div className="flex flex-col items-center lg:items-start space-y-4">
                    <a
                        href="/"
                        onClick={(e: React.MouseEvent<HTMLAnchorElement>) => {
                            e.preventDefault();
                            handleNavigation(`/`);
                        }}
                        className="flex items-center relative w-24 h-24"
                    >
                        <Image
                            src={'/assets/svg/logo-white.svg'}
                            alt="Logo"
                            fill
                            className="mr-4 object-contain"
                            priority
                        />
                    </a>

                    {/* Social Icons */}
                    <div className="flex items-center space-x-4">
                        {socials.map((social) => (
                            <a
                                key={social.name}
                                href={social.href}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="hover:opacity-80 transition-opacity duration-300"
                                aria-label={social.name}
                            >
                                <div className="w-5 h-5 text-it-white hover:text-it-blue-400 transition-colors duration-300">
                                    <Icon name={social.icon} className="w-full h-full" />
                                </div>
                            </a>
                        ))}
                    </div>
                </div>

                <div className="flex gap-x-6 mt-6 lg:mt-0">
                    <div className="flex flex-col items-baseline">
                        <h3 className="font-semibold text-sm underline mb-1.5">Links</h3>
                        <div className="flex flex-col text-muted-foreground text-sm space-y-0.5">
                            <a
                                href="/portfolio"
                                className="hover:text-it-white transition-all ease-in duration-300"
                                onClick={(e: React.MouseEvent<HTMLAnchorElement>) => {
                                    e.preventDefault();
                                    handleNavigation(`/portfolio`);
                                }}
                            >
                                Portfolio
                            </a>

                            <a
                                href="/blog"
                                className="hover:text-it-white transition-all ease-in duration-300"
                                onClick={(e: React.MouseEvent<HTMLAnchorElement>) => {
                                    e.preventDefault();
                                    handleNavigation(`/blog`);
                                }}
                            >
                                Blog
                            </a>
                            <a
                                href="/contact"
                                className="hover:text-it-white transition-all ease-in duration-300"
                                onClick={(e: React.MouseEvent<HTMLAnchorElement>) => {
                                    e.preventDefault();
                                    handleNavigation(`/contact`);
                                }}
                            >
                                Contact
                            </a>
                        </div>
                    </div>
                </div>
            </div>

            <hr className="border-muted-foreground" />

            <div className="py-4 flex justify-between items-center text-xs text-muted-foreground capitalize">
                <p className="font-semibold"> &copy; {date} All Rights Reserved.</p>
                {/* <div className="flex gap-x-4"> */}
                {/*     <Link href="/privacy-policy" className="font-semibold"> */}
                {/*         <p className="underline hover:text-it-white transition-all ease-in duration-300"> */}
                {/*             Privacy Policy */}
                {/*         </p> */}
                {/*     </Link> */}

                {/*     <Link href="/terms" className="font-semibold"> */}
                {/*         <p className="underline hover:text-it-white transition-all ease-in duration-300"> */}
                {/*             Terms & Conditions */}
                {/*         </p> */}
                {/*     </Link> */}
                {/* </div> */}
            </div>
        </footer>
    );
};

export default Footer;
