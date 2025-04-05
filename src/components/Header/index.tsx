'use client';

import React, { useState, useEffect, useRef } from 'react';
import Image from 'next/image';
import { usePathname } from 'next/navigation';
import { ChevronDown } from 'lucide-react';
import { Sheet, SheetContent, SheetTrigger, SheetTitle } from '@/components/ui/sheet';
import { cn } from '@/lib/utils';
import GlowingButton from '../ui/glowing-button';
import { useTransitionRouter } from 'next-view-transitions';
import { useTransition } from '@/providers/Transition';

type SubLink = {
    title: string;
    link: string;
    description: string;
};

type NavLink = {
    name: string;
    link: string;
    subLinks?: SubLink[] | null;
};

const navLinks: NavLink[] = [
    {
        name: 'Portfolio',
        link: 'portfolio',
    },
    {
        name: 'Blog',
        link: 'blog',
        subLinks: null,
    },
    {
        name: 'Contact',
        link: 'contact',
        subLinks: null,
    },
];

const Header: React.FC = () => {
    const [isScrolled, setIsScrolled] = useState<boolean>(false);
    const [openDropdown, setOpenDropdown] = useState<string | null>(null);
    const dropdownRefs = useRef<{ [key: string]: HTMLDivElement | null }>({});

    const [isSheetOpen, setIsSheetOpen] = useState(false);
    const pathname = usePathname();

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

    useEffect(() => {
        const handleScroll = (): void => {
            if (typeof window !== 'undefined') {
                setIsScrolled(window.scrollY > 10);
            }
        };

        const handleClickOutside = (event: MouseEvent): void => {
            if (
                openDropdown &&
                dropdownRefs.current[openDropdown] &&
                !dropdownRefs.current[openDropdown]?.contains(event.target as Node)
            ) {
                setOpenDropdown(null);
            }
        };

        window.addEventListener('scroll', handleScroll);
        document.addEventListener('mousedown', handleClickOutside);
        handleScroll();

        return () => {
            window.removeEventListener('scroll', handleScroll);
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, [openDropdown]);

    // Fix the ref callback type
    const setDropdownRef =
        (link: string) =>
        (el: HTMLDivElement | null): void => {
            dropdownRefs.current[link] = el;
        };

    const isActiveLink = (link: string, subLinks: SubLink[] | null = null): boolean => {
        if (link === '' && pathname === '/') return true;
        const basePath = `/${link}`;
        if (!subLinks) {
            return pathname === basePath;
        }
        const isParentPath = pathname === basePath;
        const isSubPath = subLinks.some((subLink) => pathname.startsWith(subLink.link));
        return isParentPath || isSubPath;
    };

    const isActiveSubLink = (link: string): boolean => {
        return pathname === link;
    };

    const renderNavigationItem = (item: NavLink): JSX.Element => {
        if (item.subLinks) {
            return (
                <div key={item.link} className="relative" ref={setDropdownRef(item.link)}>
                    <div
                        className={cn(
                            'inline-flex items-center gap-1 cursor-pointer px-4 py-2 rounded-md transition-colors font-semibold',
                            isScrolled
                                ? isActiveLink(item.link, item.subLinks)
                                    ? 'text-white bg-white/10'
                                    : 'text-gray-300 hover:text-white hover:bg-white/5'
                                : isActiveLink(item.link, item.subLinks)
                                  ? 'text-white bg-white/10'
                                  : 'text-white hover:text-gray-200 hover:bg-white/5'
                        )}
                        onClick={() =>
                            setOpenDropdown(openDropdown === item.link ? null : item.link)
                        }
                    >
                        <a
                            onClick={(e: React.MouseEvent<HTMLAnchorElement>) => {
                                e.preventDefault();
                                handleNavigation(`/${item.link}`);
                            }}
                            href={`/${item.link}`}
                        >
                            <span>{item.name}</span>
                        </a>
                        <ChevronDown
                            className={cn(
                                'h-4 w-4 transition-transform duration-200',
                                openDropdown === item.link ? 'rotate-180' : 'rotate-0'
                            )}
                        />
                    </div>
                    {openDropdown === item.link && item.subLinks && (
                        <div
                            className={cn(
                                'absolute top-full left-0 mt-2 p-4 rounded-md shadow-lg',
                                'bg-it-dark-900 border border-gray-700',
                                item.subLinks.length > 1
                                    ? 'w-[500px] grid grid-cols-2 gap-3'
                                    : 'w-[400px]'
                            )}
                        >
                            {item.subLinks.map((subLink) => (
                                <a
                                    key={subLink.link}
                                    href={subLink.link}
                                    className={cn(
                                        'block p-3 rounded-md transition-colors font-semibold',
                                        isActiveSubLink(subLink.link)
                                            ? 'bg-gray-800/70 text-white'
                                            : 'hover:bg-gray-800/50 text-gray-300 hover:text-white'
                                    )}
                                    onClick={(e: React.MouseEvent<HTMLAnchorElement>) => {
                                        e.preventDefault();
                                        setOpenDropdown(null);
                                        handleNavigation(subLink.link);
                                    }}
                                >
                                    <div className="text-sm font-medium">{subLink.title}</div>
                                    <p className="text-sm text-gray-400 mt-1 font-normal">
                                        {subLink.description}
                                    </p>
                                </a>
                            ))}
                        </div>
                    )}
                </div>
            );
        }
        return (
            <a
                key={item.link}
                href={`/${item.link}`}
                className={cn(
                    'px-4 py-2 rounded-md transition-colors font-semibold',
                    isScrolled
                        ? isActiveLink(item.link)
                            ? 'bg-gray-800/70 text-white'
                            : 'hover:text-gray-900 hover:bg-gray-50'
                        : isActiveLink(item.link)
                          ? 'bg-white/10'
                          : 'hover:text-gray-200 hover:bg-white/5'
                )}
                onClick={(e: React.MouseEvent<HTMLAnchorElement>) => {
                    e.preventDefault();
                    setOpenDropdown(null);
                    handleNavigation(`/${item.link}`);
                }}
            >
                {item.name}
            </a>
        );
    };

    return (
        <header
            className={cn(
                'h-[var(--header-height)] fixed top-0 left-0 right-0 z-50 transition-all duration-300',
                isScrolled ? 'bg-it-dark-800 shadow-lg shadow-black/20' : 'bg-transparent'
            )}
        >
            <nav className="container mx-auto flex items-center justify-between p-3">
                <a
                    href="/"
                    className="flex items-center relative w-24 h-24"
                    onClick={(e: React.MouseEvent<HTMLAnchorElement>) => {
                        e.preventDefault();
                        handleNavigation('/');
                    }}
                >
                    <Image
                        src={'/assets/svg/logo-white.svg'}
                        alt="Logo"
                        fill
                        className="mr-4 object-contain"
                        priority
                    />
                </a>

                {/* Desktop Navigation */}
                <div className="hidden lg:flex flex-1 items-center justify-center gap-4">
                    {navLinks.map(renderNavigationItem)}
                </div>

                {/* CTA Button */}
                <div className="hidden lg:flex">
                    <GlowingButton
                        href="/contact"
                        className="text-it-white min-w-56"
                        useTransition={true}
                    >
                        Let&apos;s Talk
                    </GlowingButton>
                </div>

                {/* Mobile Menu */}
                <div className="lg:hidden">
                    <Sheet open={isSheetOpen} onOpenChange={setIsSheetOpen}>
                        <SheetTrigger asChild>
                            <button className="...">
                                <span className="sr-only">Open menu</span>
                                <SheetTitle className="hidden">Mobile Navigation</SheetTitle>
                                <svg
                                    className="w-6 h-6"
                                    xmlns="http://www.w3.org/2000/svg"
                                    fill="none"
                                    viewBox="0 0 24 24"
                                    stroke="currentColor"
                                >
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth={2}
                                        d="M4 6h16M4 12h16m-7 6h7"
                                    />
                                </svg>
                            </button>
                        </SheetTrigger>
                        <SheetContent
                            side="right"
                            className="w-[300px] bg-it-dark-900 border-l border-gray-700"
                        >
                            <div className="py-4">
                                {/* Logo (without SheetClose) */}
                                <a
                                    href="/"
                                    className="block"
                                    onClick={(e) => {
                                        e.preventDefault();
                                        setIsSheetOpen(false);
                                        handleNavigation('/');
                                    }}
                                >
                                    <Image
                                        src="/assets/svg/logo-white.svg"
                                        alt="Logo"
                                        width={120}
                                        height={60}
                                        className="mr-4 object-contain"
                                        priority
                                    />
                                </a>
                            </div>

                            <div className="mt-6">
                                <ul className="flex flex-col space-y-4">
                                    {navLinks.map((link) => (
                                        <React.Fragment key={link.link}>
                                            <li>
                                                {/* No SheetClose here */}
                                                <a
                                                    onClick={(e) => {
                                                        e.preventDefault();

                                                        setIsSheetOpen(false);
                                                        handleNavigation(`/${link.link}`);
                                                    }}
                                                    href={`/${link.link}`}
                                                    className="block py-2 px-4 capitalize transition-colors duration-300 font-semibold"
                                                >
                                                    {link.name}
                                                </a>
                                            </li>
                                            {link.subLinks?.map((subLink) => (
                                                <li key={subLink.link} className="ml-4">
                                                    {/* No SheetClose here */}
                                                    <a
                                                        onClick={(e) => {
                                                            e.preventDefault();

                                                            setIsSheetOpen(false);
                                                            handleNavigation(subLink.link);
                                                        }}
                                                        href={subLink.link}
                                                        className="block py-2 px-4 text-sm text-gray-400 hover:text-white hover:bg-gray-800/30 font-semibold"
                                                    >
                                                        {subLink.title}
                                                    </a>
                                                </li>
                                            ))}
                                        </React.Fragment>
                                    ))}
                                    <li>
                                        {/* For the GlowingButton */}
                                        <GlowingButton
                                            href="/contact"
                                            className="text-it-white min-w-56"
                                            onClick={(e) => {
                                                e.preventDefault();

                                                setIsSheetOpen(false);
                                                handleNavigation('/contact');
                                            }}
                                        >
                                            Let&apos;s Talk
                                        </GlowingButton>
                                    </li>
                                </ul>
                            </div>
                        </SheetContent>
                    </Sheet>
                </div>
            </nav>
        </header>
    );
};

export default Header;
