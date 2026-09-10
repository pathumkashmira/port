'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Menu, X, ArrowUpRight, Sparkles } from 'lucide-react';
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
];

export function Navigation() {
  const pathname = usePathname();
  const { settings } = useStudioStore();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
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

  // Close mobile menu on route change
  useEffect(() => {
    setMobileMenuOpen(false);
  }, [pathname]);

  // Prevent scroll when mobile menu is open
  useEffect(() => {
    if (mobileMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
  }, [mobileMenuOpen]);

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

        {/* Desktop Minimal Navigation */}
        <nav className="hidden lg:flex items-center gap-6" aria-label="Main Navigation">
          {allNavLinks.map((link) => {
            const isActive = pathname === link.href;
            return link.external ? (
              <a
                key={link.label}
                href={link.href}
                target="_blank"
                rel="noreferrer noopener"
                data-cursor="STORE"
                className="inline-flex items-center gap-1 font-mono text-[11px] uppercase tracking-[0.22em] text-stone-600 dark:text-slate-300 transition-colors hover:text-gold"
              >
                <span>{link.label}</span>
                <ArrowUpRight className="h-3 w-3 text-gold" />
              </a>
            ) : (
              <Link
                key={link.label}
                href={link.href}
                data-cursor="EXPLORE"
                className={`border-b pb-1 font-mono text-[11px] uppercase tracking-[0.22em] transition-all duration-300 ${
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
          <ThemeToggle />

          <Link
            href="/contact"
            data-cursor="HIRE"
            className="group relative inline-flex items-center gap-2 border border-gold/50 bg-gold/10 px-4 py-2 font-mono text-[11px] uppercase tracking-[0.22em] text-gold transition-all duration-300 hover:border-gold hover:bg-gold hover:text-[#0B0E14] hover:shadow-[0_0_20px_rgba(212,175,55,0.4)]"
          >
            <Sparkles className="h-3 w-3 transition-transform group-hover:rotate-12" />
            <span>Commission</span>
          </Link>
        </nav>

        {/* Mobile Controls: Theme Toggle + Menu Button */}
        <div className="lg:hidden flex items-center gap-2">
          <ThemeToggle />
          <button
            type="button"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label={mobileMenuOpen ? 'Close Menu' : 'Open Navigation Menu'}
            className="flex items-center gap-2 border border-stone-300 dark:border-white/20 bg-stone-100/90 dark:bg-slate-900/80 px-3 py-2 font-mono text-[11px] uppercase tracking-[0.2em] text-gold transition-colors hover:border-accent-glow hover:text-accent-glow"
          >
            {mobileMenuOpen ? (
              <>
                <X className="h-4 w-4 text-accent-glow" />
                <span>Close</span>
              </>
            ) : (
              <>
                <Menu className="h-4 w-4" />
                <span>Index</span>
              </>
            )}
          </button>
        </div>
      </div>

      {/* Cinematic Full-Screen Mobile Menu Drawer */}
      {mobileMenuOpen && (
        <div className="fixed inset-x-0 bottom-0 top-[65px] z-50 flex flex-col justify-between overflow-y-auto bg-[#F7F5F0]/98 dark:bg-[#0B0E14]/98 backdrop-blur-2xl p-5 sm:p-6 lg:hidden animate-in fade-in duration-200">
          <div className="viewport-grid absolute inset-0 opacity-15 pointer-events-none" />

          <div className="relative z-10 mt-2 flex flex-col space-y-2 sm:space-y-3">
            <div className="flex items-center justify-between border-b border-stone-200 dark:border-white/10 pb-2.5">
              <span className="font-mono text-[10px] uppercase tracking-[0.26em] text-gold/90 font-bold">
                Navigation Manifest
              </span>
              <ThemeToggle showLabel />
            </div>
            {allNavLinks.map((link, idx) => {
              const isActive = pathname === link.href;
              return link.external ? (
                <a
                  key={link.label}
                  href={link.href}
                  target="_blank"
                  rel="noreferrer noopener"
                  className="flex items-center justify-between border-b border-stone-200/60 dark:border-white/5 py-2.5 font-display text-lg sm:text-2xl uppercase tracking-wider text-stone-800 dark:text-slate-200 hover:text-gold"
                >
                  <span>{link.label}</span>
                  <span className="font-mono text-xs text-gold flex items-center gap-1">
                    filxy.store <ArrowUpRight className="h-3 w-3" />
                  </span>
                </a>
              ) : (
                <Link
                  key={link.label}
                  href={link.href}
                  className={`flex items-center justify-between border-b border-stone-200/60 dark:border-white/5 py-2.5 font-display text-lg sm:text-2xl uppercase tracking-wider transition-colors ${
                    isActive ? 'text-accent-glow pl-2 border-accent-glow/40' : 'text-stone-800 dark:text-slate-200 hover:text-gold'
                  }`}
                >
                  <span>{link.label}</span>
                  <span className="font-mono text-xs text-stone-400 dark:text-slate-500">
                    0{idx + 1}
                  </span>
                </Link>
              );
            })}
          </div>

          <div className="relative z-10 border-t border-stone-200 dark:border-white/10 pt-4 mt-6">
            <p className="font-mono text-[10px] uppercase tracking-[0.2em] text-stone-500 dark:text-slate-400">
              Pethum Kashmira · Digital Creator &amp; 3D Artist
            </p>
            <p className="font-mono text-[10px] uppercase tracking-[0.2em] text-gold mt-0.5">
              ORVEX Creative Studio · Filxy Store
            </p>
            <Link
              href="/contact"
              className="mt-3 flex w-full items-center justify-center gap-2 bg-gold px-5 py-3 font-mono text-xs uppercase tracking-[0.2em] text-[#0B0E14] font-bold shadow-lg"
            >
              Start A Commission Brief →
            </Link>
          </div>
        </div>
      )}
    </header>
  );
}
