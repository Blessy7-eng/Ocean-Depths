'use client';

import { useEffect, useRef, useState, useMemo } from 'react'; // Added useMemo
import { motion, AnimatePresence } from 'framer-motion';
import BackgroundCreatures from '@/components/BackgroundCreatures';
import Image from 'next/image';

interface MidnightSectionProps {
  sonarEnabled: boolean;
}

export default function MidnightSection({ sonarEnabled }: MidnightSectionProps) {
  const sectionRef = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(false);

  // 1. ✨ STABILIZE PARTICLES: Move random math out of the render loop
  const marineSnow = useMemo(() => 
    [...Array(22)].map((_, i) => ({
      id: i,
      left: `${Math.random() * 100}%`,
      top: `${Math.random() * 100}%`,
      duration: 7 + Math.random() * 8,
      delay: Math.random() * -10, // Negative delay so they start "mid-fall"
      color: i % 3 === 0 ? '#38bdf8' : '#818cf8',
      drift: (Math.random() - 0.5) * 40
    })), []);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => setIsVisible(entry.isIntersecting),
      { threshold: 0.2 } // Slightly lower threshold for smoother entry
    );
    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, []);

  return (
    <section
      ref={sectionRef}
      id="midnight"
      className="relative min-h-screen py-24 px-6 flex items-center justify-center overflow-hidden bg-black"
    >
      {/* 🌑 Deep Midnight Gradient */}
      <div className="absolute inset-0 bg-gradient-to-b from-[#0f172a] via-[#020617] to-black pointer-events-none">
        <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[800px] h-[600px] bg-blue-900/10 rounded-full blur-[140px]" />
      </div>

      <BackgroundCreatures
        creatures={[
          { type: 'fish', count: 3, colors: ['#1e40af', '#1e3a8a', '#312e81'] },
          { type: 'jellyfish', count: 3, colors: ['#7c3aed', '#4c1d95'] },
          { type: 'bubble', count: 8, colors: [] },
        ]}
        opacity={0.15}
      />

      {/* ✨ Refined Marine Snow */}
      <div className="absolute inset-0 pointer-events-none">
        {marineSnow.map((p) => (
          <motion.div
            key={p.id}
            className="absolute w-1 h-1 rounded-full"
            animate={{
              y: [0, 200],
              opacity: [0, 0.4, 0],
              x: [0, p.drift]
            }}
            transition={{
              duration: p.duration,
              repeat: Infinity,
              delay: p.delay,
              ease: "linear"
            }}
            style={{
              left: p.left,
              top: p.top,
              background: p.color,
              boxShadow: `0 0 6px ${p.color}`
            }}
          />
        ))}
      </div>

      <div className="relative z-10 max-w-6xl w-full">
        <div className="grid md:grid-cols-2 gap-16 items-center">
          
          {/* 🖼️ Left: The Midnight Abyss Image Card */}
          <motion.div 
            initial={{ opacity: 0, x: -40 }}
            animate={isVisible ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 1, ease: "easeOut" }}
            className="species-card group"
          >
            <div className="glass p-6 md:p-8 rounded-3xl border border-blue-500/20 bg-black/40 backdrop-blur-3xl shadow-2xl">
              <div className="aspect-[5/4] rounded-2xl bg-slate-950/80 flex items-center justify-center mb-8 border border-white/5 relative overflow-hidden transition-all duration-700 group-hover:border-blue-500/40">
                
                <Image 
                  src="/midnight-abyss-zone.jpg" 
                  alt="Midnight Abyss Zone Diagram"
                  fill
                  className="object-cover opacity-80 group-hover:opacity-100 group-hover:scale-110 transition-all duration-[5s] ease-in-out"
                  sizes="(max-w-768px) 100vw, 50vw"
                  priority
                />

                {/* Cyberpunk Scanline Filter */}
                <div className="absolute inset-0 pointer-events-none bg-[linear-gradient(rgba(18,16,16,0)_50%,rgba(0,0,0,0.2)_50%)] bg-[length:100%_4px] opacity-30" />
                
                <div className="absolute top-4 left-4 z-30 font-mono text-[9px] text-blue-400 bg-black/60 px-2 py-1 backdrop-blur-md rounded border border-blue-500/20">
                  REF_004: BATHYPELAGIC
                </div>
              </div>

              <AnimatePresence mode="wait">
                {sonarEnabled && (
                  <motion.div 
                    initial={{ opacity: 0, height: 0 }} 
                    animate={{ opacity: 1, height: 'auto' }} 
                    exit={{ opacity: 0, height: 0 }}
                    className="font-mono text-center space-y-3 overflow-hidden"
                  >
                    <p className="text-blue-400 text-xs font-bold tracking-[0.2em] animate-pulse">
                      &gt; ABYSSAL SIGNATURES DETECTED
                    </p>
                    <div className="flex justify-between text-[10px] text-blue-300/40 uppercase px-4 border-t border-blue-500/10 pt-3">
                      <span>RADAR_DEPTH: 4km</span>
                      <span>FREQ: 12.5kHz</span>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </motion.div>

          {/* 📝 Right: Text Content */}
          <div className="space-y-8">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={isVisible ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.8 }}
            >
              <div className="flex items-center gap-3 mb-4">
                <div className="h-[1px] w-8 bg-blue-500/50" />
                <div className="text-blue-400 font-mono text-xs tracking-[0.4em] uppercase">
                  1,000M — 4,000M
                </div>
              </div>
              <h2 className="text-5xl md:text-7xl font-extrabold text-white mb-6 leading-[1.1]">
                The <span className="text-transparent bg-clip-text bg-gradient-to-br from-blue-400 via-indigo-400 to-purple-600">Midnight</span> Abyss
              </h2>
            </motion.div>

            <motion.p 
              initial={{ opacity: 0 }}
              animate={isVisible ? { opacity: 1 } : {}}
              transition={{ delay: 0.4 }}
              className="text-slate-400 text-lg md:text-xl leading-relaxed max-w-lg"
            >
              In the <strong className="text-blue-300 font-medium">Bathypelagic Zone</strong>, sunlight is a memory. 
              Creatures here navigate via <span className="text-purple-400">bioluminescence</span>, carving out life in a world of bone-crushing pressure.
            </motion.p>

            <ul className="space-y-5">
              {[
                "Bioluminescence replaces solar energy",
                "Crushing pressure up to 5,800 PSI",
                "Thermal vent ecosystems support alien life"
              ].map((text, i) => (
                <motion.li 
                  key={i}
                  initial={{ opacity: 0, x: 20 }}
                  animate={isVisible ? { opacity: 1, x: 0 } : {}}
                  transition={{ delay: 0.6 + i * 0.15 }}
                  className="flex items-start gap-4 text-slate-300 text-sm md:text-base group"
                >
                  <div className="mt-1.5 w-1.5 h-1.5 rounded-full bg-blue-500 shadow-[0_0_12px_#3b82f6] group-hover:scale-150 transition-all duration-300" />
                  <span className="group-hover:text-blue-200 transition-colors">{text}</span>
                </motion.li>
              ))}
            </ul>

            <motion.button 
              whileHover={{ scale: 1.05, boxShadow: "0 0 25px rgba(59,130,246,0.3)" }}
              whileTap={{ scale: 0.95 }}
              className="mt-4 px-12 py-4 border border-blue-500/40 text-blue-400 font-bold rounded-full hover:bg-blue-500/10 hover:border-blue-400 transition-all duration-300 uppercase tracking-widest text-xs"
            >
              Initialize Deep Scan
            </motion.button>
          </div>
        </div>
      </div>

      {/* 🌑 Bottom Fade-out */}
      <div className="absolute bottom-0 left-0 right-0 h-40 bg-gradient-to-t from-black via-black/80 to-transparent pointer-events-none" />
    </section>
  );
}