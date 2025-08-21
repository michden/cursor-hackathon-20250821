import React, { useEffect, useState, useRef, useCallback } from 'react';

interface UseAnimatedNumberOptions {
  duration?: number;
  decimals?: number;
  delay?: number;
  startFrom?: number;
  prefix?: string;
  suffix?: string;
  separator?: string;
  easing?: (t: number) => number;
  startOnMount?: boolean; // Add option to start immediately on mount
}

export const useAnimatedNumber = (
  endValue: number,
  options: UseAnimatedNumberOptions = {}
) => {
  const {
    duration = 2000,
    decimals = 0,
    delay = 0,
    startFrom = 0,
    prefix = '',
    suffix = '',
    separator = ',',
    easing = easeOutExpo,
    startOnMount = false, // Default to false for backward compatibility
  } = options;

  const [displayValue, setDisplayValue] = useState<string>(`${prefix}${startFrom}${suffix}`);
  const [hasStarted, setHasStarted] = useState(false);
  const animationRef = useRef<number | null>(null);
  const startTimeRef = useRef<number | null>(null);
  const elementRef = useRef<HTMLElement | null>(null);
  const observerRef = useRef<IntersectionObserver | null>(null);
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);

  // Easing function for smooth animation
  function easeOutExpo(t: number): number {
    return t === 1 ? 1 : 1 - Math.pow(2, -10 * t);
  }

  // Format number with separator
  const formatNumber = useCallback((num: number): string => {
    const fixedNum = num.toFixed(decimals);
    if (separator) {
      const parts = fixedNum.split('.');
      parts[0] = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, separator);
      return parts.join('.');
    }
    return fixedNum;
  }, [decimals, separator]);

  // Animation loop
  const animationLoop = useCallback(() => {
    if (!startTimeRef.current) {
      startTimeRef.current = performance.now();
    }

    const currentTime = performance.now();
    const elapsed = currentTime - startTimeRef.current;
    const progress = Math.min(elapsed / duration, 1);
    
    const easedProgress = easing(progress);
    const currentValue = startFrom + (endValue - startFrom) * easedProgress;
    
    setDisplayValue(`${prefix}${formatNumber(currentValue)}${suffix}`);

    if (progress < 1) {
      animationRef.current = requestAnimationFrame(animationLoop);
    }
  }, [duration, startFrom, endValue, prefix, suffix, formatNumber, easing]);

  // Start animation
  const startAnimation = useCallback(() => {
    if (hasStarted) return;
    
    setHasStarted(true);
    startTimeRef.current = null;
    
    if (delay > 0) {
      timeoutRef.current = setTimeout(() => {
        animationLoop();
      }, delay);
    } else {
      animationLoop();
    }
  }, [hasStarted, delay, animationLoop]);

  // Start on mount if specified
  useEffect(() => {
    if (startOnMount && !hasStarted) {
      startAnimation();
    }
  }, [startOnMount, startAnimation, hasStarted]);

  // Set up intersection observer for scroll-triggered animations
  useEffect(() => {
    if (startOnMount) return; // Skip observer if starting on mount
    
    const handleIntersection = (entries: IntersectionObserverEntry[]) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting && !hasStarted) {
          startAnimation();
        }
      });
    };

    observerRef.current = new IntersectionObserver(handleIntersection, {
      threshold: 0.1,
    });

    // Check if element is already in view when observer is created
    if (elementRef.current) {
      const rect = elementRef.current.getBoundingClientRect();
      const isInViewport = rect.top < window.innerHeight && rect.bottom > 0;
      
      if (isInViewport) {
        startAnimation();
      } else {
        observerRef.current.observe(elementRef.current);
      }
    }

    return () => {
      if (observerRef.current) {
        observerRef.current.disconnect();
      }
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
    };
  }, [startOnMount, startAnimation, hasStarted]);

  // Ref callback
  const ref = useCallback((element: HTMLElement | null) => {
    if (element) {
      elementRef.current = element;
      
      // If not starting on mount, check if element is in view
      if (!startOnMount && !hasStarted && observerRef.current) {
        const rect = element.getBoundingClientRect();
        const isInViewport = rect.top < window.innerHeight && rect.bottom > 0;
        
        if (isInViewport) {
          startAnimation();
        } else {
          observerRef.current.observe(element);
        }
      }
    }
  }, [startOnMount, hasStarted, startAnimation]);

  return {
    displayValue,
    ref,
    hasAnimated: hasStarted,
  };
};

// Additional easing functions
export const easings = {
  linear: (t: number) => t,
  easeInQuad: (t: number) => t * t,
  easeOutQuad: (t: number) => t * (2 - t),
  easeInOutQuad: (t: number) => (t < 0.5 ? 2 * t * t : -1 + (4 - 2 * t) * t),
  easeInCubic: (t: number) => t * t * t,
  easeOutCubic: (t: number) => --t * t * t + 1,
  easeInOutCubic: (t: number) => t < 0.5 ? 4 * t * t * t : (t - 1) * (2 * t - 2) * (2 * t - 2) + 1,
  easeOutExpo: (t: number) => (t === 1 ? 1 : 1 - Math.pow(2, -10 * t)),
  easeOutElastic: (t: number) => {
    const c4 = (2 * Math.PI) / 3;
    return t === 0
      ? 0
      : t === 1
      ? 1
      : Math.pow(2, -10 * t) * Math.sin((t * 10 - 0.75) * c4) + 1;
  },
};