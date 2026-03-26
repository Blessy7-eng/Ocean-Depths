'use client';

import { useEffect, useRef, useState } from 'react';
import { motion } from 'framer-motion';
import { useScrollVelocity } from '@/hooks/useScrollVelocity';

interface KineticScrollSectionProps {
  backgroundTitle: string;
  description: string;
  children?: React.ReactNode;
  backgroundColor?: string;
  id?: string;
  titleGlow?: string; // Optional glow color for specific sections
}

export default function KineticScrollSection({
  backgroundTitle,
  description,
  children,
  backgroundColor = 'bg-gradient-to-b from-blue-900 to-blue-950',
  id,
  titleGlow,
}: KineticScrollSectionProps) {
  const sectionRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const { velocity, position, isScrolling } = useScrollVelocity();
  const [sectionStart, setSectionStart] = useState(0);
  const [horizontalOffset, setHorizontalOffset] = useState(0);
  const [skew, setSkew] = useState(0);

  useEffect(() => {
    const updateLayout = () => {
      if (sectionRef.current) {
        const rect = sectionRef.current.getBoundingClientRect();
        const sectionTop = window.scrollY + rect.top;
        setSectionStart(sectionTop);
      }
    };

    updateLayout();
    window.addEventListener('resize', updateLayout);
    return () => window.removeEventListener('resize', updateLayout);
  }, []);

  useEffect(() => {
    if (!sectionRef.current) return;

    const rect = sectionRef.current.getBoundingClientRect();
    const isInView = rect.top < window.innerHeight && rect.bottom > 0;

    if (isInView) {
      // Calculate scroll progress within the section
      const sectionProgress = (window.innerHeight - rect.top) / (window.innerHeight + rect.height);
      const clampedProgress = Math.max(0, Math.min(1, sectionProgress));

      setHorizontalOffset(-clampedProgress * 300);

      const maxSkew = 8;
      const velocitySkew = Math.min(maxSkew, velocity * 100);
      setSkew(velocitySkew);
    }
  }, [position, velocity]);

  const descriptionWords = description.split(' ');

  return (
    <section
      ref={sectionRef}
      id={id}
      className={`relative min-h-screen ${backgroundColor} flex items-center justify-center overflow-hidden py-24 px-6`}
    >
      {/* Background parallax title with floating animation */}
      <motion.div
        className="absolute inset-0 flex items-center justify-center pointer-events-none"
        style={{
          x: horizontalOffset,
          skewX: skew,
        }}
      >
        <motion.div
          animate={{ y: [0, -15, 0] }}
          transition={{ duration: 6, repeat: Infinity, ease: 'easeInOut' }}
        >
          <h2
            className="text-9xl font-black text-white whitespace-nowrap"
            style={{
              opacity: 0.1,
              textShadow: titleGlow || '0 2px 10px rgba(0, 0, 0, 0.4)',
              letterSpacing: '-0.02em',
              filter: 'blur(1px)',
              WebkitTextStroke: '0.5px rgba(255, 255, 255, 0.2)',
            }}
          >
            {backgroundTitle}
          </h2>
        </motion.div>
      </motion.div>

      {/* Foreground content with text reveal */}
      <div ref={contentRef} className="relative z-10 max-w-4xl mx-auto">
        <motion.div
          className="space-y-8"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true, amount: 0.5 }}
        >
          {/* Description with word-level reveal */}
          <div className="text-2xl md:text-4xl font-light text-white leading-relaxed overflow-hidden"
            style={{
              textShadow: '0 4px 20px rgba(0, 0, 0, 0.6), 0 2px 8px rgba(0, 0, 0, 0.4)',
            }}
          >
            {descriptionWords.map((word, index) => (
              <motion.span
                key={index}
                className="inline-block overflow-hidden relative"
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                transition={{
                  duration: 0.8,
                  delay: index * 0.03,
                }}
                viewport={{ once: true, amount: 0.8 }}
              >
                <motion.span
                  className="inline-block mr-2"
                  initial={{ y: 40, opacity: 0 }}
                  whileInView={{ y: 0, opacity: 1 }}
                  transition={{
                    duration: 0.6,
                    delay: index * 0.05,
                    ease: [0.25, 0.46, 0.45, 0.94],
                  }}
                  viewport={{ once: true, amount: 0.8 }}
                >
                  {word}
                </motion.span>
              </motion.span>
            ))}
          </div>

          {/* Additional content with enhanced glassmorphism */}
          {children && (
            <div className="text-lg text-white/90 space-y-4 p-8 rounded-2xl backdrop-blur-lg"
              style={{
                backgroundColor: 'rgba(0, 0, 0, 0.35)',
                border: '1px solid rgba(255, 255, 255, 0.1)',
                textShadow: '0 2px 10px rgba(0, 0, 0, 0.4)',
              }}
            >
              {children}
            </div>
          )}
        </motion.div>
      </div>

      {/* Accent elements */}
      <div className="absolute bottom-10 left-10 w-32 h-32 bg-cyan-500/5 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute top-20 right-10 w-40 h-40 bg-blue-500/5 rounded-full blur-3xl pointer-events-none" />
    </section>
  );
}
