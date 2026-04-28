'use client';

import { useEffect, useState } from 'react';

/**
 * Hook to observe when an element enters the viewport
 * @param {Object} options - IntersectionObserver options
 * @param {Element|null} options.root - The root element to use for intersection (default: viewport)
 * @param {string} options.rootMargin - Margin around the root (default: '0px')
 * @param {number|number[]} options.threshold - Percentage of visibility to trigger (default: 0.1)
 * @param {boolean} options.freezeOnceVisible - Stop observing once visible (default: false)
 * @returns {[function, boolean]} - Ref setter and isIntersecting flag
 */
export default function useIntersectionObserver({
  root = null,
  rootMargin = '0px',
  threshold = 0.1,
  freezeOnceVisible = false,
} = {}) {
  const [ref, setRef] = useState(null);
  const [isIntersecting, setIsIntersecting] = useState(false);

  useEffect(() => {
    if (!ref) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsIntersecting(entry.isIntersecting);

        if (entry.isIntersecting && freezeOnceVisible) {
          observer.disconnect();
        }
      },
      { root, rootMargin, threshold }
    );

    observer.observe(ref);

    return () => {
      if (ref) observer.unobserve(ref);
    };
  }, [ref, root, rootMargin, threshold, freezeOnceVisible]);

  return [setRef, isIntersecting];
}
