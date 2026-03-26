'use client';

import { useEffect, useRef, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import BackgroundCreatures from '@/components/BackgroundCreatures';
// ✨ IMPORT: Next.js Image Component
import Image from 'next/image';

interface TwilightSectionProps {
  sonarEnabled: boolean;
}

export default function TwilightSection({ sonarEnabled }: TwilightSectionProps) {
  const sectionRef = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => setIsVisible(entry.isIntersecting),
      { threshold: 0.3 }
    );
    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, []);

  return (
    <section
      ref={sectionRef}
      id="twilight"
      className="relative min-h-screen py-24 px-6 flex items-center justify-center overflow-hidden bg-black"
    >
      {/* ✨ BACKGROUND UPDATE: Deep Blue Gradient with Radial Light Center */}
      <div className="absolute inset-0 bg-gradient-to-b from-[#1e40af] via-[#0f172a] to-black pointer-events-none">
        {/* The Central Light Shaft from image_26.png */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-blue-500/10 rounded-full blur-[100px] shadow-[0_0_120px_#22d3ee20]" />
      </div>

      <BackgroundCreatures
        creatures={[
          { type: 'fish', count: 4, colors: ['#22d3ee', '#0891b2', '#0e7490'] },
          { type: 'jellyfish', count: 3, colors: ['#7c3aed', '#4c1d95'] },
          { type: 'bubble', count: 6, colors: [] },
        ]}
        opacity={0.3}
      />

      {/* ✨ Ambient Bioluminescent Drift (Matching the background Cyan) */}
      <div className="absolute inset-0 pointer-events-none">
        {[...Array(20)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-1 h-1 rounded-full"
            animate={{
              opacity: [0.2, 0.8, 0.2],
              scale: [1, 1.5, 1],
            }}
            transition={{
              duration: 3 + Math.random() * 4,
              repeat: Infinity,
              delay: Math.random() * 5,
            }}
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              backgroundColor: i % 2 === 0 ? '#38bdf8' : '#22d3ee',
              boxShadow: i % 2 === 0 ? '0 0 10px #38bdf8' : '0 0 10px #22d3ee',
            }}
          />
        ))}
      </div>

      <div className="relative z-10 max-w-6xl w-full">
        <div className="grid md:grid-cols-2 gap-16 items-center">
          
          {/* 🐟 Left: The Predator Card (Now showing image_26.png) */}
          <motion.div 
            initial={{ opacity: 0, x: -30 }}
            animate={isVisible ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8 }}
            className="species-card group"
          >
            {/* ✨ CARD STYLE UPDATE: Teal Border and Blue/Slate Background */}
            <div className="glass p-8 rounded-3xl border border-blue-500/20 bg-slate-950/50 backdrop-blur-xl shadow-2xl">
              <div className="aspect-square rounded-2xl bg-slate-900/60 p-0 flex items-center justify-center mb-8 border border-white/5 relative overflow-hidden group-hover:border-blue-500/50 transition-colors">
                
                {/* Custom Underwater Fish Image */}
                <Image 
                  src="/twilight-zone.jpg" // Ensure this is in /public
                  alt="Fish silhouette in deep blue water"
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-[4s]"
                  sizes="(max-w-768px) 100vw, 50vw"
                  priority
                />

                {/* Cyberpunk Scanline Filter for the Card */}
                <div className="absolute inset-0 pointer-events-none bg-[linear-gradient(rgba(18,16,16,0)_50%,rgba(0,0,0,0.25)_50%)] bg-[length:100%_4px,3px_100%] z-10" />
                
                {/* Depth Marker Overlay */}
                <div className="absolute top-6 left-6 z-30 font-mono text-[10px] text-blue-300 bg-black/50 px-2 py-1 backdrop-blur-sm">
                  ZONE_ANALYSIS_V01
                </div>
              </div>

              <AnimatePresence>
                {sonarEnabled && (
                  <motion.div 
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 10 }}
                    className="font-mono text-center"
                  >
                    <p className="text-blue-300 text-xs font-bold tracking-[0.2em] uppercase animate-pulse">
                      Signature: Predator Detected
                    </p>
                    <p className="text-[10px] text-blue-400/70 mt-1 uppercase">Target: Thunnus Cluster</p>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </motion.div>

          {/* 📝 Right: Text Content */}
          <div className="space-y-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={isVisible ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              <span className="inline-block px-4 py-1 rounded-full bg-blue-500/10 border border-blue-500/20 text-blue-100 font-mono text-xs tracking-widest mb-4">
                DEPTH: 200m — 1,000m
              </span>
              <h2 className="text-6xl font-bold text-white mb-6 leading-tight">
                The <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-300 shadow-lg shadow-cyan-500/20">Twilight</span> Zone
              </h2>
            </motion.div>

            <motion.p 
              initial={{ opacity: 0 }}
              animate={isVisible ? { opacity: 1 } : {}}
              transition={{ delay: 0.3 }}
              className="text-slate-400 text-xl leading-relaxed"
            >
              In the <strong className="text-cyan-400 font-medium">Bathypelagic Zone</strong>, sunlight is non-existent. 
              Creatures here have evolved alien adaptations—glowing lures and expandable stomachs—to survive in perpetual darkness.
            </motion.p>
            
            <ul className="space-y-5">
              {[
                "Faint blue illumination from above",
                "Bioluminescence for hunting & camouflage",
                "Home to vertical migrators and giant squid"
              ].map((text, i) => (
                <motion.li 
                  key={i}
                  initial={{ opacity: 0, x: 20 }}
                  animate={isVisible ? { opacity: 1, x: 0 } : {}}
                  transition={{ delay: 0.5 + (i * 0.1) }}
                  className="flex items-start gap-4 text-slate-300 group cursor-default"
                >
                  <div className="mt-1.5 w-1.5 h-1.5 rounded-full bg-blue-500 shadow-[0_0_12px_#3b82f6] group-hover:scale-150 transition-all duration-300" />
                  <span className="text-slate-300 group-hover:text-blue-100 transition-colors">{text}</span>
                </motion.li>
              ))}
            </ul>

            <button className="mt-8 px-10 py-4 bg-blue-600 text-white font-bold uppercase rounded-full hover:bg-white hover:text-blue-600 transition-colors duration-300 shadow-[0_0_20px_rgba(34,211,238,0.3)]">
              View Mid-Depth Species
            </button>
          </div>
        </div>
      </div>

      {/* Transition to Midnight */}
      <div className="absolute bottom-0 left-0 right-0 h-48 bg-gradient-to-t from-black via-black/80 to-transparent pointer-events-none" />
    </section>
  );
}