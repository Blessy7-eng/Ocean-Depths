'use client';

import { useEffect, useRef } from 'react';

export default function CursorFollow() {
  const cursorRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (cursorRef.current) {
        cursorRef.current.style.left = e.clientX + 'px';
        cursorRef.current.style.top = e.clientY + 'px';
      }
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  return (
    <div
      ref={cursorRef}
      className="fixed w-8 h-8 pointer-events-none z-40 -translate-x-1/2 -translate-y-1/2"
    >
      {/* Outer ring */}
      <div className="absolute inset-0 border border-cyan-400 rounded-full opacity-50" />
      
      {/* Inner dot */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-2 h-2 bg-cyan-400 rounded-full opacity-70" />
      
      {/* Glow effect */}
      <div className="absolute inset-0 bg-cyan-400 rounded-full opacity-20 blur-md" />
    </div>
  );
}
