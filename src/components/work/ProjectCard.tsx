'use client';

import React, { useState, useRef } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Grid3X3, ArrowUpRight, Film, Box } from 'lucide-react';
import { Project, WorkPreviewMode } from '@/types';

interface ProjectCardProps {
  project: Project;
  layoutVariant?: 'wide' | 'tall' | 'standard';
  previewMode?: WorkPreviewMode;
}

export function ProjectCard({ project, layoutVariant = 'standard', previewMode = 'hover-video' }: ProjectCardProps) {
  const [showWireframe, setShowWireframe] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  const [isInView, setIsInView] = useState(false);
  const cardRef = useRef<HTMLElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const continuousVideoRef = useRef<HTMLVideoElement>(null);

  React.useEffect(() => {
    const el = cardRef.current;
    if (!el || typeof IntersectionObserver === 'undefined') {
      setIsInView(true);
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          setIsInView(entry.isIntersecting);
          if (continuousVideoRef.current) {
            if (entry.isIntersecting) {
              continuousVideoRef.current.play().catch(() => {});
            } else {
              continuousVideoRef.current.pause();
            }
          }
        });
      },
      { rootMargin: '100px 0px', threshold: 0.05 }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  const toggleWireframe = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setShowWireframe(!showWireframe);
  };

  const handleMouseEnter = () => {
    setIsHovered(true);
    if (previewMode === 'hover-video' && videoRef.current) {
      videoRef.current.play().catch(() => {});
    }
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
    if (previewMode === 'hover-video' && videoRef.current) {
      videoRef.current.pause();
    }
  };

  // If previewMode is 'none', render clean minimal card
  if (previewMode === 'none') {
    return (
      <article className="group relative border border-stone-300/80 dark:border-white/10 bg-[#F7F5F0]/90 dark:bg-slate-900/80 p-6 backdrop-blur-md transition-all duration-300 hover:border-gold/60 cad-corner-tl cad-corner-br">
        <Link href={`/work/${project.slug}`} className="block space-y-3">
          <div className="flex items-center justify-between text-xs font-mono">
            <span className="text-gold font-bold uppercase tracking-wider">{project.category}</span>
            <span className="text-stone-500 dark:text-slate-400">{project.year}</span>
          </div>
          <h3 className="font-display text-xl font-bold uppercase text-stone-900 dark:text-white group-hover:text-gold transition-colors">
            {project.title}
          </h3>
          <p className="text-xs text-stone-600 dark:text-slate-300 font-mono line-clamp-2">
            {project.description}
          </p>
          <div className="flex items-center justify-between pt-2 border-t border-stone-200 dark:border-white/10 text-xs font-mono">
            <span className="text-stone-500 dark:text-slate-400">{project.technicalSpecs.faces} Polys</span>
            <span className="text-gold group-hover:translate-x-1 transition-transform inline-flex items-center gap-1 font-bold">
              View Case Study →
            </span>
          </div>
        </Link>
      </article>
    );
  }

  const isContinuousVideo = previewMode === 'video' && !!project.videoUrl;

  return (
    <article
      ref={cardRef}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      className="group relative overflow-hidden border border-stone-300/80 dark:border-white/10 bg-[#F7F5F0]/90 dark:bg-slate-900/80 backdrop-blur-md transition-all duration-500 hover:border-gold/60 hover:shadow-[0_12px_36px_rgba(0,0,0,0.1)] dark:hover:shadow-[0_12px_36px_rgba(0,0,0,0.45)] cad-corner-tl cad-corner-br"
    >
      <Link
        href={`/work/${project.slug}`}
        data-cursor="VIEW ART"
        className="block"
      >
        {/* Visual Container */}
        <div
          className={`relative overflow-hidden bg-slate-950 ${
            layoutVariant === 'wide'
              ? 'aspect-21/9'
              : layoutVariant === 'tall'
              ? 'aspect-4/5'
              : 'aspect-16/10'
          }`}
        >
          {/* Main Shaded Render Image */}
          <Image
            src={project.heroImage}
            alt={`${project.title} - ${project.category}`}
            fill
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            className={`object-cover transition-all duration-700 ease-out group-hover:scale-105 ${
              showWireframe 
                ? 'opacity-20 blur-[1px]' 
                : isContinuousVideo
                ? 'opacity-0'
                : (previewMode === 'hover-video' && project.videoUrl && isHovered)
                ? 'opacity-0' 
                : 'opacity-95'
            }`}
          />

          {/* Continuous Video Mode */}
          {isContinuousVideo && (
            <video
              ref={continuousVideoRef}
              loop
              muted
              playsInline
              preload="metadata"
              className="absolute inset-0 h-full w-full object-cover filter contrast-[1.08] brightness-[1.04]"
            >
              {isInView && <source src={project.videoUrl} type="video/mp4" />}
            </video>
          )}

          {/* Hover Video Motion Preview */}
          {previewMode === 'hover-video' && project.videoUrl && (
            <video
              ref={videoRef}
              src={project.videoUrl}
              loop
              muted
              playsInline
              preload="metadata"
              className={`absolute inset-0 h-full w-full object-cover transition-opacity duration-500 ease-out pointer-events-none filter contrast-[1.08] brightness-[1.04] ${
                isHovered && !showWireframe ? 'opacity-100' : 'opacity-0'
              }`}
            />
          )}

          {/* Realtime CAD Wireframe Overlay Simulation */}
          {showWireframe && (
            <div className="absolute inset-0 wireframe-mesh opacity-80 mix-blend-screen pointer-events-none animate-in fade-in duration-300">
              <div className="absolute inset-0 bg-gradient-to-b from-accent-glow/20 via-transparent to-accent-glow/30 animate-wire-scan" />
              <div className="absolute bottom-4 left-4 font-mono text-[9px] uppercase tracking-[0.2em] text-accent-glow bg-slate-950/90 px-2 py-1 border border-accent-glow/40">
                QUAD TOPOLOGY ACTIVE · {project.technicalSpecs.faces}
              </div>
            </div>
          )}

          {/* Filmic Edge Scrims */}
          <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-slate-950/80 via-transparent to-transparent opacity-75" />

          {/* Category & Video Indicator Badges Top Left */}
          <div className="absolute top-4 left-4 z-10 flex items-center gap-2">
            <span className="border border-white/20 bg-slate-950/80 px-2.5 py-1 font-mono text-[9px] uppercase tracking-[0.24em] text-slate-200 backdrop-blur-md">
              {project.category}
            </span>
            {project.videoUrl && (
              <span className="border border-accent-glow/40 bg-accent-glow/15 px-2 py-1 font-mono text-[9px] uppercase tracking-[0.16em] text-accent-glow backdrop-blur-md flex items-center gap-1 font-bold">
                <Film className="h-2.5 w-2.5" />
                <span>{isContinuousVideo ? 'Video Reel' : 'Motion'}</span>
              </span>
            )}
          </div>

          {/* Wireframe Toggle Action Top Right */}
          <button
            type="button"
            onClick={toggleWireframe}
            data-cursor="WIREFRAME"
            title="Inspect mesh topology wireframe"
            className={`absolute top-4 right-4 z-20 grid h-8 w-8 place-items-center border backdrop-blur-md transition-all duration-300 cursor-pointer ${
              showWireframe
                ? 'border-accent-glow bg-accent-glow/25 text-accent-glow shadow-[0_0_15px_rgba(56,189,248,0.5)]'
                : 'border-white/20 bg-slate-950/80 text-slate-300 hover:border-gold hover:text-gold'
            }`}
            aria-label="Toggle wireframe topology"
          >
            <Grid3X3 className="h-3.5 w-3.5" />
          </button>

          {/* Hover Overlay Glow */}
          <div className="pointer-events-none absolute inset-0 border border-gold/0 transition-colors duration-500 group-hover:border-gold/30" />
        </div>

        {/* Content Body */}
        <div className="p-6">
          <div className="flex items-baseline justify-between gap-3">
            <h3 className="font-display text-xl font-bold uppercase tracking-tight text-stone-900 dark:text-white group-hover:text-gold transition-colors truncate">
              {project.title}
            </h3>
            <span className="font-mono text-xs text-stone-500 dark:text-slate-400">
              {project.year}
            </span>
          </div>

          <p className="mt-2 text-xs font-mono uppercase tracking-wider text-gold dark:text-accent-glow">
            {project.subtitle}
          </p>

          <p className="mt-3 line-clamp-2 text-xs leading-relaxed text-stone-600 dark:text-slate-300">
            {project.description}
          </p>

          {/* Metadata Specs Strip */}
          <div className="mt-6 flex flex-wrap items-center justify-between gap-3 border-t border-stone-200 dark:border-white/10 pt-4 font-mono text-[10px] text-stone-500 dark:text-slate-400">
            <div className="flex items-center gap-2">
              <span className="h-1.5 w-1.5 rounded-full bg-emerald-500" />
              <span>{project.technicalSpecs.faces} Polys</span>
            </div>
            <span className="text-stone-400 dark:text-slate-600">·</span>
            <span>{project.technicalSpecs.renderEngine}</span>
            <span className="text-stone-400 dark:text-slate-600">·</span>
            <span className="group-hover:text-gold transition-colors inline-flex items-center gap-1 font-bold">
              Case Study <ArrowUpRight className="h-3 w-3" />
            </span>
          </div>
        </div>
      </Link>
    </article>
  );
}
