'use client';

import React, { useRef, useEffect, useState } from 'react';
import { useTheme } from '@/components/theme/ThemeProvider';

interface BackgroundVideoProps {
  src: string;
  poster?: string;
  opacity?: number;
  className?: string;
  overlayClassName?: string;
  blur?: boolean | string;
  blendMode?: 'normal' | 'screen' | 'overlay' | 'luminosity' | 'soft-light' | 'lighten';
  showControls?: boolean;
  interactiveParallax?: boolean;
}

export function BackgroundVideo({
  src,
  poster,
  opacity = 0.9,
  className = '',
  overlayClassName = '',
  blur = false,
  blendMode = 'normal',
}: BackgroundVideoProps) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [isReady, setIsReady] = useState(false);
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);
  
  // Safe hook call that won't crash if outside ThemeProvider
  let isDark = true;
  try {
    const themeContext = useTheme();
    isDark = themeContext.theme === 'dark';
  } catch {
    isDark = true;
  }

  useEffect(() => {
    // Check reduced motion preference
    if (typeof window !== 'undefined') {
      const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
      setPrefersReducedMotion(mediaQuery.matches);

      const handleChange = (e: MediaQueryListEvent) => setPrefersReducedMotion(e.matches);
      mediaQuery.addEventListener('change', handleChange);
      return () => mediaQuery.removeEventListener('change', handleChange);
    }
  }, []);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    if (prefersReducedMotion) {
      video.pause();
      return;
    }

    const playPromise = video.play();
    if (playPromise !== undefined) {
      playPromise
        .then(() => setIsReady(true))
        .catch(() => {
          // Autoplay was prevented or postponed
          setIsReady(false);
        });
    }
  }, [src, prefersReducedMotion]);

  const blurClass = typeof blur === 'string' 
    ? blur 
    : blur 
      ? 'backdrop-blur-sm' 
      : '';

  const blendStyle = blendMode !== 'normal' 
    ? { mixBlendMode: blendMode as React.CSSProperties['mixBlendMode'] } 
    : undefined;

  return (
    <div 
      className={`absolute inset-0 overflow-hidden pointer-events-none select-none z-0 ${className}`}
      aria-hidden="true"
    >
      {/* Cinematic High-Visibility Video Element */}
      <video
        ref={videoRef}
        autoPlay
        loop
        muted
        playsInline
        preload="auto"
        poster={poster}
        onLoadedData={() => setIsReady(true)}
        style={{
          ...blendStyle,
          opacity: isReady ? opacity : 0,
        }}
        className={`absolute inset-0 h-full w-full object-cover object-center transition-all duration-1000 ease-out will-change-transform scale-100 group-hover:scale-105 filter contrast-[1.08] brightness-[1.04] ${blurClass}`}
      >
        <source src={src} type="video/mp4" />
      </video>

      {/* 
        Localized Subtle Scrim Overlays (NEVER a heavy solid opaque layer).
        Only fades gently at the very bottom/edges to guarantee headline & text contrast.
      */}
      <div 
        className={`absolute inset-0 transition-colors duration-500 pointer-events-none ${
          isDark
            ? 'bg-gradient-to-t from-[#0B0E14]/75 via-[#0B0E14]/20 to-transparent'
            : 'bg-gradient-to-t from-[#F7F5F0]/80 via-[#F7F5F0]/25 to-transparent'
        } ${overlayClassName}`} 
      />

      {/* Extremely subtle ambient rim vignette to integrate with viewport bounds */}
      <div 
        className={`absolute inset-0 pointer-events-none transition-opacity duration-500 ${
          isDark
            ? 'bg-[radial-gradient(ellipse_at_center,transparent_55%,rgba(11,14,20,0.5)_100%)]'
            : 'bg-[radial-gradient(ellipse_at_center,transparent_55%,rgba(247,245,240,0.45)_100%)]'
        }`}
      />
    </div>
  );
}
