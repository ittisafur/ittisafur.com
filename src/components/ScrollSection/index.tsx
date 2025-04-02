'use client';

import React, { useRef, useEffect } from 'react';
import { useLenis } from '@studio-freight/react-lenis';
// import type { LenisInstance } from '@/types/lenis';

// Animation types
type AnimationType = 'fade' | 'slide' | 'scale' | 'none';

interface ScrollSectionProps {
    children: React.ReactNode;
    className?: string;
    id?: string;
    animation?: AnimationType;
    delay?: number;
    threshold?: number;
    once?: boolean;
}

// Define types for IntersectionObserver config
interface ObserverOptions {
    threshold: number;
    rootMargin: string;
}

/**
 * A section component that automatically animates when scrolled into view
 */
const ScrollSection: React.FC<ScrollSectionProps> = ({
    children,
    className = '',
    id,
    animation = 'fade',
    delay = 0,
    threshold = 0.2,
    once = true,
}): JSX.Element => {
    const sectionRef = useRef<HTMLDivElement | null>(null);
    const hasAnimatedRef = useRef<boolean>(false);
    // Explicitly type the return from useLenis()
    const lenis = useLenis();

    useEffect(() => {
        if (!sectionRef.current || !lenis || animation === 'none') return;

        // Save a reference to the current section element to avoid the React hooks warning
        const currentSection = sectionRef.current;

        // Generate styles based on animation type
        const applyAnimation = (element: HTMLElement): void => {
            const duration = 800; // ms
            const timing = 'cubic-bezier(0.4, 0, 0.2, 1)';

            switch (animation) {
                case 'fade':
                    element.style.opacity = '0';
                    element.style.transform = 'translateY(20px)';
                    element.style.transition = `opacity ${duration}ms ${timing} ${delay * 1000}ms, transform ${duration}ms ${timing} ${delay * 1000}ms`;

                    setTimeout(() => {
                        element.style.opacity = '1';
                        element.style.transform = 'translateY(0)';
                    }, 50);
                    break;

                case 'slide':
                    element.style.opacity = '0';
                    element.style.transform = 'translateX(-50px)';
                    element.style.transition = `opacity ${duration}ms ${timing} ${delay * 1000}ms, transform ${duration}ms ${timing} ${delay * 1000}ms`;

                    setTimeout(() => {
                        element.style.opacity = '1';
                        element.style.transform = 'translateX(0)';
                    }, 50);
                    break;

                case 'scale':
                    element.style.opacity = '0';
                    element.style.transform = 'scale(0.9)';
                    element.style.transition = `opacity ${duration}ms ${timing} ${delay * 1000}ms, transform ${duration}ms ${timing} ${delay * 1000}ms`;

                    setTimeout(() => {
                        element.style.opacity = '1';
                        element.style.transform = 'scale(1)';
                    }, 50);
                    break;
            }

            hasAnimatedRef.current = true;
        };

        // Create the observer
        const observerOptions: ObserverOptions = {
            threshold,
            rootMargin: '0px',
        };

        const observer = new IntersectionObserver((entries) => {
            entries.forEach((entry) => {
                if (entry.isIntersecting && (!once || !hasAnimatedRef.current)) {
                    if (currentSection) {
                        applyAnimation(currentSection);
                    }

                    if (once) {
                        observer.unobserve(currentSection);
                    }
                }
            });
        }, observerOptions);

        // Start observing
        observer.observe(currentSection);

        // Cleanup
        return () => {
            observer.unobserve(currentSection);
        };
    }, [animation, delay, lenis, once, threshold]);

    return (
        <section ref={sectionRef} className={className} id={id}>
            {children}
        </section>
    );
};

export default ScrollSection;
