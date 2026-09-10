'use client';

import React, { useEffect } from 'react';
import { useStudioStore } from '@/lib/store';

export function DynamicThemeProvider({ children }: { children: React.ReactNode }) {
  const { settings, isLoaded } = useStudioStore();

  useEffect(() => {
    if (!isLoaded || !settings.themeColors) return;

    const colors = settings.themeColors;
    const root = document.documentElement;

    if (colors.primaryAccent) {
      root.style.setProperty('--color-gold', colors.primaryAccent);
    }
    if (colors.secondaryAccent) {
      root.style.setProperty('--color-accent-glow', colors.secondaryAccent);
    }
    if (colors.bgPrimary) {
      root.style.setProperty('--bg-primary', colors.bgPrimary);
    }
    if (colors.bgSecondary) {
      root.style.setProperty('--bg-secondary', colors.bgSecondary);
    }
    if (colors.textPrimary) {
      root.style.setProperty('--text-primary', colors.textPrimary);
    }
    if (colors.textMuted) {
      root.style.setProperty('--text-muted', colors.textMuted);
    }
    if (colors.borderColor) {
      root.style.setProperty('--border-color', colors.borderColor);
    }
  }, [settings.themeColors, isLoaded]);

  return <>{children}</>;
}
