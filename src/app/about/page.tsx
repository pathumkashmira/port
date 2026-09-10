import React from 'react';
import { Metadata } from 'next';
import { AboutClient } from '@/components/about/AboutClient';

export const metadata: Metadata = {
  title: 'About the Artist & Dual Lens Philosophy | Pethum Kashmira',
  description: 'Learn about Pethum Kashmira: 3D modeler, visual artist, and founder. Agribusiness Management at University of Ruhuna, CA Sri Lanka, and technical Blender craft.',
};

export default function AboutPage() {
  return <AboutClient />;
}
