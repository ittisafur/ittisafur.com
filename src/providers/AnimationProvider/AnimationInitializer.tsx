'use client';
import { useEffect } from 'react';
import gsap from 'gsap';

export default function AnimationInitializer() {
    useEffect(() => {
        // Multiple attempts to ensure we catch the element
        const attempts = [300, 600, 1000, 1500];

        const animateName = () => {
            // Find the heading by ID
            const nameHeading = document.getElementById('name-heading');

            if (nameHeading) {
                console.log('Found name heading, animating directly');

                // Make sure it's visible first
                gsap.set(nameHeading, { opacity: 1, visibility: 'visible' });

                // Get the text content
                const text = nameHeading.textContent || 'Ittisafur Rahman';

                // Store original HTML
                const originalHTML = nameHeading.innerHTML;

                // Clear content
                nameHeading.innerHTML = '';

                // Create spans for each character
                text.split('').forEach((char) => {
                    const span = document.createElement('span');
                    span.className = 'name-char';
                    span.textContent = char;
                    span.style.display = 'inline-block';
                    span.style.opacity = '0';
                    span.style.transform = 'translateY(40px)';
                    nameHeading.appendChild(span);
                });

                // Animate each character
                const chars = nameHeading.querySelectorAll('.name-char');
                gsap.to(chars, {
                    opacity: 1,
                    y: 0,
                    duration: 1,
                    stagger: 0.04,
                    ease: 'power4.out',
                    onComplete: () => {
                        // Reset to original content to maintain gradient
                        nameHeading.innerHTML = originalHTML;
                        gsap.set(nameHeading, { opacity: 1 });
                    },
                });

                // Clear the attempts since we succeeded
                attempts.forEach((t) => clearTimeout(timeoutIds[t]));
            }
        };

        // Try multiple times to ensure we catch the element
        const timeoutIds: Record<number, NodeJS.Timeout> = {};
        attempts.forEach((delay) => {
            timeoutIds[delay] = setTimeout(animateName, delay);
        });

        // Clean up timeouts
        return () => {
            attempts.forEach((t) => clearTimeout(timeoutIds[t]));
        };
    }, []);

    return null; // This component doesn't render anything
}
