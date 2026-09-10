'use client';

import React, { useEffect, useState } from 'react';

export function CustomCursor() {
  const [position, setPosition] = useState({ x: -100, y: -100 });
  const [cursorText, setCursorText] = useState('');
  const [isHovered, setIsHovered] = useState(false);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    // Only enable on desktop with fine pointers
    if (typeof window === 'undefined' || window.matchMedia('(pointer: coarse)').matches) {
      return;
    }

    const handleMouseMove = (e: MouseEvent) => {
      setPosition({ x: e.clientX, y: e.clientY });
      if (!isVisible) setIsVisible(true);

      // Inspect target for data-cursor or interactive elements
      const target = e.target as HTMLElement | null;
      const cursorTarget = target?.closest('[data-cursor]') as HTMLElement | null;
      
      if (cursorTarget) {
        const text = cursorTarget.getAttribute('data-cursor') || '';
        setCursorText(text);
        setIsHovered(true);
      } else {
        const isInteractive = target?.closest('a, button, input, textarea, select, [role="button"]');
        if (isInteractive) {
          setCursorText('');
          setIsHovered(true);
        } else {
          setCursorText('');
          setIsHovered(false);
        }
      }
    };

    const handleMouseLeave = () => {
      setIsVisible(false);
    };

    const handleMouseEnter = () => {
      setIsVisible(true);
    };

    window.addEventListener('mousemove', handleMouseMove);
    document.addEventListener('mouseleave', handleMouseLeave);
    document.addEventListener('mouseenter', handleMouseEnter);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseleave', handleMouseLeave);
      document.removeEventListener('mouseenter', handleMouseEnter);
    };
  }, [isVisible]);

  if (!isVisible) return null;

  return (
    <div
      className="pointer-events-none fixed z-[9999] transition-opacity duration-300 select-none"
      style={{
        left: `${position.x}px`,
        top: `${position.y}px`,
        transform: 'translate(-50%, -50%)',
      }}
    >
      {/* Center dot */}
      <div
        className={`rounded-full transition-all duration-200 ease-out ${
          isHovered
            ? 'h-2 w-2 bg-accent-glow opacity-90'
            : 'h-1.5 w-1.5 bg-gold opacity-100'
        }`}
      />

      {/* Orbiting / expanding badge ring */}
      <div
        className={`absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 rounded-full border transition-all duration-300 ease-out flex items-center justify-center ${
          cursorText
            ? 'h-16 w-16 border-accent-glow/70 bg-[#07080A]/85 backdrop-blur-xs shadow-[0_0_20px_rgba(0,242,254,0.3)]'
            : isHovered
            ? 'h-10 w-10 border-gold/60 bg-gold/5'
            : 'h-6 w-6 border-white/20'
        }`}
      >
        {cursorText && (
          <span className="font-mono text-[9px] uppercase tracking-[0.2em] font-semibold text-accent-glow px-1 text-center leading-none">
            {cursorText}
          </span>
        )}
      </div>
    </div>
  );
}
