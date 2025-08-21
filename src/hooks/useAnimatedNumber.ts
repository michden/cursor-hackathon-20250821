import { useEffect, useState, useRef } from 'react';

interface UseAnimatedNumberOptions {
  duration?: number;
  decimals?: number;
  delay?: number;
  startFrom?: number;
  prefix?: string;
  suffix?: string;
  separator?: string;
  easing?: (t: number) => number;
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
  } = options;

  const [displayValue, setDisplayValue] = useState<string>(`${prefix}${startFrom}${suffix}`);
  const [hasAnimated, setHasAnimated] = useState(false);
  const animationRef = useRef<number | null>(null);
  const startTimeRef = useRef<number | null>(null);
  const observerRef = useRef<IntersectionObserver | null>(null);
  const elementRef = useRef<HTMLElement | null>(null);

  // Easing function for smooth animation
  function easeOutExpo(t: number): number {
    return t === 1 ? 1 : 1 - Math.pow(2, -10 * t);
  }

  // Format number with separator
  const formatNumber = (num: number): string => {
    const fixedNum = num.toFixed(decimals);
    if (separator) {
      const parts = fixedNum.split('.');
      parts[0] = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, separator);
      return parts.join('.');
    }
    return fixedNum;
  };

  // Animation function
  const animate = () => {
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
      animationRef.current = requestAnimationFrame(animate);
    } else {
      setHasAnimated(true);
    }
  };

  // Start animation when element is in viewport
  const startAnimation = () => {
    if (!hasAnimated) {
      if (delay > 0) {
        setTimeout(() => {
          animate();
        }, delay);
      } else {
        animate();
      }
    }
  };

  // Set up intersection observer
  useEffect(() => {
    observerRef.current = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting && !hasAnimated) {
            startAnimation();
          }
        });
      },
      { threshold: 0.1 }
    );

    return () => {
      if (observerRef.current) {
        observerRef.current.disconnect();
      }
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
    };
  }, [hasAnimated, endValue]);

  // Function to bind to element
  const ref = (element: HTMLElement | null) => {
    if (element && observerRef.current) {
      elementRef.current = element;
      observerRef.current.observe(element);
    }
  };

  return {
    displayValue,
    ref,
    hasAnimated,
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
