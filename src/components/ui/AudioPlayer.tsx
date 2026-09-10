'use client';

import React, { useState, useRef, useEffect } from 'react';
import { Volume2, VolumeX } from 'lucide-react';

export function AudioPlayer() {
  const [isPlaying, setIsPlaying] = useState(false);
  const audioCtxRef = useRef<AudioContext | null>(null);
  const gainNodeRef = useRef<GainNode | null>(null);
  const osc1Ref = useRef<OscillatorNode | null>(null);
  const osc2Ref = useRef<OscillatorNode | null>(null);

  const toggleSound = () => {
    if (!isPlaying) {
      try {
        const AudioCtx = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
        const ctx = new AudioCtx();
        audioCtxRef.current = ctx;

        // Master Gain
        const masterGain = ctx.createGain();
        masterGain.gain.setValueAtTime(0.01, ctx.currentTime);
        masterGain.gain.exponentialRampToValueAtTime(0.06, ctx.currentTime + 2);
        gainNodeRef.current = masterGain;

        // Lowpass Filter for warm atmospheric tone
        const filter = ctx.createBiquadFilter();
        filter.type = 'lowpass';
        filter.frequency.setValueAtTime(140, ctx.currentTime);

        // Low drone oscillators (harmonic chord 55Hz & 82.5Hz)
        const osc1 = ctx.createOscillator();
        osc1.type = 'sawtooth';
        osc1.frequency.setValueAtTime(55, ctx.currentTime); // A1

        const osc2 = ctx.createOscillator();
        osc2.type = 'sine';
        osc2.frequency.setValueAtTime(82.41, ctx.currentTime); // E2

        osc1.connect(filter);
        osc2.connect(filter);
        filter.connect(masterGain);
        masterGain.connect(ctx.destination);

        osc1.start();
        osc2.start();

        osc1Ref.current = osc1;
        osc2Ref.current = osc2;
        setIsPlaying(true);
      } catch (err) {
        console.warn('Audio synthesis failed:', err);
      }
    } else {
      if (gainNodeRef.current && audioCtxRef.current) {
        const ctx = audioCtxRef.current;
        gainNodeRef.current.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.8);
        setTimeout(() => {
          osc1Ref.current?.stop();
          osc2Ref.current?.stop();
          ctx.close();
          setIsPlaying(false);
        }, 850);
      } else {
        setIsPlaying(false);
      }
    }
  };

  useEffect(() => {
    return () => {
      try {
        audioCtxRef.current?.close();
      } catch {
        // ignore cleanup error
      }
    };
  }, []);

  return (
    <button
      onClick={toggleSound}
      data-cursor="SOUND"
      type="button"
      className="inline-flex items-center gap-2 border border-white/10 bg-surface px-2.5 py-1.5 font-mono text-[10px] uppercase tracking-[0.2em] text-muted-foreground transition-colors hover:border-gold hover:text-gold"
      title={isPlaying ? 'Mute studio ambient drone' : 'Play studio ambient soundscape'}
      aria-label="Toggle ambient studio sound"
    >
      {isPlaying ? (
        <>
          <Volume2 className="h-3 w-3 text-accent-glow animate-pulse" />
          <span className="text-accent-glow">Audio On</span>
        </>
      ) : (
        <>
          <VolumeX className="h-3 w-3 text-white/50" />
          <span>Atmosphere</span>
        </>
      )}
    </button>
  );
}
