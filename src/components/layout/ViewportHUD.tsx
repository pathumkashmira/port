'use client';

import React from 'react';
import { Box, Radio } from 'lucide-react';
import { AudioPlayer } from '@/components/ui/AudioPlayer';

export function ViewportHUD() {
  return (
    <div className="border-b border-white/5 bg-[#07080A]/80 backdrop-blur-md px-4 py-2 font-mono text-[10px] uppercase tracking-[0.2em] text-white/50">
      <div className="mx-auto flex max-w-7xl items-center justify-between gap-4">
        {/* Left: Viewport Status */}
        <div className="flex items-center gap-3">
          <span className="flex items-center gap-1.5 text-accent-glow">
            <Radio className="h-2.5 w-2.5 animate-pulse text-emerald-400" />
            <span className="hidden sm:inline">LIVE STATUS:</span>
            <span className="text-white/80">COMMISSIONS OPEN</span>
          </span>
          <span className="hidden md:inline text-white/20">|</span>
          <span className="hidden md:flex items-center gap-1.5 text-white/60">
            <Box className="h-3 w-3 text-gold" />
            <span>BLENDER 4.x / CYCLES & EEVEE NEXT</span>
          </span>
        </div>

        {/* Right: Geolocation & Sound Atmosphere */}
        <div className="flex items-center gap-4">
          <span className="hidden lg:inline text-white/40">
            SRI LANKA [06°55′ N, 79°51′ E]
          </span>
          <AudioPlayer />
        </div>
      </div>
    </div>
  );
}
