'use client';

import { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { motion } from 'framer-motion';

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

export default function DepthMeter() {
  const [depth, setDepth] = useState(0);

  useEffect(() => {
    // Refresh to ensure ScrollTrigger knows the full page height
    ScrollTrigger.refresh();

    const st = ScrollTrigger.create({
      trigger: "body",
      start: "top top",
      end: "bottom bottom",
      scrub: 0.1, // Lower value makes it more responsive to your scroll
      onUpdate: (self) => {
        // self.progress is a value from 0 to 1
        // We multiply by 11,000 to map it to the ocean's depth
        const currentProgress = self.progress * 11000;
        setDepth(Math.floor(currentProgress));
      }
    });

    return () => {
      st.kill();
    };
  }, []);

  return (
    <div className="fixed bottom-8 right-8 z-[100] font-mono text-white pointer-events-none">
      {/* Added a glass-morphism background for guaranteed readability */}
      <div className="flex flex-col items-end bg-black/30 backdrop-blur-md p-4 rounded-xl border border-white/10 shadow-2xl">
        
        {/* Label: Made bold and high-contrast cyan */}
        <div className="text-[11px] tracking-[0.2em] uppercase text-cyan-400 font-bold mb-1 drop-shadow-md">
          Current Depth
        </div>
        
        {/* Depth Number: Increased size and added tabular-nums to prevent shaking */}
        <div className="text-5xl font-black tabular-nums flex items-baseline gap-2 drop-shadow-lg">
          {depth.toLocaleString()}
          <span className="text-xl font-medium text-cyan-300">M</span>
        </div>

        {/* Visual Progress Bar: Thicker and with a gradient */}
        <div className="w-40 h-[4px] bg-white/10 mt-3 rounded-full overflow-hidden">
          <motion.div 
            className="h-full bg-gradient-to-r from-cyan-400 to-blue-500"
            style={{ width: `${(depth / 11000) * 100}%` }}
          />
        </div>
      </div>
    </div>
  );
}