'use client';
import TransitionSVG from '@/components/TransitionSVG';
import React, { useState, createContext, useContext, useEffect } from 'react';
import gsap from 'gsap';

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
    
    // Initial page loading animation
    useEffect(() => {
        const contentElement = document.getElementById('page-content');
        
        if (contentElement) {
            // Set initial opacity
            gsap.set(contentElement, { opacity: 0 });
            
            // Fade in
            gsap.to(contentElement, {
                opacity: 1,
                duration: 0.8,
                ease: 'power2.out',
                delay: 0.2
            });
        }
    }, []);
    
    const startTransition = (callback: () => void): void => {
        if (isTransitioning) return;
        
        // Lock scrolling
        document.body.style.overflow = 'hidden';
        
        // Start transition with fullscreen overlay
        setIsTransitioning(true);
        document.documentElement.classList.add('page-transitioning');
        
        // Fade out current content
        const contentElement = document.getElementById('page-content');
        if (contentElement) {
            gsap.to(contentElement, {
                opacity: 0,
                duration: 0.4,
                ease: 'power2.in',
            });
        }
        
        // Let the overlay animate in first
        setTimeout(() => {
            // Execute the navigation callback
            callback();
            
            // Give more time for the transition effects and page load
            setTimeout(() => {
                // Fade in new content
                if (contentElement) {
                    gsap.fromTo(contentElement, 
                        { opacity: 0 },
                        { 
                            opacity: 1, 
                            duration: 0.5, 
                            ease: 'power2.out',
                        }
                    );
                }
                
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
