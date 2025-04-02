'use client';

import React from 'react';
import Link from 'next/link';
import ShineBorder from '@/components/ui/shine-border';
import { cn } from '@/lib/utils';
import { useTransition } from '@/providers/Transition';
import { useTransitionRouter } from 'next-view-transitions';

interface GlowingButtonProps {
    href: string;
    className?: string;
    children: React.ReactNode;
    colors?: string[];
    useTransition?: boolean;
    onClick?: (e: React.MouseEvent<HTMLAnchorElement>) => void;
}

/**
 * GlowingButton Component
 *
 * A customizable button component with a glowing border effect that supports
 * multiple navigation patterns.
 *
 * @example Usage Examples:
 *
 * 1. Using with transition effect (animated page transition)
 * ```tsx
 * <GlowingButton
 *   href="/contact"
 *   className="text-it-white min-w-56"
 *   useTransition={true} // Enable transition effect
 * >
 *   Let's Talk
 * </GlowingButton>
 * ```
 *
 * 2. Using with a custom onClick handler (for custom navigation logic)
 * ```tsx
 * <GlowingButton
 *   href="/contact"
 *   className="text-it-white min-w-56"
 *   onClick={(e) => {
 *     e.preventDefault();
 *     // Do something custom here
 *     handleNavigation('/contact');
 *   }}
 * >
 *   Let's Talk
 * </GlowingButton>
 * ```
 *
 * 3. Original behavior (regular link navigation without transition)
 * ```tsx
 * <GlowingButton
 *   href="/contact"
 *   className="text-it-white min-w-56"
 * >
 *   Let's Talk
 * </GlowingButton>
 * ```
 */
const GlowingButton: React.FC<GlowingButtonProps> = ({
    href,
    className,
    children,
    colors = ['#9845E8', '#33D2FF', '#DD5789'],
    useTransition: shouldUseTransition = false,
    onClick,
}) => {
    const { startTransition } = useTransition();
    const router = useTransitionRouter();

    const handleClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
        // If a custom onClick is provided, use that
        if (onClick) {
            onClick(e);
            return;
        }

        // If we should use the transition effect
        if (shouldUseTransition) {
            e.preventDefault();
            startTransition(() => {
                router.push(href);
            });
        }
        // Otherwise, default Link behavior will work
    };

    return (
        <Link href={href} className="block" onClick={handleClick}>
            <ShineBorder
                className={cn(
                    'relative flex items-center justify-center overflow-hidden rounded-lg bg-it-dark-800 min-h-min',
                    'px-4 py-3',
                    'transition-all duration-300 hover:scale-[.98] active:scale-[0.98]',
                    className
                )}
                color={colors}
            >
                <span className="relative font-semibold text-white">{children}</span>
            </ShineBorder>
        </Link>
    );
};

export default GlowingButton;
