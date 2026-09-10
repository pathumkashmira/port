'use client';

import React, { useState } from 'react';
import { 
  Star, 
  CheckCircle2, 
  ExternalLink, 
  Clock, 
  RotateCcw, 
  ShieldCheck, 
  Sparkles, 
  Video, 
  Play
} from 'lucide-react';

interface GigTier {
  name: string;
  price: string;
  duration: string;
  revisions: string;
  description: string;
  features: string[];
}

const GIG_TIERS: GigTier[] = [
  {
    name: 'Basic · 3D Product Loop',
    price: '$100',
    duration: '4 Days Delivery',
    revisions: '2 Revisions',
    description: '15-second realistic 3D product animation with 360 rotation, studio lighting, and 1080p Full HD render in Blender Cycles.',
    features: [
      '15s Animation Running Time',
      'Full HD 1080p Render',
      'Studio Environment & Lighting',
      'Photorealistic Materials & Textures',
      'Commercial Use Rights',
    ],
  },
  {
    name: 'Standard · Cinematic Commercial',
    price: '$200',
    duration: '6 Days Delivery',
    revisions: '3 Revisions',
    description: '30-second multi-angle cinematic commercial sweep with exploded view / assembly animation, custom materials, and 4K UHD render.',
    features: [
      '30s Animation Running Time',
      '4K UHD Ultra High Resolution',
      'Dynamic Camera Sweeps & Motion',
      'Exploded View / Part Assembly',
      'Sound FX & Background Music Sync',
      'Commercial Use Rights',
    ],
  },
  {
    name: 'Premium · Full Brand CGI Production',
    price: '$350',
    duration: '8 Days Delivery',
    revisions: 'Unlimited Revisions',
    description: '60-second broadcast-quality commercial 3D campaign. Hard-surface modeling from scratch, complex physics / liquid simulation, and 4K multi-camera delivery.',
    features: [
      '60s Full Commercial Production',
      '4K UHD Multi-Angle Renders',
      'Full 3D Modeling from Reference',
      'Custom Procedural Materials & Decals',
      'Liquid / Smoke Simulation (if needed)',
      'Raw Blender Project Files (.blend)',
      'Full Commercial & Broadcast License',
    ],
  },
];

export function FiverrGigPreview({ className = '' }: { className?: string }) {
  const [activeTier, setActiveTier] = useState<number>(0);

  return (
    <div className={`overflow-hidden border border-emerald-500/40 dark:border-white/10 bg-white/95 dark:bg-[#07090F] shadow-[0_20px_60px_rgba(0,0,0,0.1)] dark:shadow-[0_20px_60px_rgba(0,0,0,0.6)] backdrop-blur-xl transition-all duration-300 ${className}`}>
      {/* Brand Header Banner: Prominently Highlights FIVERR & ORVEX */}
      <div className="flex flex-wrap items-center justify-between gap-4 border-b border-stone-200 dark:border-white/10 bg-gradient-to-r from-emerald-500/10 via-teal-500/5 to-amber-500/10 px-6 py-4">
        <div className="flex items-center gap-3">
          <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-emerald-600 font-black text-white shadow-md text-base">
            fi
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="font-display font-black tracking-wide uppercase text-stone-900 dark:text-white text-sm">
                FIVERR OFFICIAL GIG
              </span>
              <span className="inline-flex items-center gap-1 rounded-full bg-emerald-500/20 px-2.5 py-0.5 font-mono text-[10px] uppercase font-bold text-emerald-700 dark:text-emerald-400">
                <ShieldCheck className="h-3 w-3" /> Top Rated 3D Artist
              </span>
            </div>
            <p className="font-mono text-[10px] text-stone-500 dark:text-slate-400">
              Direct order through Fiverr Escrow Guarantee · 100% 5-Star Reviews
            </p>
          </div>
        </div>

        {/* ORVEX Studio Quality Seal */}
        <div className="flex items-center gap-2 rounded border border-gold/40 bg-gold/10 px-3 py-1 font-mono text-[10px] uppercase tracking-wider text-gold font-bold">
          <Sparkles className="h-3 w-3 text-gold" />
          <span>Powered by ORVEX Studio Standards</span>
        </div>
      </div>

      <div className="grid lg:grid-cols-12 gap-0">
        {/* Left Visual Preview: Interactive 3D Product Animation Render Frame */}
        <div className="lg:col-span-7 relative min-h-[340px] sm:min-h-[420px] bg-slate-950 flex flex-col justify-between p-6 overflow-hidden">
          {/* Background Video / Render Preview */}
          <video
            autoPlay
            loop
            muted
            playsInline
            className="absolute inset-0 h-full w-full object-cover opacity-85 contrast-[1.08] brightness-[1.04]"
          >
            <source src="/videos/orvex-reel.mp4" type="video/mp4" />
          </video>

          {/* Gradient Scrims for Text Legibility */}
          <div className="absolute inset-0 bg-gradient-to-t from-slate-950/95 via-slate-950/30 to-slate-950/60 pointer-events-none" />

          {/* Top Overlays */}
          <div className="relative z-10 flex items-center justify-between">
            <div className="inline-flex items-center gap-2 rounded bg-black/60 px-3 py-1 font-mono text-[10px] uppercase tracking-wider text-[#38BDF8] border border-[#38BDF8]/40 backdrop-blur-md">
              <Video className="h-3 w-3 animate-pulse text-[#00F2FE]" />
              <span>4K UHD 60FPS · Blender Cycles Render</span>
            </div>

            <div className="inline-flex items-center gap-1.5 rounded bg-black/60 px-3 py-1 font-mono text-xs font-bold text-amber-400 border border-amber-400/40 backdrop-blur-md">
              <Star className="h-3.5 w-3.5 fill-amber-400 text-amber-400" />
              <span>5.0</span>
              <span className="text-slate-400 text-[10px] font-normal">(100% Positive)</span>
            </div>
          </div>

          {/* Center Play Indicator */}
          <div className="relative z-10 my-auto text-center pointer-events-none">
            <div className="inline-flex h-14 w-14 items-center justify-center rounded-full bg-emerald-500/30 border border-emerald-400/60 text-white backdrop-blur-md shadow-[0_0_30px_rgba(16,185,129,0.5)]">
              <Play className="h-6 w-6 fill-current text-white translate-x-0.5" />
            </div>
            <p className="mt-3 font-mono text-[11px] uppercase tracking-[0.2em] text-white/90 drop-shadow-md">
              Live Product Animation Reel
            </p>
          </div>

          {/* Bottom Title & Verification */}
          <div className="relative z-10 space-y-2">
            <h3 className="font-display text-xl sm:text-2xl font-black uppercase text-white tracking-tight drop-shadow-md">
              Create realistic 3d product animation in blender
            </h3>
            <div className="flex flex-wrap items-center gap-4 text-xs font-mono text-slate-300">
              <span>By <strong className="text-white">Pathum Kashmira</strong> (@pathumkashmira1)</span>
              <span>·</span>
              <span className="text-gold">Founder @ ORVEX</span>
              <span>·</span>
              <span className="text-[#38BDF8]">Blender Cycles &amp; Eevee Next</span>
            </div>
          </div>
        </div>

        {/* Right Package Selector & Order Action */}
        <div className="lg:col-span-5 p-6 sm:p-8 flex flex-col justify-between space-y-6 border-t lg:border-t-0 lg:border-l border-stone-200 dark:border-white/10">
          {/* Tier Switcher Tabs */}
          <div>
            <div className="grid grid-cols-3 border border-stone-300 dark:border-white/10 p-1 bg-stone-100 dark:bg-slate-900/80 rounded-md">
              {['Basic', 'Standard', 'Premium'].map((t, idx) => (
                <button
                  key={t}
                  type="button"
                  onClick={() => setActiveTier(idx)}
                  className={`py-2 text-center font-mono text-xs uppercase tracking-wider font-bold transition-all rounded ${
                    activeTier === idx
                      ? 'bg-emerald-600 text-white shadow-md'
                      : 'text-stone-600 dark:text-slate-400 hover:text-stone-900 dark:hover:text-white'
                  }`}
                >
                  {t}
                </button>
              ))}
            </div>

            {/* Selected Tier Details */}
            <div className="mt-6 space-y-4">
              <div className="flex items-baseline justify-between">
                <span className="font-display text-lg font-bold uppercase text-stone-900 dark:text-white">
                  {GIG_TIERS[activeTier].name}
                </span>
                <span className="font-display text-3xl font-black text-emerald-600 dark:text-emerald-400">
                  {GIG_TIERS[activeTier].price}
                </span>
              </div>

              <p className="text-xs sm:text-sm text-stone-600 dark:text-slate-300 leading-relaxed">
                {GIG_TIERS[activeTier].description}
              </p>

              <div className="flex items-center gap-4 font-mono text-[11px] text-stone-500 dark:text-slate-400 border-y border-stone-200 dark:border-white/10 py-3">
                <div className="flex items-center gap-1.5">
                  <Clock className="h-3.5 w-3.5 text-emerald-600 dark:text-emerald-400" />
                  <span>{GIG_TIERS[activeTier].duration}</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <RotateCcw className="h-3.5 w-3.5 text-gold" />
                  <span>{GIG_TIERS[activeTier].revisions}</span>
                </div>
              </div>

              {/* Feature Checklist */}
              <ul className="space-y-2">
                {GIG_TIERS[activeTier].features.map((feat, i) => (
                  <li key={i} className="flex items-center gap-2 text-xs text-stone-700 dark:text-slate-300">
                    <CheckCircle2 className="h-4 w-4 text-emerald-600 dark:text-emerald-400 shrink-0" />
                    <span>{feat}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Action CTAs */}
          <div className="space-y-3 pt-4 border-t border-stone-200 dark:border-white/10">
            <a
              href="https://www.fiverr.com/s/jyvxXgv"
              target="_blank"
              rel="noreferrer noopener"
              className="group flex w-full items-center justify-center gap-3 bg-emerald-600 hover:bg-emerald-500 py-3.5 px-6 font-mono text-xs uppercase tracking-[0.2em] text-white font-bold transition-all duration-300 hover:shadow-[0_0_25px_rgba(16,185,129,0.5)] rounded"
            >
              <span>Continue on Fiverr ({GIG_TIERS[activeTier].price})</span>
              <ExternalLink className="h-4 w-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
            </a>

            <div className="flex items-center justify-between text-[11px] font-mono text-stone-500 dark:text-slate-400">
              <a
                href="https://www.fiverr.com/pathumkashmira1"
                target="_blank"
                rel="noreferrer noopener"
                className="hover:text-emerald-600 dark:hover:text-emerald-400 transition-colors underline"
              >
                View Kashmira's Full Fiverr Profile →
              </a>
              <span className="flex items-center gap-1 text-emerald-600 dark:text-emerald-400">
                <ShieldCheck className="h-3.5 w-3.5" /> Secure Checkout
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
