'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { ArrowUpRight, Copy, Check, Eye } from 'lucide-react';
import { SITE_CONFIG } from '@/data/siteConfig';

export function Footer() {
  const [copied, setCopied] = useState(false);
  const [localTime, setLocalTime] = useState('');

  useEffect(() => {
    const updateTime = () => {
      // Sri Lanka Time (UTC+5:30)
      const now = new Date();
      const options: Intl.DateTimeFormatOptions = {
        timeZone: 'Asia/Colombo',
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit',
        hour12: false,
      };
      setLocalTime(new Intl.DateTimeFormat('en-US', options).format(now));
    };
    updateTime();
    const interval = setInterval(updateTime, 1000);
    return () => clearInterval(interval);
  }, []);

  const copyEmail = () => {
    navigator.clipboard.writeText(SITE_CONFIG.email);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <footer className="relative border-t border-stone-300 dark:border-white/10 bg-[#EFECE6] dark:bg-slate-950/90 overflow-hidden pt-20 pb-12 text-stone-800 dark:text-slate-100 transition-colors duration-400">
      <div className="viewport-grid absolute inset-0 opacity-20 pointer-events-none" />

      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Oversized Cinematic Callout */}
        <div className="mb-16 border-b border-stone-300 dark:border-white/10 pb-16">
          <p className="font-mono text-[11px] uppercase tracking-[0.3em] text-gold dark:text-accent-glow">
            Transmission Ended · Next Step
          </p>
          <div className="mt-4 flex flex-col lg:flex-row lg:items-end lg:justify-between gap-8">
            <h2 className="font-display text-[10vw] lg:text-[5.5rem] leading-[0.9] font-extrabold uppercase tracking-tight text-stone-900 dark:text-white">
              Let&apos;s Build <br />
              <span className="text-stone-500 dark:text-slate-400">Something Solid.</span>
            </h2>
            <div className="flex flex-col sm:flex-row gap-4">
              <Link
                href="/contact"
                data-cursor="COMMISSION"
                className="inline-flex items-center justify-center gap-2 bg-gold px-8 py-4 font-mono text-xs uppercase tracking-[0.22em] text-[#0B0E14] font-bold transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_0_25px_rgba(212,175,55,0.4)]"
              >
                Initiate Project Brief →
              </Link>
              <button
                type="button"
                onClick={copyEmail}
                data-cursor="COPY"
                className="inline-flex items-center justify-center gap-2 border border-stone-300 dark:border-white/20 bg-white/70 dark:bg-slate-900/80 px-6 py-4 font-mono text-xs uppercase tracking-[0.18em] text-stone-800 dark:text-slate-200 transition-colors hover:border-gold hover:text-gold"
              >
                {copied ? <Check className="h-4 w-4 text-emerald-500" /> : <Copy className="h-4 w-4 text-gold" />}
                <span>{copied ? 'Copied' : SITE_CONFIG.email}</span>
              </button>
            </div>
          </div>
        </div>

        {/* Multi-Column Sitemap & Venture Grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-10 border-b border-stone-300 dark:border-white/10 pb-14">
          {/* Col 1: Studio Identity */}
          <div className="col-span-2 md:col-span-1">
            <div className="flex items-center gap-2">
              <span className="grid h-7 w-7 place-items-center border border-gold font-mono text-xs font-bold text-gold">
                PK
              </span>
              <span className="font-display text-sm font-bold uppercase tracking-wider text-stone-900 dark:text-white">
                Pethum Kashmira
              </span>
            </div>
            <p className="mt-4 text-xs leading-relaxed text-stone-600 dark:text-slate-400">
              3D Modeler, Visual Artist &amp; Founder @ ORVEX. Crafting hard-surface assets, environments, and commercial CGI in Blender.
            </p>
            <div className="mt-6 flex items-center gap-2 font-mono text-[10px] uppercase tracking-[0.2em] text-stone-500 dark:text-slate-400">
              <span className="h-1.5 w-1.5 rounded-full bg-emerald-500 animate-pulse" />
              <span>COLOMBO {localTime || '12:00:00'} (UTC+5:30)</span>
            </div>
          </div>

          {/* Col 2: Navigation */}
          <div>
            <h3 className="font-mono text-[10px] uppercase tracking-[0.24em] text-gold">
              Navigation
            </h3>
            <ul className="mt-4 space-y-2 font-mono text-xs text-stone-700 dark:text-slate-300">
              <li>
                <Link href="/work" className="hover:text-gold dark:hover:text-accent-glow transition-colors">
                  Selected Works
                </Link>
              </li>
              <li>
                <Link href="/about" className="hover:text-gold dark:hover:text-accent-glow transition-colors">
                  The Artist &amp; Dual Lens
                </Link>
              </li>
              <li>
                <Link href="/journey" className="hover:text-gold dark:hover:text-accent-glow transition-colors">
                  Milestone Timeline
                </Link>
              </li>
              <li>
                <Link href="/articles" className="hover:text-gold dark:hover:text-accent-glow transition-colors">
                  Articles &amp; Insights
                </Link>
              </li>
              <li>
                <Link href="/contact" className="hover:text-gold dark:hover:text-accent-glow transition-colors">
                  Commission Inquiry
                </Link>
              </li>
            </ul>
          </div>

          {/* Col 3: Ecosystem & Ventures */}
          <div>
            <h3 className="font-mono text-[10px] uppercase tracking-[0.24em] text-gold">
              Ventures
            </h3>
            <ul className="mt-4 space-y-2 font-mono text-xs text-stone-700 dark:text-slate-300">
              <li>
                <a
                  href="https://orvexcg.site"
                  target="_blank"
                  rel="noreferrer noopener"
                  className="inline-flex items-center gap-1 hover:text-gold transition-colors"
                >
                  <span>ORVEX Creative Studio</span>
                  <ArrowUpRight className="h-3 w-3 text-gold" />
                </a>
              </li>
              <li>
                <a
                  href="https://filxy.store"
                  target="_blank"
                  rel="noreferrer noopener"
                  className="inline-flex items-center gap-1 hover:text-gold transition-colors"
                >
                  <span>Filxy Store (Marketplace)</span>
                  <ArrowUpRight className="h-3 w-3 text-gold" />
                </a>
              </li>
              <li>
                <Link href="/fiverr" className="hover:text-gold transition-colors">
                  Fiverr 3D Services &amp; Gigs
                </Link>
              </li>
              <li>
                <Link href="/ventures" className="hover:text-gold transition-colors">
                  Venture Portals &amp; Metrics
                </Link>
              </li>
            </ul>
          </div>

          {/* Col 4: Social Protocols */}
          <div>
            <h3 className="font-mono text-[10px] uppercase tracking-[0.24em] text-gold">
              Social Archives
            </h3>
            <ul className="mt-4 space-y-2 font-mono text-xs text-stone-700 dark:text-slate-300">
              <li>
                <a
                  href={SITE_CONFIG.socials.artstation}
                  target="_blank"
                  rel="noreferrer noopener"
                  className="inline-flex items-center gap-1 hover:text-gold dark:hover:text-accent-glow transition-colors"
                >
                  <span>ArtStation</span>
                  <ArrowUpRight className="h-3 w-3" />
                </a>
              </li>
              <li>
                <a
                  href={SITE_CONFIG.socials.cgtrader}
                  target="_blank"
                  rel="noreferrer noopener"
                  className="inline-flex items-center gap-1 hover:text-gold dark:hover:text-accent-glow transition-colors"
                >
                  <span>CGTrader</span>
                  <ArrowUpRight className="h-3 w-3" />
                </a>
              </li>
              <li>
                <a
                  href={SITE_CONFIG.socials.behance}
                  target="_blank"
                  rel="noreferrer noopener"
                  className="inline-flex items-center gap-1 hover:text-gold dark:hover:text-accent-glow transition-colors"
                >
                  <span>Behance</span>
                  <ArrowUpRight className="h-3 w-3" />
                </a>
              </li>
              <li>
                <a
                  href={SITE_CONFIG.socials.linkedin}
                  target="_blank"
                  rel="noreferrer noopener"
                  className="inline-flex items-center gap-1 hover:text-gold dark:hover:text-accent-glow transition-colors"
                >
                  <span>LinkedIn</span>
                  <ArrowUpRight className="h-3 w-3" />
                </a>
              </li>
              <li>
                <a
                  href={SITE_CONFIG.socials.github}
                  target="_blank"
                  rel="noreferrer noopener"
                  className="inline-flex items-center gap-1 hover:text-gold dark:hover:text-accent-glow transition-colors"
                >
                  <span>GitHub</span>
                  <ArrowUpRight className="h-3 w-3" />
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar: Copyright & Discreet Studio Login */}
        <div className="mt-8 flex flex-col sm:flex-row items-center justify-between gap-4 font-mono text-[10px] uppercase tracking-[0.2em] text-stone-500 dark:text-slate-500">
          <p>© {new Date().getFullYear()} Pethum Kashmira. All rights reserved.</p>
          <div className="flex items-center gap-6">
            <span className="flex items-center gap-1.5 text-stone-600 dark:text-slate-400">
              <Eye className="h-3 w-3 text-gold" />
              <span>Verified Portfolio</span>
            </span>
            <Link
              href="/admin"
              data-cursor="LOGIN"
              className="text-stone-500 dark:text-slate-500 hover:text-gold transition-colors"
            >
              [ Studio login ]
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
