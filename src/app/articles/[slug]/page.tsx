import { notFound } from 'next/navigation';
import Image from 'next/image';
import Link from 'next/link';
import { ArrowLeft, Clock, Calendar, Eye, Share2, Tag } from 'lucide-react';
import { INITIAL_ARTICLES } from '@/data/articles';
import { BackgroundVideo } from '@/components/ui/BackgroundVideo';
import { Metadata } from 'next';

interface PageProps {
  params: { slug: string };
}

export async function generateStaticParams() {
  return INITIAL_ARTICLES.map((article) => ({
    slug: article.slug,
  }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const article = INITIAL_ARTICLES.find((a) => a.slug === params.slug);
  if (!article) return { title: 'Article Not Found' };

  return {
    title: `${article.title} — Articles`,
    description: article.excerpt,
    openGraph: {
      title: `${article.title} | Pethum Kashmira`,
      description: article.excerpt,
      images: [{ url: article.coverImage }],
    },
  };
}

export default function ArticleDetailPage({ params }: PageProps) {
  const article = INITIAL_ARTICLES.find((a) => a.slug === params.slug);
  if (!article) {
    notFound();
  }

  return (
    <article className="relative min-h-screen bg-[#F7F5F0] dark:bg-[#0B0E14] pt-24 pb-36 px-5 sm:px-10 text-stone-800 dark:text-slate-100 overflow-hidden transition-colors duration-400">
      {/* Subtle architectural viewport grid instead of heavy video background */}
      <div className="viewport-grid absolute inset-0 opacity-15 pointer-events-none" />

      <div className="relative z-10 mx-auto max-w-4xl space-y-12">
        {/* Back Link */}
        <Link
          href="/articles"
          className="inline-flex items-center gap-2 font-mono text-xs uppercase tracking-[0.2em] text-stone-500 dark:text-slate-400 hover:text-gold transition-colors"
        >
          <ArrowLeft className="h-4 w-4" />
          <span>Back to Articles</span>
        </Link>

        {/* Title Header */}
        <div className="space-y-6 border-b border-stone-300 dark:border-white/10 pb-10">
          <div className="flex flex-wrap items-center gap-3 font-mono text-[10px] uppercase tracking-wider text-gold dark:text-accent-glow">
            <span className="border border-gold/40 px-2.5 py-1 text-gold bg-gold/10">
              {article.category}
            </span>
            <span>·</span>
            <span className="flex items-center gap-1 text-stone-600 dark:text-slate-300">
              <Calendar className="h-3 w-3" />
              {article.publishedDate}
            </span>
            <span>·</span>
            <span className="flex items-center gap-1 text-stone-600 dark:text-slate-300">
              <Clock className="h-3 w-3" />
              {article.readTime}
            </span>
          </div>

          <h1 className="font-display text-3xl sm:text-5xl font-black uppercase text-stone-900 dark:text-white tracking-tight leading-tight">
            {article.title}
          </h1>

          <p className="text-base sm:text-lg text-stone-600 dark:text-slate-300 leading-relaxed font-mono">
            {article.excerpt}
          </p>
        </div>

        {/* Hero Cover Image */}
        <div className="relative aspect-16/9 w-full overflow-hidden border border-stone-300 dark:border-white/10 bg-stone-200 dark:bg-slate-950 shadow-md">
          <Image
            src={article.coverImage}
            alt={article.title}
            fill
            priority
            sizes="100vw"
            className="object-cover"
          />
        </div>

        {/* Article Body Typography */}
        <div className="max-w-none space-y-6 text-stone-800 dark:text-slate-200 leading-relaxed text-base sm:text-lg font-sans">
          {article.content.split('\n\n').map((paragraph, idx) => {
            if (paragraph.startsWith('### ')) {
              return (
                <h3 key={idx} className="font-display text-2xl uppercase font-bold text-gold tracking-tight pt-6 border-t border-stone-300 dark:border-white/10">
                  {paragraph.replace('### ', '')}
                </h3>
              );
            }
            if (paragraph.startsWith('1. ') || paragraph.startsWith('- ')) {
              return (
                <ul key={idx} className="space-y-2 list-disc pl-6 text-stone-700 dark:text-slate-300 text-sm sm:text-base">
                  {paragraph.split('\n').map((line, lIdx) => (
                    <li key={lIdx}>{line.replace(/^([0-9]+\.|\-)\s*/, '')}</li>
                  ))}
                </ul>
              );
            }
            return (
              <p key={idx} className="leading-relaxed text-stone-700 dark:text-slate-300">
                {paragraph}
              </p>
            );
          })}
        </div>

        {/* Tags & Footer */}
        <div className="border-t border-stone-300 dark:border-white/10 pt-10 flex flex-wrap items-center justify-between gap-4">
          <div className="flex flex-wrap items-center gap-2">
            <Tag className="h-4 w-4 text-gold" />
            {article.tags.map((tag) => (
              <span
                key={tag}
                className="border border-stone-300 dark:border-white/10 bg-stone-100 dark:bg-white/5 px-2.5 py-1 font-mono text-[9px] uppercase tracking-wider text-stone-600 dark:text-slate-400"
              >
                {tag}
              </span>
            ))}
          </div>

          <div className="flex items-center gap-2 font-mono text-xs text-stone-500 dark:text-slate-400">
            <Eye className="h-4 w-4 text-gold dark:text-accent-glow" />
            <span>Studio Read</span>
          </div>
        </div>
      </div>
    </article>
  );
}
