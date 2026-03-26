'use client';

import React, { useMemo } from 'react';
import KineticScrollSection from './KineticScrollSection';
import { motion } from 'framer-motion';

interface AbyssSectionProps {
  sonarEnabled?: boolean;
}

export default function AbyssSection({ sonarEnabled }: AbyssSectionProps) {
  
  // Memoized background elements for stability and performance
  const backgroundBubbles = useMemo(() => 
    [...Array(35)].map((_, i) => ({
      id: i,
      left: `${Math.random() * 100}%`,
      top: `${Math.random() * 100}%`,
      duration: 5 + Math.random() * 8,
      delay: Math.random() * 5,
      scale: 0.6 + Math.random() * 1.4,
    })), []);

  return (
    <KineticScrollSection
      id="abyss"
      backgroundTitle="" 
      backgroundColor="bg-black" 
      description="Covering 83% of the ocean floor, the Abyssopelagic zone reaches depths of 6,000 meters. A realm of constant near-freezing temperatures and crushing pressures."
    >
      {/* 🌌 DYNAMIC BACKGROUND LAYER */}
      <div className="absolute inset-0 pointer-events-none z-0 overflow-hidden">
        
        {/* Deep Blue/Black Gradient Plane */}
        <div className="absolute inset-0 bg-gradient-to-b from-[#020617] via-[#011429] to-black" />

        {/* ✨ SPARKLE TITLE: Moved to the Top */}
        <div className="absolute inset-x-0 top-12 flex flex-col items-center justify-start z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.5 }}
            className="relative"
          >
            <h2 className="text-[10vw] font-black tracking-tighter leading-none uppercase select-none
                           bg-gradient-to-r from-blue-900 via-cyan-300 to-blue-900 bg-[length:200%_auto] 
                           animate-text-shimmer bg-clip-text text-transparent opacity-20">
              THE ABYSS
            </h2>
            
            {/* Tiny sparkling stars over the title */}
            {[...Array(8)].map((_, i) => (
              <motion.div
                key={i}
                className="absolute w-1 h-1 bg-white rounded-full blur-[1px]"
                animate={{ opacity: [0, 1, 0], scale: [0, 1.2, 0] }}
                transition={{ duration: 2 + Math.random() * 2, repeat: Infinity, delay: Math.random() * 3 }}
                style={{
                  left: `${Math.random() * 100}%`,
                  top: `${Math.random() * 100}%`,
                  boxShadow: '0 0 8px #fff'
                }}
              />
            ))}
          </motion.div>
        </div>

        {/* ✨ SPARKLING BUBBLES */}
        {backgroundBubbles.map((b) => (
          <motion.div
            key={b.id}
            className="absolute w-2 h-2 rounded-full"
            animate={{
              y: [0, -150],
              opacity: [0, 0.7, 0],
            }}
            transition={{
              duration: b.duration,
              repeat: Infinity,
              delay: b.delay,
              ease: "linear"
            }}
            style={{
              left: b.left,
              top: b.top,
              scale: b.scale,
              background: 'radial-gradient(circle, rgba(255,255,255,1) 0%, rgba(34,211,238,1) 70%, rgba(34,211,238,0) 100%)',
              boxShadow: '0 0 10px rgba(34, 211, 238, 0.4)',
              mixBlendMode: 'screen'
            }}
          />
        ))}

        {/* 🪼 LUMINOUS JELLYFISH - SVG Corrected */}
        <motion.div 
          className="absolute right-[10%] bottom-[15%] opacity-30 blur-[0.5px]"
          animate={{ y: [0, -50, 0], rotate: [-5, 5, -5] }}
          transition={{ duration: 18, repeat: Infinity, ease: "easeInOut" }}
        >
          <svg viewBox="0 0 200 200" className="w-64 h-64">
            <defs>
              <filter id="abyssGlowEffect">
                <feGaussianBlur stdDeviation="4" result="blur" />
                <feComposite in="SourceGraphic" in2="blur" operator="over" />
              </filter>
            </defs>
            <path 
              d="M 100 40 Q 60 40 55 80 Q 145 80 140 40 Z" 
              className="fill-cyan-950/40 stroke-cyan-400/50" 
              strokeWidth="2"
              filter="url(#abyssGlowEffect)"
            />
            <circle cx="100" cy="55" r="8" className="fill-cyan-300/40 animate-pulse" />
            {[80, 100, 120].map((x, i) => (
              <motion.path 
                key={i}
                d={`M ${x} 80 Q ${x} 120 ${x - 10} 180`}
                className="stroke-cyan-500/20 fill-none"
                strokeWidth="2"
                animate={{ d: [`M ${x} 80 Q ${x + 15} 130 ${x} 180`, `M ${x} 80 Q ${x - 15} 130 ${x} 180`] }}
                transition={{ duration: 5, repeat: Infinity, delay: i * 0.8 }}
              />
            ))}
          </svg>
        </motion.div>
      </div>

      {/* 💳 CONTENT LAYER */}
      <div className="relative z-20 grid md:grid-cols-2 gap-8 mt-48 max-w-6xl mx-auto px-6">
        
        {/* Fact Card 1 */}
        <motion.div 
          className="p-8 rounded-2xl border border-white/10 backdrop-blur-2xl"
          style={{ backgroundColor: 'rgba(15, 23, 42, 0.4)' }} // Fixes oklab warning
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          whileHover={{ 
            scale: 1.02, 
            borderColor: 'rgba(34, 211, 238, 0.3)',
            backgroundColor: 'rgba(15, 23, 42, 0.6)' 
          }}
          viewport={{ once: true }}
        >
          <div className="flex items-center gap-3 mb-3">
            <div className="w-1 h-6 bg-cyan-500 rounded-full shadow-[0_0_10px_#22d3ee]" />
            <p className="text-cyan-400 font-mono text-xs uppercase tracking-widest">Depth: 4,000m - 6,000m</p>
          </div>
          <h3 className="text-2xl font-bold text-white mb-4">The Deep Plain</h3>
          <p className="text-slate-300 text-sm leading-relaxed">
            Most of the ocean floor lies within this zone. It is a vast, silent desert of sediment where specialized life thrives.
          </p>
        </motion.div>

        {/* Fact Card 2 */}
        <motion.div 
          className="p-8 rounded-2xl border border-white/10 backdrop-blur-2xl"
          style={{ backgroundColor: 'rgba(15, 23, 42, 0.4)' }} // Fixes oklab warning
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          whileHover={{ 
            scale: 1.02, 
            borderColor: 'rgba(34, 211, 238, 0.3)',
            backgroundColor: 'rgba(15, 23, 42, 0.6)' 
          }}
          transition={{ delay: 0.2 }}
          viewport={{ once: true }}
        >
          <div className="flex items-center gap-3 mb-3">
            <div className="w-1 h-6 bg-cyan-500 rounded-full shadow-[0_0_10px_#22d3ee]" />
            <p className="text-cyan-400 font-mono text-xs uppercase tracking-widest">Pressure: 8,000+ PSI</p>
          </div>
          <h3 className="text-2xl font-bold text-white mb-4">Extreme Resilience</h3>
          <p className="text-slate-300 text-sm leading-relaxed">
            Creatures inhabit this pitch-black layer, thriving where most submarines would implode.
          </p>
        </motion.div>
      </div>

      <div className="absolute bottom-0 left-0 right-0 h-40 bg-gradient-to-t from-black to-transparent pointer-events-none" />
    </KineticScrollSection>
  );
}
