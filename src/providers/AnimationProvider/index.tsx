'use client';

import React, { createContext, useContext, useEffect, useRef, useCallback } from 'react';
import gsap from 'gsap';
import SplitType from 'split-type';
import { usePathname } from 'next/navigation';

// Context to provide animation functions
interface AnimationContextProps {
  animateElements: () => void;
}

const AnimationContext = createContext<AnimationContextProps | undefined>(undefined);

export const useAnimation = () => {
  const context = useContext(AnimationContext);
  if (!context) {
    throw new Error('useAnimation must be used within an AnimationProvider');
  }
  return context;
};

export const AnimationProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const initialized = useRef(false);
  const pathname = usePathname();
  const animationsApplied = useRef<Set<Element>>(new Set());

  // Special handler for gradient text elements
  const animateGradientText = useCallback((element: Element) => {
    // First make the element visible
    gsap.set(element, { opacity: 1, visibility: 'visible' });
    
    // Use direct DOM manipulation for the h1 inner content
    const textContent = element.textContent || '';
    
    // Clear the element's content temporarily
    const originalHTML = element.innerHTML;
    element.innerHTML = '';
    
    // Create character spans manually
    const chars = textContent.split('');
    chars.forEach(char => {
      const span = document.createElement('span');
      span.className = 'gradient-char';
      span.textContent = char;
      span.style.display = 'inline-block';
      span.style.opacity = '0';
      span.style.transform = 'translateY(100px)';
      element.appendChild(span);
    });
    
    // Now animate each character
    const charElements = element.querySelectorAll('.gradient-char');
    gsap.to(charElements, {
      y: 0,
      opacity: 1,
      duration: 1.2,
      stagger: 0.04,
      ease: 'power4.out',
      onComplete: () => {
        // Restore original HTML to maintain gradient functionality
        // but only after animation completes
        element.innerHTML = originalHTML;
        gsap.set(element, { opacity: 1, visibility: 'visible' });
      }
    });
  }, []);
  
  // NEW ANIMATION: Blur to sharp for text elements
  const animateBlurToSharp = useCallback((element: Element) => {
    // First, ensure the element is visible but blurry
    gsap.set(element, { 
      opacity: 0, 
      filter: 'blur(15px)',
      visibility: 'visible'
    });
    
    // Animate from blurry to sharp
    gsap.to(element, {
      opacity: 1,
      filter: 'blur(0px)',
      duration: 1.2,
      ease: 'power3.out'
    });
  }, []);
  
  // NEW ANIMATION: Zoom fade for images
  const animateZoomFade = useCallback((element: Element) => {
    // Set initial state - slightly smaller and transparent
    gsap.set(element, { 
      opacity: 0, 
      scale: 0.95,
      visibility: 'visible'
    });
    
    // Animate to full size and opacity
    gsap.to(element, {
      opacity: 1,
      scale: 1,
      duration: 1,
      ease: 'power2.out'
    });
  }, []);
  
  // NEW ANIMATION: Line-by-line reveal for paragraphs
  const animateLineByLine = useCallback((element: Element) => {
    // First ensure the element is visible
    gsap.set(element, { visibility: 'visible' });
    
    // Split the text into lines - cast to HTMLElement for TypeScript
    const splitText = new SplitType(element as HTMLElement, { types: "lines" });
    
    // Set initial state of lines
    gsap.set(splitText.lines, { 
      y: 30, 
      opacity: 0 
    });
    
    // Animate each line sequentially
    gsap.to(splitText.lines, {
      y: 0,
      opacity: 1,
      duration: 0.8,
      stagger: 0.1,
      ease: 'power3.out'
    });
  }, []);

  // Function to animate elements based on data attributes
  const animateElements = useCallback(() => {
    console.log("Animation function triggered");
    
    // Get all elements with data-animate attribute that haven't been animated yet
    const animatableElements = Array.from(document.querySelectorAll('[data-animate]')).filter(
      el => !animationsApplied.current.has(el)
    );
    
    if (animatableElements.length === 0) {
      console.log("No new elements to animate found");
      return;
    }
    
    console.log(`Found ${animatableElements.length} elements to animate`);

    // Create a master timeline
    const masterTimeline = gsap.timeline();
    
    // Group elements by their animation order
    const elementsByOrder: { [key: string]: Element[] } = {};
    
    // First, organize elements by their order attribute
    animatableElements.forEach(element => {
      const order = element.getAttribute('data-animate-order') || '999';
      if (!elementsByOrder[order]) {
        elementsByOrder[order] = [];
      }
      elementsByOrder[order].push(element);
    });
    
    // Get all orders and sort them numerically
    const orders = Object.keys(elementsByOrder).sort((a, b) => parseInt(a) - parseInt(b));
    
    // Process each group in order
    orders.forEach(order => {
      const elements = elementsByOrder[order];
      
      elements.forEach(element => {
        // Special handling for gradient h1 elements
        if (element.tagName === 'H1' && element.classList.contains('text-gradient')) {
          animateGradientText(element);
          animationsApplied.current.add(element);
          return;
        }
        
        const animationType = element.getAttribute('data-animate-type') || 'default';
        let splitText;
        
        switch (animationType) {
          case 'chars':
            // Cast to HTMLElement for SplitType
            splitText = new SplitType(element as HTMLElement, { types: "chars" });
            gsap.set(splitText.chars, { y: 100, opacity: 0 });
            
            masterTimeline.to(splitText.chars, {
              y: 0,
              opacity: 1,
              duration: 0.8,
              stagger: 0.03,
              ease: 'power3.out',
            }, parseInt(order) > 1 ? "-=0.3" : "");
            break;
            
          case 'words':
            // Cast to HTMLElement for SplitType
            splitText = new SplitType(element as HTMLElement, { types: "words" });
            gsap.set(splitText.words, { y: 40, opacity: 0 });
            
            masterTimeline.to(splitText.words, {
              y: 0,
              opacity: 1,
              duration: 0.7,
              stagger: 0.02,
              ease: 'power2.out',
            }, parseInt(order) > 1 ? "-=0.3" : "");
            break;
            
          case 'blur-to-sharp':
            // NEW ANIMATION TYPE
            animateBlurToSharp(element);
            break;
            
          case 'zoom-fade':
            // NEW ANIMATION TYPE
            animateZoomFade(element);
            break;
            
          case 'line-by-line':
            // NEW ANIMATION TYPE
            animateLineByLine(element);
            break;
            
          default:
            // Fade in the entire element without splitting
            gsap.set(element, { y: 30, opacity: 0 });
            
            masterTimeline.to(element, {
              y: 0,
              opacity: 1,
              duration: 0.6,
              ease: 'power2.out',
            }, parseInt(order) > 1 ? "-=0.2" : "");
            break;
        }
        
        // Mark this element as animated
        animationsApplied.current.add(element);
      });
    });
    
    // Start the master timeline with a slight delay
    masterTimeline.delay(0.2);
  }, [animateGradientText, animateBlurToSharp, animateZoomFade, animateLineByLine]);

  // Route transition animations
  const setupRouteTransitions = useCallback(() => {
    // Track when a route transition begins
    const handleRouteChangeStart = () => {
      // Fade out the current page content
      const content = document.getElementById('page-content');
      if (content) {
        gsap.to(content, {
          opacity: 0,
          duration: 0.4,
          ease: 'power2.in'
        });
      }
    };
    
    // Track when a route transition completes
    const handleRouteChangeComplete = () => {
      // Reset animations for new page
      animationsApplied.current = new Set();
      
      // Fade in the new page content
      const content = document.getElementById('page-content');
      if (content) {
        gsap.fromTo(content, 
          { opacity: 0 },
          { 
            opacity: 1, 
            duration: 0.4, 
            ease: 'power2.out',
            onComplete: () => {
              // Run page animations after fade in
              setTimeout(animateElements, 100);
            }
          }
        );
      }
    };
    
    // This would typically use router events, but for simplicity we'll 
    // use the pathname effect to detect changes
    return { handleRouteChangeStart, handleRouteChangeComplete };
  }, [animateElements]);

  // Set up intersection observer for scroll animations
  useEffect(() => {
    // Reset animations when route changes
    animationsApplied.current = new Set();
    initialized.current = false;
    
    console.log("Setting up animation system for path:", pathname);
    
    // Setup route transitions
    const { handleRouteChangeComplete } = setupRouteTransitions();
    
    // Handle new route
    handleRouteChangeComplete();
    
    // Initial animation with a delay to ensure DOM is ready
    const initialAnimationTimeout = setTimeout(() => {
      console.log("Running initial animations");
      animateElements();
      initialized.current = true;
    }, 500);

    // Also set up an intersection observer for elements that come into view later
    const observer = new IntersectionObserver(
      (entries) => {
        if (!initialized.current) return;
        
        const newInViewElements = entries
          .filter(entry => entry.isIntersecting)
          .map(entry => entry.target)
          .filter(el => !animationsApplied.current.has(el));
        
        if (newInViewElements.length > 0) {
          console.log(`${newInViewElements.length} new elements in viewport`);
          animateElements();
        }
      },
      { threshold: 0.15 }
    );

    // Observe all animatable elements
    document.querySelectorAll('[data-animate]').forEach(el => {
      observer.observe(el);
    });

    return () => {
      clearTimeout(initialAnimationTimeout);
      observer.disconnect();
    };
  }, [pathname, animateElements, setupRouteTransitions]);

  return (
    <AnimationContext.Provider value={{ animateElements }}>
      {children}
    </AnimationContext.Provider>
  );
};

export default AnimationProvider;
