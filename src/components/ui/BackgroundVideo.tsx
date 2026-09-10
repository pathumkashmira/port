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
  priority?: boolean;
}

export function BackgroundVideo({
  src,
  poster,
  opacity = 0.9,
  className = '',
  overlayClassName = '',
  blur = false,
  blendMode = 'normal',
  priority = false,
}: BackgroundVideoProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const [isReady, setIsReady] = useState(false);
  const [isInView, setIsInView] = useState(priority);
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

  // IntersectionObserver: Stream & decode ONLY when visible, pause when offscreen
  useEffect(() => {
    const container = containerRef.current;
    if (!container || typeof IntersectionObserver === 'undefined') {
      setIsInView(true);
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          setIsInView(entry.isIntersecting);
        });
      },
      {
        rootMargin: '160px 0px',
        threshold: 0.05,
      }
    );

    observer.observe(container);
    return () => observer.disconnect();
  }, []);

  // Control playback based on visibility & reduced motion
  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    if (prefersReducedMotion) {
      video.pause();
      return;
    }

    if (isInView) {
      const playPromise = video.play();
      if (playPromise !== undefined) {
        playPromise
          .then(() => setIsReady(true))
          .catch(() => {
            // Autoplay postponed or muted policy handling
          });
      }
    } else {
      // Offscreen: immediately pause to free hardware decoders
      video.pause();
    }
  }, [isInView, src, prefersReducedMotion]);

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
      ref={containerRef}
      className={`absolute inset-0 overflow-hidden pointer-events-none select-none z-0 ${className}`}
      aria-hidden="true"
    >
      {/* Sleek ambient shimmering placeholder while video buffers */}
      <div 
        className={`absolute inset-0 transition-opacity duration-700 pointer-events-none ${
          isReady ? 'opacity-0' : 'opacity-100'
        } ${
          isDark 
            ? 'bg-gradient-to-br from-[#0B0E14] via-[#111622] to-[#0B0E14]' 
            : 'bg-gradient-to-br from-[#F7F5F0] via-[#EAE6DE] to-[#F7F5F0]'
        }`}
      />

      {/* Cinematic High-Performance Video Element */}
      <video
        ref={videoRef}
        loop
        muted
        playsInline
        preload={priority ? 'metadata' : 'none'}
        poster={poster}
        onLoadedData={() => setIsReady(true)}
        onCanPlay={() => setIsReady(true)}
        style={{
          ...blendStyle,
          opacity: isReady ? opacity : 0,
        }}
        className={`absolute inset-0 h-full w-full object-cover object-center transition-opacity duration-700 ease-out will-change-transform filter contrast-[1.06] brightness-[1.03] ${blurClass}`}
      >
        {/* Only load source when in view or priority to prevent network congestion */}
        {(isInView || priority) && <source src={src} type="video/mp4" />}
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
