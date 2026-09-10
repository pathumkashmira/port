'use client';

import React from 'react';
import { OrvexSection } from '@/components/ventures/OrvexSection';
import { FilxySection } from '@/components/ventures/FilxySection';
import { BackgroundVideo } from '@/components/ui/BackgroundVideo';
import { useStudioStore } from '@/lib/store';

export default function VenturesPage() {
  const { settings } = useStudioStore();
  const venturesVideoSrc = settings.pageVideos?.ventures || '/videos/orvex-reel.mp4';

  return (
    <div className="relative min-h-screen bg-transparent text-inherit pt-24 pb-36 px-5 sm:px-10 overflow-hidden">
      {/* Dynamic Background Video Configurable from Admin */}
      <BackgroundVideo
        src={venturesVideoSrc}
        opacity={0.88}
      />

      <div className="relative z-10 mx-auto max-w-7xl space-y-24">
        {/* Header Block */}
        <div className="border-b border-stone-300/80 dark:border-white/10 pb-12">
          <p className="font-mono text-[11px] uppercase tracking-[0.3em] text-gold font-bold">
            Ecosystem · Studio Production &amp; E-Commerce
          </p>
          <div className="mt-4 flex flex-col md:flex-row md:items-end justify-between gap-6">
            <h1 className="font-display text-5xl sm:text-7xl font-black uppercase text-stone-900 dark:text-white tracking-tight">
              <span className="text-gold">ORVEX</span> Studio &amp; Ventures
            </h1>
            <p className="max-w-md text-xs sm:text-sm text-stone-600 dark:text-slate-300 font-mono">
              The dual operational branches founded by Pethum Kashmira: high-end commercial CGI studio production at ORVEX on one side, and automated digital commerce at Filxy on the other.
            </p>
          </div>
        </div>

        {/* Section 1: ORVEX Creative Studio */}
        <OrvexSection />

        {/* Section 2: Filxy Store */}
        <FilxySection />
      </div>
    </div>
  );
}
