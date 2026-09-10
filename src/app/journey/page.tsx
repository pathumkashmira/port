'use client';

import React from 'react';
import { TimelineScrubber } from '@/components/journey/TimelineScrubber';
import { BackgroundVideo } from '@/components/ui/BackgroundVideo';
import { useStudioStore } from '@/lib/store';

export default function JourneyPage() {
  const { journey } = useStudioStore();

  return (
    <div className="relative min-h-screen bg-[#F7F5F0] dark:bg-[#0B0E14] pt-24 pb-36 px-5 sm:px-10 text-stone-800 dark:text-slate-100 overflow-hidden transition-colors duration-400">
      {/* Subtle architectural viewport grid instead of heavy video background */}
      <div className="viewport-grid absolute inset-0 opacity-15 pointer-events-none" />

      <div className="relative z-10 mx-auto max-w-7xl space-y-16">
        {/* Header Block */}
        <div className="border-b border-stone-300 dark:border-white/10 pb-12">
          <p className="font-mono text-[11px] uppercase tracking-[0.3em] text-gold dark:text-accent-glow">
            Evolution &amp; Milestones · 2021 — Present
          </p>
          <div className="mt-4 flex flex-col md:flex-row md:items-end justify-between gap-6">
            <h1 className="font-display text-5xl sm:text-7xl font-black uppercase text-stone-900 dark:text-white tracking-tight">
              Creative Journey
            </h1>
            <p className="max-w-md text-xs sm:text-sm text-stone-600 dark:text-slate-300 font-mono">
              Trace the technical leaps, studio foundations, academic rigor, and community leadership shaping Pethum Kashmira&apos;s practice today.
            </p>
          </div>
        </div>

        {/* Interactive Timeline Scrubber */}
        <TimelineScrubber items={journey} />
      </div>
    </div>
  );
}
