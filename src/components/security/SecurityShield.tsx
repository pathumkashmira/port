'use client';

import React, { useEffect, useState } from 'react';
import { ShieldAlert, Lock, X } from 'lucide-react';
import { useStudioStore } from '@/lib/store';

export function SecurityShield() {
  const { settings, isLoaded } = useStudioStore();
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const security = settings.security;

  const showSecurityNotice = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => {
      setToastMessage(null);
    }, 3200);
  };

  useEffect(() => {
    if (!isLoaded || !security || !security.enabled) return;

    // 1. Console Defense Banner
    if (security.consoleWarning) {
      console.clear();
      console.log(
        `%c  ▲ PETHUM KASHMIRA STUDIO — INTELLECTUAL PROPERTY SHIELD ▲  `,
        'background: #D4AF37; color: #07080A; font-weight: bold; font-size: 14px; padding: 6px 12px;'
      );
      console.log(
        `%cAll 3D assets, Geometry Nodes setups, Cycles materials, motion video reels, and codebase are proprietary works of Pethum Kashmira / ORVEX Studio.\nUnauthorized scraping, copying, reverse-engineering, or asset redistribution is prohibited.`,
        'color: #38BDF8; font-size: 11px; font-family: monospace;'
      );
    }

    // 2. Disable Right-Click Context Menu
    const handleContextMenu = (e: MouseEvent) => {
      if (security.disableRightClick) {
        // Allow right click if user is on an input or textarea
        const target = e.target as HTMLElement;
        if (target.tagName === 'INPUT' || target.tagName === 'TEXTAREA') {
          return;
        }
        e.preventDefault();
        showSecurityNotice('Asset Protection Active: Right-click context menu is restricted to protect 3D models & source media.');
      }
    };

    // 3. Disable DevTools & View Source Shortcuts
    const handleKeyDown = (e: KeyboardEvent) => {
      if (!security.disableDevToolsShortcuts) return;

      const isMac = navigator.platform.toUpperCase().indexOf('MAC') >= 0;
      const ctrlOrCmd = isMac ? e.metaKey : e.ctrlKey;

      // F12
      if (e.key === 'F12') {
        e.preventDefault();
        showSecurityNotice('Security Shield: Developer inspection tools are locked on production portfolio.');
        return;
      }

      // Ctrl+Shift+I / Ctrl+Shift+J / Ctrl+Shift+C
      if (ctrlOrCmd && e.shiftKey && (e.key === 'I' || e.key === 'i' || e.key === 'J' || e.key === 'j' || e.key === 'C' || e.key === 'c')) {
        e.preventDefault();
        showSecurityNotice('Security Shield: Source inspect shortcuts are locked.');
        return;
      }

      // Ctrl+U (View Page Source)
      if (ctrlOrCmd && (e.key === 'U' || e.key === 'u')) {
        e.preventDefault();
        showSecurityNotice('Security Shield: View page source is restricted.');
        return;
      }

      // Ctrl+S (Save Web Page)
      if (ctrlOrCmd && (e.key === 'S' || e.key === 's')) {
        e.preventDefault();
        showSecurityNotice('Security Shield: Asset saving is protected.');
        return;
      }
    };

    // 4. Disable Drag and Drop on Media
    const handleDragStart = (e: DragEvent) => {
      if (security.disableDragAndDrop) {
        const target = e.target as HTMLElement;
        if (target.tagName === 'IMG' || target.tagName === 'VIDEO' || target.closest('video') || target.closest('img')) {
          e.preventDefault();
        }
      }
    };

    window.addEventListener('contextmenu', handleContextMenu);
    window.addEventListener('keydown', handleKeyDown);
    window.addEventListener('dragstart', handleDragStart);

    return () => {
      window.removeEventListener('contextmenu', handleContextMenu);
      window.removeEventListener('keydown', handleKeyDown);
      window.removeEventListener('dragstart', handleDragStart);
    };
  }, [security, isLoaded]);

  if (!security?.enabled || !toastMessage) return null;

  return (
    <div className="fixed bottom-6 right-6 z-9999 max-w-md animate-in fade-in slide-in-from-bottom-4 duration-300">
      <div className="border border-gold/60 bg-[#07090F]/95 backdrop-blur-xl p-4 shadow-[0_0_35px_rgba(212,175,55,0.35)] cad-corner-tl cad-corner-br flex items-start gap-3">
        <div className="p-2 border border-gold/40 bg-gold/10 text-gold shrink-0">
          <ShieldAlert className="h-4 w-4 text-gold animate-pulse" />
        </div>
        <div className="space-y-1 flex-1">
          <div className="flex items-center justify-between">
            <span className="font-mono text-[10px] uppercase tracking-[0.2em] text-gold font-bold flex items-center gap-1.5">
              <Lock className="h-3 w-3" />
              <span>Studio Security Shield</span>
            </span>
            <button
              type="button"
              onClick={() => setToastMessage(null)}
              className="text-white/40 hover:text-white transition-colors"
            >
              <X className="h-3.5 w-3.5" />
            </button>
          </div>
          <p className="font-mono text-xs text-slate-200 leading-relaxed">
            {toastMessage}
          </p>
          <span className="font-mono text-[9px] text-white/40 block">
            © Pethum Kashmira · Protected 3D Portfolio
          </span>
        </div>
      </div>
    </div>
  );
}
