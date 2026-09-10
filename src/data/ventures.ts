import { Venture, FiverrGig } from '@/types';

export const ORVEX_VENTURE: Venture = {
  id: 'orvex-cg',
  name: 'ORVEX Creative Studio',
  tagline: 'High-End 3D Visualization, Product CGI & Visual Production',
  description: 'Global creative studio specializing in photorealistic 3D visualization, product CGI, environment design, 3D modeling, motion design, and visual campaigns for brands worldwide.',
  url: 'https://orvexcg.site',
  badge: 'Commercial Studio',
  stats: [
    { label: 'Studio Specialization', value: '3D CGI & Motion' },
    { label: 'Client Delivery', value: 'Worldwide' },
    { label: 'Visual Precision', value: 'Sub-pixel CAD / 8K' },
    { label: 'Creative Direction', value: 'End-to-End' },
  ],
  services: [
    '3D Product Visualization & CGI',
    'Hard-Surface & Industrial Modeling',
    'Atmospheric Environment Design',
    'Commercial Motion Design & Virtual Sets',
    'High-End Brand Visual Campaigns',
  ],
};

export const FILXY_VENTURE: Venture = {
  id: 'filxy-store',
  name: 'Filxy Store',
  tagline: 'Premium Digital Subscriptions & Creative Assets Marketplace',
  description: 'A trusted digital marketplace founded and operated by Pethum Kashmira, offering verified digital subscriptions (ChatGPT Plus, YouTube Premium, Canva Pro, CapCut, Netflix, Spotify) at reseller rates with instant WhatsApp delivery.',
  url: 'https://filxy.store',
  badge: 'Digital Venture',
  stats: [
    { label: 'Happy Customers', value: '3,200+' },
    { label: 'Orders Delivered', value: '12,900+' },
    { label: 'Verified Rating', value: '4.8 ★' },
    { label: 'WhatsApp Delivery', value: 'Instant (<15m)' },
  ],
  services: [
    'AI & Productivity Tools (ChatGPT Plus, Claude, Gemini)',
    'Creative & Design Suites (Canva Pro, CapCut)',
    'Streaming Subscriptions (Netflix, YouTube Premium, Spotify)',
    '24/7 Dedicated Live Support & Replacement Warranty',
  ],
};

export const FIVERR_GIGS: FiverrGig[] = [
  {
    id: 'fiverr-product-animation',
    title: 'Realistic 3D Product Animation in Blender',
    category: '3D Product Animation & Motion',
    price: 'Starting at $100',
    turnaround: '4 Days',
    highlights: [
      'Professional 3D Product Animation in Blender',
      'High-Impact Motion for Brands & E-commerce',
      'Photorealistic Lighting & 4K 60fps Output',
    ],
    link: 'https://www.fiverr.com/s/jyvxXgv',
  },
  {
    id: 'fiverr-modeling-texturing',
    title: 'High-Quality 3D Modeling and Texturing in Blender',
    category: '3D Modeling & CAD',
    price: 'Starting at $50',
    turnaround: '2-3 Days',
    highlights: [
      'Subdivision Quad Topology & Precision Hard-Surface',
      'PBR 4K/8K Texture Maps & Micro-Surfacing',
      'Full Commercial Rights & Source Blender Files',
    ],
    link: 'https://www.fiverr.com/s/jyvxXgv',
  },
  {
    id: 'fiverr-cgi-motion',
    title: 'Commercial CGI Motion Visuals & Environment Sets',
    category: 'CGI & Motion Design',
    price: 'Starting at $150',
    turnaround: '3-5 Days',
    highlights: [
      'Dynamic Camera Sequences & Virtual Film Sets',
      'Blender Cycles & Eevee Next Production',
      'Sound Design Integration & Master Delivery',
    ],
    link: 'https://www.fiverr.com/s/X0RGdB0',
  },
];
