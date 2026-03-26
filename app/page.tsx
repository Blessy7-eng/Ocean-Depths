'use client';

import { useEffect, useRef, useState } from 'react';
import LoadingScreen from '@/components/LoadingScreen';
import HeroSection from '@/components/HeroSection';
import SunlightSection from '@/components/SunlightSection';
import TwilightSection from '@/components/TwilightSection';
import MidnightSection from '@/components/MidnightSection';
import AbyssSection from '@/components/AbyssSection'; 
import TrenchSection from '@/components/TrenchSection'; 
import CursorFollow from '@/components/CursorFollow';
import NavigationBar from '@/components/NavigationBar';
import DepthMeter from '@/components/DepthMeter'; // ✨ Added
import WaterRipple from '@/components/WaterRipple';
import { audioManager } from '@/lib/audioManager';

export default function Home() {
  const [isLoading, setIsLoading] = useState(true);
  const [sonarEnabled, setSonarEnabled] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const lastSonarTriggerRef = useRef<number>(0);

  useEffect(() => {
    // Reduced to 3.5s for a snappier start
    const timer = setTimeout(() => setIsLoading(false), 3500);
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      if (sonarEnabled && Date.now() - lastSonarTriggerRef.current > 1500) {
        const scrollPos = window.scrollY;
        const windowHeight = window.innerHeight;

        // Sonar pings as you cross into each major NOAA layer
        if (scrollPos % windowHeight < 100 && scrollPos > 100) {
          audioManager.playSonarPing?.();
          lastSonarTriggerRef.current = Date.now();
        }
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [sonarEnabled]);

  if (isLoading) return <LoadingScreen />;

  return (
    <main
      ref={containerRef}
      className="relative min-h-screen bg-[#00050a] overflow-x-hidden selection:bg-cyan-500/30"
    >
      {/* 🧭 HUD & NAVIGATION LAYER */}
      <NavigationBar sonarEnabled={sonarEnabled} onSonarToggle={setSonarEnabled} />
      <DepthMeter /> 
      <CursorFollow />
      
      {/* 🌊 GLOBAL EFFECTS */}
      <WaterRipple />

      {/* 📟 SONAR OVERLAY */}
      {sonarEnabled && (
        <div className="fixed inset-0 pointer-events-none z-[60] overflow-hidden opacity-20">
          {/* Moving Scan-line */}
          <div className="w-full h-[2px] bg-cyan-400/50 shadow-[0_0_15px_#22d3ee] animate-scan" />
          
          {/* Subtle Radar Grid */}
          <div className="absolute inset-0 bg-[linear-gradient(to_right,#22d3ee05_1px,transparent_1px),linear-gradient(to_bottom,#22d3ee05_1px,transparent_1px)] bg-[size:60px_60px]" />
        </div>
      )}

      {/* 🔱 CONTENT SECTIONS */}
      <article className="relative">
        <section id="hero">
          <HeroSection />
        </section>

        <section id="sunlight">
          <SunlightSection sonarEnabled={sonarEnabled} />
        </section>

        <section id="twilight">
          <TwilightSection sonarEnabled={sonarEnabled} />
        </section>

        <section id="midnight">
          <MidnightSection sonarEnabled={sonarEnabled} />
        </section>

        <section id="abyss">
          <AbyssSection sonarEnabled={sonarEnabled} />
        </section>

        <section id="trench">
          <TrenchSection sonarEnabled={sonarEnabled} />
        </section>
      </article>

      {/* 🎨 Custom Scan-line Animation */}
      <style jsx global>{`
        @keyframes scan {
          from { transform: translateY(-100vh); }
          to { transform: translateY(100vh); }
        }
        .animate-scan {
          animation: scan 4s linear infinite;
        }
        html {
          scroll-behavior: smooth;
        }
      `}</style>
    </main>
  );
}