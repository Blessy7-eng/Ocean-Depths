'use client';

import { useEffect, useState } from 'react';

export default function LoadingScreen() {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 95) return prev;
        return prev + Math.random() * 20;
      });
    }, 300);

    const finalTimer = setTimeout(() => {
      setProgress(100);
    }, 3500);

    return () => {
      clearInterval(interval);
      clearTimeout(finalTimer);
    };
  }, []);

  return (
    <div className="fixed inset-0 bg-gradient-to-b from-blue-950 via-blue-900 to-blue-950 flex flex-col items-center justify-center z-50">
      {/* Animated background orbs */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-20 left-10 w-40 h-40 bg-cyan-500 rounded-full opacity-20 blur-3xl animate-float" />
        <div className="absolute bottom-20 right-10 w-60 h-60 bg-blue-500 rounded-full opacity-20 blur-3xl animate-float" style={{ animationDelay: '-1s' }} />
      </div>

      {/* Content */}
      <div className="relative z-10 flex flex-col items-center gap-8">
        {/* Submarine icon */}
        <div className="w-24 h-24 mb-4 animate-float">
          <svg
            viewBox="0 0 100 100"
            className="w-full h-full"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
          >
            {/* Submarine body */}
            <ellipse cx="50" cy="50" rx="40" ry="25" className="stroke-cyan-400" />
            {/* Periscope */}
            <rect x="48" y="20" width="4" height="30" className="stroke-cyan-400" />
            {/* Conning tower */}
            <rect x="45" y="35" width="10" height="12" className="stroke-cyan-400" />
            {/* Window */}
            <circle cx="50" cy="50" r="8" className="stroke-cyan-400" />
            {/* Propeller */}
            <circle cx="85" cy="50" r="5" className="stroke-cyan-400" />
            <line x1="80" y1="50" x2="90" y2="50" className="stroke-cyan-400" />
            <line x1="85" y1="45" x2="85" y2="55" className="stroke-cyan-400" />
          </svg>
        </div>

        {/* Title */}
        <h1 className="text-4xl font-bold text-gradient text-center">
          Descending into the Deep
        </h1>

        {/* Depth indicator */}
        <div className="text-center text-cyan-300 text-lg font-light">
          <p>Current depth: {Math.round(progress * 4000 / 100)}m</p>
        </div>

        {/* Progress bar */}
        <div className="w-64 h-2 bg-blue-900 rounded-full overflow-hidden border border-cyan-400/30">
          <div
            className="h-full bg-gradient-to-r from-cyan-400 to-blue-400 rounded-full transition-all duration-300 glow-cyan"
            style={{ width: `${progress}%` }}
          />
        </div>

        {/* Status text */}
        <p className="text-cyan-200 text-sm mt-4">
          {progress < 25 && 'Initializing systems...'}
          {progress >= 25 && progress < 50 && 'Calibrating instruments...'}
          {progress >= 50 && progress < 75 && 'Engaging descent sequence...'}
          {progress >= 75 && progress < 100 && 'Final preparations...'}
          {progress >= 100 && 'Ready to explore'}
        </p>
      </div>
    </div>
  );
}
