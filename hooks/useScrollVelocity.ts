'use client';

import { useEffect, useRef, useState } from 'react';

interface ScrollData {
  velocity: number;
  direction: 'up' | 'down';
  position: number;
  isScrolling: boolean;
}

export function useScrollVelocity() {
  const [scrollData, setScrollData] = useState<ScrollData>({
    velocity: 0,
    direction: 'down',
    position: 0,
    isScrolling: false,
  });

  const lastPositionRef = useRef(0);
  const lastTimeRef = useRef(0);
  const scrollTimeoutRef = useRef<NodeJS.Timeout>(null);
  const velocityRef = useRef(0);

  useEffect(() => {
    const handleScroll = () => {
      const currentTime = Date.now();
      const currentPosition = window.scrollY;
      const deltaTime = currentTime - lastTimeRef.current;
      const deltaPosition = currentPosition - lastPositionRef.current;

      if (deltaTime > 0) {
        // Calculate velocity in pixels per millisecond
        const newVelocity = deltaPosition / deltaTime;
        velocityRef.current = newVelocity;

        setScrollData({
          velocity: Math.abs(newVelocity),
          direction: deltaPosition > 0 ? 'down' : 'up',
          position: currentPosition,
          isScrolling: true,
        });
      }

      lastPositionRef.current = currentPosition;
      lastTimeRef.current = currentTime;

      // Clear previous timeout
      if (scrollTimeoutRef.current) {
        clearTimeout(scrollTimeoutRef.current);
      }

      // Set timeout to mark scroll as stopped
      scrollTimeoutRef.current = setTimeout(() => {
        setScrollData((prev) => ({ ...prev, isScrolling: false }));
      }, 150);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => {
      window.removeEventListener('scroll', handleScroll);
      if (scrollTimeoutRef.current) {
        clearTimeout(scrollTimeoutRef.current);
      }
    };
  }, []);

  return scrollData;
}
