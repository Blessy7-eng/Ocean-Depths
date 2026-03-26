'use client';

import { useEffect, useState } from 'react';
import { audioManager } from '@/lib/audioManager';

interface NavigationBarProps {
  sonarEnabled: boolean;
  onSonarToggle: (enabled: boolean) => void;
}

export default function NavigationBar({ sonarEnabled, onSonarToggle }: NavigationBarProps) {
  const [isSticky, setIsSticky] = useState(false);
  const [soundEnabled, setSoundEnabled] = useState(false);
  const [activeSection, setActiveSection] = useState('sunlight');

  useEffect(() => {
    const handleScroll = () => {
      // 1. Handle Sticky Header
      setIsSticky(window.scrollY > 100);

      // 2. Handle Active Section (Scroll Spy)
      const sections = ['sunlight', 'twilight', 'midnight', 'trench'];
      const current = sections.find(id => {
        const el = document.getElementById(id);
        if (el) {
          const rect = el.getBoundingClientRect();
          // Adjust 120 based on your header height
          return rect.top <= 120 && rect.bottom >= 120;
        }
        return false;
      });
      if (current) setActiveSection(current);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleSonarToggle = (newState: boolean) => {
    onSonarToggle(newState);
    if (newState) {
      audioManager.playSonarPing();
    }
  };

  const handleSoundToggle = (newState: boolean) => {
    setSoundEnabled(newState);
    if (newState) {
      audioManager.enableSound();
    } else {
      audioManager.disableSound();
    }
  };

  const navLinks = [
    { name: 'Sunlight', id: 'sunlight' },
    { name: 'Twilight', id: 'twilight' },
    { name: 'Midnight', id: 'midnight' },
    { name: 'Trench', id: 'trench' },
  ];

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-[100] transition-all duration-500 ${
        isSticky
          ? 'bg-blue-950/80 backdrop-blur-md py-3 border-b border-cyan-400/20'
          : 'bg-transparent py-5'
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 flex items-center justify-between">
        {/* Logo */}
        <div className="flex items-center gap-2 group cursor-pointer" onClick={() => window.scrollTo({top: 0, behavior: 'smooth'})}>
          <div className="w-8 h-8 relative">
            <svg viewBox="0 0 100 100" className="w-full h-full" fill="none" stroke="currentColor" strokeWidth="2">
              <circle cx="50" cy="50" r="30" className="stroke-cyan-400 group-hover:scale-110 transition-transform" />
              <path d="M 30 50 Q 50 40 70 50" className="stroke-cyan-400" />
              <path d="M 30 50 Q 50 60 70 50" className="stroke-cyan-400" />
            </svg>
          </div>
          <span className="font-bold text-cyan-300 tracking-wider">Ocean Depths</span>
        </div>

        {/* Navigation links - Dynamic Active State */}
        <div className="hidden md:flex items-center gap-8">
          {navLinks.map((zone) => (
            <a
              key={zone.id}
              href={`#${zone.id}`}
              className={`text-sm font-medium transition-all duration-300 relative pb-1 ${
                activeSection === zone.id
                  ? 'text-cyan-400'
                  : 'text-cyan-100/60 hover:text-white'
              }`}
            >
              {zone.name}
              {/* Underline animation */}
              <span 
                className={`absolute bottom-0 left-0 h-[2px] bg-cyan-400 transition-all duration-300 ${
                  activeSection === zone.id ? 'w-full' : 'w-0'
                }`} 
              />
            </a>
          ))}
        </div>

        {/* Sound and Sonar toggles */}
        <div className="flex items-center gap-3">
          <button
            onClick={() => handleSoundToggle(!soundEnabled)}
            className={`flex items-center gap-2 px-4 py-2 rounded-full border transition-all duration-300 text-xs font-bold ${
              soundEnabled 
              ? 'bg-cyan-500/20 border-cyan-400 text-cyan-300 shadow-[0_0_10px_rgba(34,211,238,0.3)]' 
              : 'border-white/20 text-white/50 hover:border-white/40'
            }`}
          >
            <svg className="w-3.5 h-3.5" fill="currentColor" viewBox="0 0 24 24">
               <path d="M3 9v6h4l5 5V4L7 9H3zm13.5 3c0-1.77-1.02-3.29-2.5-4.03v8.05c1.48-.73 2.5-2.25 2.5-4.02z" />
            </svg>
            {soundEnabled ? 'SOUND: ON' : 'SOUND: OFF'}
          </button>

          <button
            onClick={() => handleSonarToggle(!sonarEnabled)}
            className={`flex items-center gap-2 px-4 py-2 rounded-full border transition-all duration-300 text-xs font-bold ${
              sonarEnabled 
              ? 'bg-cyan-500/20 border-cyan-400 text-cyan-300 shadow-[0_0_10px_rgba(34,211,238,0.3)]' 
              : 'border-white/20 text-white/50 hover:border-white/40'
            }`}
          >
            <svg className="w-3.5 h-3.5 animate-pulse" fill="currentColor" viewBox="0 0 24 24">
              <circle cx="12" cy="12" r="2" />
              <path d="M 12 7 A 5 5 0 0 1 17 12" strokeWidth="2" stroke="currentColor" fill="none" />
            </svg>
            {sonarEnabled ? 'SONAR: ON' : 'SONAR: OFF'}
          </button>
        </div>
      </div>
    </nav>
  );
}