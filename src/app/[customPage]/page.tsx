'use client';

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { notFound, useParams } from 'next/navigation';
import { 
  Sparkles, 
  ArrowRight, 
  CheckCircle2, 
  Box, 
  Layers, 
  ExternalLink,
  MessageSquare,
  ShieldCheck
} from 'lucide-react';
import { useStudioStore } from '@/lib/store';
import { BackgroundVideo } from '@/components/ui/BackgroundVideo';
import { ProjectCard } from '@/components/work/ProjectCard';
import { FiverrGigPreview } from '@/components/fiverr/FiverrGigPreview';

export default function DynamicCustomPage() {
  const params = useParams();
  const slug = params?.customPage as string;
  const { settings, projects, isLoaded } = useStudioStore();

  if (!isLoaded) {
    return (
      <div className="min-h-screen bg-[#07080A] flex items-center justify-center font-mono text-xs text-gold">
        Loading Studio Systems...
      </div>
    );
  }

  const customPage = settings.customPages?.find(
    (p) => p.slug.toLowerCase() === slug?.toLowerCase()
  );

  if (!customPage) {
    notFound();
  }

  const pageVideo = customPage.videoUrl || settings.pageVideos?.home || '/videos/orvex-reel.mp4';
  const enabledSections = (customPage.sections || [])
    .filter((s) => s.enabled)
    .sort((a, b) => a.order - b.order);

  return (
    <div className="relative min-h-screen bg-[#F7F5F0] dark:bg-[#0B0E14] text-stone-800 dark:text-slate-100 transition-colors duration-400 overflow-hidden">
      {/* Dynamic Background Video Loop */}
      <BackgroundVideo
        src={pageVideo}
        opacity={0.85}
        overlayClassName="from-[#F7F5F0]/70 via-[#F7F5F0]/40 to-[#F7F5F0]/85 dark:from-[#0B0E14]/75 dark:via-[#0B0E14]/45 dark:to-[#0B0E14]/90"
      />

      <div className="relative z-10 mx-auto max-w-7xl px-5 sm:px-10 pt-28 pb-36 space-y-24">
        {/* Page Top Header */}
        <section className="border-b border-stone-300 dark:border-white/10 pb-12">
          <div className="inline-flex items-center gap-2 font-mono text-[10px] uppercase tracking-[0.24em] text-gold mb-3">
            <Sparkles className="h-3.5 w-3.5 text-gold" />
            <span>Studio Page · {customPage.navLabel || customPage.title}</span>
          </div>
          <h1 className="font-display text-4xl sm:text-6xl font-black uppercase tracking-tight text-stone-900 dark:text-white">
            {customPage.title}
          </h1>
          {customPage.description && (
            <p className="mt-4 max-w-2xl font-mono text-xs sm:text-sm text-stone-600 dark:text-slate-300 leading-relaxed">
              {customPage.description}
            </p>
          )}
        </section>

        {/* Dynamic Configured Sections */}
        {enabledSections.map((section) => {
          switch (section.type) {
            case 'hero':
              return (
                <section key={section.id} className="glass-panel p-8 sm:p-12 cad-corner-tl cad-corner-br space-y-6">
                  {section.subtitle && (
                    <span className="font-mono text-[11px] uppercase tracking-[0.24em] text-gold dark:text-accent-glow block">
                      {section.subtitle}
                    </span>
                  )}
                  <h2 className="font-display text-3xl sm:text-5xl font-black uppercase text-stone-900 dark:text-white">
                    {section.title}
                  </h2>
                  {section.content && (
                    <p className="max-w-3xl text-sm sm:text-base leading-relaxed text-stone-600 dark:text-slate-300">
                      {section.content}
                    </p>
                  )}
                  <div className="pt-2 flex flex-wrap gap-4">
                    <Link
                      href="/contact"
                      className="inline-flex items-center gap-2 bg-gold px-6 py-3 font-mono text-xs uppercase tracking-wider text-[#07080A] font-bold hover:shadow-[0_0_20px_rgba(212,175,55,0.4)] transition-all"
                    >
                      <span>Inquire Commission</span>
                      <ArrowRight className="h-3.5 w-3.5" />
                    </Link>
                  </div>
                </section>
              );

            case 'selected-work':
              return (
                <section key={section.id} className="space-y-8">
                  <div className="border-b border-stone-300 dark:border-white/10 pb-4">
                    <span className="font-mono text-[10px] uppercase tracking-[0.24em] text-gold block">
                      Curated 3D Showcase
                    </span>
                    <h2 className="font-display text-2xl sm:text-4xl font-bold uppercase text-stone-900 dark:text-white mt-1">
                      {section.title}
                    </h2>
                  </div>
                  <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
                    {projects.slice(0, 3).map((p) => (
                      <ProjectCard key={p.id} project={p} />
                    ))}
                  </div>
                </section>
              );

            case 'features-list':
              const featureItems = section.content?.split(',').map((f) => f.trim()) || [
                'Hard-Surface Modeling',
                'Substance Painter Textures',
                'Cycles Shading & Lighting',
              ];
              return (
                <section key={section.id} className="space-y-6">
                  <div className="border-b border-stone-300 dark:border-white/10 pb-4">
                    <span className="font-mono text-[10px] uppercase tracking-[0.24em] text-gold block">
                      Capabilities
                    </span>
                    <h2 className="font-display text-2xl sm:text-4xl font-bold uppercase text-stone-900 dark:text-white mt-1">
                      {section.title}
                    </h2>
                    {section.subtitle && (
                      <p className="text-xs text-stone-600 dark:text-slate-400 font-mono mt-1">
                        {section.subtitle}
                      </p>
                    )}
                  </div>
                  <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
                    {featureItems.map((item, idx) => (
                      <div key={idx} className="glass-panel p-5 space-y-2 hover:border-gold/50 transition-colors">
                        <div className="flex items-center gap-2 text-gold">
                          <CheckCircle2 className="h-4 w-4" />
                          <span className="font-display text-sm font-bold uppercase text-stone-900 dark:text-white">
                            {item}
                          </span>
                        </div>
                        <p className="font-mono text-[11px] text-stone-600 dark:text-slate-400">
                          Production-verified 3D pipeline delivery.
                        </p>
                      </div>
                    ))}
                  </div>
                </section>
              );

            case 'fiverr-gig':
              return (
                <section key={section.id} className="space-y-6">
                  <div className="border-b border-stone-300 dark:border-white/10 pb-4">
                    <span className="font-mono text-[10px] uppercase tracking-[0.24em] text-emerald-400 block font-bold">
                      Fiverr Direct Booking
                    </span>
                    <h2 className="font-display text-2xl sm:text-4xl font-bold uppercase text-stone-900 dark:text-white mt-1">
                      {section.title}
                    </h2>
                  </div>
                  <FiverrGigPreview />
                </section>
              );

            case 'text-content':
              return (
                <section key={section.id} className="glass-panel p-8 space-y-4">
                  <h3 className="font-display text-2xl font-bold uppercase text-stone-900 dark:text-white">
                    {section.title}
                  </h3>
                  <div className="font-mono text-xs sm:text-sm text-stone-600 dark:text-slate-300 leading-relaxed whitespace-pre-line">
                    {section.content}
                  </div>
                </section>
              );

            case 'cta-banner':
              return (
                <section
                  key={section.id}
                  className="border border-gold/40 bg-gradient-to-r from-gold/15 via-[#07090F] to-emerald-500/10 p-8 sm:p-12 text-center space-y-4 cad-corner-tl cad-corner-br"
                >
                  <h3 className="font-display text-2xl sm:text-4xl font-black uppercase text-white">
                    {section.title}
                  </h3>
                  {section.subtitle && (
                    <p className="font-mono text-xs sm:text-sm text-slate-300 max-w-xl mx-auto">
                      {section.subtitle}
                    </p>
                  )}
                  <div className="pt-4 flex justify-center">
                    <Link
                      href="/contact"
                      className="inline-flex items-center gap-2 bg-gold px-8 py-3.5 font-mono text-xs uppercase tracking-wider text-[#07080A] font-bold hover:shadow-[0_0_20px_rgba(212,175,55,0.4)] transition-all"
                    >
                      <span>Start A Project Inquiry →</span>
                    </Link>
                  </div>
                </section>
              );

            default:
              return null;
          }
        })}
      </div>
    </div>
  );
}
