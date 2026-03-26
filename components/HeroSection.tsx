'use client';

import { useEffect, useRef, useState } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import AmbientBubbles from '@/components/AmbientBubbles';
import WaterRipple from '@/components/WaterRipple';
import BackgroundCreatures from '@/components/BackgroundCreatures';

export default function HeroSection() {
  const sectionRef = useRef<HTMLDivElement>(null);
  
  // Hooking into scroll for parallax depth effects
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end start"]
  });

  const textY = useTransform(scrollYProgress, [0, 1], [0, 200]);
  const opacity = useTransform(scrollYProgress, [0, 0.8], [1, 0]);

  return (
    <section
      ref={sectionRef}
      className="relative h-[110vh] flex flex-col items-center justify-center overflow-hidden"
      style={{
        background: 'linear-gradient(180deg, #20c997 0%, #0ea5e9 50%, #0284c7 100%)',
      }}
    >
      {/* 🌊 IMMERSIVE LAYERS */}
      <WaterRipple />
      <AmbientBubbles />
      
      {/* Animated Light Rays (God Rays) */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div className="absolute top-[-10%] left-1/2 -translate-x-1/2 w-[200%] h-[100%] 
                      bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] 
                      from-white/20 via-transparent to-transparent 
                      blur-3xl opacity-50 animate-pulse" />
        <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/water.png')] opacity-10 mix-blend-overlay" />
      </div>

      <BackgroundCreatures
        creatures={[
          { type: 'fish', count: 6, colors: ['#22d3ee', '#06b6d4', '#0891b2', '#0e7490'] },
          { type: 'jellyfish', count: 3, colors: ['#60a5fa', '#3b82f6'] },
          { type: 'bubble', count: 10, colors: [] },
        ]}
        opacity={0.4}
      />

      {/* 📝 CORE CONTENT */}
      <motion.div 
        style={{ y: textY, opacity }}
        className="relative z-20 text-center px-6 max-w-5xl"
      >
        {/* Subtle Pre-heading */}
        <motion.span 
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="inline-block font-mono text-cyan-200 tracking-[0.3em] uppercase text-xs mb-4"
        >
          Explore the Uncharted
        </motion.span>

        <motion.h1 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.8 }}
          className="text-7xl md:text-9xl font-black mb-6 text-white tracking-tighter leading-none"
        >
          DEEP <span className="text-transparent bg-clip-text bg-gradient-to-b from-white to-cyan-400/50">BLUE</span>
        </motion.h1>
        
        <motion.p 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4, duration: 0.8 }}
          className="text-xl md:text-2xl text-white/80 mb-10 leading-relaxed max-w-2xl mx-auto font-light"
        >
          A vertical voyage from the vibrant surface to the 
          <span className="text-cyan-300 font-semibold italic"> crushing silence </span> 
          of the ocean floor.
        </motion.p>

        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
          className="flex flex-col sm:flex-row gap-6 justify-center items-center"
        >
          <button className="group relative px-10 py-4 bg-white text-blue-900 font-bold rounded-full overflow-hidden transition-all hover:scale-105 active:scale-95 shadow-[0_0_30px_rgba(255,255,255,0.3)]">
            <span className="relative z-10">BEGIN THE DESCENT</span>
            <div className="absolute inset-0 bg-gradient-to-r from-cyan-400 to-blue-400 opacity-0 group-hover:opacity-100 transition-opacity" />
          </button>
          
          <button className="px-10 py-4 border-2 border-white/30 text-white font-bold rounded-full hover:bg-white/10 hover:border-white transition-all backdrop-blur-sm">
            THE ZONES
          </button>
        </motion.div>
      </motion.div>

      {/* ⚓ SCROLL INDICATOR */}
      <div className="absolute bottom-12 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2">
        <span className="text-[10px] font-mono text-cyan-300 uppercase tracking-widest animate-pulse">Scroll to Dive</span>
        <div className="w-[1px] h-12 bg-gradient-to-b from-cyan-400 to-transparent" />
      </div>

      {/* 🌊 DYNAMIC BOTTOM WAVES */}
      <div className="absolute bottom-0 left-0 right-0 h-32 pointer-events-none">
        <svg className="w-full h-full" viewBox="0 0 1440 120" preserveAspectRatio="none">
          <motion.path 
            animate={{ d: [
              "M0,64L80,69.3C160,75,320,85,480,80C640,75,800,53,960,48C1120,43,1280,53,1360,58.7L1440,64L1440,120L1360,120C1280,120,1120,120,960,120C800,120,640,120,480,120C320,120,160,120,80,120L0,120Z",
              "M0,32L80,42.7C160,53,320,75,480,74.7C640,75,800,53,960,42.7C1120,32,1280,32,1360,32L1440,32L1440,120L1360,120C1280,120,1120,120,960,120C800,120,640,120,480,120C320,120,160,120,80,120L0,120Z",
              "M0,64L80,69.3C160,75,320,85,480,80C640,75,800,53,960,48C1120,43,1280,53,1360,58.7L1440,64L1440,120L1360,120C1280,120,1120,120,960,120C800,120,640,120,480,120C320,120,160,120,80,120L0,120Z"
            ]}}
            transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
            fill="rgba(15, 23, 42, 0.3)" 
          />
        </svg>
      </div>
    </section>
  );
}