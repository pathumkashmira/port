'use client';

import React, { useState } from 'react';
import { JourneyItem } from '@/types';
import { 
  GraduationCap, 
  Sparkles, 
  Terminal, 
  Briefcase, 
  MapPin, 
  CheckCircle2,
  Calendar
} from 'lucide-react';

interface TimelineScrubberProps {
  items: JourneyItem[];
}

export function TimelineScrubber({ items }: TimelineScrubberProps) {
  const [selectedTrack, setSelectedTrack] = useState<'all' | 'creative' | 'academic' | 'technical'>('all');
  const [activeItemIndex, setActiveItemIndex] = useState(0);

  const filteredItems = items.filter((item) => {
    if (selectedTrack === 'all') return true;
    return item.track === selectedTrack;
  });

  const activeItem = filteredItems[activeItemIndex] || filteredItems[0] || items[0];

  return (
    <div className="relative">
      {/* Track Filter Switcher */}
      <div className="flex flex-wrap items-center gap-2 border-b border-stone-300 dark:border-white/10 pb-6 mb-10">
        <span className="font-mono text-[10px] uppercase tracking-[0.24em] text-stone-500 dark:text-white/40 mr-2">
          Filter Track:
        </span>
        {(['all', 'creative', 'academic', 'technical'] as const).map((track) => (
          <button
            key={track}
            type="button"
            onClick={() => {
              setSelectedTrack(track);
              setActiveItemIndex(0);
            }}
            data-cursor="FILTER"
            className={`px-4 py-2 font-mono text-[10px] uppercase tracking-[0.2em] border transition-colors ${
              selectedTrack === track
                ? 'border-gold bg-gold/15 text-gold font-bold'
                : 'border-stone-300 dark:border-white/10 text-stone-600 dark:text-white/50 hover:border-gold dark:hover:border-white/30 hover:text-stone-900 dark:hover:text-white'
            }`}
          >
            {track === 'all'
              ? 'Unified Timeline'
              : track === 'creative'
              ? '3D & Art Direction'
              : track === 'academic'
              ? 'Agribusiness & Finance'
              : 'Systems & Infrastructure'}
          </button>
        ))}
      </div>

      {/* Main Interactive Stage: Active Milestone Card + Timeline Selector */}
      <div className="grid lg:grid-cols-12 gap-8 items-start">
        {/* Left Column: Interactive Milestone List Selector */}
        <div className="lg:col-span-5 space-y-3">
          {filteredItems.map((item, index) => {
            const isSelected = activeItem.id === item.id;
            return (
              <button
                key={item.id}
                type="button"
                onClick={() => setActiveItemIndex(index)}
                data-cursor="SELECT"
                className={`w-full text-left p-5 border transition-all duration-300 relative ${
                  isSelected
                    ? 'border-gold dark:border-accent-glow bg-stone-100 dark:bg-[#0E1118] shadow-md dark:shadow-[0_0_20px_rgba(0,242,254,0.15)] pl-6'
                    : 'border-stone-300 dark:border-white/10 bg-white/70 dark:bg-[#08090D] hover:border-gold/40 dark:hover:border-white/20 hover:bg-stone-50 dark:hover:bg-[#0C0E14]'
                }`}
              >
                {/* Active Indicator Bar */}
                {isSelected && (
                  <div className="absolute left-0 top-0 bottom-0 w-1 bg-gold dark:bg-accent-glow" />
                )}

                <div className="flex items-center justify-between text-xs font-mono">
                  <span className={isSelected ? 'text-gold dark:text-accent-glow font-bold' : 'text-stone-500 dark:text-white/40'}>
                    {item.period}
                  </span>
                  <span
                    className={`px-2 py-0.5 text-[9px] uppercase tracking-[0.14em] border ${
                      item.track === 'creative'
                        ? 'border-gold/40 text-gold bg-gold/5'
                        : item.track === 'academic'
                        ? 'border-emerald-600/40 dark:border-emerald-400/40 text-emerald-700 dark:text-emerald-400 bg-emerald-500/5'
                        : 'border-cyan-600/40 dark:border-cyan-400/40 text-cyan-700 dark:text-cyan-400 bg-cyan-500/5'
                    }`}
                  >
                    {item.track}
                  </span>
                </div>

                <h4 className="mt-2 font-display text-base font-bold text-stone-900 dark:text-white uppercase tracking-tight">
                  {item.title}
                </h4>

                <p className="mt-1 font-mono text-[11px] text-stone-500 dark:text-white/50 truncate">
                  {item.institution}
                </p>
              </button>
            );
          })}
        </div>

        {/* Right Column: Deep-Dive Viewport of Selected Milestone */}
        <div className="lg:col-span-7 border border-stone-300 dark:border-white/15 bg-white/80 dark:bg-[#0B0D14] p-8 sm:p-10 cad-corner-tl cad-corner-br relative overflow-hidden transition-colors duration-400">
          <div className="viewport-grid absolute inset-0 opacity-20 pointer-events-none" />

          <div className="relative z-10 space-y-6">
            <div className="flex flex-wrap items-center justify-between gap-4 border-b border-stone-300 dark:border-white/10 pb-4">
              <div className="flex items-center gap-2 font-mono text-xs text-gold dark:text-accent-glow">
                <Calendar className="h-4 w-4" />
                <span>{activeItem.period}</span>
              </div>
              <div className="flex items-center gap-2 font-mono text-xs text-stone-500 dark:text-white/50">
                <MapPin className="h-3.5 w-3.5 text-gold" />
                <span>{activeItem.location}</span>
              </div>
            </div>

            <div>
              <span className="font-mono text-[10px] uppercase tracking-[0.24em] text-gold">
                {activeItem.institution}
              </span>
              <h3 className="font-display text-2xl sm:text-3xl font-extrabold uppercase text-stone-900 dark:text-white mt-1">
                {activeItem.title}
              </h3>
            </div>

            <p className="text-sm sm:text-base leading-relaxed text-stone-700 dark:text-white/70">
              {activeItem.description}
            </p>

            {/* Structured Highlights */}
            {activeItem.highlights && activeItem.highlights.length > 0 && (
              <div className="border-t border-stone-300 dark:border-white/10 pt-6 space-y-3">
                <p className="font-mono text-[10px] uppercase tracking-[0.2em] text-stone-500 dark:text-white/40">
                  Key Milestones & Deliverables
                </p>
                <ul className="space-y-2">
                  {activeItem.highlights.map((highlight, idx) => (
                    <li key={idx} className="flex items-start gap-3 text-xs sm:text-sm text-stone-800 dark:text-white/80">
                      <CheckCircle2 className="h-4 w-4 text-gold dark:text-accent-glow shrink-0 mt-0.5" />
                      <span>{highlight}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {/* Associated Tags */}
            <div className="flex flex-wrap gap-2 pt-4">
              {activeItem.tags.map((tag) => (
                <span
                  key={tag}
                  className="border border-stone-300 dark:border-white/10 bg-stone-100 dark:bg-white/5 px-2.5 py-1 font-mono text-[9px] uppercase tracking-[0.16em] text-stone-700 dark:text-white/60"
                >
                  {tag}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
