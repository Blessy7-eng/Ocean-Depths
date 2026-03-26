'use client';

import { useEffect} from 'react';
import { useRef } from 'react';

interface AmbientBubble {
  id: number;
  x: number;
  y: number;
  size: number;
  opacity: number;
  floatSpeed: number;
  wobbleAmount: number;
  wobbleSpeed: number;
  wobbleOffset: number;
  blur: boolean;
  startY: number;
}

export default function AmbientBubbles() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const bubblesRef = useRef<AmbientBubble[]>([]);
  const mouseRef = useRef({ x: 0, y: 0 });
  const animationRef = useRef<number>(0);
  const timeRef = useRef(0);

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

    // Initialize ambient bubbles (fixed count: 15-20)
    const initializeBubbles = () => {
      bubblesRef.current = [];
      const bubbleCount = 18;

      for (let i = 0; i < bubbleCount; i++) {
        const rand = Math.random();
        let size: number;

        // Size distribution: mix of small and medium
        if (rand < 0.7) {
          size = Math.random() * 4 + 3; // Small: 3-7px (70%)
        } else {
          size = Math.random() * 6 + 8; // Medium: 8-14px (30%)
        }

        const bubble: AmbientBubble = {
          id: i,
          x: Math.random() * canvas.width,
          y: Math.random() * canvas.height,
          size,
          opacity: Math.random() * 0.3 + 0.1, // 0.1-0.4
          floatSpeed: Math.random() * 0.5 + 0.3, // 0.3-0.8 px/frame
          wobbleAmount: Math.random() * 1.5 + 0.5,
          wobbleSpeed: Math.random() * 0.03 + 0.01,
          wobbleOffset: Math.random() * Math.PI * 2,
          blur: Math.random() > 0.5, // 50% of bubbles have blur
          startY: Math.random() * canvas.height,
        };

        bubblesRef.current.push(bubble);
      }
    };

    initializeBubbles();

    // Track mouse position
    const handleMouseMove = (e: MouseEvent) => {
      mouseRef.current = { x: e.clientX, y: e.clientY };
    };

    // Animation loop
    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      timeRef.current++;

      bubblesRef.current.forEach((bubble) => {
        // Ambient floating: bubbles rise slowly
        bubble.y -= bubble.floatSpeed;

        // Add sine-wave wobble for natural motion
        const wobble = Math.sin(timeRef.current * bubble.wobbleSpeed + bubble.wobbleOffset) * bubble.wobbleAmount;
        bubble.x += wobble * 0.02;

        // Wrap around: reset to bottom when reaching top
        if (bubble.y < -20) {
          bubble.y = canvas.height + 20;
          bubble.x = Math.random() * canvas.width;
        }

        // Magnetic mouse influence: gentle nudge when cursor within 100px
        const dx = mouseRef.current.x - bubble.x;
        const dy = mouseRef.current.y - bubble.y;
        const distance = Math.sqrt(dx * dx + dy * dy);

        if (distance < 100) {
          const angle = Math.atan2(dy, dx);
          const force = (1 - distance / 100) * 0.3; // Gentle nudge
          bubble.x += Math.cos(angle + Math.PI) * force; // Push away from cursor
          bubble.y += Math.sin(angle + Math.PI) * force;
        }

        // Draw bubble with optional blur
        if (bubble.blur) {
          ctx.filter = 'blur(1.5px)';
        } else {
          ctx.filter = 'none';
        }

        // Outer glow - larger and more prominent
        const glowRadius = bubble.size * 2;
        const glowGradient = ctx.createRadialGradient(
          bubble.x,
          bubble.y,
          bubble.size * 0.5,
          bubble.x,
          bubble.y,
          glowRadius
        );
        glowGradient.addColorStop(0, `rgba(102, 255, 200, ${bubble.opacity * 0.5})`);
        glowGradient.addColorStop(0.4, `rgba(100, 200, 255, ${bubble.opacity * 0.2})`);
        glowGradient.addColorStop(1, 'rgba(100, 200, 255, 0)');

        ctx.fillStyle = glowGradient;
        ctx.fillRect(
          bubble.x - glowRadius,
          bubble.y - glowRadius,
          glowRadius * 2,
          glowRadius * 2
        );

        // Main bubble circle with border
        ctx.filter = 'none';
        ctx.beginPath();
        ctx.arc(bubble.x, bubble.y, bubble.size, 0, Math.PI * 2);
        ctx.strokeStyle = `rgba(102, 255, 200, ${bubble.opacity})`;
        ctx.lineWidth = 1.5;
        ctx.stroke();

        // Fill bubble interior with gradient for 3D effect
        const bubbleGradient = ctx.createRadialGradient(
          bubble.x - bubble.size * 0.4,
          bubble.y - bubble.size * 0.4,
          0,
          bubble.x,
          bubble.y,
          bubble.size
        );
        bubbleGradient.addColorStop(0, `rgba(200, 255, 240, ${bubble.opacity * 0.3})`);
        bubbleGradient.addColorStop(0.5, `rgba(100, 200, 255, ${bubble.opacity * 0.1})`);
        bubbleGradient.addColorStop(1, `rgba(50, 150, 200, ${bubble.opacity * 0.05})`);

        ctx.fillStyle = bubbleGradient;
        ctx.beginPath();
        ctx.arc(bubble.x, bubble.y, bubble.size, 0, Math.PI * 2);
        ctx.fill();

        // Bright shine spot for realism
        const shineX = bubble.x - bubble.size * 0.35;
        const shineY = bubble.y - bubble.size * 0.35;
        const shineGradient = ctx.createRadialGradient(
          shineX,
          shineY,
          0,
          bubble.x,
          bubble.y,
          bubble.size * 0.8
        );
        shineGradient.addColorStop(0, `rgba(255, 255, 255, ${bubble.opacity * 0.6})`);
        shineGradient.addColorStop(0.3, `rgba(255, 255, 255, ${bubble.opacity * 0.2})`);
        shineGradient.addColorStop(1, 'rgba(255, 255, 255, 0)');

        ctx.fillStyle = shineGradient;
        ctx.beginPath();
        ctx.arc(bubble.x, bubble.y, bubble.size * 0.6, 0, Math.PI * 2);
        ctx.fill();
      });

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
      style={{ zIndex: 5 }}
    />
  );
}
