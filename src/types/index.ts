export type ProjectCategory = 
  | 'Hard Surface'
  | 'Environment Design'
  | 'Character Sculpts'
  | 'Game Assets'
  | 'Abstract Art'
  | 'Visual Design';

export interface TechnicalSpecs {
  vertices: string;
  faces: string;
  renderEngine: string;
  renderSamples?: string;
  textureResolution: string;
  geometryType: 'Subdivision Quad' | 'Game-Ready Low Poly' | 'Procedural Geometry' | 'High-Poly Sculpt';
}

export interface Project {
  id: string;
  slug: string;
  title: string;
  subtitle: string;
  category: ProjectCategory;
  year: string;
  client?: string;
  role: string;
  featured: boolean;
  viewCount: number;
  description: string;
  challenge: string;
  concept: string;
  process: string;
  outcome: string;
  tools: string[];
  heroImage: string;
  wireframeImage?: string;
  clayImage?: string;
  galleryImages: string[];
  technicalSpecs: TechnicalSpecs;
  interactiveShader?: boolean;
  videoUrl?: string;
}

export interface Article {
  id: string;
  slug: string;
  title: string;
  excerpt: string;
  content: string;
  category: string;
  readTime: string;
  publishedDate: string;
  viewCount: number;
  coverImage: string;
  tags: string[];
}

export interface JourneyItem {
  id: string;
  period: string;
  title: string;
  institution: string;
  location: string;
  track: 'creative' | 'academic' | 'technical';
  description: string;
  highlights: string[];
  tags: string[];
}

export interface Venture {
  id: string;
  name: string;
  tagline: string;
  description: string;
  url: string;
  stats: { label: string; value: string }[];
  services: string[];
  badge: string;
}

export interface FiverrGig {
  id: string;
  title: string;
  category: string;
  price: string;
  turnaround: string;
  highlights: string[];
  link: string;
}

export interface PageVideos {
  home: string;
  work: string;
  ventures: string;
  fiverr: string;
  contact: string;
  about: string;
}

export interface VideoAsset {
  id: string;
  label: string;
  path: string;
  theme?: string;
  category?: 'reel' | 'showcase' | 'ambient' | 'tutorial' | 'product';
  description?: string;
}

export type WorkPreviewMode = 'hover-video' | 'video' | 'image' | 'none';

export interface SelectedWorkConfig {
  itemIds: string[];
  previewMode: WorkPreviewMode;
  itemPreviewModes?: Record<string, WorkPreviewMode>;
  showCategoryFilters: boolean;
  headline?: string;
  subheadline?: string;
}

export interface ThemeColorsConfig {
  preset: string;
  primaryAccent: string;
  secondaryAccent: string;
  bgPrimary: string;
  bgSecondary: string;
  textPrimary: string;
  textMuted: string;
  borderColor: string;
}

export interface SecuritySettings {
  enabled: boolean;
  disableRightClick: boolean;
  disableDevToolsShortcuts: boolean;
  disableDragAndDrop: boolean;
  videoDownloadShield: boolean;
  consoleWarning: boolean;
  watermarkText?: string;
}

export type SectionType = 
  | 'hero'
  | 'selected-work'
  | 'text-content'
  | 'media-grid'
  | 'features-list'
  | 'fiverr-gig'
  | 'ventures-showcase'
  | 'contact-form'
  | 'faq-accordion'
  | 'cta-banner'
  | 'about-bio'
  | 'about-hero'
  | 'about-systems'
  | 'about-stack'
  | 'journey-timeline'
  | 'journey-header'
  | 'journey-academic'
  | 'ventures-ecosystem'
  | 'ventures-header'
  | 'fiverr-hub'
  | 'fiverr-hero'
  | 'articles-preview'
  | 'articles-header'
  | 'work-header'
  | 'work-grid'
  | 'contact-header'
  | 'contact-channels';

export interface PageSection {
  id: string;
  type: SectionType | string;
  title: string;
  subtitle?: string;
  content?: string;
  mediaUrl?: string;
  enabled: boolean;
  order: number;
  config?: Record<string, any>;
}

export interface ManagedPage {
  id: string;
  title: string;
  slug: string;
  navLabel?: string;
  showInNav: boolean;
  description: string;
  videoUrl?: string;
  isStandard?: boolean;
  sections: PageSection[];
}

export type CustomPage = ManagedPage;

export interface SiteSettings {
  name: string;
  title: string;
  discipline: string;
  engine: string;
  location: string;
  coordinates: string;
  status: string;
  email: string;
  bio: string;
  pageVideos?: PageVideos;
  customVideos?: VideoAsset[];
  selectedWork?: SelectedWorkConfig;
  themeColors?: ThemeColorsConfig;
  security?: SecuritySettings;
  pageConfigs?: Record<string, ManagedPage>;
  customPages?: CustomPage[];
  socials: {
    artstation: string;
    cgtrader: string;
    behance: string;
    linkedin: string;
    github: string;
    tiktok: string;
    facebook: string;
  };
}
