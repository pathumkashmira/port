'use client';

import React from 'react';
import { Sun, Moon } from 'lucide-react';
import { useTheme } from './ThemeProvider';

interface ThemeToggleProps {
  className?: string;
  showLabel?: boolean;
}

export function ThemeToggle({ className = '', showLabel = false }: ThemeToggleProps) {
  const { theme, toggleTheme } = useTheme();
  const isDark = theme === 'dark';

  return (
    <button
      type="button"
      onClick={toggleTheme}
      data-cursor="THEME"
      title={`Switch to ${isDark ? 'Light' : 'Dark'} Mode`}
      aria-label={`Current theme is ${theme}. Switch to ${isDark ? 'Light' : 'Dark'} Mode`}
      className={`group relative inline-flex items-center gap-2 border px-3 py-1.5 font-mono text-[10px] uppercase tracking-[0.2em] transition-all duration-300 ${
        isDark
          ? 'border-white/20 bg-slate-900/80 text-slate-300 hover:border-gold hover:text-gold hover:shadow-[0_0_15px_rgba(212,175,55,0.2)]'
          : 'border-slate-300 bg-stone-100/90 text-stone-800 hover:border-amber-600 hover:text-amber-700 hover:shadow-[0_0_15px_rgba(180,130,50,0.2)]'
      } ${className}`}
    >
      <div className="relative h-3.5 w-3.5 flex items-center justify-center">
        {isDark ? (
          <Sun className="h-3.5 w-3.5 text-gold transition-transform duration-500 group-hover:rotate-45" />
        ) : (
          <Moon className="h-3.5 w-3.5 text-amber-700 transition-transform duration-500 group-hover:-rotate-12" />
        )}
      </div>
      {showLabel ? (
        <span>{isDark ? 'Light Mode' : 'Dark Mode'}</span>
      ) : (
        <span className="hidden sm:inline">{isDark ? 'Light' : 'Dark'}</span>
      )}
    </button>
  );
}
