'use client';

import React, { useState } from 'react';
import { 
  Send, 
  Copy, 
  Check, 
  Sparkles, 
  ArrowUpRight, 
  ShieldCheck, 
  CheckCircle2 
} from 'lucide-react';
import { SITE_CONFIG } from '@/data/siteConfig';
import { BackgroundVideo } from '@/components/ui/BackgroundVideo';
import { useStudioStore } from '@/lib/store';

export default function ContactPage() {
  const { settings } = useStudioStore();
  const contactVideoSrc = settings.pageVideos?.contact || '/videos/hero-ambient.mp4';
  const [copied, setCopied] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    projectType: '3D Hard-Surface Modeling',
    timeline: 'Standard (1-2 Weeks)',
    budget: '$500 - $1,500',
    message: '',
  });

  const copyEmail = () => {
    navigator.clipboard.writeText(SITE_CONFIG.email);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  return (
    <div className="relative min-h-screen bg-[#F7F5F0] dark:bg-[#0B0E14] pt-24 pb-36 px-5 sm:px-10 text-stone-800 dark:text-slate-100 overflow-hidden transition-colors duration-400">
      {/* Background Video Ambience - clearly visible, configurable from Admin */}
      <BackgroundVideo
        src={contactVideoSrc}
        opacity={0.85}
        overlayClassName="from-[#F7F5F0]/70 via-transparent to-[#F7F5F0]/85 dark:from-[#0B0E14]/70 dark:via-transparent dark:to-[#0B0E14]/85"
      />

      <div className="relative z-10 mx-auto max-w-7xl space-y-20">
        {/* Header Block */}
        <div className="border-b border-stone-300 dark:border-white/10 pb-12">
          <p className="font-mono text-[11px] uppercase tracking-[0.3em] text-gold">
            Commissions &amp; Engagements · 07
          </p>
          <div className="mt-4 flex flex-col lg:flex-row lg:items-end justify-between gap-8">
            <h1 className="font-display text-5xl sm:text-7xl lg:text-8xl font-black uppercase text-stone-900 dark:text-white tracking-tight leading-none">
              Let&apos;s Make <br />
              <span className="text-stone-500 dark:text-slate-400">Something.</span>
            </h1>
            <p className="max-w-md text-xs sm:text-sm text-stone-700 dark:text-slate-300 font-mono">
              Have a product, environment concept, game asset pack, or commercial CGI project? Submit your brief or connect directly through verified studio channels.
            </p>
          </div>
        </div>

        {/* 2-Column Contact Stage */}
        <div className="grid lg:grid-cols-12 gap-12 items-start">
          {/* Left Column: Direct Access & Social Archives */}
          <div className="lg:col-span-5 space-y-10">
            {/* Quick Email Direct Copy */}
            <div className="glass-panel p-8 space-y-4 cad-corner-tl">
              <span className="font-mono text-[10px] uppercase tracking-[0.24em] text-gold dark:text-accent-glow block">
                Direct Inquiry Channel
              </span>
              <p className="text-xs text-stone-600 dark:text-slate-300 leading-relaxed">
                Prefer email or need NDA-protected commercial discussions?
              </p>
              <button
                type="button"
                onClick={copyEmail}
                data-cursor="COPY"
                className="w-full flex items-center justify-between border border-stone-300 dark:border-white/15 bg-white/70 dark:bg-white/5 p-4 font-mono text-xs text-stone-900 dark:text-white hover:border-gold transition-colors"
              >
                <span>{SITE_CONFIG.email}</span>
                {copied ? <Check className="h-4 w-4 text-emerald-500" /> : <Copy className="h-4 w-4 text-gold" />}
              </button>
            </div>

            {/* Social & Professional Protocols */}
            <div className="glass-panel p-8 space-y-4 cad-corner-br">
              <span className="font-mono text-[10px] uppercase tracking-[0.24em] text-gold block">
                Studio Portals &amp; Channels
              </span>
              <div className="grid grid-cols-2 gap-3 font-mono text-xs text-stone-700 dark:text-slate-300">
                <a
                  href={SITE_CONFIG.socials.artstation}
                  target="_blank"
                  rel="noreferrer noopener"
                  className="flex items-center justify-between border border-stone-300 dark:border-white/10 p-3 hover:border-gold hover:text-gold dark:hover:border-accent-glow dark:hover:text-accent-glow transition-colors"
                >
                  <span>ArtStation</span>
                  <ArrowUpRight className="h-3 w-3" />
                </a>
                <a
                  href={SITE_CONFIG.socials.cgtrader}
                  target="_blank"
                  rel="noreferrer noopener"
                  className="flex items-center justify-between border border-stone-300 dark:border-white/10 p-3 hover:border-gold hover:text-gold dark:hover:border-accent-glow dark:hover:text-accent-glow transition-colors"
                >
                  <span>CGTrader</span>
                  <ArrowUpRight className="h-3 w-3" />
                </a>
                <a
                  href={SITE_CONFIG.socials.behance}
                  target="_blank"
                  rel="noreferrer noopener"
                  className="flex items-center justify-between border border-stone-300 dark:border-white/10 p-3 hover:border-gold hover:text-gold dark:hover:border-accent-glow dark:hover:text-accent-glow transition-colors"
                >
                  <span>Behance</span>
                  <ArrowUpRight className="h-3 w-3" />
                </a>
                <a
                  href={SITE_CONFIG.socials.linkedin}
                  target="_blank"
                  rel="noreferrer noopener"
                  className="flex items-center justify-between border border-stone-300 dark:border-white/10 p-3 hover:border-gold hover:text-gold dark:hover:border-accent-glow dark:hover:text-accent-glow transition-colors"
                >
                  <span>LinkedIn</span>
                  <ArrowUpRight className="h-3 w-3" />
                </a>
              </div>
            </div>
          </div>

          {/* Right Column: Interactive Commission Brief Form */}
          <div className="lg:col-span-7 glass-panel p-8 sm:p-12 cad-corner-tl cad-corner-br relative overflow-hidden">
            <div className="viewport-grid absolute inset-0 opacity-20 pointer-events-none" />

            <div className="relative z-10">
              {submitted ? (
                <div className="py-16 text-center space-y-4 animate-in fade-in zoom-in duration-500">
                  <div className="mx-auto grid h-14 w-14 place-items-center rounded-full bg-gold/15 border border-gold text-gold">
                    <CheckCircle2 className="h-8 w-8 text-gold" />
                  </div>
                  <h3 className="font-display text-2xl font-bold uppercase text-stone-900 dark:text-white tracking-tight">
                    Brief Transmitted Successfully
                  </h3>
                  <p className="max-w-md mx-auto text-xs text-stone-600 dark:text-slate-300 font-mono leading-relaxed">
                    Thank you, {formData.name}. Your project brief has been logged. Pethum will review your requirements and respond within 24 hours.
                  </p>
                  <button
                    type="button"
                    onClick={() => setSubmitted(false)}
                    className="mt-6 inline-flex items-center gap-2 border border-stone-300 dark:border-white/20 px-6 py-2.5 font-mono text-xs uppercase tracking-wider text-stone-800 dark:text-slate-200 hover:border-gold hover:text-gold transition-colors"
                  >
                    Submit Another Brief
                  </button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="flex items-center justify-between border-b border-stone-300 dark:border-white/10 pb-4">
                    <span className="font-mono text-[10px] uppercase tracking-[0.24em] text-gold">
                      Commission Brief Generator
                    </span>
                    <span className="font-mono text-[10px] text-emerald-600 dark:text-emerald-400 flex items-center gap-1.5">
                      <ShieldCheck className="h-3.5 w-3.5" />
                      <span>Confidential NDA Supported</span>
                    </span>
                  </div>

                  <div className="grid sm:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <label className="font-mono text-[10px] uppercase tracking-[0.2em] text-stone-600 dark:text-slate-400 block">
                        Your Name / Organization *
                      </label>
                      <input
                        type="text"
                        required
                        value={formData.name}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                        placeholder="e.g. Maya Lin"
                        className="w-full border border-stone-300 dark:border-white/15 bg-white/90 dark:bg-slate-950/80 px-4 py-3 font-mono text-xs text-stone-900 dark:text-white placeholder:text-stone-400 dark:placeholder:text-slate-500 focus:border-gold outline-hidden transition-colors"
                      />
                    </div>

                    <div className="space-y-2">
                      <label className="font-mono text-[10px] uppercase tracking-[0.2em] text-stone-600 dark:text-slate-400 block">
                        Direct Email Address *
                      </label>
                      <input
                        type="email"
                        required
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        placeholder="e.g. maya@studio.com"
                        className="w-full border border-stone-300 dark:border-white/15 bg-white/90 dark:bg-slate-950/80 px-4 py-3 font-mono text-xs text-stone-900 dark:text-white placeholder:text-stone-400 dark:placeholder:text-slate-500 focus:border-gold outline-hidden transition-colors"
                      />
                    </div>
                  </div>

                  <div className="grid sm:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <label className="font-mono text-[10px] uppercase tracking-[0.2em] text-stone-600 dark:text-slate-400 block">
                        Project Scope / Category
                      </label>
                      <select
                        value={formData.projectType}
                        onChange={(e) => setFormData({ ...formData, projectType: e.target.value })}
                        className="w-full border border-stone-300 dark:border-white/15 bg-white/90 dark:bg-slate-950/80 px-4 py-3 font-mono text-xs text-stone-900 dark:text-white focus:border-gold outline-hidden transition-colors"
                      >
                        <option value="3D Hard-Surface Modeling">3D Hard-Surface Modeling</option>
                        <option value="Photoreal Product CGI">Photoreal Product CGI</option>
                        <option value="Atmospheric Environment Design">Atmospheric Environment Design</option>
                        <option value="Game-Ready Assets &amp; Props">Game-Ready Assets &amp; Props</option>
                        <option value="Commercial Motion Visuals">Commercial Motion Visuals</option>
                        <option value="ORVEX Studio Partnership">ORVEX Studio Partnership</option>
                      </select>
                    </div>

                    <div className="space-y-2">
                      <label className="font-mono text-[10px] uppercase tracking-[0.2em] text-stone-600 dark:text-slate-400 block">
                        Estimated Budget Bracket
                      </label>
                      <select
                        value={formData.budget}
                        onChange={(e) => setFormData({ ...formData, budget: e.target.value })}
                        className="w-full border border-stone-300 dark:border-white/15 bg-white/90 dark:bg-slate-950/80 px-4 py-3 font-mono text-xs text-stone-900 dark:text-white focus:border-gold outline-hidden transition-colors"
                      >
                        <option value="$250 - $500">$250 - $500</option>
                        <option value="$500 - $1,500">$500 - $1,500</option>
                        <option value="$1,500 - $3,500">$1,500 - $3,500</option>
                        <option value="$3,500+">$3,500+ (Enterprise / Full Campaign)</option>
                      </select>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <label className="font-mono text-[10px] uppercase tracking-[0.2em] text-stone-600 dark:text-slate-400 block">
                      Project Details &amp; Technical Specifications *
                    </label>
                    <textarea
                      required
                      rows={5}
                      value={formData.message}
                      onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                      placeholder="Describe target deliverables, style references, polygon limits, desired render engine (Cycles, Eevee Next, Unity, Unreal)..."
                      className="w-full border border-stone-300 dark:border-white/15 bg-white/90 dark:bg-slate-950/80 p-4 font-mono text-xs text-stone-900 dark:text-white placeholder:text-stone-400 dark:placeholder:text-slate-500 focus:border-gold outline-hidden transition-colors resize-none"
                    />
                  </div>

                  <button
                    type="submit"
                    data-cursor="TRANSMIT"
                    className="w-full flex items-center justify-center gap-3 bg-gold py-4 font-mono text-xs uppercase tracking-[0.22em] text-[#0B0E14] font-bold transition-all hover:shadow-[0_0_25px_rgba(212,175,55,0.4)] hover:-translate-y-0.5"
                  >
                    <span>Transmit Commission Brief</span>
                    <Send className="h-4 w-4" />
                  </button>
                </form>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
