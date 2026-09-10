'use client';

import React, { useState } from 'react';
import { ProjectCard } from '@/components/work/ProjectCard';
import { BackgroundVideo } from '@/components/ui/BackgroundVideo';
import { useStudioStore } from '@/lib/store';
import { ProjectCategory } from '@/types';
import { ArrowUpDown, Film } from 'lucide-react';

export default function WorkPage() {
  const { projects, settings } = useStudioStore();
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [sortBy, setSortBy] = useState<'curated' | 'views'>('curated');

  const workVideoSrc = settings.pageVideos?.work || '/videos/corridor-ambience.mp4';

  const categories: string[] = [
    'All',
    'Hard Surface',
    'Environment Design',
    'Abstract Art',
    'Game Assets',
    'Character Sculpts',
    'Visual Design',
  ];

  let displayedProjects = selectedCategory === 'All'
    ? [...projects]
    : projects.filter((p) => p.category === selectedCategory);

  if (sortBy === 'views') {
    displayedProjects.sort((a, b) => b.viewCount - a.viewCount);
  }

  return (
    <div className="relative min-h-screen bg-[#F7F5F0]/80 dark:bg-[#0B0E14]/80 pt-24 pb-36 px-5 sm:px-10 text-stone-800 dark:text-slate-100 overflow-hidden transition-colors duration-400">
      {/* Distinct Cinematic Background Video Configurable from Admin */}
      <BackgroundVideo
        src={workVideoSrc}
        opacity={0.85}
      />

      {/* Subtle architectural viewport grid */}
      <div className="viewport-grid absolute inset-0 opacity-15 pointer-events-none" />

      <div className="relative z-10 mx-auto max-w-7xl">
        {/* Page Header Header */}
        <div className="border-b border-stone-300 dark:border-white/10 pb-12">
          <div className="inline-flex items-center gap-2 font-mono text-[11px] uppercase tracking-[0.3em] text-gold dark:text-accent-glow mb-3">
            <Film className="h-3.5 w-3.5" />
            <span>Archive Index · 3D Gallery & Motion Studies</span>
          </div>
          <div className="mt-2 flex flex-col md:flex-row md:items-end justify-between gap-6">
            <h1 className="font-display text-5xl sm:text-7xl font-black uppercase text-stone-900 dark:text-white tracking-tight">
              Selected Works
            </h1>
            <p className="max-w-md text-xs sm:text-sm text-stone-600 dark:text-slate-300 font-mono">
              Complete catalog of 3D modeling studies, environment set designs, procedural node simulations, and commercial CGI projects.
            </p>
          </div>
        </div>

        {/* Filter & Sort Bar */}
        <div className="mt-8 flex flex-wrap items-center justify-between gap-4 border-b border-stone-200 dark:border-white/5 pb-6">
          <div className="flex flex-wrap items-center gap-2">
            {categories.map((cat) => (
              <button
                key={cat}
                type="button"
                onClick={() => setSelectedCategory(cat)}
                data-cursor="FILTER"
                className={`px-4 py-2 font-mono text-[10px] uppercase tracking-[0.2em] border transition-colors ${
                  selectedCategory === cat
                    ? 'border-gold bg-gold text-[#0B0E14] font-bold'
                    : 'border-stone-300 dark:border-white/10 bg-white/70 dark:bg-slate-900/60 text-stone-700 dark:text-slate-300 hover:border-gold dark:hover:border-accent-glow hover:text-stone-900 dark:hover:text-accent-glow'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>

          <div className="flex items-center gap-2 font-mono text-xs">
            <span className="text-stone-500 dark:text-slate-400 text-[10px] uppercase tracking-wider">Sort:</span>
            <button
              type="button"
              onClick={() => setSortBy('curated')}
              className={`px-3 py-1.5 border text-[10px] uppercase tracking-wider transition-colors ${
                sortBy === 'curated'
                  ? 'border-gold text-gold bg-gold/10 dark:border-accent-glow dark:text-accent-glow dark:bg-accent-glow/10'
                  : 'border-stone-300 dark:border-white/10 text-stone-500 dark:text-slate-400 hover:text-stone-900 dark:hover:text-white'
              }`}
            >
              Curated Order
            </button>
            <button
              type="button"
              onClick={() => setSortBy('views')}
              className={`px-3 py-1.5 border text-[10px] uppercase tracking-wider transition-colors ${
                sortBy === 'views'
                  ? 'border-gold text-gold bg-gold/10 dark:border-accent-glow dark:text-accent-glow dark:bg-accent-glow/10'
                  : 'border-stone-300 dark:border-white/10 text-stone-500 dark:text-slate-400 hover:text-stone-900 dark:hover:text-white'
              }`}
            >
              Most Viewed
            </button>
          </div>
        </div>

        {/* Dynamic Project Grid - Desktop Multi-Column Grid */}
        <div className="mt-8 sm:mt-12 grid grid-cols-2 lg:grid-cols-3 gap-3.5 sm:gap-8">
          {displayedProjects.map((project, idx) => (
            <ProjectCard
              key={project.id}
              project={project}
              layoutVariant={idx === 0 ? 'wide' : 'standard'}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
