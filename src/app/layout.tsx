import type { Metadata, Viewport } from 'next';
import './globals.css';
import { ViewportHUD } from '@/components/layout/ViewportHUD';
import { Navigation } from '@/components/layout/Navigation';
import { Footer } from '@/components/layout/Footer';
import { CustomCursor } from '@/components/cursor/CustomCursor';
import { NoiseOverlay } from '@/components/ui/NoiseOverlay';
import { ThemeProvider } from '@/components/theme/ThemeProvider';

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 5,
  userScalable: true,
};

export const metadata: Metadata = {
  metadataBase: new URL('https://pethum.dev'),
  title: {
    default: 'Pethum Kashmira (Pathum Kashmira) — 3D Modeler & Visual Artist',
    template: '%s | Pethum Kashmira',
  },
  description:
    'Official portfolio of Pethum Kashmira: 3D modeler, visual artist, and founder of ORVEX Creative Studio & Filxy Store. Hard-surface modeling, environment design, and commercial CGI crafted in Blender.',
  keywords: [
    'Pethum Kashmira',
    'Pathum Kashmira',
    'ORVEX Creative Studio',
    'Filxy Store',
    '3D Modeler Sri Lanka',
    'Blender Visual Artist',
    'Hard Surface Modeling',
    'Cycles Product CGI',
    'Environment Design',
  ],
  authors: [{ name: 'Pethum Kashmira', url: 'https://pethum.dev' }],
  creator: 'Pethum Kashmira',
  publisher: 'ORVEX Creative Studio',
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: 'https://pethum.dev',
    siteName: 'Pethum Kashmira Studio',
    title: 'Pethum Kashmira (Pathum Kashmira) — 3D Modeler & Visual Artist',
    description:
      'Official 3D Portfolio of Pethum Kashmira. Hard-surface modeling, environment design, and 3D artifacts built in Blender.',
    images: [
      {
        url: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?q=80&w=1600&auto=format&fit=crop',
        width: 1600,
        height: 900,
        alt: 'Pethum Kashmira 3D Artwork',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Pethum Kashmira (Pathum Kashmira) — 3D Modeler & Visual Artist',
    description:
      'Official 3D Portfolio of Pethum Kashmira. Hard-surface modeling, environment design, and 3D artifacts built in Blender.',
    images: ['https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?q=80&w=1600&auto=format&fit=crop'],
  },
  icons: {
    icon: '/favicon.svg',
  },
};

import { DynamicThemeProvider } from '@/components/theme/DynamicThemeProvider';
import { SecurityShield } from '@/components/security/SecurityShield';
import { Analytics } from '@vercel/analytics/next';

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const jsonLd = {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'Person',
        '@id': 'https://pethum.dev/#person',
        name: 'Pethum Kashmira',
        alternateName: ['Pathum Kashmira', 'Kashmira 3D'],
        jobTitle: '3D Modeler & Visual Artist',
        description:
          '3D Modeler, Visual Artist and Creative Director working in Blender, founder of ORVEX Creative Studio and Filxy Store.',
        url: 'https://pethum.dev',
        image: 'https://pethum.dev/og-cover.jpg',
        knowsAbout: [
          '3D Modeling',
          'Blender',
          'Hard-surface modeling',
          'Environment design',
          'Commercial Product CGI',
          'Geometry Nodes',
          'Agribusiness Systems',
        ],
        sameAs: [
          'https://www.artstation.com/pethumkashmira',
          'https://www.cgtrader.com/pethumkashmira',
          'https://www.behance.net/pethumkashmira',
          'https://www.linkedin.com/in/pethum-kashmira',
          'https://github.com/pathumkashmira',
        ],
      },
      {
        '@type': 'WebSite',
        '@id': 'https://pethum.dev/#website',
        url: 'https://pethum.dev',
        name: 'Pethum Kashmira Portfolio',
        publisher: { '@id': 'https://pethum.dev/#person' },
      },
    ],
  };

  return (
    <html lang="en" className="dark" suppressHydrationWarning>
      <head>
        <script
          dangerouslySetInnerHTML={{
            __html: `(function() {
              try {
                var stored = localStorage.getItem('pk_theme');
                if (stored === 'light') {
                  document.documentElement.classList.add('light');
                  document.documentElement.classList.remove('dark');
                } else {
                  document.documentElement.classList.add('dark');
                  document.documentElement.classList.remove('light');
                }
              } catch (e) {}
            })();`,
          }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body className="min-h-screen antialiased">
        <ThemeProvider>
          <DynamicThemeProvider>
            <SecurityShield />
            <CustomCursor />
            <NoiseOverlay />
            <ViewportHUD />
            <Navigation />
            <main className="relative flex-1">{children}</main>
            <Footer />
          </DynamicThemeProvider>
        </ThemeProvider>
        <Analytics />
      </body>
    </html>
  );
}
