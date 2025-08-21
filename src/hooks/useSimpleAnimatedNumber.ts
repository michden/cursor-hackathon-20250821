import { useEffect, useState, useRef } from 'react';

interface UseSimpleAnimatedNumberOptions {
  duration?: number;
  decimals?: number;
  delay?: number;
  prefix?: string;
  suffix?: string;
}

export const useSimpleAnimatedNumber = (
  endValue: number,
  options: UseSimpleAnimatedNumberOptions = {}
) => {
  const {
    duration = 2000,
    decimals = 0,
    delay = 0,
    prefix = '',
    suffix = '',
  } = options;

  const [displayValue, setDisplayValue] = useState<string>(`${prefix}0${suffix}`);
  const [isVisible, setIsVisible] = useState(false);
  const hasAnimated = useRef(false);
  const elementRef = useRef<HTMLElement | null>(null);

  // Format number with comma separator
  const formatNumber = (num: number): string => {
    const fixedNum = num.toFixed(decimals);
    const parts = fixedNum.split('.');
    parts[0] = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, ',');
    return parts.join('.');
  };

  useEffect(() => {
    if (!isVisible || hasAnimated.current) return;

    hasAnimated.current = true;
    let startTime: number | null = null;
    let animationFrame: number;

    const animate = (currentTime: number) => {
      if (!startTime) startTime = currentTime;
      const elapsed = currentTime - startTime - delay;

      if (elapsed < 0) {
        animationFrame = requestAnimationFrame(animate);
        return;
      }

      const progress = Math.min(elapsed / duration, 1);
      const easeOutExpo = progress === 1 ? 1 : 1 - Math.pow(2, -10 * progress);
      const currentValue = endValue * easeOutExpo;

      setDisplayValue(`${prefix}${formatNumber(currentValue)}${suffix}`);

      if (progress < 1) {
        animationFrame = requestAnimationFrame(animate);
      }
    };

    animationFrame = requestAnimationFrame(animate);

    return () => {
      if (animationFrame) {
        cancelAnimationFrame(animationFrame);
      }
    };
  }, [isVisible, endValue, duration, delay, decimals, prefix, suffix]);

  // Set up intersection observer
  useEffect(() => {
    const element = elementRef.current;
    if (!element) return;

    let observer: IntersectionObserver | null = null;

    // Small delay to ensure DOM is fully ready
    const checkVisibility = () => {
      const rect = element.getBoundingClientRect();
      const isInViewport = rect.top < window.innerHeight && rect.bottom > 0;
      
      if (isInViewport && !hasAnimated.current) {
        setIsVisible(true);
      } else {
        observer = new IntersectionObserver(
          (entries) => {
            entries.forEach((entry) => {
              if (entry.isIntersecting && !hasAnimated.current) {
                setIsVisible(true);
                if (observer) {
                  observer.unobserve(entry.target);
                }
              }
            });
          },
          { threshold: 0.1 }
        );
        observer.observe(element);
      }
    };

    // Use requestAnimationFrame to ensure DOM is ready
    const frameId = requestAnimationFrame(checkVisibility);

    return () => {
      cancelAnimationFrame(frameId);
      if (observer) {
        observer.disconnect();
      }
    };
  }, []);

  const ref = (element: HTMLElement | null) => {
    if (element && element !== elementRef.current) {
      elementRef.current = element;
      
      // Check visibility immediately when ref is set
      const rect = element.getBoundingClientRect();
      const isInViewport = rect.top < window.innerHeight && rect.bottom > 0;
      
      if (isInViewport && !hasAnimated.current) {
        setIsVisible(true);
      }
    }
  };

  return { displayValue, ref };
};
