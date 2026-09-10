'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { ArrowUpRight, Sparkles, Menu, X } from 'lucide-react';
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
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

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
      setIsScrolled(window.scrollY > 30);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close mobile menu on route change
  useEffect(() => {
    setMobileMenuOpen(false);
  }, [pathname]);

  return (
    <header
      className={`sticky top-0 z-50 transition-all duration-300 ${
        isScrolled || mobileMenuOpen
          ? 'border-b border-stone-200/80 dark:border-white/10 bg-[#F7F5F0]/95 dark:bg-slate-950/90 backdrop-blur-xl py-3 shadow-[0_8px_32px_rgba(0,0,0,0.06)] dark:shadow-[0_8px_32px_rgba(0,0,0,0.35)]'
          : 'border-b border-transparent bg-transparent py-4 sm:py-5'
      }`}
    >
      <div className="mx-auto flex w-full max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
        {/* Brand Mark */}
        <Link
          href="/"
          data-cursor="TOP"
          className="group flex items-center gap-3 shrink-0"
          aria-label="Pethum Kashmira Home"
        >
          <div className="relative grid h-8 w-8 place-items-center border border-gold/60 font-mono text-[11px] font-bold text-gold transition-all duration-300 group-hover:border-accent-glow group-hover:text-accent-glow group-hover:shadow-[0_0_15px_rgba(56,189,248,0.4)]">
            <span>PK</span>
            <div className="absolute -top-1 -right-1 h-1.5 w-1.5 bg-accent-glow opacity-0 transition-opacity group-hover:opacity-100" />
          </div>
          <div className="flex flex-col">
            <span className="font-display text-sm sm:text-base font-bold tracking-[0.16em] uppercase text-stone-900 dark:text-white group-hover:text-gold transition-colors">
              Pethum Kashmira
            </span>
            <span className="font-mono text-[8px] sm:text-[9px] uppercase tracking-[0.22em] text-stone-500 dark:text-slate-400">
              3D Artist · Blender · CGI · Motion
            </span>
          </div>
        </Link>

        {/* Desktop Navigation Links (Visible on Large Screens) */}
        <nav 
          className="hidden xl:flex items-center gap-5 lg:gap-6" 
          aria-label="Desktop Navigation"
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
                className="inline-flex items-center gap-1 font-mono text-[11px] uppercase tracking-[0.2em] text-stone-600 dark:text-slate-300 transition-colors hover:text-gold"
              >
                <span>{link.label}</span>
                <ArrowUpRight className="h-3 w-3 text-gold" />
              </a>
            ) : (
              <Link
                key={link.label}
                href={link.href}
                data-cursor="EXPLORE"
                className={`border-b pb-0.5 font-mono text-[11px] uppercase tracking-[0.2em] transition-all duration-200 ${
                  isActive
                    ? 'border-accent-glow text-accent-glow shadow-[0_4px_10px_rgba(56,189,248,0.3)] font-semibold'
                    : 'border-transparent text-stone-600 dark:text-slate-300 hover:border-gold/60 hover:text-gold'
                }`}
              >
                {link.label}
              </Link>
            );
          })}

          <div className="shrink-0 pl-2">
            <ThemeToggle />
          </div>

          <Link
            href="/contact"
            data-cursor="HIRE"
            className="group relative inline-flex items-center gap-2 border border-gold/60 bg-gold/10 px-4 py-2 font-mono text-[11px] uppercase tracking-[0.2em] text-gold transition-all duration-300 hover:border-gold hover:bg-gold hover:text-[#0B0E14] hover:shadow-[0_0_20px_rgba(212,175,55,0.4)] shrink-0"
          >
            <Sparkles className="h-3 w-3 transition-transform group-hover:rotate-12" />
            <span>Commission</span>
          </Link>
        </nav>

        {/* Medium and Small Screen Controls */}
        <div className="flex xl:hidden items-center gap-2 sm:gap-3">
          <ThemeToggle />
          
          <Link
            href="/contact"
            className="hidden sm:inline-flex items-center gap-1.5 border border-gold/60 bg-gold/10 px-3 py-1.5 font-mono text-[10px] uppercase tracking-[0.16em] text-gold hover:bg-gold hover:text-black transition-all"
          >
            <Sparkles className="h-3 w-3" />
            <span>Hire</span>
          </Link>

          {/* Mobile Menu Toggle Button */}
          <button
            type="button"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label={mobileMenuOpen ? 'Close Menu' : 'Open Menu'}
            className="grid h-9 w-9 place-items-center border border-stone-300 dark:border-white/20 bg-stone-100/90 dark:bg-slate-900/90 text-stone-800 dark:text-white hover:border-gold hover:text-gold transition-all duration-200 active:scale-95"
          >
            {mobileMenuOpen ? <X className="h-5 w-5 text-gold" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer Menu (Smooth Cybernetic Dropdown) */}
      {mobileMenuOpen && (
        <div className="xl:hidden border-t border-stone-200/80 dark:border-white/10 bg-[#F7F5F0]/98 dark:bg-[#07090F]/98 backdrop-blur-2xl px-5 py-6 shadow-2xl animate-in slide-in-from-top-2 duration-200">
          <div className="mx-auto max-w-md space-y-4">
            <div className="grid grid-cols-2 gap-2 pb-2">
              {allNavLinks.map((link) => {
                const isActive = pathname === link.href;
                return link.external ? (
                  <a
                    key={link.label}
                    href={link.href}
                    target="_blank"
                    rel="noreferrer noopener"
                    className="flex items-center justify-between border border-stone-300/60 dark:border-white/10 bg-white/60 dark:bg-white/5 px-3.5 py-2.5 font-mono text-xs uppercase tracking-wider text-stone-700 dark:text-slate-200 hover:border-gold hover:text-gold transition-all"
                  >
                    <span>{link.label}</span>
                    <ArrowUpRight className="h-3.5 w-3.5 text-gold" />
                  </a>
                ) : (
                  <Link
                    key={link.label}
                    href={link.href}
                    className={`flex items-center justify-between border px-3.5 py-2.5 font-mono text-xs uppercase tracking-wider transition-all ${
                      isActive
                        ? 'border-accent-glow bg-accent-glow/15 text-accent-glow font-bold'
                        : 'border-stone-300/60 dark:border-white/10 bg-white/60 dark:bg-white/5 text-stone-700 dark:text-slate-200 hover:border-gold hover:text-gold'
                    }`}
                  >
                    <span>{link.label}</span>
                    {isActive && <span className="h-1.5 w-1.5 rounded-full bg-accent-glow" />}
                  </Link>
                );
              })}
            </div>

            <div className="pt-2 border-t border-stone-200 dark:border-white/10 flex flex-col gap-2">
              <Link
                href="/contact"
                className="w-full flex items-center justify-center gap-2 bg-gradient-to-r from-[#D4AF37] to-[#F59E0B] py-3 font-mono text-xs uppercase tracking-[0.2em] text-[#0B0E14] font-bold hover:shadow-[0_0_20px_rgba(212,175,55,0.4)] transition-all"
              >
                <Sparkles className="h-4 w-4" />
                <span>Commission 3D Project</span>
              </Link>
            </div>
          </div>
        </div>
      )}
    </header>
  );
}
