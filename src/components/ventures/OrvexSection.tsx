'use client';

import React from 'react';
import { ArrowUpRight, Box, Film, Sparkles } from 'lucide-react';
import { ORVEX_VENTURE } from '@/data/ventures';
import { BackgroundVideo } from '@/components/ui/BackgroundVideo';

export function OrvexSection() {
  return (
    <section className="relative overflow-hidden border border-stone-300 dark:border-white/10 bg-[#F7F5F0]/60 dark:bg-slate-900/60 p-8 sm:p-12 lg:p-16 cad-corner-tl cad-corner-br backdrop-blur-md">
      {/* High-Visibility Commercial CGI Production Showreel */}
      <BackgroundVideo
        src="/videos/orvex-reel.mp4"
        opacity={0.88}
        overlayClassName="opacity-40"
      />

      {/* Grid Pattern Overlay */}
      <div className="viewport-grid absolute inset-0 opacity-15 pointer-events-none" />

      <div className="relative z-10">
        {/* Studio Header */}
        <div className="flex flex-wrap items-center justify-between gap-4 border-b border-stone-300/80 dark:border-white/10 pb-6">
          <div className="flex items-center gap-3">
            <span className="grid h-9 w-9 place-items-center border border-gold/60 bg-gold/15 font-mono text-xs font-bold text-gold shadow-[0_0_15px_rgba(212,175,55,0.15)]">
              OX
            </span>
            <div>
              <span className="font-display text-lg font-black uppercase text-stone-900 dark:text-white tracking-wider">
                ORVEX Creative Studio
              </span>
              <span className="block font-mono text-[9px] uppercase tracking-[0.24em] text-accent-glow">
                orvexcg.site · Official Production Arm
              </span>
            </div>
          </div>
          <div className="inline-flex items-center gap-2 border border-gold/50 bg-gold/10 px-3 py-1 font-mono text-[9px] uppercase tracking-[0.2em] text-gold backdrop-blur-md">
            <Film className="h-3 w-3" />
            <span>Commercial CGI &amp; Motion Reel</span>
          </div>
        </div>

        {/* Narrative & Capabilities */}
        <div className="mt-8 grid lg:grid-cols-12 gap-10 items-center">
          <div className="lg:col-span-7 space-y-6">
            <h3 className="font-display text-3xl sm:text-4xl font-extrabold uppercase text-stone-900 dark:text-white tracking-tight leading-tight drop-shadow-sm">
              High-End 3D Visualization, Product CGI &amp; Visual Production
            </h3>
            <p className="text-sm sm:text-base leading-relaxed text-stone-700 dark:text-slate-200">
              ORVEX is a global creative production studio engineered to deliver photorealistic CGI, atmospheric environment design, CAD-precision product models, and commercial motion campaigns for discerning brands worldwide.
            </p>

            <div className="grid sm:grid-cols-2 gap-3 pt-2">
              {ORVEX_VENTURE.services.map((service, idx) => (
                <div 
                  key={idx} 
                  className="glass-panel flex items-center gap-2.5 p-3 text-xs text-stone-800 dark:text-slate-200 transition-colors hover:border-gold/40"
                >
                  <Box className="h-3.5 w-3.5 text-accent-glow shrink-0" />
                  <span className="font-mono text-[11px] uppercase tracking-wide truncate">{service}</span>
                </div>
              ))}
            </div>

            <div className="pt-4">
              <a
                href={ORVEX_VENTURE.url}
                target="_blank"
                rel="noreferrer noopener"
                data-cursor="VISIT ORVEX"
                className="inline-flex items-center gap-3 border border-gold bg-gold px-7 py-4 font-mono text-xs uppercase tracking-[0.22em] text-[#0B0E14] font-bold transition-all duration-300 hover:-translate-y-0.5 hover:shadow-[0_0_25px_rgba(212,175,55,0.4)]"
              >
                <span>Enter orvexcg.site Studio Portal</span>
                <ArrowUpRight className="h-4 w-4" />
              </a>
            </div>
          </div>

          {/* Right Metrics Grid */}
          <div className="lg:col-span-5 grid grid-cols-2 gap-4">
            {ORVEX_VENTURE.stats.map((stat, idx) => (
              <div 
                key={idx} 
                className="glass-panel p-6 text-center space-y-2 transition-transform duration-300 hover:-translate-y-1 hover:border-gold/50"
              >
                <span className="font-display text-xl sm:text-2xl font-bold text-gold block">
                  {stat.value}
                </span>
                <span className="font-mono text-[10px] uppercase tracking-[0.16em] text-stone-500 dark:text-slate-400 block">
                  {stat.label}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
