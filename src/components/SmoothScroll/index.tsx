'use client';

import React, { useEffect, useState } from 'react';
import { ReactLenis, useLenis } from '@studio-freight/react-lenis';
import { usePathname } from 'next/navigation';
import type { LenisOptions, ScrollToOptions } from '@/types/lenis';

interface SmoothScrollProps {
    children: React.ReactNode;
}

export function useScrollTo() {
    // Explicitly type the return from useLenis()
    const lenis = useLenis();

    const scrollTo = (
        target: string | number | HTMLElement,
        options: ScrollToOptions = {}
    ): void => {
        if (lenis) {
            lenis.scrollTo(target, {
                offset: -100, // Account for header
                duration: 1.2,
                ...options,
            });
        }
    };

    return { scrollTo };
}

export default function SmoothScroll({ children }: SmoothScrollProps): JSX.Element {
    const pathname = usePathname();
    const [isReady, setIsReady] = useState<boolean>(false);

    // Reset scroll position on route change
    useEffect(() => {
        if (isReady) {
            window.scrollTo(0, 0);
        }
    }, [pathname, isReady]);

    // Mark as ready after hydration
    useEffect(() => {
        setIsReady(true);
    }, []);

    // Define Lenis options with types
    const lenisOptions: LenisOptions = {
        lerp: 0.1,
        duration: 1.2,
        smoothTouch: false,
        smoothWheel: true,
        wheelMultiplier: 1,
        orientation: 'vertical',
        gestureOrientation: 'vertical',
    };

    return (
        <ReactLenis root options={lenisOptions}>
            {children}
        </ReactLenis>
    );
}
