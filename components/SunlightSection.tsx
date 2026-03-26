'use client';

import { useEffect, useRef, useState } from 'react';
import BackgroundCreatures from '@/components/BackgroundCreatures';
import Image from 'next/image';
import { motion } from 'framer-motion';

interface SunlightSectionProps {
  sonarEnabled: boolean;
}

export default function SunlightSection({ sonarEnabled }: SunlightSectionProps) {
  const sectionRef = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsVisible(entry.isIntersecting);
      },
      { threshold: 0.3 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, []);

  return (
    <section
      ref={sectionRef}
      id="sunlight"
      className="relative min-h-screen py-24 px-6 flex items-center justify-center overflow-hidden"
    >
      {/* 🌊 Background Gradients */}
      <div className="absolute inset-0 bg-gradient-to-b from-[#20c997] via-[#0ea5e9] to-[#0284c7] pointer-events-none">
        <div className="absolute top-0 left-0 right-0 h-64 bg-gradient-to-b from-white/20 to-transparent" />
      </div>

      <BackgroundCreatures
        creatures={[
          { type: 'fish', count: 5, colors: ['#22d3ee', '#06b6d4', '#0891b2', '#0e7490', '#0c63b4'] },
          { type: 'jellyfish', count: 3, colors: ['#60a5fa', '#3b82f6', '#1e40af'] },
          { type: 'bubble', count: 8, colors: [] },
        ]}
        opacity={0.4}
      />

      <div className="relative z-10 max-w-5xl w-full">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          
          {/* 🖼️ Left: The Coral Reef Image Card */}
          <motion.div 
            initial={{ opacity: 0, scale: 0.95 }}
            animate={isVisible ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.95 }}
            transition={{ duration: 1 }}
            style={{ 
              backgroundColor: 'rgba(255, 255, 255, 0.1)',
              borderColor: 'rgba(34, 211, 238, 0.3)' 
            }}
            className="species-card group p-8 rounded-2xl border backdrop-blur-md shadow-2xl"
          >
            <div className="aspect-[5/4] rounded-xl flex items-center justify-center mb-6 border border-white/10 relative overflow-hidden">
              <Image 
                src="/sunlight-zone.jpg" 
                alt="Tropical Coral Reef"
                fill
                className="object-cover group-hover:scale-110 transition-transform duration-[3s]"
                sizes="(max-w-768px) 100vw, 50vw"
                priority
              />

              {/* HUD Scanline Overlay */}
              <div className="absolute inset-0 pointer-events-none bg-[linear-gradient(rgba(18,16,16,0)_50%,rgba(0,0,0,0.15)_50%),linear-gradient(90deg,rgba(0,0,255,0.03),rgba(0,255,0,0.01),rgba(255,0,0,0.03))] bg-[length:100%_2px,3px_100%] opacity-30 z-10" />
              
              <div className="absolute top-4 left-4 z-30 font-mono text-[9px] text-cyan-100 bg-black/40 px-2 py-1 backdrop-blur-sm rounded border border-white/10">
                REF_001: EPIPELAGIC
              </div>
            </div>

            {sonarEnabled && (
              <div className="text-center font-mono text-sm animate-pulse border-t border-white/10 pt-4 mt-2">
                <p className="text-cyan-200 font-bold tracking-widest uppercase">SONAR: Biodiversity Peak</p>
                <p className="text-xs text-white/60 mt-2">Detected species: 2,847</p>
              </div>
            )}
          </motion.div>

          {/* 📝 Right: Text Content */}
          <motion.div 
            initial={{ opacity: 0, x: 30 }}
            animate={isVisible ? { opacity: 1, x: 0 } : { opacity: 0, x: 30 }}
            transition={{ duration: 1, delay: 0.2 }}
          >
            <div className="mb-4 text-cyan-200 font-mono text-sm tracking-widest uppercase">Depth: 0m - 200m</div>
            <h2 className="text-5xl font-bold mb-6 text-white tracking-tight leading-tight">The Sunlit Zone</h2>
            <p className="text-white/90 text-lg mb-8 leading-relaxed max-w-lg">
              Known as the <strong className="text-cyan-200 font-medium underline decoration-cyan-400/20">Epipelagic Zone</strong>, this is the only layer where enough sunlight penetrates for photosynthesis.
            </p>
            
            <ul className="space-y-4">
              {[
                "Warm waters and maximum light penetration",
                "Home to 90% of all known marine species",
                "Foundation of the global ocean food chain"
              ].map((text, i) => (
                <li key={i} className="flex items-center gap-4 group">
                  <div className="w-2 h-2 bg-cyan-300 rounded-full shadow-[0_0_8px_rgba(34,211,238,0.8)] group-hover:scale-150 transition-transform" />
                  <span className="text-white/90 group-hover:text-cyan-200 transition-colors">{text}</span>
                </li>
              ))}
            </ul>

            <button className="mt-10 px-8 py-3 border border-white/40 bg-white/10 text-white font-bold rounded-full hover:bg-white hover:text-blue-600 hover:scale-105 transition-all duration-300 shadow-lg">
              Explore Surface Species
            </button>
          </motion.div>
        </div>
      </div>

      <div className="absolute bottom-0 left-0 right-0 h-40 bg-gradient-to-t from-[#0ea5e9] to-transparent pointer-events-none" />
    </section>
  );
}
