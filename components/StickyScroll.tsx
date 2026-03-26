'use client';

import { useEffect, useRef } from 'react';

interface StickyScrollProps {
  children: React.ReactNode;
  id: string;
}

export default function StickyScroll({ children, id }: StickyScrollProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const container = containerRef.current;
    const content = contentRef.current;

    if (!container || !content) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          // Calculate the scroll distance relative to the container
          const rect = entry.boundingClientRect;
          const scrollProgress = Math.max(0, (window.innerHeight - rect.top) / (window.innerHeight + rect.height));

          // Apply transformations based on scroll position
          content.style.transform = `translateZ(0)`;
          content.style.willChange = 'transform';
        }
      },
      { threshold: [0, 0.25, 0.5, 0.75, 1] }
    );

    observer.observe(container);
    return () => observer.disconnect();
  }, []);

  return (
    <div ref={containerRef} id={id} className="relative">
      <div ref={contentRef}>{children}</div>
    </div>
  );
}
