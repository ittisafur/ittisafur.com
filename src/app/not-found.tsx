'use client';

import { useEffect, useState } from 'react';

import { useTransitionRouter } from 'next-view-transitions';
import { useTransition } from '@/providers/Transition';

export default function NotFound() {
    const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

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
        const handleMouseMove = (e: MouseEvent) => {
            setMousePosition({ x: e.clientX, y: e.clientY });
        };

        window.addEventListener('mousemove', handleMouseMove);
        return () => window.removeEventListener('mousemove', handleMouseMove);
    }, []);

    const moveX = mousePosition.x / 50;
    const moveY = mousePosition.y / 50;

    return (
        <div className="min-h-screen w-full bg-[#111111] text-[#F0F0F0] flex flex-col items-center justify-center relative overflow-hidden">
            <div
                className="absolute w-[40vw] h-[40vw] rounded-full bg-blue-600/5 blur-3xl"
                style={{
                    left: `calc(20% + ${moveX}px)`,
                    top: `calc(30% + ${moveY}px)`,
                }}
            />
            <div
                className="absolute w-[30vw] h-[30vw] rounded-full bg-blue-400/5 blur-3xl"
                style={{
                    right: `calc(25% - ${moveX}px)`,
                    bottom: `calc(20% - ${moveY}px)`,
                }}
            />

            <div
                className="relative backdrop-blur-[20px] bg-[rgba(16,16,16,0.1)] border border-[rgba(255,255,255,0.1)] 
                   rounded-xl p-12 md:p-16 max-w-lg w-full text-center
                   transform transition-all duration-300 hover:shadow-[0_0_40px_rgba(50,130,240,0.1)]"
            >
                <h1 className="text-8xl font-bold mb-4 text-[#F0F0F0]">404</h1>
                <div className="w-full h-0.5 bg-it-border/10 my-6" />

                <h2 className="text-4xl font-bold tracking-wide mb-6 uppercase">Page Not Found</h2>

                <p className="text-gray-300 mb-10">
                    The page you are looking for doesn&apos;t exist or has been moved to another
                    location.
                </p>

                <a
                    href="/"
                    onClick={(e: React.MouseEvent<HTMLAnchorElement>) => {
                        e.preventDefault();
                        handleNavigation(`/`);
                    }}
                    className="inline-block font-medium border-[#F0F0F0] border px-8 py-3 rounded 
                   hover:scale-95 hover:bg-[#F0F0F0] hover:text-[#1A1A1A] 
                   transition-all ease-in duration-300 text-base group"
                >
                    Back To Home{' '}
                    <span className="group-hover:translate-x-1 inline-block transition-transform">
                        →
                    </span>
                </a>
            </div>

            <div className="mt-10 text-xs text-gray-500 tracking-wider uppercase">
                Error Code: 404 | Page Not Found
            </div>
        </div>
    );
}
