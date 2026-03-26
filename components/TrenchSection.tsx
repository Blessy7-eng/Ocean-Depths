'use client';

import { useEffect, useRef, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import MoanaTrail from '@/components/Moana';
import Image from 'next/image';

interface TrenchSectionProps {
  sonarEnabled: boolean;
}

export default function TrenchSection({ sonarEnabled }: TrenchSectionProps) {
  const sectionRef = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(false);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => setIsVisible(entry.isIntersecting),
      { threshold: 0.2 }
    );
    if (sectionRef.current) observer.observe(sectionRef.current);
    
    const handleMouseMove = (e: MouseEvent) => {
      if (isVisible) {
        setMousePos({ x: e.clientX, y: e.clientY });
      }
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => {
      observer.disconnect();
      window.removeEventListener('mousemove', handleMouseMove);
    };
  }, [isVisible]);

  return (
    <section
      ref={sectionRef}
      id="trench"
      className="relative min-h-screen py-32 px-6 flex items-center justify-center overflow-hidden bg-black"
    >
      {/* 🌊 MAGICAL WATER RIPPLE LAYER */}
      {/* This creates a "glow" that follows your cursor behind the content */}
      <div 
        className="absolute inset-0 pointer-events-none transition-opacity duration-1000 z-0"
        style={{
          opacity: isVisible ? 1 : 0,
          background: `radial-gradient(600px circle at ${mousePos.x}px ${mousePos.y}px, rgba(14, 165, 233, 0.15), transparent 80%)`
        }}
      />

      {/* Background Deep Glow */}
      <div className="absolute inset-0 bg-gradient-to-b from-black via-[#0a0505] to-black pointer-events-none" />
      
      {/* ✨ THE MOANA SPARKLE TRAIL */}
      <MoanaTrail />

      <div className="relative z-10 max-w-6xl w-full">
        <div className="grid md:grid-cols-2 gap-12 lg:gap-20 items-center">
          
          {/* 🖼️ Left: The Trench Illustration Card */}
          <motion.div 
            initial={{ opacity: 0, x: -40 }}
            animate={isVisible ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="relative group"
          >
            {/* Outer Glow Decor */}
            <div className="absolute -inset-1 bg-cyan-500/20 blur-2xl rounded-[2.5rem] opacity-0 group-hover:opacity-100 transition-opacity duration-700" />
            
            <div className="relative aspect-[4/5] md:aspect-square overflow-hidden rounded-[2rem] border border-red-900/30 bg-neutral-900 shadow-2xl">
              <Image
                src="/hadal-trench-zone.png"
                alt="Hadal Trench Exploration"
                fill
                className="object-cover transition-transform duration-[2s] group-hover:scale-110"
              />

              {/* Scanline Overlay */}
              <div className="absolute inset-0 pointer-events-none bg-[linear-gradient(rgba(18,16,16,0)_50%,rgba(0,0,0,0.25)_50%),linear-gradient(90deg,rgba(255,0,0,0.06),rgba(0,255,0,0.02),rgba(0,0,255,0.06))] bg-[length:100%_2px,3px_100%] z-10" />
              
              <div className="absolute inset-0 border-[20px] border-black/40 pointer-events-none z-20" />
              
              <div className="absolute top-6 left-6 z-30 font-mono text-[10px] text-red-500/80 bg-black/40 px-2 py-1 backdrop-blur-sm">
                REC ● HADAL_ZONE_V01
              </div>
            </div>
          </motion.div>

          {/* 📝 Right: Information Content */}
          <div className="space-y-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={isVisible ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: 0.2 }}
            >
              <span className="text-cyan-500 font-mono text-xs tracking-[0.5em] uppercase mb-4 block">
                Deep-Sea Subduction
              </span>
              <h2 className="text-5xl md:text-7xl font-black text-white leading-tight">
                THE <span className="text-transparent bg-clip-text bg-gradient-to-b from-cyan-400 to-blue-800">HADAL</span> TRENCH
              </h2>
            </motion.div>

            <motion.p 
              className="text-slate-400 text-lg md:text-xl leading-relaxed"
              initial={{ opacity: 0 }}
              animate={isVisible ? { opacity: 1 } : {}}
              transition={{ delay: 0.4 }}
            >
              Where fantasy meets the abyss. In the <strong>Hadal Zone</strong>, the bioluminescence feels like magic, painting the dark trenches with shimmering blue mana.
            </motion.p>

            <AnimatePresence>
              {sonarEnabled && (
                <motion.div 
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: "auto", opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  className="p-6 bg-cyan-950/20 border border-cyan-500/30 rounded-2xl backdrop-blur-md"
                >
                  <div className="flex justify-between items-center mb-4">
                    <span className="text-cyan-400 font-mono text-xs tracking-widest">MANA RESONANCE</span>
                    <span className="text-cyan-500 font-bold underline decoration-wavy">EXTREME</span>
                  </div>
                  <div className="w-full h-1 bg-cyan-900/30 rounded-full overflow-hidden">
                    <motion.div 
                      className="h-full bg-cyan-500 shadow-[0_0_10px_#22d3ee]"
                      initial={{ width: 0 }}
                      animate={{ width: "98%" }}
                      transition={{ duration: 1.5, ease: "circOut" }}
                    />
                  </div>
                </motion.div>
              )}
            </AnimatePresence>

            <div className="flex gap-4">
              <button className="px-8 py-4 bg-cyan-600 text-white font-bold uppercase tracking-tighter hover:bg-white hover:text-cyan-600 transition-colors duration-300 shadow-[0_0_20px_rgba(8,145,178,0.3)]">
                Data Log
              </button>
              <button className="px-8 py-4 border border-cyan-900 text-cyan-500 font-bold uppercase tracking-tighter hover:bg-cyan-950 transition-colors duration-300">
                Species Info
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}