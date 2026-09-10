'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { 
  ArrowDownRight, 
  ArrowUpRight, 
  Box, 
  Cpu, 
  Sparkles, 
  Layers, 
  Globe, 
  Briefcase,
  Sliders,
  ChevronRight,
  Film,
  CheckCircle2,
  ArrowRight
} from 'lucide-react';
import { BackgroundVideo } from '@/components/ui/BackgroundVideo';
import { ProjectCard } from '@/components/work/ProjectCard';
import { TimelineScrubber } from '@/components/journey/TimelineScrubber';
import { OrvexSection } from '@/components/ventures/OrvexSection';
import { FilxySection } from '@/components/ventures/FilxySection';
import { FiverrHub } from '@/components/fiverr/FiverrHub';
import { FiverrGigPreview } from '@/components/fiverr/FiverrGigPreview';
import { useStudioStore } from '@/lib/store';
import { Project, PageSection } from '@/types';
import { DEFAULT_STANDARD_PAGES } from '@/data/siteConfig';
import { AnimatedHeading, FadeInUp, ScrollReveal } from '@/components/ui/MotionWrapper';

export default function HomePage() {
  const { projects, journey, articles, settings } = useStudioStore();
  const [selectedFilter, setSelectedFilter] = useState<string>('All');

  const selectedConfig = settings.selectedWork;
  const configuredItemIds = selectedConfig?.itemIds || [];
  const globalPreviewMode = selectedConfig?.previewMode || 'hover-video';

  // If specific selected work items are curated in admin, prioritize them in 'All' view
  const curatedProjects = configuredItemIds.length > 0
    ? (configuredItemIds.map((id) => projects.find((p) => p.id === id)).filter(Boolean) as Project[])
    : projects;

  const filteredProjects = selectedFilter === 'All'
    ? (curatedProjects.length > 0 ? curatedProjects : projects)
    : projects.filter((p) => p.category === selectedFilter);

  const heroVideoSrc = settings.pageVideos?.home || '/videos/orvex-reel.mp4';
  const homeConfig = settings.pageConfigs?.home || DEFAULT_STANDARD_PAGES.home;
  const sections = (homeConfig.sections || [])
    .filter((s) => s.enabled)
    .sort((a, b) => a.order - b.order);

  const renderSection = (section: PageSection) => {
    switch (section.type) {
      case 'hero':
        return (
          <section key={section.id} id="hero" className="relative min-h-[92dvh] sm:min-h-[95dvh] lg:min-h-screen w-full overflow-hidden flex flex-col justify-end px-4 pb-12 pt-20 sm:px-8 md:pb-20 lg:px-12 border-b border-stone-300/80 dark:border-white/10">
            {/* Clearly Visible 3D Product & Motion Camera Reel with Priority Fast Load */}
            <BackgroundVideo
              src={heroVideoSrc}
              opacity={0.92}
              priority={true}
            />

            {/* Ambient Subtle Fine Grid */}
            <div className="viewport-grid absolute inset-0 opacity-15 pointer-events-none" />

            {/* Targeted bottom text scrim */}
            <div className="pointer-events-none absolute inset-x-0 bottom-0 h-80 bg-gradient-to-t from-[#080B10]/95 via-[#080B10]/50 to-transparent" />

            {/* Ambient Glows Matched to Video Color Palette */}
            <div className="pointer-events-none absolute bottom-20 left-10 w-96 h-96 bg-[#00F2FE]/15 blur-[120px] rounded-full hidden sm:block" />
            <div className="pointer-events-none absolute bottom-10 right-10 w-96 h-96 bg-[#D4AF37]/15 blur-[120px] rounded-full hidden sm:block" />

            {/* Hero Content Container */}
            <div className="relative z-10 mx-auto w-full max-w-7xl">
              {/* Tactical Studio & Dual Brand Seal (FIVERR + ORVEX) */}
              <FadeInUp delay={0.05}>
                <div className="inline-flex flex-wrap items-center gap-2 border border-[#00F2FE]/40 bg-[#00F2FE]/10 px-3 py-1 sm:px-4 sm:py-1.5 font-mono text-[9px] sm:text-[10px] uppercase tracking-[0.2em] sm:tracking-[0.24em] text-[#38BDF8] backdrop-blur-md mb-4 sm:mb-6 shadow-[0_0_20px_rgba(0,242,254,0.15)]">
                  <span className="h-2 w-2 rounded-full bg-[#00F2FE] animate-ping" />
                  <span className="text-emerald-400 font-bold">FIVERR TOP RATED</span>
                  <span>·</span>
                  <span className="text-gold font-bold">ORVEX CREATIVE STUDIO</span>
                  <span className="hidden xs:inline">·</span>
                  <span className="hidden xs:inline">3D PRODUCT ANIMATION &amp; CGI</span>
                </div>
              </FadeInUp>

              {/* Oversized Custom Display Typography */}
              <h1 className="font-display text-4xl xs:text-5xl sm:text-6xl md:text-7xl lg:text-[6.2rem] leading-[1.0] sm:leading-[0.9] font-black uppercase tracking-tight text-white select-none drop-shadow-[0_4px_30px_rgba(0,0,0,0.8)]">
                <FadeInUp delay={0.1} className="block">
                  <span className="bg-gradient-to-r from-[#00F2FE] via-[#38BDF8] to-[#93C5FD] bg-clip-text text-transparent drop-shadow-[0_0_40px_rgba(0,242,254,0.3)]">
                    Realistic 3D
                  </span>
                </FadeInUp>
                <FadeInUp delay={0.2} className="block">
                  <span className="text-white">Product Animation</span>
                </FadeInUp>
                <FadeInUp delay={0.3} className="block">
                  <span className="bg-gradient-to-r from-[#FDE68A] via-[#D4AF37] to-[#F59E0B] bg-clip-text text-transparent drop-shadow-[0_0_40px_rgba(212,175,55,0.35)]">
                    &amp; CGI in Blender
                  </span>
                </FadeInUp>
              </h1>

              {/* Sub-text & Action Row */}
              <FadeInUp delay={0.4}>
                <div className="mt-6 sm:mt-8 grid gap-6 sm:gap-8 border-t border-white/20 pt-6 sm:pt-8 lg:grid-cols-[minmax(0,1fr)_auto] lg:items-end">
                  <p className="max-w-2xl text-xs sm:text-base leading-relaxed text-slate-200 drop-shadow-md">
                    <strong className="text-[#38BDF8] font-semibold">Pathum Kashmira</strong> — Commercial 3D product animations, cinematic camera sweeps, photorealistic materials, and hard-surface modeling in Blender Cycles. Available for hire directly on <strong className="text-emerald-400 font-semibold underline decoration-emerald-500/50">Fiverr</strong> and through <strong className="text-gold font-semibold">ORVEX Creative Studio</strong>.
                  </p>

                  <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 sm:gap-4 w-full lg:w-auto">
                    <a
                      href="https://www.fiverr.com/s/jyvxXgv"
                      target="_blank"
                      rel="noreferrer noopener"
                      data-cursor="ORDER"
                      className="group inline-flex items-center justify-center gap-3 bg-gradient-to-r from-emerald-600 via-teal-600 to-amber-500 hover:from-emerald-500 hover:to-amber-400 px-6 py-3.5 sm:px-7 sm:py-4 font-mono text-xs uppercase tracking-[0.2em] text-white font-bold transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_0_35px_rgba(16,185,129,0.5)]"
                    >
                      <Sparkles className="h-4 w-4 fill-current transition-transform group-hover:rotate-12 text-gold" />
                      <span>Order On Fiverr ($100+)</span>
                      <ArrowUpRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                    </a>

                    <Link
                      href="/work"
                      data-cursor="GALLERY"
                      className="group inline-flex items-center justify-center gap-3 border border-[#38BDF8]/40 bg-[#080B10]/80 backdrop-blur-md px-5 py-3.5 sm:px-6 sm:py-4 font-mono text-xs uppercase tracking-[0.2em] text-[#38BDF8] transition-all hover:border-[#00F2FE] hover:bg-[#00F2FE]/10 hover:shadow-[0_0_25px_rgba(0,242,254,0.3)]"
                    >
                      <span>Explore Gallery</span>
                      <ArrowDownRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5 group-hover:translate-y-0.5" />
                    </Link>

                    <Link
                      href="/fiverr"
                      data-cursor="SERVICES"
                      className="inline-flex items-center justify-center gap-2 border border-white/20 bg-black/40 backdrop-blur-md px-4 py-3.5 sm:py-4 font-mono text-xs uppercase tracking-[0.2em] text-slate-300 hover:text-white hover:border-white/40 transition-colors"
                    >
                      <span>Fiverr Hub</span>
                    </Link>
                  </div>
                </div>
              </FadeInUp>

              {/* Viewport Telemetry Data */}
              <FadeInUp delay={0.8}>
                <div className="mt-10 grid grid-cols-3 gap-2 sm:gap-4 border-t border-white/20 pt-6 font-mono text-[10px] sm:text-xs text-slate-300">
                  <div className="bg-white/5 border border-white/10 p-2.5 sm:p-3 backdrop-blur-sm">
                    <span className="text-[9px] sm:text-[10px] uppercase tracking-[0.2em] sm:tracking-[0.24em] text-emerald-400 block font-semibold">Specialized Gig</span>
                    <span className="mt-1 font-display text-xs sm:text-base text-white font-bold block truncate drop-shadow-sm">
                      Realistic 3D Product Animation
                    </span>
                    <span className="text-[9px] sm:text-[10px] text-slate-400 font-mono mt-0.5 block truncate">Starting at $100 · 4 Days Turnaround</span>
                  </div>
                  <div className="bg-white/5 border border-white/10 p-2.5 sm:p-3 backdrop-blur-sm">
                    <span className="text-[9px] sm:text-[10px] uppercase tracking-[0.2em] sm:tracking-[0.24em] text-gold block font-semibold">Studio Standard</span>
                    <span className="mt-1 font-display text-xs sm:text-base text-gold font-bold block truncate drop-shadow-sm">
                      ORVEX CG Pipeline · Cycles &amp; Eevee
                    </span>
                    <span className="text-[9px] sm:text-[10px] text-slate-400 font-mono mt-0.5 block truncate">4K UHD Resolution · PBR Textures</span>
                  </div>
                  <div className="bg-white/5 border border-white/10 p-2.5 sm:p-3 backdrop-blur-sm">
                    <span className="text-[9px] sm:text-[10px] uppercase tracking-[0.2em] sm:tracking-[0.24em] text-[#38BDF8] block font-semibold">Client Standing</span>
                    <span className="mt-1 font-display text-xs sm:text-base text-white font-bold block truncate drop-shadow-sm">
                      Top Rated 3D Artist · 100% 5-Star
                    </span>
                    <span className="text-[9px] sm:text-[10px] text-slate-400 font-mono mt-0.5 block truncate">Fiverr Proven · Worldwide Delivery</span>
                  </div>
                </div>
              </FadeInUp>
            </div>
          </section>
        );

      case 'selected-work':
        return (
          <section key={section.id} id="work" className="relative py-28 sm:py-36 px-5 sm:px-10 border-b border-stone-300/80 dark:border-white/10">
            <div className="mx-auto max-w-7xl">
              <ScrollReveal>
                <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 border-b border-stone-300/80 dark:border-white/10 pb-8">
                  <div>
                    <p className="font-mono text-[11px] uppercase tracking-[0.3em] text-[#38BDF8]">
                      {section.subtitle || 'Gallery — 02'}
                    </p>
                    <h2 className="mt-3 font-display text-4xl sm:text-6xl font-black uppercase text-stone-900 dark:text-white tracking-tight">
                      {section.title || 'Selected 3D Works'}
                    </h2>
                  </div>
                  <p className="max-w-md text-xs sm:text-sm text-stone-600 dark:text-slate-300 font-mono">
                    {section.content || 'Hard-surface assets, commercial product animations, and digital environments modeled in Blender. Hover for motion or toggle wireframe mesh mode.'}
                  </p>
                </div>
              </ScrollReveal>

              {/* Category Filter Chips */}
              <ScrollReveal delay={0.1}>
                <div className="mt-8 flex flex-wrap items-center gap-2 border-b border-stone-200 dark:border-white/5 pb-6">
                  {[
                    'All',
                    'Hard Surface',
                    'Environment Design',
                    'Abstract Art',
                    'Game Assets',
                    'Character Sculpts',
                    'Visual Design',
                  ].map((cat) => (
                    <button
                      key={cat}
                      type="button"
                      onClick={() => setSelectedFilter(cat)}
                      data-cursor="FILTER"
                      className={`px-4 py-2 font-mono text-[10px] uppercase tracking-[0.2em] border transition-all duration-300 ${
                        selectedFilter === cat
                          ? 'border-[#D4AF37] bg-gradient-to-r from-[#D4AF37] to-[#F59E0B] text-[#0B0E14] font-bold shadow-[0_0_20px_rgba(212,175,55,0.35)]'
                          : 'border-stone-300 dark:border-white/10 bg-stone-100 dark:bg-slate-900/60 text-stone-700 dark:text-slate-300 hover:border-[#38BDF8] hover:text-[#38BDF8]'
                      }`}
                    >
                      {cat}
                    </button>
                  ))}
                </div>
              </ScrollReveal>

              {/* Curated Project Grid - Desktop Multi-Column Grid */}
              <div className="mt-8 sm:mt-12 grid grid-cols-2 lg:grid-cols-3 gap-3.5 sm:gap-8">
                {filteredProjects.map((project, idx) => {
                  const itemMode = selectedConfig?.itemPreviewModes?.[project.id] || globalPreviewMode;
                  return (
                    <ScrollReveal key={project.id} delay={0.05 * (idx % 6)}>
                      <ProjectCard
                        project={project}
                        layoutVariant={idx === 0 ? 'wide' : idx === 1 ? 'tall' : 'standard'}
                        previewMode={itemMode}
                      />
                    </ScrollReveal>
                  );
                })}
              </div>

              <ScrollReveal delay={0.2}>
                <div className="mt-14 text-center">
                  <Link
                    href="/work"
                    data-cursor="EXPLORE"
                    className="inline-flex items-center gap-3 border border-[#D4AF37]/50 bg-stone-100/90 dark:bg-slate-900/80 backdrop-blur-md px-8 py-4 font-mono text-xs uppercase tracking-[0.24em] text-[#D4AF37] hover:border-[#D4AF37] hover:bg-[#D4AF37]/10 transition-all duration-300 hover:shadow-[0_0_25px_rgba(212,175,55,0.25)]"
                  >
                    <span>View Full Project Archive (All Spec Breakdowns) →</span>
                  </Link>
                </div>
              </ScrollReveal>
            </div>
          </section>
        );

      case 'about-bio':
        return (
          <section key={section.id} id="about" className="relative py-28 sm:py-36 px-5 sm:px-10 border-b border-stone-300/80 dark:border-white/10 bg-[#EFECE6]/70 dark:bg-slate-950/60">
            <div className="mx-auto max-w-7xl">
              <div className="grid lg:grid-cols-12 gap-12 items-center">
                {/* Left Narrative */}
                <ScrollReveal className="lg:col-span-7 space-y-6">
                  <p className="font-mono text-[11px] uppercase tracking-[0.3em] text-[#D4AF37]">
                    {section.subtitle || 'The Artist — 03'}
                  </p>
                  <h2 className="font-display text-4xl sm:text-6xl font-black uppercase text-stone-900 dark:text-white tracking-tight leading-none">
                    Dual Lens: <br />
                    <span className="text-stone-500 dark:text-slate-400">Systems Mindset,</span> <br />
                    <span className="bg-gradient-to-r from-[#00F2FE] via-[#38BDF8] to-[#93C5FD] bg-clip-text text-transparent">Digital Craft.</span>
                  </h2>

                  <p className="text-base sm:text-lg leading-relaxed text-stone-700 dark:text-slate-300">
                    I operate at the intersection of structured thinking and creative design. My work pairs disciplined planning with hands-on digital craft — every asset is built like a system, not a one-off render.
                  </p>

                  <p className="text-sm sm:text-base leading-relaxed text-stone-600 dark:text-slate-400">
                    By day, I am an <strong className="text-stone-900 dark:text-white font-medium">Agribusiness Management</strong> undergraduate at the University of Ruhuna and pursuing Chartered Accountancy (CA Sri Lanka). That academic grounding in logistics, operations, and management shapes how I scope, structure, and deliver complex creative work.
                  </p>

                  <div className="grid sm:grid-cols-2 gap-4 pt-4">
                    <div className="glass-panel p-5 space-y-2 cad-corner-tl">
                      <span className="font-mono text-[10px] uppercase tracking-[0.2em] text-[#D4AF37] block font-semibold">
                        Academic &amp; Management
                      </span>
                      <p className="text-xs text-stone-700 dark:text-slate-300 leading-relaxed">
                        Agribusiness Management (University of Ruhuna) · CA Sri Lanka · Systems Thinking · Operations Optimization
                      </p>
                    </div>
                    <div className="glass-panel p-5 space-y-2 cad-corner-br">
                      <span className="font-mono text-[10px] uppercase tracking-[0.2em] text-[#38BDF8] block font-semibold">
                        3D Visual Arts &amp; CGI
                      </span>
                      <p className="text-xs text-stone-700 dark:text-slate-300 leading-relaxed">
                        Blender Hard-Surface · Geometry Nodes · Substance Painter PBR · Cycles Path Tracing · ZBrush Sculpting
                      </p>
                    </div>
                  </div>

                  <div className="pt-4">
                    <Link
                      href="/about"
                      className="inline-flex items-center gap-2 font-mono text-xs uppercase tracking-[0.2em] text-[#D4AF37] hover:text-[#38BDF8] transition-colors"
                    >
                      <span>Explore Extended Artist Biography &amp; Stack</span>
                      <ChevronRight className="h-3.5 w-3.5" />
                    </Link>
                  </div>
                </ScrollReveal>

                {/* Right Visual */}
                <ScrollReveal delay={0.2} className="lg:col-span-5 relative">
                  <div className="glass-panel p-4 cad-corner-tl cad-corner-br">
                    <div className="relative aspect-4/5 overflow-hidden bg-slate-950">
                      <Image
                        src="https://images.unsplash.com/photo-1534447677768-be436bb09401?q=80&w=1200&auto=format&fit=crop"
                        alt="Pethum Kashmira Digital 3D Studio Portrait"
                        fill
                        sizes="(max-width: 1024px) 100vw, 40vw"
                        className="object-cover opacity-90"
                      />
                      <div className="absolute top-3 left-3 bg-slate-950/90 px-2.5 py-1 font-mono text-[9px] uppercase tracking-[0.2em] text-[#38BDF8] border border-[#38BDF8]/40 backdrop-blur-sm">
                        VIEWPORT · DIGITAL PORTRAIT · 3D SCULPT
                      </div>
                      <div className="absolute bottom-3 right-3 bg-slate-950/90 px-2.5 py-1 font-mono text-[9px] uppercase tracking-[0.2em] text-[#D4AF37] border border-[#D4AF37]/40 backdrop-blur-sm">
                        BLENDER CYCLES RENDER
                      </div>
                    </div>
                  </div>
                </ScrollReveal>
              </div>
            </div>
          </section>
        );

      case 'journey-timeline':
        return (
          <section key={section.id} id="journey" className="relative py-28 sm:py-36 px-5 sm:px-10 border-b border-stone-300/80 dark:border-white/10">
            <div className="mx-auto max-w-7xl">
              <ScrollReveal>
                <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 border-b border-stone-300/80 dark:border-white/10 pb-8 mb-12">
                  <div>
                    <p className="font-mono text-[11px] uppercase tracking-[0.3em] text-[#38BDF8]">
                      {section.subtitle || 'Evolution — 04'}
                    </p>
                    <h2 className="mt-3 font-display text-4xl sm:text-6xl font-black uppercase text-stone-900 dark:text-white tracking-tight">
                      {section.title || 'Milestone Timeline'}
                    </h2>
                  </div>
                  <p className="max-w-md text-xs sm:text-sm text-stone-600 dark:text-slate-300 font-mono">
                    {section.content || 'Career trajectory, technical milestones, community leadership, and academic leaps spanning 2021 to the present.'}
                  </p>
                </div>
              </ScrollReveal>

              <TimelineScrubber items={journey} />
            </div>
          </section>
        );

      case 'ventures-ecosystem':
        return (
          <section key={section.id} id="ventures" className="relative py-28 sm:py-36 px-5 sm:px-10 border-b border-stone-300/80 dark:border-white/10 bg-[#EFECE6]/70 dark:bg-slate-950/60 space-y-16">
            <div className="mx-auto max-w-7xl space-y-16">
              <ScrollReveal>
                <div className="border-b border-stone-300/80 dark:border-white/10 pb-6">
                  <p className="font-mono text-[11px] uppercase tracking-[0.3em] text-[#D4AF37]">
                    {section.subtitle || 'Ecosystem — 05'}
                  </p>
                  <h2 className="mt-2 font-display text-4xl sm:text-6xl font-black uppercase text-stone-900 dark:text-white tracking-tight">
                    {section.title || 'Connected Ventures'}
                  </h2>
                </div>
              </ScrollReveal>

              <OrvexSection />
              <FilxySection />
            </div>
          </section>
        );

      case 'fiverr-hub':
        return (
          <section key={section.id} id="fiverr" className="relative py-28 sm:py-36 px-5 sm:px-10 border-b border-stone-300/80 dark:border-white/10">
            <div className="mx-auto max-w-7xl">
              <ScrollReveal>
                <FiverrHub />
              </ScrollReveal>
            </div>
          </section>
        );

      case 'articles-preview':
        return (
          <section key={section.id} id="articles" className="relative py-28 sm:py-36 px-5 sm:px-10 border-b border-stone-300/80 dark:border-white/10 bg-[#EFECE6]/70 dark:bg-slate-950/60">
            <div className="mx-auto max-w-7xl">
              <ScrollReveal>
                <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 border-b border-stone-300/80 dark:border-white/10 pb-8">
                  <div>
                    <p className="font-mono text-[11px] uppercase tracking-[0.3em] text-[#38BDF8]">
                      {section.subtitle || 'Writing — 06'}
                    </p>
                    <h2 className="mt-3 font-display text-4xl sm:text-6xl font-black uppercase text-stone-900 dark:text-white tracking-tight">
                      {section.title || 'Articles & Insights'}
                    </h2>
                  </div>
                  <Link
                    href="/articles"
                    className="font-mono text-xs uppercase tracking-[0.2em] text-[#D4AF37] hover:text-[#38BDF8] transition-colors"
                  >
                    <span>Explore All Articles →</span>
                  </Link>
                </div>
              </ScrollReveal>

              <div className="mt-12 grid gap-8 md:grid-cols-3">
                {articles.map((article) => (
                  <article
                    key={article.id}
                    className="group glass-panel p-6 hover:border-gold/50 transition-all space-y-4"
                  >
                    <div className="relative aspect-16/10 overflow-hidden bg-slate-950">
                      <Image
                        src={article.coverImage}
                        alt={article.title}
                        fill
                        sizes="(max-width: 768px) 100vw, 33vw"
                        className="object-cover transition-transform duration-500 group-hover:scale-105"
                      />
                      <span className="absolute top-3 left-3 bg-slate-950/90 px-2.5 py-0.5 font-mono text-[9px] uppercase tracking-wider text-gold border border-gold/30 backdrop-blur-sm">
                        {article.category}
                      </span>
                    </div>

                    <div className="flex items-center justify-between font-mono text-[10px] text-stone-500 dark:text-slate-400">
                      <span>{article.publishedDate}</span>
                      <span>{article.readTime}</span>
                    </div>

                    <h3 className="font-display text-lg font-bold uppercase text-stone-900 dark:text-white group-hover:text-gold transition-colors line-clamp-2">
                      {article.title}
                    </h3>

                    <p className="text-xs text-stone-600 dark:text-slate-300 line-clamp-3 leading-relaxed">
                      {article.excerpt}
                    </p>

                    <div className="pt-2">
                      <Link
                        href={`/articles/${article.slug}`}
                        data-cursor="READ"
                        className="inline-flex items-center gap-1.5 font-mono text-[10px] uppercase tracking-[0.2em] text-accent-glow"
                      >
                        <span>Read Article</span>
                        <ArrowUpRight className="h-3 w-3" />
                      </Link>
                    </div>
                  </article>
                ))}
              </div>
            </div>
          </section>
        );

      case 'cta-banner':
        return (
          <section key={section.id} className="relative py-24 px-5 sm:px-10 border-b border-stone-300/80 dark:border-white/10">
            <div className="mx-auto max-w-7xl glass-panel p-8 sm:p-14 cad-corner-tl cad-corner-br border-gold/40 space-y-6">
              {section.subtitle && (
                <span className="font-mono text-[11px] uppercase tracking-[0.24em] text-gold block">
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
                <a
                  href="https://www.fiverr.com/s/jyvxXgv"
                  target="_blank"
                  rel="noreferrer noopener"
                  className="inline-flex items-center gap-2 bg-gradient-to-r from-emerald-600 to-teal-600 px-7 py-3.5 font-mono text-xs uppercase tracking-wider text-white font-bold hover:shadow-[0_0_25px_rgba(16,185,129,0.4)] transition-all"
                >
                  <Sparkles className="h-4 w-4 text-gold" />
                  <span>Order On Fiverr ($100+)</span>
                  <ArrowUpRight className="h-4 w-4" />
                </a>
                <Link
                  href="/contact"
                  className="inline-flex items-center gap-2 border border-gold/60 px-6 py-3.5 font-mono text-xs uppercase tracking-wider text-gold hover:bg-gold/10 transition-all"
                >
                  <span>Direct Inquiry</span>
                  <ArrowRight className="h-3.5 w-3.5" />
                </Link>
              </div>
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
          <section key={section.id} className="relative py-24 px-5 sm:px-10 border-b border-stone-300/80 dark:border-white/10">
            <div className="mx-auto max-w-7xl space-y-6">
              <div className="border-b border-stone-300 dark:border-white/10 pb-4">
                <span className="font-mono text-[10px] uppercase tracking-[0.24em] text-gold block">
                  Capabilities &amp; Workflow
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
            </div>
          </section>
        );

      case 'fiverr-gig':
        return (
          <section key={section.id} className="relative py-24 px-5 sm:px-10 border-b border-stone-300/80 dark:border-white/10">
            <div className="mx-auto max-w-7xl">
              <FiverrGigPreview />
            </div>
          </section>
        );

      case 'text-content':
        return (
          <section key={section.id} className="relative py-24 px-5 sm:px-10 border-b border-stone-300/80 dark:border-white/10">
            <div className="mx-auto max-w-4xl space-y-6">
              {section.subtitle && (
                <span className="font-mono text-[11px] uppercase tracking-[0.24em] text-gold block">
                  {section.subtitle}
                </span>
              )}
              <h2 className="font-display text-3xl sm:text-5xl font-black uppercase text-stone-900 dark:text-white">
                {section.title}
              </h2>
              {section.content && (
                <div className="prose prose-stone dark:prose-invert max-w-none text-base leading-relaxed whitespace-pre-line text-stone-700 dark:text-slate-300">
                  {section.content}
                </div>
              )}
            </div>
          </section>
        );

      default:
        return null;
    }
  };

  return (
    <div className="relative min-h-screen bg-transparent text-inherit">
      {sections.map((sec) => renderSection(sec))}
    </div>
  );
}
