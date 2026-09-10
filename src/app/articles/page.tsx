'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Search, Clock, Eye, ArrowUpRight } from 'lucide-react';
import { BackgroundVideo } from '@/components/ui/BackgroundVideo';
import { useStudioStore } from '@/lib/store';

export default function ArticlesPage() {
  const { articles } = useStudioStore();
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedTag, setSelectedTag] = useState<string>('All');

  const allTags = ['All', ...Array.from(new Set(articles.flatMap((a) => a.tags)))];

  const filteredArticles = articles.filter((article) => {
    const matchesSearch =
      article.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      article.excerpt.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesTag = selectedTag === 'All' || article.tags.includes(selectedTag);
    return matchesSearch && matchesTag;
  });

  return (
    <div className="relative min-h-screen bg-[#F7F5F0] dark:bg-[#0B0E14] pt-24 pb-36 px-5 sm:px-10 text-stone-800 dark:text-slate-100 overflow-hidden transition-colors duration-400">
      {/* Subtle architectural viewport grid instead of heavy video background */}
      <div className="viewport-grid absolute inset-0 opacity-15 pointer-events-none" />

      <div className="relative z-10 mx-auto max-w-7xl space-y-16">
        {/* Header Block */}
        <div className="border-b border-stone-300 dark:border-white/10 pb-12">
          <p className="font-mono text-[11px] uppercase tracking-[0.3em] text-gold dark:text-accent-glow">
            Editorial &amp; Insights · Notes from the Studio
          </p>
          <div className="mt-4 flex flex-col md:flex-row md:items-end justify-between gap-6">
            <h1 className="font-display text-5xl sm:text-7xl font-black uppercase text-stone-900 dark:text-white tracking-tight">
              Articles &amp; Insights
            </h1>
            <p className="max-w-md text-xs sm:text-sm text-stone-600 dark:text-slate-300 font-mono">
              Pipeline guides, hard-surface topology deep dives, lighting principles, and technical creative workflows in Blender.
            </p>
          </div>
        </div>

        {/* Search & Tags */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-6 border-b border-stone-200 dark:border-white/5 pb-8">
          <div className="relative w-full sm:max-w-md">
            <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-stone-400 dark:text-slate-400" />
            <input
              type="text"
              placeholder="Search guides and pipeline notes..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full border border-stone-300 dark:border-white/15 bg-white/80 dark:bg-slate-900/80 backdrop-blur-md py-3 pl-10 pr-4 font-mono text-xs text-stone-900 dark:text-white placeholder:text-stone-400 dark:placeholder:text-slate-500 focus:border-gold outline-hidden transition-colors"
            />
          </div>

          <div className="flex flex-wrap gap-2 w-full sm:w-auto">
            {allTags.map((tag) => (
              <button
                key={tag}
                type="button"
                onClick={() => setSelectedTag(tag)}
                className={`px-3 py-1.5 font-mono text-[10px] uppercase tracking-wider border transition-colors ${
                  selectedTag === tag
                    ? 'border-gold bg-gold/15 text-gold font-bold'
                    : 'border-stone-300 dark:border-white/10 text-stone-600 dark:text-slate-400 hover:border-gold dark:hover:border-white/30 hover:text-stone-900 dark:hover:text-white'
                }`}
              >
                {tag}
              </button>
            ))}
          </div>
        </div>

        {/* Articles Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredArticles.map((article) => (
            <article
              key={article.id}
              className="group glass-panel p-6 hover:border-gold/50 transition-all space-y-4 cad-corner-tl cad-corner-br flex flex-col justify-between"
            >
              <div className="space-y-4">
                <div className="relative aspect-16/10 overflow-hidden bg-stone-200 dark:bg-slate-950">
                  <Image
                    src={article.coverImage}
                    alt={article.title}
                    fill
                    sizes="(max-width: 768px) 100vw, 33vw"
                    className="object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                  <span className="absolute top-3 left-3 bg-stone-900/90 dark:bg-slate-950/90 px-2.5 py-0.5 font-mono text-[9px] uppercase tracking-wider text-gold border border-gold/30 backdrop-blur-sm">
                    {article.category}
                  </span>
                </div>

                <div className="flex items-center justify-between font-mono text-[10px] text-stone-500 dark:text-slate-400">
                  <span>{article.publishedDate}</span>
                  <span className="flex items-center gap-1">
                    <Clock className="h-3 w-3 text-gold dark:text-accent-glow" />
                    {article.readTime}
                  </span>
                </div>

                <h3 className="font-display text-xl font-bold uppercase text-stone-900 dark:text-white group-hover:text-gold transition-colors line-clamp-2">
                  {article.title}
                </h3>

                <p className="text-xs text-stone-600 dark:text-slate-300 line-clamp-3 leading-relaxed">
                  {article.excerpt}
                </p>
              </div>

              <div className="pt-4 border-t border-stone-200 dark:border-white/5 flex items-center justify-between">
                <div className="flex flex-wrap gap-1">
                  {article.tags.slice(0, 2).map((tag) => (
                    <span
                      key={tag}
                      className="border border-stone-300 dark:border-white/10 bg-stone-100 dark:bg-white/5 px-2 py-0.5 font-mono text-[9px] uppercase text-stone-600 dark:text-slate-400"
                    >
                      {tag}
                    </span>
                  ))}
                </div>

                <Link
                  href={`/articles/${article.slug}`}
                  data-cursor="READ"
                  className="inline-flex items-center gap-1.5 font-mono text-[10px] uppercase tracking-[0.2em] text-gold dark:text-accent-glow hover:underline transition-colors"
                >
                  <span>Read Note</span>
                  <ArrowUpRight className="h-3 w-3" />
                </Link>
              </div>
            </article>
          ))}
        </div>
      </div>
    </div>
  );
}
