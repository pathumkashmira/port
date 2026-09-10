'use client';

import React from 'react';
import { FiverrHub } from '@/components/fiverr/FiverrHub';
import { BackgroundVideo } from '@/components/ui/BackgroundVideo';
import { useStudioStore } from '@/lib/store';

export default function FiverrPage() {
  const { settings } = useStudioStore();
  const fiverrVideoSrc = settings.pageVideos?.fiverr || '/videos/liquid-artifact.mp4';

  return (
    <div className="relative min-h-screen bg-transparent text-inherit pt-24 pb-36 px-5 sm:px-10 overflow-hidden">
      {/* Dynamic Background Video for Fiverr Page Configurable from Admin */}
      <BackgroundVideo
        src={fiverrVideoSrc}
        opacity={0.88}
      />

      <div className="relative z-10 mx-auto max-w-7xl space-y-16">
        {/* Header Block */}
        <div className="border-b border-stone-300/80 dark:border-white/10 pb-12">
          <p className="font-mono text-[11px] uppercase tracking-[0.3em] text-emerald-600 dark:text-emerald-400 font-bold">
            Freelance Services · Verified 5.0 Star 3D Artist · Powered by ORVEX
          </p>
          <div className="mt-4 flex flex-col md:flex-row md:items-end justify-between gap-6">
            <h1 className="font-display text-5xl sm:text-7xl font-black uppercase text-stone-900 dark:text-white tracking-tight">
              Realistic 3D <span className="bg-gradient-to-r from-[#00F2FE] via-[#38BDF8] to-[#93C5FD] bg-clip-text text-transparent">Product Animation</span>
            </h1>
            <p className="max-w-md text-xs sm:text-sm text-stone-600 dark:text-slate-300 font-mono">
              Direct access to verified service packages with fixed turnaround, 4K rendering, commercial rights, and clean topology in Blender.
            </p>
          </div>
        </div>

        {/* Fiverr Hub Component with Visual Gig Preview */}
        <FiverrHub />
      </div>
    </div>
  );
}
