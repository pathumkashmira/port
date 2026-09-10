'use client';

import React from 'react';
import Link from 'next/link';
import { ArrowUpRight, Award, CheckCircle2, Sparkles, Box, ShieldCheck } from 'lucide-react';
import { FIVERR_GIGS } from '@/data/ventures';
import { FiverrGigPreview } from '@/components/fiverr/FiverrGigPreview';

export function FiverrHub() {
  return (
    <section className="relative overflow-hidden border border-stone-300 dark:border-white/10 bg-[#EFECE6]/90 dark:bg-[#08090F] p-6 sm:p-10 lg:p-14 cad-corner-tl cad-corner-br transition-colors duration-400">
      <div className="viewport-grid absolute inset-0 opacity-20 pointer-events-none" />

      <div className="relative z-10 space-y-10">
        {/* Header Header */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-6 border-b border-stone-300 dark:border-white/10 pb-8">
          <div>
            <div className="inline-flex items-center gap-2 border border-emerald-500/40 bg-emerald-500/10 px-3 py-1 font-mono text-[10px] uppercase tracking-[0.2em] text-emerald-700 dark:text-emerald-400 mb-3 font-semibold">
              <ShieldCheck className="h-3.5 w-3.5" />
              <span>Verified Top Rated 3D Artist · 100% Five-Star Client Delivery</span>
            </div>
            <h2 className="font-display text-3xl sm:text-5xl font-extrabold uppercase text-stone-900 dark:text-white tracking-tight">
              <span className="text-emerald-600 dark:text-emerald-400">FIVERR</span> Commercial Services
            </h2>
            <p className="font-mono text-xs sm:text-sm uppercase tracking-wider text-gold mt-2 font-semibold">
              Realistic 3D Product Animation, Hard-Surface Modeling &amp; CGI · Powered by ORVEX Standards
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-3">
            <a
              href="https://www.fiverr.com/s/jyvxXgv"
              target="_blank"
              rel="noreferrer noopener"
              data-cursor="GIG"
              className="inline-flex items-center gap-2 bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-500 hover:to-teal-500 px-6 py-3 font-mono text-xs uppercase tracking-[0.22em] text-white font-bold transition-all duration-300 hover:-translate-y-0.5 hover:shadow-[0_0_25px_rgba(16,185,129,0.5)]"
            >
              <Sparkles className="h-3.5 w-3.5 fill-current" />
              <span>Direct Gig ($100+)</span>
              <ArrowUpRight className="h-3.5 w-3.5" />
            </a>

            <a
              href="https://www.fiverr.com/s/X0RGdB0"
              target="_blank"
              rel="noreferrer noopener"
              data-cursor="FIVERR"
              className="inline-flex items-center gap-2 border border-stone-300 dark:border-white/20 bg-white/70 dark:bg-black/50 px-5 py-3 font-mono text-xs uppercase tracking-[0.22em] text-stone-800 dark:text-white font-semibold transition-all hover:border-emerald-500"
            >
              <span>Profile</span>
              <ArrowUpRight className="h-3.5 w-3.5" />
            </a>
          </div>
        </div>

        {/* Featured Real Fiverr Gig Visual Preview */}
        <FiverrGigPreview />

        {/* 3 Gig Cards */}
        <div className="space-y-4">
          <div className="flex items-center justify-between border-b border-stone-200 dark:border-white/5 pb-2">
            <span className="font-mono text-[11px] uppercase tracking-[0.2em] text-stone-500 dark:text-slate-400">
              All Active Gig Offerings &amp; Turnarounds
            </span>
            <span className="font-mono text-[10px] uppercase tracking-wider text-gold font-bold">
              Blender Cycles &amp; Quad Topology
            </span>
          </div>
          <div className="grid md:grid-cols-3 gap-6">
          {FIVERR_GIGS.map((gig) => (
            <div
              key={gig.id}
              className="border border-stone-300 dark:border-white/10 bg-white/80 dark:bg-[#0C0E16] p-6 space-y-4 hover:border-gold/60 transition-all duration-300 flex flex-col justify-between shadow-xs"
            >
              <div className="space-y-4">
                <div className="flex items-center justify-between font-mono text-[10px] text-stone-500 dark:text-white/50 border-b border-stone-200 dark:border-white/5 pb-3">
                  <span className="text-gold dark:text-accent-glow uppercase tracking-wider font-semibold">{gig.category}</span>
                  <span>{gig.turnaround}</span>
                </div>

                <h4 className="font-display text-lg font-bold uppercase text-stone-900 dark:text-white tracking-tight leading-snug">
                  {gig.title}
                </h4>

                <div className="font-mono text-lg font-bold text-emerald-700 dark:text-gold">
                  {gig.price}
                </div>

                <ul className="space-y-2 border-t border-stone-200 dark:border-white/5 pt-3">
                  {gig.highlights.map((h, i) => (
                    <li key={i} className="flex items-center gap-2 text-xs text-stone-700 dark:text-white/70">
                      <CheckCircle2 className="h-3.5 w-3.5 text-emerald-600 dark:text-emerald-400 shrink-0" />
                      <span>{h}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="pt-4 border-t border-stone-200 dark:border-white/5">
                <a
                  href={gig.link}
                  target="_blank"
                  rel="noreferrer noopener"
                  data-cursor="ORDER"
                  className="inline-flex w-full items-center justify-center gap-2 border border-emerald-600/30 dark:border-white/20 bg-emerald-500/10 dark:bg-white/5 py-2.5 font-mono text-[10px] uppercase tracking-[0.18em] text-emerald-800 dark:text-white/90 hover:border-emerald-500 hover:bg-emerald-600 hover:text-white transition-all font-semibold"
                >
                  <span>Order Gig On Fiverr</span>
                  <ArrowUpRight className="h-3 w-3" />
                </a>
              </div>
            </div>
          ))}
          </div>
        </div>
      </div>
    </section>
  );
}
