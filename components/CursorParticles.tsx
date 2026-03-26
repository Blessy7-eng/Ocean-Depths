'use client';

import { useEffect, useRef } from 'react';

interface Bubble {
  id: number;
  x: number;
  y: number;
  vx: number;
  vy: number;
  size: number;
  opacity: number;
  age: number;
  maxAge: number;
  wobbleAmount: number;
  wobbleSpeed: number;
  wobbleOffset: number;
}

export default function CursorParticles() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const bubblesRef = useRef<Bubble[]>([]);
  const mouseRef = useRef({ x: 0, y: 0, vx: 0, vy: 0 });
  const lastMouseRef = useRef({ x: 0, y: 0 });
  const animationRef = useRef<number>(0);
  const bubbleCounterRef = useRef(0);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // Set canvas size
    const resizeCanvas = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);

    // Track mouse movement
    const handleMouseMove = (e: MouseEvent) => {
      const newX = e.clientX;
      const newY = e.clientY;

      // Calculate velocity for bubble trail effect
      mouseRef.current.vx = newX - lastMouseRef.current.x;
      mouseRef.current.vy = newY - lastMouseRef.current.y;
      mouseRef.current.x = newX;
      mouseRef.current.y = newY;
      lastMouseRef.current = { x: newX, y: newY };

      // Create bubble trail based on movement speed
      const speed = Math.sqrt(mouseRef.current.vx ** 2 + mouseRef.current.vy ** 2);
      if (speed > 1) {
        bubbleCounterRef.current++;
        
        // Create only 1 bubble occasionally (30% chance when moving fast)
        const shouldCreateBubble = Math.random() < 0.2;
        if (shouldCreateBubble) {
          createBubble(newX, newY);
        }
      }
    };

    // Create bubble with random size variation
    const createBubble = (x: number, y: number) => {
      const rand = Math.random();
      
      let size: number;
      let frequency: number;
      
      // Size distribution: more small bubbles, fewer large ones
      if (rand < 0.6) {
        size = Math.random() * 4 + 2; // Small: 2-6px
        frequency = 0.15;
      } else if (rand < 0.85) {
        size = Math.random() * 8 + 6; // Medium: 6-14px
        frequency = 0.12;
      } else {
        size = Math.random() * 10 + 14; // Large: 14-24px
        frequency = 0.1;
      }

      // Slight random offset from cursor
      const offsetAngle = Math.random() * Math.PI * 2;
      const offsetDistance = Math.random() * 25 + 5;
      const offsetX = Math.cos(offsetAngle) * offsetDistance;
      const offsetY = Math.sin(offsetAngle) * offsetDistance;

      const bubble: Bubble = {
        id: bubbleCounterRef.current + Math.random(),
        x: x + offsetX + (Math.random() - 0.5) * 15,
        y: y + offsetY + (Math.random() - 0.5) * 15,
        vx: mouseRef.current.vx * 0.3 + (Math.random() - 0.5) * 1,
        vy: mouseRef.current.vy * 0.3 + (Math.random() - 0.5) * 1.5 - 0.8, // Upward drift
        size,
        opacity: 0.65 + Math.random() * 0.35,
        age: 0,
        maxAge: 200 + Math.random() * 150, // 200-350 frames (much longer)
        wobbleAmount: Math.random() * 2 + 1,
        wobbleSpeed: frequency,
        wobbleOffset: Math.random() * Math.PI * 2,
      };

      bubblesRef.current.push(bubble);
    };

    // Animation loop
    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      // Update and render bubbles
      bubblesRef.current = bubblesRef.current.filter((bubble) => {
        bubble.age++;
        if (bubble.age >= bubble.maxAge) return false;

        // Physics: damping and buoyancy
        bubble.vx *= 0.97; // Air resistance
        bubble.vy = (bubble.vy - 0.12) * 0.97; // Rise with buoyancy

        // Add wobble for natural floating motion
        const wobble = Math.sin(bubble.age * bubble.wobbleSpeed + bubble.wobbleOffset) * bubble.wobbleAmount;
        bubble.x += bubble.vx + wobble * 0.1;
        bubble.y += bubble.vy;

        // Fade out near end of life
        const fadeStart = bubble.maxAge * 0.65;
        let currentOpacity = bubble.opacity;
        if (bubble.age > fadeStart) {
          const fadeProgress = (bubble.age - fadeStart) / (bubble.maxAge - fadeStart);
          currentOpacity *= 1 - fadeProgress;
        }

        // Draw bubble with glow effect
        const glowRadius = bubble.size * 1.8;

        // Outer glow layer
        const glowGradient = ctx.createRadialGradient(
          bubble.x,
          bubble.y,
          bubble.size * 0.3,
          bubble.x,
          bubble.y,
          glowRadius
        );
        glowGradient.addColorStop(0, `rgba(102, 255, 200, ${currentOpacity * 0.4})`);
        glowGradient.addColorStop(0.5, `rgba(100, 200, 255, ${currentOpacity * 0.15})`);
        glowGradient.addColorStop(1, 'rgba(100, 200, 255, 0)');

        ctx.fillStyle = glowGradient;
        ctx.fillRect(
          bubble.x - glowRadius,
          bubble.y - glowRadius,
          glowRadius * 2,
          glowRadius * 2
        );

        // Main bubble outline
        ctx.beginPath();
        ctx.arc(bubble.x, bubble.y, bubble.size, 0, Math.PI * 2);
        ctx.strokeStyle = `rgba(102, 255, 200, ${currentOpacity * 0.7})`;
        ctx.lineWidth = Math.max(0.8, bubble.size * 0.08);
        ctx.stroke();

        // Inner shine effect (light reflection)
        const shineGradient = ctx.createRadialGradient(
          bubble.x - bubble.size * 0.3,
          bubble.y - bubble.size * 0.3,
          0,
          bubble.x,
          bubble.y,
          bubble.size
        );
        shineGradient.addColorStop(0, `rgba(255, 255, 255, ${currentOpacity * 0.25})`);
        shineGradient.addColorStop(0.4, `rgba(150, 220, 255, ${currentOpacity * 0.1})`);
        shineGradient.addColorStop(1, `rgba(100, 200, 255, ${currentOpacity * 0.05})`);

        ctx.fillStyle = shineGradient;
        ctx.beginPath();
        ctx.arc(bubble.x, bubble.y, bubble.size, 0, Math.PI * 2);
        ctx.fill();

        return true;
      });

      // Keep particle count manageable (max 10-15 bubbles on screen)
      if (bubblesRef.current.length > 15) {
        bubblesRef.current = bubblesRef.current.slice(-15);
      }

      animationRef.current = requestAnimationFrame(animate);
    };

    window.addEventListener('mousemove', handleMouseMove);
    animate();

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('resize', resizeCanvas);
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 pointer-events-none"
      style={{ zIndex: 10, mixBlendMode: 'screen' }}
    />
  );
}

