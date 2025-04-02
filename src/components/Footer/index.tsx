import React from 'react';
import Link from 'next/link';
import Image from 'next/image';

import { useTransitionRouter } from 'next-view-transitions';
import { useTransition } from '@/providers/Transition';
// import { siGithub, siX } from 'simple-icons';

// const socials = [
// {
//     name: 'LinkedIn',
//     icon: <SiLinkedin className="w-5 h-5" />,
//     href: '#',
// },
// {
//     name: 'X',
//     icon: <siX className="w-5 h-5" />,
//     href: '#',
// },
// {
//     name: 'Github',
//     icon: <siGithub className="w-5 h-5" />,
//     href: '#',
// },
// ];

const Footer = () => {
    const date = new Date().getFullYear();

    const { startTransition, isTransitioning } = useTransition();

    const router = useTransitionRouter();

    const handleNavigation = (path: string): void => {
        if (isTransitioning) return; // Prevent multiple transitions

        startTransition(() => {
            // The actual navigation happens after the initial fade out
            // and SVG animation has started
            router.push(path);
        });
    };
    return (
        <footer className="p-4">
            <hr className="border-muted-foreground w-full" />
            <div className="flex flex-col lg:flex-row justify-between items-center py-8">
                <div>
                    <a
                        href="/"
                        onClick={(e: React.MouseEvent<HTMLAnchorElement>) => {
                            e.preventDefault();
                            handleNavigation(`/`);
                        }}
                        className="flex items-center relative w-24 h-24 "
                    >
                        <Image
                            src={'/assets/svg/logo-white.svg'}
                            alt="Logo"
                            fill
                            className="mr-4 object-contain"
                            priority
                        />
                    </a>

                    {/* <div className="flex flex-col items-center lg:items-baseline"> */}
                    {/*     <div className="underline flex flex-col"> */}
                    {/*         {socials.map((social) => ( */}
                    {/*             <a */}
                    {/*                 key={social.name} */}
                    {/*                 href={social.href} */}
                    {/*                 className="flex items-center gap-2" */}
                    {/*             > */}
                    {/*                 {social.icon} */}
                    {/*             </a> */}
                    {/*         ))} */}
                    {/*     </div> */}
                    {/* </div> */}
                </div>

                <div className="flex gap-x-6">
                    <div className="flex flex-col items-baseline">
                        <h3 className="font-semibold text-sm underline mb-1.5">Links</h3>
                        <div className="flex flex-col text-muted-foreground text-sm space-y-0.5">
                            {/* <a */}
                            {/*     onClick={(e: React.MouseEvent<HTMLAnchorElement>) => { */}
                            {/*         e.preventDefault(); */}
                            {/*         handleNavigation(`/about`); */}
                            {/*     }} */}
                            {/*     href="/about" */}
                            {/*     className="hover:text-it-white transition-all ease-in duration-300" */}
                            {/* > */}
                            {/*     About */}
                            {/* </a> */}
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
                <div className="flex gap-x-4">
                    <Link href="/privacy-policy" className="font-semibold">
                        <p className="underline hover:text-it-white transition-all ease-in duration-300">
                            Privacy Policy
                        </p>
                    </Link>

                    <Link href="/terms" className="font-semibold">
                        <p className="underline hover:text-it-white transition-all ease-in duration-300">
                            Terms & Conditions
                        </p>
                    </Link>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
