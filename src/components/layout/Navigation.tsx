'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { ArrowUpRight, Sparkles } from 'lucide-react';
import { ThemeToggle } from '@/components/theme/ThemeToggle';

import { useStudioStore } from '@/lib/store';

interface NavLinkItem {
  label: string;
  href: string;
  external?: boolean;
}

const DEFAULT_NAV_LINKS: NavLinkItem[] = [
  { label: 'Work', href: '/work' },
  { label: 'About', href: '/about' },
  { label: 'Journey', href: '/journey' },
  { label: 'Articles', href: '/articles' },
  { label: 'Ventures', href: '/ventures' },
  { label: 'Fiverr', href: '/fiverr' },
  { label: 'Store', href: 'https://filxy.store', external: true },
  { label: 'Contact', href: '/contact' },
  { label: 'Admin', href: '/admin' },
];

export function Navigation() {
  const pathname = usePathname();
  const { settings } = useStudioStore();
  const [isScrolled, setIsScrolled] = useState(false);

  const customNavLinks: NavLinkItem[] = (settings.customPages || [])
    .filter((p) => p.showInNav)
    .map((p) => ({
      label: p.navLabel || p.title,
      href: `/${p.slug}`,
    }));

  const allNavLinks: NavLinkItem[] = [
    ...DEFAULT_NAV_LINKS.slice(0, 6),
    ...customNavLinks,
    ...DEFAULT_NAV_LINKS.slice(6),
  ];

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 40);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <header
      className={`sticky top-0 z-50 transition-all duration-500 ${
        isScrolled
          ? 'border-b border-stone-200/80 dark:border-white/10 bg-[#F7F5F0]/90 dark:bg-slate-950/85 backdrop-blur-xl py-3 shadow-[0_8px_32px_rgba(0,0,0,0.06)] dark:shadow-[0_8px_32px_rgba(0,0,0,0.35)]'
          : 'border-b border-transparent bg-transparent py-5'
      }`}
    >
      <div className="mx-auto flex max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
        {/* Brand Mark */}
        <Link
          href="/"
          data-cursor="TOP"
          className="group flex items-center gap-3 active"
          aria-label="Pethum Kashmira Home"
        >
          <div className="relative grid h-8 w-8 place-items-center border border-gold/60 font-mono text-[11px] font-bold text-gold transition-all duration-300 group-hover:border-accent-glow group-hover:text-accent-glow group-hover:shadow-[0_0_15px_rgba(56,189,248,0.4)]">
            <span>PK</span>
            <div className="absolute -top-1 -right-1 h-1.5 w-1.5 bg-accent-glow opacity-0 transition-opacity group-hover:opacity-100" />
          </div>
          <div className="flex flex-col">
            <span className="font-display text-sm font-bold tracking-[0.18em] uppercase text-stone-900 dark:text-white group-hover:text-gold transition-colors">
              Pethum Kashmira
            </span>
            <span className="font-mono text-[9px] uppercase tracking-[0.24em] text-stone-500 dark:text-slate-400">
              3D Artist · Blender · CGI · Motion
            </span>
          </div>
        </Link>

        {/* Desktop View Navigation Bar */}
        <nav 
          className="flex items-center gap-5 lg:gap-6" 
          aria-label="Main Navigation"
        >
          {allNavLinks.map((link) => {
            const isActive = pathname === link.href;
            return link.external ? (
              <a
                key={link.label}
                href={link.href}
                target="_blank"
                rel="noreferrer noopener"
                data-cursor="STORE"
                className="inline-flex items-center gap-1 font-mono text-[11px] uppercase tracking-[0.22em] text-stone-600 dark:text-slate-300 transition-colors hover:text-gold shrink-0"
              >
                <span>{link.label}</span>
                <ArrowUpRight className="h-3 w-3 text-gold" />
              </a>
            ) : (
              <Link
                key={link.label}
                href={link.href}
                data-cursor="EXPLORE"
                className={`border-b pb-1 font-mono text-[11px] uppercase tracking-[0.22em] transition-all duration-300 shrink-0 ${
                  isActive
                    ? 'border-accent-glow text-accent-glow shadow-[0_4px_10px_rgba(56,189,248,0.3)] font-medium'
                    : 'border-transparent text-stone-600 dark:text-slate-300 hover:border-gold/60 hover:text-gold'
                }`}
              >
                {link.label}
              </Link>
            );
          })}

          {/* Theme Toggle Button */}
          <div className="shrink-0">
            <ThemeToggle />
          </div>

          <Link
            href="/contact"
            data-cursor="HIRE"
            className="group relative inline-flex items-center gap-2 border border-gold/50 bg-gold/10 px-4 py-2 font-mono text-[11px] uppercase tracking-[0.22em] text-gold transition-all duration-300 hover:border-gold hover:bg-gold hover:text-[#0B0E14] hover:shadow-[0_0_20px_rgba(212,175,55,0.4)] shrink-0"
          >
            <Sparkles className="h-3 w-3 transition-transform group-hover:rotate-12" />
            <span>Commission</span>
          </Link>
        </nav>
      </div>
    </header>
  );
}
