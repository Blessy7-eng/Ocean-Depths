'use client';

import { useEffect, useRef } from 'react';

export default function WaterRipple() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const animationRef = useRef<number>(0);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d', { alpha: true });
    if (!ctx) return;

    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);
    let size = width * height;

    let rippleData = new Int16Array(size);
    let nextRippleData = new Int16Array(size);

    const imageData = ctx.createImageData(width, height);
    const data = imageData.data;

    const handleMouseMove = (e: MouseEvent) => {
      const rect = canvas.getBoundingClientRect();
      const x = Math.floor(e.clientX - rect.left);
      const y = Math.floor(e.clientY - rect.top);
      
      const radius = 8;
      for (let j = -radius; j <= radius; j++) {
        for (let i = -radius; i <= radius; i++) {
          if (i * i + j * j < radius * radius) {
            const index = (x + i) + (y + j) * width;
            if (index >= 0 && index < size) {
              rippleData[index] += 160; // Lower energy for a subtler look
            }
          }
        }
      }
    };

    const animate = () => {
      // 1. Propagation & Damping (Increased damping for faster fading)
      for (let i = width; i < size - width; i++) {
        nextRippleData[i] = (
          (rippleData[i - 1] + 
           rippleData[i + 1] + 
           rippleData[i - width] + 
           rippleData[i + width]) >> 1
        ) - nextRippleData[i];
        
        nextRippleData[i] -= nextRippleData[i] >> 5; 
      }

      for (let i = 0; i < size; i++) {
        const dx = rippleData[i] - rippleData[i + 1];
        const dy = rippleData[i] - rippleData[i + width];
        const intensity = Math.abs(dx + dy);

        const pixelIdx = i * 4;
        
        data[pixelIdx] = 210 + intensity;     // Red (Bright)
        data[pixelIdx + 1] = 235 + intensity; // Green (Teal)
        data[pixelIdx + 2] = 255;             // Blue (Strong)
        
        data[pixelIdx + 3] = Math.min(120, 10 + intensity * 0.6);
      }

      ctx.putImageData(imageData, 0, 0);

      let temp = rippleData;
      rippleData = nextRippleData;
      nextRippleData = temp;

      animationRef.current = requestAnimationFrame(animate);
    };

    const handleResize = () => {
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
      size = width * height;
      rippleData = new Int16Array(size);
      nextRippleData = new Int16Array(size);
    };

    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('resize', handleResize);
    animate();

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('resize', handleResize);
      cancelAnimationFrame(animationRef.current);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 pointer-events-none"
      style={{
        zIndex: 100,
        mixBlendMode: 'overlay', 
        opacity: 0.4,           
        filter: 'blur(1.5px)',  
      }}
    />
  );
}
