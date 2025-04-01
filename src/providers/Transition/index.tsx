'use client';

import TransitionSVG from '@/components/TransitionSVG';
import React, { useState, createContext, useContext } from 'react';

interface TransitionContextType {
    startTransition: (callback: () => void) => void;
    isTransitioning: boolean;
}

const TransitionContext = createContext<TransitionContextType>({
    startTransition: () => {},
    isTransitioning: false,
});

export const useTransition = () => useContext(TransitionContext);

interface TransitionProviderProps {
    children: React.ReactNode;
}

export const TransitionProvider: React.FC<TransitionProviderProps> = ({ children }) => {
    const [isTransitioning, setIsTransitioning] = useState<boolean>(false);

    const startTransition = (callback: () => void): void => {
        if (isTransitioning) return;

        // Lock scrolling
        document.body.style.overflow = 'hidden';

        // Start transition with fullscreen overlay
        setIsTransitioning(true);
        document.documentElement.classList.add('page-transitioning');

        // Let the overlay animate in first
        setTimeout(() => {
            // Execute the navigation callback
            callback();

            // Give more time for the transition effects and page load
            setTimeout(() => {
                // End transition
                setIsTransitioning(false);
                document.documentElement.classList.remove('page-transitioning');

                // Restore scrolling
                document.body.style.overflow = '';
            }, 1200); // Longer duration for full-screen effect
        }, 600); // Wait longer before navigation
    };

    return (
        <TransitionContext.Provider value={{ startTransition, isTransitioning }}>
            {children}
            <TransitionSVG isActive={isTransitioning} />
        </TransitionContext.Provider>
    );
};

export default TransitionProvider;
