import React from 'react';
import Link from 'next/link';
import ShineBorder from '@/components/ui/shine-border';
import { cn } from '@/lib/utils';

const GlowingButton = ({
    href,
    className,
    children,
    colors = ['#9845E8', '#33D2FF', '#DD5789'],
}: {
    href: string;
    className?: string;
    children: React.ReactNode;
    colors?: string[];
}) => {
    return (
        <Link href={href} className="block">
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
