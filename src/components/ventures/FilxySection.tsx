'use client';

import React from 'react';
import { ArrowUpRight, ShoppingBag, ShieldCheck, Zap, MessageCircle, Star } from 'lucide-react';
import { FILXY_VENTURE } from '@/data/ventures';

export function FilxySection() {
  return (
    <section className="relative overflow-hidden border border-stone-300 dark:border-white/10 bg-[#F7F5F0]/80 dark:bg-slate-900/60 p-8 sm:p-12 lg:p-16 cad-corner-tl cad-corner-br backdrop-blur-md">
      {/* Clean Technical Dense Grid & Subtle Radial Ambient Glow */}
      <div className="viewport-grid-dense absolute inset-0 opacity-20 pointer-events-none" />
      <div className="absolute inset-0 pointer-events-none bg-[radial-gradient(circle_at_70%_30%,rgba(56,189,248,0.06)_0%,transparent_60%)]" />

      <div className="relative z-10">
        {/* Header Badge */}
        <div className="flex flex-wrap items-center justify-between gap-4 border-b border-stone-300/80 dark:border-white/10 pb-6">
          <div className="flex items-center gap-3">
            <span className="grid h-9 w-9 place-items-center rounded-full bg-gold/15 border border-gold/60 font-mono text-xs font-bold text-gold shadow-[0_0_15px_rgba(212,175,55,0.15)]">
              FX
            </span>
            <div>
              <span className="font-display text-lg font-black uppercase text-stone-900 dark:text-white tracking-wider">
                Filxy Store
              </span>
              <span className="block font-mono text-[9px] uppercase tracking-[0.24em] text-accent-glow">
                filxy.store · Founded by Pethum Kashmira
              </span>
            </div>
          </div>
          <div className="inline-flex items-center gap-1.5 font-mono text-[10px] uppercase tracking-[0.18em] text-emerald-600 dark:text-emerald-400 bg-emerald-500/10 border border-emerald-500/30 px-3 py-1">
            <Zap className="h-3 w-3" />
            <span>Instant WhatsApp Delivery</span>
          </div>
        </div>

        {/* Narrative & Stats */}
        <div className="mt-8 grid lg:grid-cols-12 gap-10 items-center">
          <div className="lg:col-span-7 space-y-6">
            <h3 className="font-display text-3xl sm:text-4xl font-extrabold uppercase text-stone-900 dark:text-white tracking-tight leading-tight">
              Premium Digital Subscriptions &amp; Assets Marketplace
            </h3>
            <p className="text-sm sm:text-base leading-relaxed text-stone-700 dark:text-slate-300">
              Founded and managed by Pethum Kashmira, Filxy Store delivers premium creative, productivity, and streaming subscriptions (ChatGPT Plus, Canva Pro, CapCut, YouTube Premium, Netflix) at reseller prices with instant WhatsApp delivery and full replacement warranty.
            </p>

            {/* Feature Guarantees */}
            <div className="grid sm:grid-cols-3 gap-4 pt-2">
              <div className="glass-panel p-4 space-y-1 text-center transition-transform hover:-translate-y-0.5">
                <ShieldCheck className="h-5 w-5 text-accent-glow mx-auto" />
                <span className="font-display text-xs uppercase font-bold text-stone-900 dark:text-white block">Full Warranty</span>
                <span className="font-mono text-[10px] text-stone-500 dark:text-slate-400 block">100% Replacement</span>
              </div>
              <div className="glass-panel p-4 space-y-1 text-center transition-transform hover:-translate-y-0.5">
                <MessageCircle className="h-5 w-5 text-gold mx-auto" />
                <span className="font-display text-xs uppercase font-bold text-stone-900 dark:text-white block">WhatsApp Live</span>
                <span className="font-mono text-[10px] text-stone-500 dark:text-slate-400 block">+94 76 966 7684</span>
              </div>
              <div className="glass-panel p-4 space-y-1 text-center transition-transform hover:-translate-y-0.5">
                <Star className="h-5 w-5 text-amber-500 mx-auto fill-amber-400" />
                <span className="font-display text-xs uppercase font-bold text-stone-900 dark:text-white block">4.8★ Rated</span>
                <span className="font-mono text-[10px] text-stone-500 dark:text-slate-400 block">3,200+ Reviews</span>
              </div>
            </div>

            <div className="pt-4 flex flex-wrap gap-4">
              <a
                href={FILXY_VENTURE.url}
                target="_blank"
                rel="noreferrer noopener"
                data-cursor="VISIT STORE"
                className="inline-flex items-center gap-3 border border-gold bg-gold px-7 py-4 font-mono text-xs uppercase tracking-[0.22em] text-[#0B0E14] font-bold transition-all duration-300 hover:-translate-y-0.5 hover:shadow-[0_0_25px_rgba(212,175,55,0.4)]"
              >
                <span>Browse filxy.store Marketplace</span>
                <ArrowUpRight className="h-4 w-4" />
              </a>
            </div>
          </div>

          {/* Right Metrics Grid */}
          <div className="lg:col-span-5 grid grid-cols-2 gap-4">
            {FILXY_VENTURE.stats.map((stat, idx) => (
              <div 
                key={idx} 
                className="glass-panel p-6 text-center space-y-2 transition-transform duration-300 hover:-translate-y-1 hover:border-accent-glow/40"
              >
                <span className="font-display text-2xl sm:text-3xl font-bold text-accent-glow block">
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
