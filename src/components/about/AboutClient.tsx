'use client';

import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { 
  GraduationCap, 
  Award, 
  Box, 
  ArrowUpRight,
  Sparkles,
  Video
} from 'lucide-react';
import { BackgroundVideo } from '@/components/ui/BackgroundVideo';
import { useStudioStore } from '@/lib/store';

export function AboutClient() {
  const { settings } = useStudioStore();
  const videoSrc = settings.pageVideos?.about || '/videos/corridor-ambience.mp4';

  const tools = [
    { name: 'Blender 4.x', role: 'Primary DCC / Modeling & Sculpting', badge: 'Expert' },
    { name: 'Cycles', role: 'Path Tracing & Photoreal Production', badge: 'Core' },
    { name: 'Eevee Next', role: 'Realtime Viewport & Ambient Rendering', badge: 'Core' },
    { name: 'Geometry Nodes', role: 'Procedural Systems & Math Splines', badge: 'Advanced' },
    { name: 'Substance Painter', role: 'PBR Texturing & Micro-Surfacing', badge: 'Advanced' },
    { name: 'ZBrush', role: 'High-Poly Digital Sculpting & Anatomy', badge: 'Proficient' },
    { name: 'Photoshop', role: 'Post-Processing & Compositing', badge: 'Advanced' },
    { name: 'CorelDRAW & Illustrator', role: 'Precision Vector Work & Graphics', badge: 'Proficient' },
    { name: 'Figma', role: 'Design Systems & Interface Layouts', badge: 'Advanced' },
    { name: 'Three.js / WebGL', role: 'Realtime Web 3D Graphics', badge: 'Proficient' },
  ];

  const certifications = [
    { title: 'AWS Cloud Practitioner Essentials', issuer: 'Amazon Web Services', year: '2024' },
    { title: 'AWS Node Runners for BNB Chain', issuer: 'Amazon Web Services', year: '2024' },
    { title: 'Transformational Leadership', issuer: 'Professional Development', year: '2023' },
    { title: 'Work Smarter with Microsoft Excel', issuer: 'Business Analytics', year: '2023' },
  ];

  return (
    <div className="relative min-h-screen bg-[#F7F5F0] dark:bg-[#0B0E14] pt-24 pb-36 px-5 sm:px-10 text-stone-800 dark:text-slate-100 overflow-hidden transition-colors duration-400">
      {/* Dynamic Background Video Loop configured via Admin */}
      <BackgroundVideo
        src={videoSrc}
        opacity={0.68}
        overlayClassName="from-[#F7F5F0]/70 via-[#F7F5F0]/40 to-[#F7F5F0]/85 dark:from-[#0B0E14]/75 dark:via-[#0B0E14]/45 dark:to-[#0B0E14]/90"
      />

      <div className="relative z-10 mx-auto max-w-7xl space-y-28">
        {/* Header Block */}
        <section className="border-b border-stone-300 dark:border-white/10 pb-16">
          <div className="inline-flex items-center gap-2 font-mono text-[11px] uppercase tracking-[0.3em] text-gold mb-2">
            <Sparkles className="h-3 w-3 text-gold" />
            <span>Profile · Dual Lens</span>
          </div>
          <div className="mt-4 flex flex-col lg:flex-row lg:items-end justify-between gap-8">
            <h1 className="font-display text-5xl sm:text-7xl font-black uppercase text-stone-900 dark:text-white tracking-tight leading-none">
              Pethum Kashmira
            </h1>
            <p className="max-w-xl text-sm sm:text-base leading-relaxed text-stone-600 dark:text-slate-300">
              3D Modeler, Visual Artist &amp; Creative Director based in Sri Lanka. Founder of ORVEX Creative Studio and Filxy Store.
            </p>
          </div>
        </section>

        {/* Dual Lens Story Grid */}
        <section className="grid lg:grid-cols-12 gap-12 items-start">
          <div className="lg:col-span-7 space-y-8">
            <div>
              <h2 className="font-display text-3xl sm:text-4xl font-extrabold uppercase text-stone-900 dark:text-white tracking-tight">
                The Dual-Lens Philosophy
              </h2>
              <div className="mt-6 space-y-4 text-sm sm:text-base leading-relaxed text-stone-700 dark:text-slate-300">
                <p>
                  I operate at the intersection of structured thinking and creative design. My work pairs disciplined planning with hands-on digital craft — every asset is built like a system, not a one-off render.
                </p>
                <p>
                  By day, I am an <strong className="text-stone-900 dark:text-white font-medium">Agri-Business Management</strong> undergraduate at the University of Ruhuna. That academic grounding in planning, systems, operations, and supply chain logistics shapes how I scope, structure, and execute complex 3D productions.
                </p>
                <p>
                  Equally, I am pursuing <strong className="text-stone-900 dark:text-white font-medium">Chartered Accountancy</strong> (CA Sri Lanka — Business Level). This adds commercial rigor, cost optimization, and disciplined time management to every client and studio project.
                </p>
                <p>
                  In the 3D realm, this shows up as clean quad topology, zero polygon waste, efficient procedural networks in Geometry Nodes, and deliberate studio lighting.
                </p>
              </div>
            </div>

            {/* Academic Track Cards */}
            <div className="grid sm:grid-cols-2 gap-4 pt-4">
              <div className="glass-panel p-6 cad-corner-tl space-y-3">
                <GraduationCap className="h-5 w-5 text-gold" />
                <h3 className="font-display text-base font-bold uppercase text-stone-900 dark:text-white">
                  University of Ruhuna
                </h3>
                <p className="text-xs text-gold dark:text-accent-glow font-mono uppercase tracking-wider">
                  B.Sc. (Hons) Agri Business Management
                </p>
                <p className="text-xs text-stone-600 dark:text-slate-400 leading-relaxed">
                  Focusing on sustainable supply chain strategies and technology integration.
                </p>
              </div>

              <div className="glass-panel p-6 cad-corner-br space-y-3">
                <Award className="h-5 w-5 text-emerald-600 dark:text-emerald-400" />
                <h3 className="font-display text-base font-bold uppercase text-stone-900 dark:text-white">
                  CA Sri Lanka
                </h3>
                <p className="text-xs text-emerald-600 dark:text-emerald-400 font-mono uppercase tracking-wider">
                  Business Level Accountancy
                </p>
                <p className="text-xs text-stone-600 dark:text-slate-400 leading-relaxed">
                  Financial management, corporate law, business statistics, and auditing practices.
                </p>
              </div>
            </div>
          </div>

          {/* Right Image Container */}
          <div className="lg:col-span-5 relative">
            <div className="glass-panel p-4 cad-corner-tl cad-corner-br">
              <div className="relative aspect-4/5 overflow-hidden bg-stone-200 dark:bg-slate-950">
                <Image
                  src="https://images.unsplash.com/photo-1534447677768-be436bb09401?q=80&w=1200&auto=format&fit=crop"
                  alt="3D sculpted digital self-portrait of Pethum Kashmira"
                  fill
                  sizes="(max-width: 1024px) 100vw, 40vw"
                  className="object-cover opacity-90"
                />
                <div className="absolute bottom-4 left-4 right-4 bg-stone-900/90 dark:bg-slate-950/95 p-3 border border-white/10 font-mono text-[10px] text-stone-200 dark:text-slate-300 backdrop-blur-md">
                  <span className="text-gold dark:text-accent-glow uppercase block tracking-wider font-bold">Viewport · Final Shaded</span>
                  3D Digital Self-Portrait sculpted in Blender
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* 3D & Digital Toolkit Grid */}
        <section className="space-y-8 border-t border-stone-300 dark:border-white/10 pt-20">
          <div>
            <p className="font-mono text-[11px] uppercase tracking-[0.3em] text-gold dark:text-accent-glow">
              Engine &amp; Pipeline
            </p>
            <h2 className="font-display text-3xl sm:text-5xl font-black uppercase text-stone-900 dark:text-white tracking-tight mt-2">
              Studio Toolkit
            </h2>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-5 gap-4">
            {tools.map((tool) => (
              <div
                key={tool.name}
                className="glass-panel p-5 hover:border-gold/50 transition-all space-y-3"
              >
                <div className="flex items-center justify-between">
                  <Box className="h-4 w-4 text-gold" />
                  <span className="font-mono text-[9px] uppercase tracking-wider text-gold dark:text-accent-glow border border-gold/30 dark:border-accent-glow/30 px-1.5 py-0.5 bg-gold/5 dark:bg-accent-glow/5">
                    {tool.badge}
                  </span>
                </div>
                <h4 className="font-display text-base font-bold uppercase text-stone-900 dark:text-white">
                  {tool.name}
                </h4>
                <p className="font-mono text-[11px] text-stone-600 dark:text-slate-400 leading-snug">
                  {tool.role}
                </p>
              </div>
            ))}
          </div>
        </section>

        {/* Certifications Row */}
        <section className="border-t border-stone-300 dark:border-white/10 pt-20 space-y-8">
          <div>
            <p className="font-mono text-[11px] uppercase tracking-[0.3em] text-gold">
              Credentials &amp; Training
            </p>
            <h2 className="font-display text-3xl sm:text-5xl font-black uppercase text-stone-900 dark:text-white tracking-tight mt-2">
              Certifications
            </h2>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {certifications.map((cert) => (
              <div
                key={cert.title}
                className="glass-panel p-6 space-y-2 hover:border-gold/30 transition-all"
              >
                <Award className="h-4 w-4 text-gold dark:text-accent-glow" />
                <h4 className="font-display text-sm font-bold uppercase text-stone-900 dark:text-white pt-2">
                  {cert.title}
                </h4>
                <p className="font-mono text-[10px] text-stone-600 dark:text-slate-400 uppercase tracking-wider">
                  {cert.issuer} · {cert.year}
                </p>
              </div>
            ))}
          </div>
        </section>
      </div>
    </div>
  );
}
