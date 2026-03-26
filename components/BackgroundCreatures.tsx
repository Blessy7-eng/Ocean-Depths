'use client';

import { useEffect, useState, useMemo } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';

interface CreatureConfig {
  type: 'fish' | 'jellyfish' | 'bubble';
  count: number;
  colors: string[];
}

interface BackgroundCreaturesProps {
  creatures?: CreatureConfig[];
  opacity?: number;
}

const Fish = ({ delay, duration, color, speed }: any) => {
  const { scrollYProgress } = useScroll();
  const yOffset = useTransform(scrollYProgress, [0, 1], [0, -150 * speed]);

  return (
    <motion.svg
      width="40"
      height="24"
      viewBox="0 0 40 24"
      style={{ y: yOffset, opacity: 0.7 }}
      animate={{ 
        x: [-20, 100, -20], 
        y: [0, 10, 0],
        rotate: [0, 5, -5, 0]
      }}
      transition={{ duration, repeat: Infinity, delay, ease: 'easeInOut' }}
      className="absolute pointer-events-none"
    >
      <ellipse cx="20" cy="12" rx="15" ry="8" fill={color} />
      <polygon points="32,12 42,8 42,16" fill={color} />
      <circle cx="12" cy="12" r="2" fill="white" />
    </motion.svg>
  );
};

export default function BackgroundCreatures({
  creatures = [
    { type: 'fish', count: 4, colors: ['#22d3ee', '#06b6d4', '#0891b2'] },
    { type: 'jellyfish', count: 3, colors: ['#a78bfa', '#c084fc'] },
    { type: 'bubble', count: 12, colors: [] },
  ],
  opacity = 0.6,
}: BackgroundCreaturesProps) {
  
  const [mountedCreatures, setMountedCreatures] = useState<any[]>([]);

  useEffect(() => {
    const data = creatures.flatMap((config, configIdx) => {
      return Array.from({ length: config.count }).map((_, i) => ({
        id: `${config.type}-${configIdx}-${i}`,
        type: config.type,
        startX: Math.random() * 95,
        startY: Math.random() * 100,
        delay: Math.random() * 10,
        duration: 15 + Math.random() * 10,
        speed: 0.2 + (i % 3) * 0.3,
        color: config.colors[i % config.colors.length] || '#22d3ee',
        bubbleSize: 6 + Math.random() * 12 
      }));
    });
    setMountedCreatures(data);
  }, []); 

  if (mountedCreatures.length === 0) return null;

  return (
    <div className="absolute inset-0 pointer-events-none overflow-hidden select-none" style={{ opacity }}>
      {mountedCreatures.map((c) => (
        <div 
          key={c.id} 
          style={{ 
            position: 'absolute', 
            left: `${c.startX}%`, 
            top: `${c.startY}%`,
            zIndex: Math.floor(c.speed * 10) 
          }}
        >
          {c.type === 'fish' && (
            <Fish delay={c.delay} duration={c.duration} color={c.color} speed={c.speed} />
          )}
          
          {c.type === 'jellyfish' && (
            <motion.svg
              width="20" height="50" viewBox="0 0 20 50"
              animate={{ y: [0, 30, 0], scaleY: [1, 1.1, 1] }}
              transition={{ duration: c.duration, repeat: Infinity, delay: c.delay }}
              style={{ opacity: 0.5 }}
            >
              <circle cx="10" cy="5" r="8" fill={c.color} />
              <path d="M 10 11 Q 9 25 10 40" stroke={c.color} strokeWidth="1.5" fill="none" />
            </motion.svg>
          )}

          {c.type === 'bubble' && (
            <motion.div
              style={{
                width: c.bubbleSize, 
                height: c.bubbleSize,
                borderRadius: '50%', 
                border: '1.5px solid rgba(255, 255, 255, 0.7)',
                background: 'radial-gradient(circle at 30% 30%, rgba(255, 255, 255, 0.5), transparent)',
                boxShadow: '0 0 10px rgba(255, 255, 255, 0.3)'
              }}
              animate={{ y: [0, -800], opacity: [0, 0.8, 0] }}
              transition={{ duration: c.duration, repeat: Infinity, delay: c.delay, ease: 'linear' }}
            />
          )}
        </div>
      ))}
    </div>
  );
}
