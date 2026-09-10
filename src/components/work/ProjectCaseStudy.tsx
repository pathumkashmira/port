'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { 
  Grid3X3, 
  ArrowLeft, 
  ArrowRight, 
  Cpu, 
  Layers, 
  Maximize2, 
  Sparkles,
  Share2,
  Check,
  Film
} from 'lucide-react';
import { Project } from '@/types';
import { BackgroundVideo } from '@/components/ui/BackgroundVideo';

interface ProjectCaseStudyProps {
  project: Project;
  nextProject: Project;
}

export function ProjectCaseStudy({ project, nextProject }: ProjectCaseStudyProps) {
  const [viewMode, setViewMode] = useState<'shaded' | 'wireframe' | 'clay'>('shaded');
  const [copied, setCopied] = useState(false);

  const handleShare = () => {
    if (typeof window !== 'undefined') {
      navigator.clipboard.writeText(window.location.href);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  return (
    <div className="relative min-h-screen bg-[#F7F5F0] dark:bg-[#0B0E14] text-stone-800 dark:text-slate-100 transition-colors duration-400">
      {/* 1. Full-Screen Cinematic Artwork Hero with Video Motion Atmosphere */}
      <section className="relative min-h-[90vh] lg:min-h-screen w-full overflow-hidden flex flex-col justify-between p-6 sm:p-10 lg:p-16 border-b border-stone-300 dark:border-white/10">
        {/* Dynamic Background Video Loop if available - boosted visibility */}
        {project.videoUrl && (
          <BackgroundVideo
            src={project.videoUrl}
            opacity={0.88}
            overlayClassName="from-stone-950/60 via-transparent to-stone-950/80 dark:from-[#0B0E14]/70 dark:via-transparent dark:to-[#0B0E14]/90"
          />
        )}

        {/* Artwork Canvas / Background Image */}
        <div className="absolute inset-0 z-0">
          <Image
            src={
              viewMode === 'wireframe' && project.wireframeImage
                ? project.wireframeImage
                : viewMode === 'clay' && project.clayImage
                ? project.clayImage
                : project.heroImage
            }
            alt={project.title}
            fill
            priority
            sizes="100vw"
            className={`object-cover object-center transition-all duration-700 ease-out ${
              viewMode === 'wireframe' ? 'opacity-40 filter saturate-150' : 'opacity-70'
            }`}
          />

          {/* Wireframe Mesh Shader Overlay */}
          {viewMode === 'wireframe' && (
            <div className="absolute inset-0 wireframe-mesh opacity-75 mix-blend-screen pointer-events-none" />
          )}

          {/* Filmic Depth Vignette (Soft falloff, not harsh pitch black) */}
          <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-black/60" />
          <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_45%,rgba(0,0,0,0.7)_100%)]" />
        </div>

        {/* Top Floating Controls */}
        <div className="relative z-20 flex items-center justify-between gap-4">
          <Link
            href="/work"
            data-cursor="BACK"
            className="group inline-flex items-center gap-2 border border-white/20 bg-stone-900/80 backdrop-blur-md px-4 py-2 font-mono text-[11px] uppercase tracking-[0.2em] text-white transition-colors hover:border-gold hover:text-gold"
          >
            <ArrowLeft className="h-3.5 w-3.5 transition-transform group-hover:-translate-x-1" />
            <span>Archive Index</span>
          </Link>

          {/* Viewport Shading Switcher */}
          <div className="flex items-center gap-1 border border-white/20 bg-stone-900/85 backdrop-blur-md p-1 font-mono text-[10px] uppercase tracking-[0.16em]">
            <button
              type="button"
              onClick={() => setViewMode('shaded')}
              data-cursor="SHADED"
              className={`px-3 py-1.5 transition-colors ${
                viewMode === 'shaded' ? 'bg-gold text-[#0B0E14] font-bold' : 'text-stone-300 hover:text-white'
              }`}
            >
              Final Shaded
            </button>
            <button
              type="button"
              onClick={() => setViewMode('wireframe')}
              data-cursor="WIREFRAME"
              className={`px-3 py-1.5 transition-colors ${
                viewMode === 'wireframe' ? 'bg-accent-glow text-[#0B0E14] font-bold' : 'text-stone-300 hover:text-white'
              }`}
            >
              Wireframe
            </button>
            <button
              type="button"
              onClick={() => setViewMode('clay')}
              data-cursor="CLAY"
              className={`px-3 py-1.5 transition-colors ${
                viewMode === 'clay' ? 'bg-white text-[#0B0E14] font-bold' : 'text-stone-300 hover:text-white'
              }`}
            >
              Studio Clay
            </button>
          </div>
        </div>

        {/* Hero Title & Identity Plate */}
        <div className="relative z-20 mt-auto max-w-5xl">
          <div className="flex flex-wrap items-center gap-3 font-mono text-[10px] uppercase tracking-[0.26em] text-accent-glow mb-4">
            <span className="border border-accent-glow/40 px-2.5 py-1 bg-black/40 backdrop-blur-sm text-accent-glow">
              {project.category}
            </span>
            <span>·</span>
            <span className="text-white/80">Year {project.year}</span>
            <span>·</span>
            <span className="text-white/80">{project.role}</span>
            {project.videoUrl && (
              <>
                <span>·</span>
                <span className="border border-gold/40 px-2 py-0.5 bg-gold/10 text-gold flex items-center gap-1">
                  <Film className="h-3 w-3" />
                  <span>Cinematic Motion</span>
                </span>
              </>
            )}
          </div>

          <h1 className="font-display text-[11vw] sm:text-[8vw] lg:text-[6rem] leading-[0.88] font-black uppercase tracking-tight text-white drop-shadow-2xl">
            {project.title}
          </h1>

          <p className="mt-6 max-w-2xl font-mono text-xs sm:text-sm uppercase tracking-wider text-stone-200 leading-relaxed drop-shadow-md">
            {project.subtitle}
          </p>
        </div>
      </section>

      {/* 2. Technical Specs & Metadata HUD Grid */}
      <section className="border-b border-stone-300 dark:border-white/10 bg-[#EFECE6] dark:bg-slate-900/70 backdrop-blur-md py-10 px-6 sm:px-10 lg:px-16 transition-colors duration-400">
        <div className="mx-auto max-w-7xl grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-6 font-mono text-xs">
          <div className="border-l border-stone-300 dark:border-white/15 pl-4">
            <span className="text-[10px] uppercase tracking-[0.2em] text-stone-500 dark:text-slate-400 block">Vertices</span>
            <span className="text-stone-900 dark:text-white font-bold mt-1 block text-sm">{project.technicalSpecs.vertices}</span>
          </div>
          <div className="border-l border-stone-300 dark:border-white/15 pl-4">
            <span className="text-[10px] uppercase tracking-[0.2em] text-stone-500 dark:text-slate-400 block">Polygons</span>
            <span className="text-stone-900 dark:text-white font-bold mt-1 block text-sm">{project.technicalSpecs.faces}</span>
          </div>
          <div className="border-l border-stone-300 dark:border-white/15 pl-4">
            <span className="text-[10px] uppercase tracking-[0.2em] text-stone-500 dark:text-slate-400 block">Render Engine</span>
            <span className="text-gold dark:text-accent-glow font-bold mt-1 block truncate">{project.technicalSpecs.renderEngine}</span>
          </div>
          <div className="border-l border-stone-300 dark:border-white/15 pl-4">
            <span className="text-[10px] uppercase tracking-[0.2em] text-stone-500 dark:text-slate-400 block">Sampling</span>
            <span className="text-stone-900 dark:text-white font-bold mt-1 block truncate">{project.technicalSpecs.renderSamples || '2048 Samples'}</span>
          </div>
          <div className="border-l border-stone-300 dark:border-white/15 pl-4">
            <span className="text-[10px] uppercase tracking-[0.2em] text-stone-500 dark:text-slate-400 block">Texture Res</span>
            <span className="text-stone-900 dark:text-white font-bold mt-1 block truncate">{project.technicalSpecs.textureResolution}</span>
          </div>
          <div className="border-l border-stone-300 dark:border-white/15 pl-4">
            <span className="text-[10px] uppercase tracking-[0.2em] text-stone-500 dark:text-slate-400 block">Geometry</span>
            <span className="text-gold font-bold mt-1 block truncate">{project.technicalSpecs.geometryType}</span>
          </div>
        </div>
      </section>

      {/* 3. Editorial Case Study Narrative */}
      <main className="mx-auto max-w-5xl px-6 sm:px-10 py-20 lg:py-28 space-y-24">
        {/* Overview */}
        <section className="space-y-6">
          <div className="flex items-center gap-3 font-mono text-[11px] uppercase tracking-[0.3em] text-gold">
            <Layers className="h-3.5 w-3.5" />
            <span>01 — Overview & Direction</span>
          </div>
          <h2 className="font-display text-3xl sm:text-4xl uppercase font-bold text-stone-900 dark:text-white tracking-tight">
            The Structural Premise
          </h2>
          <p className="text-base sm:text-lg leading-relaxed text-stone-700 dark:text-slate-300">
            {project.description}
          </p>
        </section>

        {/* Challenge vs Concept Side-by-Side */}
        <section className="grid md:grid-cols-2 gap-10">
          <div className="glass-panel p-8 cad-corner-tl">
            <p className="font-mono text-[10px] uppercase tracking-[0.24em] text-gold dark:text-accent-glow">
              02 — Technical Challenge
            </p>
            <h3 className="font-display text-xl uppercase font-bold text-stone-900 dark:text-white mt-3">
              Precision & Constraints
            </h3>
            <p className="mt-4 text-xs sm:text-sm leading-relaxed text-stone-700 dark:text-slate-300">
              {project.challenge}
            </p>
          </div>

          <div className="glass-panel p-8 cad-corner-br">
            <p className="font-mono text-[10px] uppercase tracking-[0.24em] text-gold">
              03 — Creative Concept
            </p>
            <h3 className="font-display text-xl uppercase font-bold text-stone-900 dark:text-white mt-3">
              Aesthetic Form Language
            </h3>
            <p className="mt-4 text-xs sm:text-sm leading-relaxed text-stone-700 dark:text-slate-300">
              {project.concept}
            </p>
          </div>
        </section>

        {/* Large Break Visual */}
        {project.galleryImages.length > 0 && (
          <section className="relative aspect-16/9 w-full overflow-hidden border border-stone-300 dark:border-white/10 rounded-xs shadow-md">
            <Image
              src={project.galleryImages[0]}
              alt="Detail breakdown"
              fill
              sizes="100vw"
              className="object-cover"
            />
            <div className="absolute bottom-4 left-4 bg-stone-900/90 px-3 py-1 font-mono text-[10px] uppercase tracking-[0.2em] text-stone-200 border border-white/20 backdrop-blur-md">
              Viewport Detail Breakdown
            </div>
          </section>
        )}

        {/* Process & Pipeline */}
        <section className="space-y-6">
          <div className="flex items-center gap-3 font-mono text-[11px] uppercase tracking-[0.3em] text-gold">
            <Cpu className="h-3.5 w-3.5" />
            <span>04 — Process & Engineering</span>
          </div>
          <h2 className="font-display text-3xl sm:text-4xl uppercase font-bold text-stone-900 dark:text-white tracking-tight">
            Workflow & Materialization
          </h2>
          <p className="text-base sm:text-lg leading-relaxed text-stone-700 dark:text-slate-300">
            {project.process}
          </p>

          <div className="mt-8 flex flex-wrap gap-2">
            {project.tools.map((tool) => (
              <span
                key={tool}
                className="border border-gold/40 bg-gold/10 px-3 py-1.5 font-mono text-[10px] uppercase tracking-[0.2em] text-stone-900 dark:text-gold"
              >
                {tool}
              </span>
            ))}
          </div>
        </section>

        {/* Outcome & Deliverables */}
        <section className="glass-panel p-8 sm:p-12">
          <div className="flex items-center gap-2 font-mono text-[10px] uppercase tracking-[0.24em] text-gold dark:text-accent-glow">
            <Sparkles className="h-3 w-3" />
            <span>05 — Final Result</span>
          </div>
          <h3 className="font-display text-2xl uppercase font-bold text-stone-900 dark:text-white mt-3">
            Production Asset Delivery
          </h3>
          <p className="mt-4 text-sm sm:text-base leading-relaxed text-stone-700 dark:text-slate-300">
            {project.outcome}
          </p>
          <div className="mt-8 flex items-center gap-4 flex-wrap">
            <button
              type="button"
              onClick={handleShare}
              data-cursor="COPY LINK"
              className="inline-flex items-center gap-2 border border-stone-400 dark:border-white/20 px-4 py-2 font-mono text-xs uppercase tracking-[0.16em] text-stone-800 dark:text-slate-200 hover:border-gold hover:text-gold transition-colors"
            >
              {copied ? <Check className="h-3.5 w-3.5 text-emerald-500" /> : <Share2 className="h-3.5 w-3.5" />}
              <span>{copied ? 'Link Copied' : 'Share Case Study'}</span>
            </button>
            <Link
              href="/contact"
              className="inline-flex items-center gap-2 bg-gold px-5 py-2 font-mono text-xs uppercase tracking-[0.18em] text-[#0B0E14] font-bold hover:shadow-[0_0_20px_rgba(212,175,55,0.4)]"
            >
              Commission Similar Work →
            </Link>
          </div>
        </section>
      </main>

      {/* 4. Next Project Cinematic Gateway */}
      <section className="relative border-t border-stone-300 dark:border-white/10 bg-[#EFECE6] dark:bg-slate-950 py-28 px-6 sm:px-10 lg:px-16 overflow-hidden transition-colors duration-400">
        <div className="viewport-grid absolute inset-0 opacity-20 pointer-events-none" />
        <div className="relative mx-auto max-w-7xl flex flex-col md:flex-row md:items-end justify-between gap-8">
          <div>
            <p className="font-mono text-[10px] uppercase tracking-[0.3em] text-stone-500 dark:text-slate-400">
              Next Artwork Sequence
            </p>
            <h2 className="font-display text-4xl sm:text-6xl font-black uppercase text-stone-900 dark:text-white tracking-tight mt-2">
              {nextProject.title}
            </h2>
            <p className="font-mono text-xs uppercase tracking-wider text-gold dark:text-accent-glow mt-2">
              {nextProject.category} · {nextProject.year}
            </p>
          </div>

          <Link
            href={`/work/${nextProject.slug}`}
            data-cursor="NEXT"
            className="group inline-flex items-center gap-4 border border-gold bg-gold px-8 py-5 font-mono text-xs uppercase tracking-[0.22em] text-[#0B0E14] font-bold transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_0_30px_rgba(212,175,55,0.5)]"
          >
            <span>Proceed to Next Project</span>
            <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
          </Link>
        </div>
      </section>
    </div>
  );
}
