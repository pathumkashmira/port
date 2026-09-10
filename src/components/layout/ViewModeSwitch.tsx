'use client';

import React, { useState, useEffect } from 'react';
import { Monitor, Smartphone, Check } from 'lucide-react';

export function ViewModeSwitch() {
  const [viewMode, setViewMode] = useState<'desktop' | 'mobile'>('desktop');
  const [isMobileDevice, setIsMobileDevice] = useState(false);
  const [notice, setNotice] = useState<string | null>(null);

  useEffect(() => {
    // Check if on a mobile or touch device
    const checkIsMobile = () => {
      const isTouch = 'ontouchstart' in window || navigator.maxTouchPoints > 0;
      const isNarrow = window.screen.width < 1024;
      return isTouch || isNarrow;
    };

    const isMob = checkIsMobile();
    setIsMobileDevice(isMob);

    // Read stored view mode or default to 'desktop'
    let storedMode: 'desktop' | 'mobile' = 'desktop';
    try {
      const saved = localStorage.getItem('pk_view_mode');
      if (saved === 'mobile') {
        storedMode = 'mobile';
      }
    } catch {
      storedMode = 'desktop';
    }

    setViewMode(storedMode);
    applyViewMode(storedMode, false);
  }, []);

  const applyViewMode = (mode: 'desktop' | 'mobile', notify = true) => {
    try {
      localStorage.setItem('pk_view_mode', mode);
    } catch {}

    const metas = document.querySelectorAll('meta[name="viewport"]');

    if (mode === 'desktop') {
      const screenW = typeof window !== 'undefined' ? (window.screen?.width || window.innerWidth || 390) : 390;
      const scale = Math.min(1, Math.max(0.2, screenW / 1280));
      const content = `width=1280, initial-scale=${scale.toFixed(3)}, minimum-scale=0.2, maximum-scale=5.0, user-scalable=yes`;
      metas.forEach((m) => m.setAttribute('content', content));

      document.documentElement.classList.add('force-desktop-view');
      document.body.classList.add('force-desktop-view');
      if (notify) {
        setNotice('Switched to Desktop View (1280px Canvas)');
        setTimeout(() => setNotice(null), 2500);
      }
    } else {
      const content = 'width=device-width, initial-scale=1.0, minimum-scale=0.5, maximum-scale=5.0, user-scalable=yes';
      metas.forEach((m) => m.setAttribute('content', content));

      document.documentElement.classList.remove('force-desktop-view');
      document.body.classList.remove('force-desktop-view');
      if (notify) {
        setNotice('Switched to Fluid Mobile View');
        setTimeout(() => setNotice(null), 2500);
      }
    }
  };

  const toggleView = () => {
    const nextMode = viewMode === 'desktop' ? 'mobile' : 'desktop';
    setViewMode(nextMode);
    applyViewMode(nextMode, true);
  };

  // Only show the floating toggle on mobile / touch devices or narrow screens
  if (!isMobileDevice) return null;

  return (
    <>
      {/* Toast Notification */}
      {notice && (
        <div className="fixed bottom-20 left-1/2 -translate-x-1/2 z-50 bg-[#0B0E14] border border-gold px-4 py-2 text-gold font-mono text-[12px] uppercase tracking-wider shadow-2xl flex items-center gap-2 animate-in fade-in duration-200 pointer-events-none rounded-sm">
          <Check className="h-4 w-4 text-emerald-400" />
          <span>{notice}</span>
        </div>
      )}

      {/* Floating View Switcher Button */}
      <aside 
        aria-label="View Mode Switcher"
        className="fixed bottom-5 right-5 z-50 flex items-center shadow-[0_4px_30px_rgba(0,0,0,0.8)]"
      >
        <button
          type="button"
          onClick={toggleView}
          aria-label={viewMode === 'desktop' ? 'Switch to Mobile View' : 'Switch to Desktop View'}
          className="group flex items-center gap-2.5 border border-gold/80 bg-[#0B0E14]/95 backdrop-blur-md px-4 py-2.5 rounded-full font-mono text-[11px] uppercase tracking-[0.14em] text-white hover:border-gold hover:text-gold transition-all duration-300 active:scale-95 cursor-pointer shadow-lg"
        >
          {viewMode === 'desktop' ? (
            <>
              <Monitor className="h-4 w-4 text-gold animate-pulse" />
              <span className="font-bold text-gold">Desktop View</span>
              <span className="text-white/40">|</span>
              <span className="text-white/70 group-hover:text-white">Switch to Mobile</span>
            </>
          ) : (
            <>
              <Smartphone className="h-4 w-4 text-accent-glow animate-pulse" />
              <span className="font-bold text-accent-glow">Mobile View</span>
              <span className="text-white/40">|</span>
              <span className="text-white/70 group-hover:text-white">Switch to Desktop</span>
            </>
          )}
        </button>
      </aside>
    </>
  );
}
