'use client';

import React from 'react';
import Link from 'next/link';
import { useTransitionRouter } from 'next-view-transitions';
import { useTransition } from '@/providers/Transition';

interface TransitionLinkProps {
    href: string;
    className?: string;
    children: React.ReactNode;
    onClick?: (e: React.MouseEvent<HTMLAnchorElement>) => void;
}

/**
 * Custom Link component that integrates with transition animations
 */
const TransitionLink: React.FC<TransitionLinkProps> = ({
    href,
    className = '',
    children,
    onClick,
}) => {
    const router = useTransitionRouter();
    const { startTransition, isTransitioning } = useTransition();

    const handleClick = (e: React.MouseEvent<HTMLAnchorElement>): void => {
        e.preventDefault();

        // If already transitioning, ignore this click
        if (isTransitioning) return;

        // If custom onClick is provided, call it
        if (onClick) {
            onClick(e);
            return;
        }

        // Start transition and navigate
        startTransition(() => {
            router.push(href);
        });
    };

    return (
        <Link href={href} className={className} onClick={handleClick}>
            {children}
        </Link>
    );
};

export default TransitionLink;
