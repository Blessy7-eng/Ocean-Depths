'use client';

import React, { useEffect, useState, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

export default function MoanaTrail() {
  const [particles, setParticles] = useState<{ id: number; x: number; y: number; size: number; color: string }[]>([]);

  const addParticle = useCallback((x: number, y: number) => {
    const id = Date.now() + Math.random();
    const colors = ['#22d3ee', '#0ea5e9', '#f0f9ff', '#67e8f9'];
    
    const newParticle = {
      id,
      x,
      y,
      size: Math.random() * 8 + 4, // Slightly larger for that "Moana" sparkle look
      color: colors[Math.floor(Math.random() * colors.length)],
    };

    setParticles((prev) => [...prev.slice(-20), newParticle]); 
  }, []);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      // ✨ FIX: We use clientX/Y but keep the container FIXED 
      // so the particles stay relative to the screen, not the document height.
      addParticle(e.clientX, e.clientY);
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, [addParticle]);

  return (
    // ✨ FIX: Changed to 'fixed' to ensure sparkles follow the cursor 
    // regardless of how far down the "Trench" you have scrolled.
    <div className="fixed inset-0 pointer-events-none z-[100] overflow-hidden">
      <AnimatePresence>
        {particles.map((p) => (
          <motion.div
            key={p.id}
            initial={{ opacity: 1, scale: 0, x: p.x, y: p.y }}
            animate={{ 
              opacity: 0, 
              scale: [1, 1.8, 0], // Grows then disappears
              y: p.y - 120, // Essence floats upward
              x: p.x + (Math.random() * 80 - 40), // More organic sideways drift
              rotate: Math.random() * 360
            }}
            exit={{ opacity: 0 }}
            transition={{ duration: 2, ease: "easeOut" }}
            className="absolute rounded-full"
            style={{
              // Remove left/top from here to prevent conflicts with x/y animation
              width: p.size,
              height: p.size,
              backgroundColor: p.color,
              boxShadow: `0 0 20px ${p.color}, 0 0 40px ${p.color}66`,
              filter: 'blur(0.5px)',
              mixBlendMode: 'screen' 
            }}
          />
        ))}
      </AnimatePresence>
    </div>
  );
}