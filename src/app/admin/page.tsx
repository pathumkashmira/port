'use client';

import React, { useState, useRef } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { 
  Lock, 
  Unlock, 
  Plus, 
  Trash2, 
  Edit3, 
  Save, 
  RefreshCw, 
  ArrowLeft, 
  Sliders, 
  Layers, 
  FileText, 
  Calendar, 
  Check,
  Eye,
  EyeOff,
  AlertCircle,
  Video,
  Play,
  Film,
  Sparkles,
  HelpCircle,
  Upload,
  CheckCircle2,
  ExternalLink,
  Code2,
  FolderOpen,
  X,
  Palette,
  Shield,
  ShieldAlert,
  ShieldCheck,
  Download,
  FileJson,
  LayoutGrid,
  Settings,
  ArrowUp,
  ArrowDown,
  Globe
} from 'lucide-react';
import { useStudioStore } from '@/lib/store';
import { 
  Project, 
  Article, 
  JourneyItem, 
  SiteSettings, 
  ProjectCategory, 
  PageVideos, 
  VideoAsset,
  WorkPreviewMode,
  SelectedWorkConfig,
  ThemeColorsConfig,
  SecuritySettings,
  CustomPage,
  PageSection,
  SectionType,
  ManagedPage
} from '@/types';
import { 
  DEFAULT_PAGE_VIDEOS, 
  AVAILABLE_VIDEOS, 
  THEME_PRESETS,
  DEFAULT_THEME_COLORS,
  DEFAULT_SECURITY,
  DEFAULT_SELECTED_WORK,
  DEFAULT_STANDARD_PAGES
} from '@/data/siteConfig';

export default function AdminPage() {
  const [passcode, setPasscode] = useState('');
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [activeTab, setActiveTab] = useState<
    'overview' | 'colors' | 'selected-work' | 'pages' | 'videos' | 'projects' | 'articles' | 'security' | 'guide'
  >('overview');
  const [saveMessage, setSaveMessage] = useState('');

  const {
    projects,
    articles,
    journey,
    settings,
    updateProjects,
    addProject,
    editProject,
    deleteProject,
    updateArticles,
    addArticle,
    editArticle,
    deleteArticle,
    updateJourney,
    updateSettings,
    addCustomVideo,
    deleteCustomVideo,
    updateSelectedWork,
    updateThemeColors,
    updateSecuritySettings,
    addCustomPage,
    editCustomPage,
    deleteCustomPage,
    updatePageSection,
    togglePageSection,
    reorderPageSection,
    addSectionToPage,
    removeSectionFromPage,
    resetPageToDefault,
    updatePageMeta,
    exportPortfolioData,
    importPortfolioData,
    resetToDefaults,
  } = useStudioStore();

  // Unified Page & Section Management State
  const [selectedPageId, setSelectedPageId] = useState<string>('home');
  const [editingSectionId, setEditingSectionId] = useState<string | null>(null);
  const [editingSectionForm, setEditingSectionForm] = useState<Partial<PageSection> | null>(null);
  const [isAddingSection, setIsAddingSection] = useState(false);
  const [newSectionForm, setNewSectionForm] = useState<{
    type: string;
    title: string;
    subtitle: string;
    content: string;
    mediaUrl: string;
  }>({
    type: 'cta-banner',
    title: '',
    subtitle: '',
    content: '',
    mediaUrl: '',
  });
  const [showCreatePageModal, setShowCreatePageModal] = useState(false);

  // Combine built-in videos + user custom videos
  const allAvailableVideos: VideoAsset[] = [
    ...AVAILABLE_VIDEOS.map((v) => ({
      ...v,
      category: 'reel' as const,
      description: 'Built-in 3D studio render reel',
    })),
    ...(settings.customVideos || []),
  ];

  // Per-page video configuration state
  const [videoConfig, setVideoConfig] = useState<PageVideos>(
    settings.pageVideos || DEFAULT_PAGE_VIDEOS
  );

  React.useEffect(() => {
    if (settings.pageVideos) {
      setVideoConfig(settings.pageVideos);
    }
  }, [settings.pageVideos]);

  // Selected Work Form State
  const [selectedWorkForm, setSelectedWorkForm] = useState<SelectedWorkConfig>(
    settings.selectedWork || DEFAULT_SELECTED_WORK
  );

  React.useEffect(() => {
    if (settings.selectedWork) {
      setSelectedWorkForm(settings.selectedWork);
    }
  }, [settings.selectedWork]);

  // Theme Colors Form State
  const [themeColorsForm, setThemeColorsForm] = useState<ThemeColorsConfig>(
    settings.themeColors || DEFAULT_THEME_COLORS
  );

  React.useEffect(() => {
    if (settings.themeColors) {
      setThemeColorsForm(settings.themeColors);
    }
  }, [settings.themeColors]);

  // Security Settings Form State
  const [securityForm, setSecurityForm] = useState<SecuritySettings>(
    settings.security || DEFAULT_SECURITY
  );

  React.useEffect(() => {
    if (settings.security) {
      setSecurityForm(settings.security);
    }
  }, [settings.security]);

  // New Custom Video Form State
  const [newVideo, setNewVideo] = useState<{
    label: string;
    path: string;
    theme: string;
    category: 'reel' | 'showcase' | 'ambient' | 'tutorial' | 'product';
    description: string;
  }>({
    label: '',
    path: '',
    theme: 'cyan-gold',
    category: 'reel',
    description: '',
  });

  // Project Form States (Add & Edit)
  const projectFormRef = useRef<HTMLDivElement>(null);
  const [editingProject, setEditingProject] = useState<Project | null>(null);
  const [newProject, setNewProject] = useState<Partial<Project>>({
    title: '',
    slug: '',
    subtitle: 'High-Precision 3D Production',
    category: 'Hard Surface',
    year: '2026',
    role: '3D Modeler & Visual Artist',
    client: 'Studio Commercial / Portfolio',
    description: '',
    challenge: '',
    concept: '',
    process: '',
    outcome: '',
    tools: ['Blender 4.x', 'Cycles', 'Substance Painter'],
    heroImage: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?q=80&w=1200&auto=format&fit=crop',
    videoUrl: '/videos/orvex-reel.mp4',
    wireframeImage: 'https://images.unsplash.com/photo-1579546929518-9e396f3cc809?q=80&w=1200&auto=format&fit=crop',
    clayImage: 'https://images.unsplash.com/photo-1550684848-fac1c5b4e853?q=80&w=1200&auto=format&fit=crop',
    galleryImages: [],
    technicalSpecs: {
      vertices: '124,500',
      faces: '122,800',
      renderEngine: 'Cycles',
      renderSamples: '2048 samples',
      textureResolution: '4K PBR',
      geometryType: 'Subdivision Quad',
    },
    featured: true,
    viewCount: 1,
  });

  const [galleryInput, setGalleryInput] = useState<string>('');

  // Article Form States (Add & Edit)
  const articleFormRef = useRef<HTMLDivElement>(null);
  const [editingArticle, setEditingArticle] = useState<Article | null>(null);
  const [newArticle, setNewArticle] = useState<Partial<Article>>({
    title: '',
    slug: '',
    category: 'Educational',
    readTime: '5 min read',
    publishedDate: new Date().toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric' }),
    excerpt: '',
    content: '### Pipeline Optimization & Geometry Techniques\n\nWrite your technical case study or 3D educational guide here using Markdown.',
    coverImage: 'https://images.unsplash.com/photo-1555066931-4365d14bab8c?q=80&w=1200&auto=format&fit=crop',
    tags: ['Blender', 'Geometry Nodes', 'Topology'],
    viewCount: 1,
  });

  const [articleTagsInput, setArticleTagsInput] = useState('Blender, Cycles, 3D Workflow');

  // Custom Page Creator State
  const [newPage, setNewPage] = useState<Partial<CustomPage>>({
    title: '',
    slug: '',
    navLabel: '',
    showInNav: true,
    description: '',
    videoUrl: '/videos/orvex-reel.mp4',
    sections: [
      {
        id: 'sec-hero',
        type: 'hero',
        title: 'Welcome to Custom Page',
        subtitle: 'Production CGI Services',
        content: 'Custom crafted 3D experiences.',
        enabled: true,
        order: 1,
      },
      {
        id: 'sec-cta',
        type: 'cta-banner',
        title: 'Start A Project Inquiry',
        subtitle: 'Available for Select Commercial Commissions',
        enabled: true,
        order: 2,
      },
    ],
  });

  const [importJsonText, setImportJsonText] = useState('');

  // Flash save notification
  const flashNotice = (msg: string) => {
    setSaveMessage(msg);
    setTimeout(() => setSaveMessage(''), 3500);
  };

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (passcode === 'pk3d' || passcode === 'admin') {
      setIsAuthenticated(true);
    } else {
      alert('Access Denied: Invalid Master Studio Passcode.');
    }
  };

  // --- PROJECT ACTIONS ---
  const handleStartEditProject = (project: Project) => {
    setEditingProject({ ...project });
    setGalleryInput(project.galleryImages?.join('\n') || '');
    setActiveTab('projects');
    setTimeout(() => {
      projectFormRef.current?.scrollIntoView({ behavior: 'smooth' });
    }, 100);
  };

  const handleCancelEditProject = () => {
    setEditingProject(null);
    setGalleryInput('');
  };

  const handleSaveEditedProject = (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingProject) return;

    const galleryList = galleryInput
      .split('\n')
      .map((s) => s.trim())
      .filter((s) => s.length > 0);

    const updated: Project = {
      ...editingProject,
      galleryImages: galleryList,
    };

    editProject(updated);
    setEditingProject(null);
    setGalleryInput('');
    flashNotice(`Project "${updated.title}" updated successfully!`);
  };

  const handleCreateProject = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newProject.title) return;
    const slug = newProject.slug || newProject.title.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');
    
    const galleryList = galleryInput
      .split('\n')
      .map((s) => s.trim())
      .filter((s) => s.length > 0);

    const project: Project = {
      id: slug,
      slug,
      title: newProject.title,
      subtitle: newProject.subtitle || '3D Studio Asset',
      category: (newProject.category as ProjectCategory) || 'Hard Surface',
      year: newProject.year || '2026',
      role: newProject.role || '3D Modeler & Visual Artist',
      client: newProject.client || 'Commercial Client',
      featured: newProject.featured ?? true,
      viewCount: 1,
      description: newProject.description || 'Description of the asset.',
      challenge: newProject.challenge || 'Topology challenge notes.',
      concept: newProject.concept || 'Concept notes.',
      process: newProject.process || 'Pipeline workflow details.',
      outcome: newProject.outcome || 'Final renders delivered.',
      tools: Array.isArray(newProject.tools) ? newProject.tools : ['Blender 4.x', 'Cycles'],
      heroImage: newProject.heroImage || 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?q=80&w=1200&auto=format&fit=crop',
      videoUrl: newProject.videoUrl || undefined,
      wireframeImage: newProject.wireframeImage || undefined,
      clayImage: newProject.clayImage || undefined,
      galleryImages: galleryList.length > 0 ? galleryList : [newProject.heroImage || 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?q=80&w=1200&auto=format&fit=crop'],
      technicalSpecs: newProject.technicalSpecs || {
        vertices: '100,000',
        faces: '98,000',
        renderEngine: 'Cycles',
        renderSamples: '2048 samples',
        textureResolution: '4K PBR',
        geometryType: 'Subdivision Quad',
      },
    };

    addProject(project);
    flashNotice(`Project "${project.title}" published live to portfolio!`);
    
    setNewProject({
      title: '',
      slug: '',
      subtitle: 'High-Precision 3D Production',
      category: 'Hard Surface',
      year: '2026',
      role: '3D Modeler & Visual Artist',
      description: '',
      videoUrl: '/videos/orvex-reel.mp4',
      heroImage: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?q=80&w=1200&auto=format&fit=crop',
    });
    setGalleryInput('');
  };

  const handleDeleteProject = (id: string) => {
    const proj = projects.find((p) => p.id === id);
    if (confirm(`Are you sure you want to delete project "${proj?.title || id}" from the live portfolio?`)) {
      deleteProject(id);
      flashNotice('Project permanently removed.');
    }
  };

  // --- ARTICLE ACTIONS ---
  const handleStartEditArticle = (article: Article) => {
    setEditingArticle({ ...article });
    setArticleTagsInput(article.tags?.join(', ') || '');
    setActiveTab('articles');
    setTimeout(() => {
      articleFormRef.current?.scrollIntoView({ behavior: 'smooth' });
    }, 100);
  };

  const handleCancelEditArticle = () => {
    setEditingArticle(null);
    setArticleTagsInput('');
  };

  const handleSaveEditedArticle = (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingArticle) return;

    const tags = articleTagsInput
      .split(',')
      .map((t) => t.trim())
      .filter((t) => t.length > 0);

    const updated: Article = {
      ...editingArticle,
      tags: tags.length > 0 ? tags : ['Blender'],
    };

    editArticle(updated);
    setEditingArticle(null);
    flashNotice(`Article "${updated.title}" updated successfully!`);
  };

  const handleCreateArticle = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newArticle.title) return;
    const slug = newArticle.slug || newArticle.title.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');
    
    const tags = articleTagsInput
      .split(',')
      .map((t) => t.trim())
      .filter((t) => t.length > 0);

    const article: Article = {
      id: slug,
      slug,
      title: newArticle.title,
      category: newArticle.category || 'Educational',
      readTime: newArticle.readTime || '5 min read',
      publishedDate: newArticle.publishedDate || new Date().toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric' }),
      excerpt: newArticle.excerpt || 'Brief introduction to this technical guide.',
      content: newArticle.content || 'Detailed technical content.',
      coverImage: newArticle.coverImage || 'https://images.unsplash.com/photo-1555066931-4365d14bab8c?q=80&w=1200&auto=format&fit=crop',
      tags: tags.length > 0 ? tags : ['Blender', '3D Workflow'],
      viewCount: 1,
    };

    addArticle(article);
    flashNotice(`Article "${article.title}" published live to journal!`);
    
    setNewArticle({
      title: '',
      slug: '',
      category: 'Educational',
      readTime: '5 min read',
      excerpt: '',
      content: '### New Article\n\nWrite your guide content here...',
      coverImage: 'https://images.unsplash.com/photo-1555066931-4365d14bab8c?q=80&w=1200&auto=format&fit=crop',
    });
  };

  const handleDeleteArticle = (id: string) => {
    const art = articles.find((a) => a.id === id);
    if (confirm(`Are you sure you want to delete article "${art?.title || id}"?`)) {
      deleteArticle(id);
      flashNotice('Article deleted.');
    }
  };

  // --- CUSTOM PAGE ACTIONS ---
  const handleCreateCustomPage = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newPage.title || !newPage.slug) return;
    const cleanSlug = newPage.slug.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');

    const created: CustomPage = {
      id: cleanSlug,
      title: newPage.title,
      slug: cleanSlug,
      navLabel: newPage.navLabel || newPage.title,
      showInNav: newPage.showInNav ?? true,
      description: newPage.description || 'Custom Studio Section',
      videoUrl: newPage.videoUrl || '/videos/orvex-reel.mp4',
      sections: newPage.sections || [],
    };

    addCustomPage(created);
    flashNotice(`Custom page "/${cleanSlug}" created and active!`);
    setNewPage({
      title: '',
      slug: '',
      navLabel: '',
      showInNav: true,
      description: '',
      videoUrl: '/videos/orvex-reel.mp4',
      sections: [
        {
          id: 'sec-hero',
          type: 'hero',
          title: 'Welcome to Custom Page',
          subtitle: 'Production CGI Services',
          content: 'Custom crafted 3D experiences.',
          enabled: true,
          order: 1,
        },
      ],
    });
  };

  const handleDeleteCustomPage = (pageId: string) => {
    if (confirm('Delete this custom page?')) {
      deleteCustomPage(pageId);
      if (selectedPageId === pageId) {
        setSelectedPageId('home');
      }
      flashNotice('Custom page removed.');
    }
  };

  // Section Handlers for Current Selected Page
  const handleAddSectionToCurrentPage = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newSectionForm.title) {
      alert('Please enter a section title.');
      return;
    }

    const newSec: PageSection = {
      id: `sec-${Date.now().toString()}`,
      type: newSectionForm.type,
      title: newSectionForm.title,
      subtitle: newSectionForm.subtitle || undefined,
      content: newSectionForm.content || undefined,
      mediaUrl: newSectionForm.mediaUrl || undefined,
      enabled: true,
      order: 999,
    };

    addSectionToPage(selectedPageId, newSec);
    flashNotice(`Section "${newSec.title}" added to page!`);
    setIsAddingSection(false);
    setNewSectionForm({
      type: 'cta-banner',
      title: '',
      subtitle: '',
      content: '',
      mediaUrl: '',
    });
  };

  const handleSaveSectionEdit = (sectionId: string) => {
    if (!editingSectionForm) return;
    updatePageSection(selectedPageId, sectionId, editingSectionForm);
    flashNotice('Section updated successfully!');
    setEditingSectionId(null);
    setEditingSectionForm(null);
  };

  // --- BACKUP & RESTORE ACTIONS ---
  const handleDownloadBackup = () => {
    const jsonStr = exportPortfolioData();
    const blob = new Blob([jsonStr], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `pethum-portfolio-backup-${new Date().toISOString().slice(0, 10)}.json`;
    a.click();
    URL.revokeObjectURL(url);
    flashNotice('Portfolio JSON backup file generated and downloaded!');
  };

  const handleImportBackup = () => {
    if (!importJsonText) {
      alert('Please paste a valid JSON backup text first.');
      return;
    }
    const success = importPortfolioData(importJsonText);
    if (success) {
      flashNotice('Portfolio successfully restored from JSON backup!');
      setImportJsonText('');
    } else {
      alert('Invalid JSON format. Could not import data.');
    }
  };

  // --- VIDEO ACTIONS ---
  const handleAddCustomVideo = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newVideo.label || !newVideo.path) {
      alert('Please provide both video label and video file path/URL.');
      return;
    }
    const id = 'vid-' + Date.now().toString();
    const asset: VideoAsset = {
      id,
      label: newVideo.label,
      path: newVideo.path,
      theme: newVideo.theme || 'cyan-gold',
      category: newVideo.category || 'reel',
      description: newVideo.description || 'Custom added 3D video reel',
    };

    addCustomVideo(asset);
    flashNotice(`Video "${asset.label}" added to studio library!`);
    setNewVideo({
      label: '',
      path: '',
      theme: 'cyan-gold',
      category: 'reel',
      description: '',
    });
  };

  const handleDeleteCustomVideo = (id: string) => {
    if (confirm('Delete this custom video asset from the studio library?')) {
      deleteCustomVideo(id);
      flashNotice('Video asset deleted.');
    }
  };

  const handleQuickAssignVideo = (pageKey: keyof PageVideos, videoPath: string) => {
    const updated = {
      ...videoConfig,
      [pageKey]: videoPath,
    };
    setVideoConfig(updated);
    updateSettings({
      ...settings,
      pageVideos: updated,
    });
    flashNotice(`Assigned video to ${pageKey.toUpperCase()} page!`);
  };

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-[#07080A] flex items-center justify-center p-6">
        <div className="w-full max-w-md border border-white/15 bg-[#0B0D14] p-8 space-y-6 cad-corner-tl cad-corner-br shadow-[0_0_50px_rgba(0,0,0,0.8)]">
          <div className="flex items-center gap-3 border-b border-white/10 pb-4">
            <Lock className="h-5 w-5 text-gold" />
            <div>
              <h1 className="font-display text-lg font-bold uppercase text-white tracking-wider">
                Studio CMS Login
              </h1>
              <span className="font-mono text-[10px] text-white/40 uppercase tracking-widest">
                Pethum Kashmira Protected Route
              </span>
            </div>
          </div>

          <form onSubmit={handleLogin} className="space-y-4">
            <div className="space-y-2">
              <label className="font-mono text-[10px] uppercase tracking-widest text-white/60 block">
                Master Studio Passcode
              </label>
              <input
                type="password"
                required
                value={passcode}
                onChange={(e) => setPasscode(e.target.value)}
                placeholder="Enter Studio Master Passcode"
                className="w-full border border-white/15 bg-[#07080A] p-3 font-mono text-xs text-white placeholder:text-white/30 focus:border-gold outline-hidden"
              />
            </div>

            <button
              type="submit"
              className="w-full bg-gold py-3 font-mono text-xs uppercase tracking-widest text-[#07080A] font-bold hover:shadow-[0_0_20px_rgba(212,175,55,0.4)] transition-all cursor-pointer"
            >
              Access Studio Controls →
            </button>
          </form>

          <div className="border-t border-white/10 pt-4 flex items-center justify-between font-mono text-[10px] text-white/40">
            <Link href="/" className="hover:text-gold transition-colors">
              ← Return to Public Portfolio
            </Link>
            <span className="text-white/30 flex items-center gap-1.5">
              <span className="h-1.5 w-1.5 rounded-full bg-emerald-500" />
              <span>Studio Security Shield Active</span>
            </span>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#07080A] text-white pt-24 pb-36 px-5 sm:px-10">
      <div className="mx-auto max-w-7xl space-y-8">
        {/* Top Header Bar */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-white/10 pb-6">
          <div className="flex items-center gap-3">
            <span className="grid h-9 w-9 place-items-center border border-gold font-mono text-xs font-bold text-gold bg-gold/10">
              CMS
            </span>
            <div>
              <h1 className="font-display text-xl font-bold uppercase tracking-wider text-white">
                Studio Master Control Dashboard
              </h1>
              <p className="font-mono text-[10px] text-accent-glow uppercase tracking-widest">
                Real-Time Reactive Store Active · Theme &amp; Security Shield Online
              </p>
            </div>
          </div>

          <div className="flex items-center gap-4 font-mono text-xs">
            {saveMessage && (
              <span className="text-emerald-400 bg-emerald-400/10 border border-emerald-400/30 px-3 py-1 animate-in fade-in flex items-center gap-1.5">
                <Check className="h-3.5 w-3.5" />
                <span>{saveMessage}</span>
              </span>
            )}
            <Link
              href="/"
              target="_blank"
              className="inline-flex items-center gap-1.5 border border-white/20 px-3 py-1.5 hover:border-gold hover:text-gold transition-colors"
            >
              <Eye className="h-3.5 w-3.5" />
              <span>View Live Site</span>
            </Link>
            <button
              type="button"
              onClick={() => setIsAuthenticated(false)}
              className="text-white/50 hover:text-red-400 transition-colors cursor-pointer"
            >
              Lock
            </button>
          </div>
        </div>

        {/* Tab Navigation (Master Suite) */}
        <div className="flex flex-wrap gap-2 border-b border-white/10 pb-4">
          {[
            { id: 'overview', label: 'Master Dashboard', icon: Sliders },
            { id: 'colors', label: 'Color Theme Studio', icon: Palette },
            { id: 'selected-work', label: 'Selected Works & Previews', icon: LayoutGrid },
            { id: 'pages', label: `Pages & Sections (${(settings.customPages || []).length})`, icon: Globe },
            { id: 'videos', label: `Page Videos (${allAvailableVideos.length})`, icon: Video },
            { id: 'projects', label: `3D Projects (${projects.length})`, icon: Layers },
            { id: 'articles', label: `Articles (${articles.length})`, icon: FileText },
            { id: 'security', label: 'Security Shield', icon: Shield },
            { id: 'guide', label: 'Video Guide', icon: HelpCircle },
          ].map((tab) => {
            const Icon = tab.icon;
            return (
              <button
                key={tab.id}
                type="button"
                onClick={() => setActiveTab(tab.id as typeof activeTab)}
                className={`flex items-center gap-2 px-3.5 py-2 font-mono text-xs uppercase tracking-wider border transition-colors cursor-pointer ${
                  activeTab === tab.id
                    ? 'border-gold bg-gold/15 text-gold font-bold shadow-[0_0_15px_rgba(212,175,55,0.2)]'
                    : 'border-white/10 text-white/60 hover:border-white/30 hover:text-white'
                }`}
              >
                <Icon className="h-3.5 w-3.5" />
                <span>{tab.label}</span>
              </button>
            );
          })}
        </div>

        {/* TAB 1: MASTER DASHBOARD & BACKUP */}
        {activeTab === 'overview' && (
          <div className="space-y-8">
            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
              <div className="border border-white/10 bg-[#0B0D14] p-6 space-y-2">
                <span className="font-mono text-[10px] uppercase tracking-wider text-white/50 block">Live Artworks</span>
                <span className="font-display text-3xl font-bold text-gold block">{projects.length}</span>
                <span className="text-xs text-white/40 font-mono">Curated 3D Assets</span>
              </div>
              <div className="border border-white/10 bg-[#0B0D14] p-6 space-y-2">
                <span className="font-mono text-[10px] uppercase tracking-wider text-white/50 block">Selected Works Curated</span>
                <span className="font-display text-3xl font-bold text-emerald-400 block">
                  {selectedWorkForm.itemIds?.length || projects.length}
                </span>
                <span className="text-xs text-white/40 font-mono">Preview: {selectedWorkForm.previewMode}</span>
              </div>
              <div className="border border-white/10 bg-[#0B0D14] p-6 space-y-2">
                <span className="font-mono text-[10px] uppercase tracking-wider text-white/50 block">Active Theme Preset</span>
                <span className="font-display text-2xl font-bold text-cyan-400 block truncate">
                  {themeColorsForm.preset || 'Default Gold'}
                </span>
                <span className="text-xs text-white/40 font-mono">Dynamic CSS Variables Active</span>
              </div>
              <div className="border border-white/10 bg-[#0B0D14] p-6 space-y-2">
                <span className="font-mono text-[10px] uppercase tracking-wider text-white/50 block">Security Status</span>
                <span className="font-display text-2xl font-bold text-emerald-400 block flex items-center gap-2">
                  <ShieldCheck className="h-6 w-6" />
                  <span>{securityForm.enabled ? 'ACTIVE' : 'DISABLED'}</span>
                </span>
                <span className="text-xs text-white/40 font-mono">Right-click &amp; Inspect Locked</span>
              </div>
            </div>

            {/* Quick Navigation Cards */}
            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
              <div
                onClick={() => setActiveTab('colors')}
                className="border border-gold/30 bg-gold/5 p-5 space-y-2 cursor-pointer hover:border-gold transition-colors"
              >
                <div className="flex items-center gap-2 text-gold">
                  <Palette className="h-4 w-4" />
                  <span className="font-mono text-[10px] uppercase font-bold">Theme Studio</span>
                </div>
                <h4 className="font-display text-sm font-bold uppercase text-white">Full Web Colors</h4>
                <p className="text-xs text-slate-400 font-mono">Presets and custom hex pickers for site-wide styling.</p>
              </div>

              <div
                onClick={() => setActiveTab('selected-work')}
                className="border border-emerald-500/30 bg-emerald-500/5 p-5 space-y-2 cursor-pointer hover:border-emerald-400 transition-colors"
              >
                <div className="flex items-center gap-2 text-emerald-400">
                  <LayoutGrid className="h-4 w-4" />
                  <span className="font-mono text-[10px] uppercase font-bold">Homepage Gallery</span>
                </div>
                <h4 className="font-display text-sm font-bold uppercase text-white">Selected Works</h4>
                <p className="text-xs text-slate-400 font-mono">Choose projects &amp; set video/image/none preview modes.</p>
              </div>

              <div
                onClick={() => setActiveTab('pages')}
                className="border border-[#38BDF8]/30 bg-[#38BDF8]/5 p-5 space-y-2 cursor-pointer hover:border-[#38BDF8] transition-colors"
              >
                <div className="flex items-center gap-2 text-[#38BDF8]">
                  <Globe className="h-4 w-4" />
                  <span className="font-mono text-[10px] uppercase font-bold">Custom Pages</span>
                </div>
                <h4 className="font-display text-sm font-bold uppercase text-white">Page &amp; Section Builder</h4>
                <p className="text-xs text-slate-400 font-mono">Add new routes and compose modular sections.</p>
              </div>

              <div
                onClick={() => setActiveTab('security')}
                className="border border-purple-500/30 bg-purple-500/5 p-5 space-y-2 cursor-pointer hover:border-purple-400 transition-colors"
              >
                <div className="flex items-center gap-2 text-purple-400">
                  <Shield className="h-4 w-4" />
                  <span className="font-mono text-[10px] uppercase font-bold">Anti-Theft</span>
                </div>
                <h4 className="font-display text-sm font-bold uppercase text-white">Asset Security Shield</h4>
                <p className="text-xs text-slate-400 font-mono">Block inspection, right-click, and media drag downloads.</p>
              </div>
            </div>

            {/* 1-Click JSON Backup Export & Restore */}
            <div className="border border-white/15 bg-[#0B0D14] p-8 space-y-6 cad-corner-tl">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-white/10 pb-4">
                <div>
                  <div className="inline-flex items-center gap-2 font-mono text-[10px] uppercase tracking-[0.24em] text-gold mb-1">
                    <FileJson className="h-3.5 w-3.5" />
                    <span>Data Sovereignty &amp; Cloud Backup</span>
                  </div>
                  <h3 className="font-display text-xl font-bold uppercase text-white">
                    1-Click Portfolio JSON Backup &amp; Restore
                  </h3>
                </div>

                <button
                  type="button"
                  onClick={handleDownloadBackup}
                  className="inline-flex items-center gap-2 bg-gold px-5 py-2.5 font-mono text-xs uppercase text-[#07080A] font-bold hover:shadow-[0_0_20px_rgba(212,175,55,0.4)] transition-all cursor-pointer"
                >
                  <Download className="h-4 w-4" />
                  <span>Download Full JSON Backup</span>
                </button>
              </div>

              <div className="grid md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label className="font-mono text-xs uppercase text-white/60 block">
                    Restore Portfolio from JSON Backup
                  </label>
                  <textarea
                    rows={4}
                    value={importJsonText}
                    onChange={(e) => setImportJsonText(e.target.value)}
                    placeholder="Paste full JSON backup content here..."
                    className="w-full border border-white/15 bg-[#07080A] p-3 font-mono text-xs text-white focus:border-gold outline-hidden"
                  />
                  <button
                    type="button"
                    onClick={handleImportBackup}
                    className="inline-flex items-center gap-2 border border-emerald-500/40 bg-emerald-500/10 text-emerald-400 px-4 py-2 font-mono text-xs uppercase hover:bg-emerald-500/20 transition-all cursor-pointer"
                  >
                    <Upload className="h-3.5 w-3.5" />
                    <span>Restore From Pasted JSON</span>
                  </button>
                </div>

                <div className="space-y-3 font-mono text-xs text-white/50 border-l border-white/10 pl-6 flex flex-col justify-center">
                  <p className="leading-relaxed">
                    The JSON backup contains every single 3D project, technical article, journey milestone, page video configuration, custom page, theme color set, and security setting.
                  </p>
                  <p className="text-white/40">
                    Keep a copy of your JSON backup on Google Drive, GitHub, or locally.
                  </p>
                </div>
              </div>

              <div className="pt-4 border-t border-white/10 flex items-center justify-between">
                <button
                  type="button"
                  onClick={() => {
                    if (confirm('Reset all portfolio projects, articles, and journey to verified original state?')) {
                      resetToDefaults();
                      flashNotice('Data restored to authentic seed states.');
                    }
                  }}
                  className="inline-flex items-center gap-2 border border-red-500/40 px-4 py-2 font-mono text-xs uppercase tracking-wider text-red-400 hover:bg-red-500/10 transition-colors cursor-pointer"
                >
                  <RefreshCw className="h-3.5 w-3.5" />
                  <span>Reset Store to Default Records</span>
                </button>
                <span className="font-mono text-[10px] text-white/40">Real-Time Reactive Store</span>
              </div>
            </div>
          </div>
        )}

        {/* TAB 2: FULL WEB COLOR THEME STUDIO */}
        {activeTab === 'colors' && (
          <div className="space-y-8">
            <div className="border border-white/15 bg-[#0B0D14] p-8 space-y-4 cad-corner-tl">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-white/10 pb-4">
                <div>
                  <div className="inline-flex items-center gap-2 font-mono text-[10px] uppercase tracking-[0.24em] text-gold mb-1">
                    <Palette className="h-3.5 w-3.5" />
                    <span>Dynamic Palette Engine</span>
                  </div>
                  <h3 className="font-display text-2xl font-black uppercase text-white">
                    Full Web Color Management Studio
                  </h3>
                </div>
              </div>
              <p className="text-xs text-slate-300 font-mono max-w-3xl leading-relaxed">
                Transform the entire color mood of your website. Selecting a preset or entering custom hex colors automatically modifies the CSS variables across borders, glowing text, backgrounds, and action buttons in real time without refreshing.
              </p>
            </div>

            {/* Presets Grid */}
            <div className="space-y-4">
              <span className="font-mono text-xs uppercase tracking-wider text-white/60 block">
                1-Click Curated Theme Presets ({THEME_PRESETS.length})
              </span>
              <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
                {THEME_PRESETS.map((p) => {
                  const isSelected = themeColorsForm.preset === p.id;
                  return (
                    <div
                      key={p.id}
                      onClick={() => {
                        setThemeColorsForm({ ...p.colors });
                        updateThemeColors(p.colors);
                        flashNotice(`Theme "${p.name}" applied!`);
                      }}
                      className={`border p-5 space-y-3 cursor-pointer transition-all ${
                        isSelected
                          ? 'border-gold bg-gold/10 shadow-[0_0_25px_rgba(212,175,55,0.3)]'
                          : 'border-white/10 bg-[#07090F] hover:border-white/30'
                      }`}
                    >
                      <div className="flex items-center justify-between">
                        <span className="font-display text-sm font-bold uppercase text-white">{p.name}</span>
                        {isSelected && (
                          <span className="bg-gold text-[#07080A] px-2 py-0.5 font-mono text-[9px] font-bold uppercase">
                            Active
                          </span>
                        )}
                      </div>
                      <p className="font-mono text-[10px] text-slate-400 leading-snug">{p.description}</p>
                      <div className="flex items-center gap-2 pt-2 border-t border-white/10">
                        <span className="h-5 w-5 rounded-full border border-white/20" style={{ backgroundColor: p.colors.primaryAccent }} title="Primary Accent" />
                        <span className="h-5 w-5 rounded-full border border-white/20" style={{ backgroundColor: p.colors.secondaryAccent }} title="Secondary Glow" />
                        <span className="h-5 w-5 rounded-full border border-white/20" style={{ backgroundColor: p.colors.bgPrimary }} title="Background Primary" />
                        <span className="h-5 w-5 rounded-full border border-white/20" style={{ backgroundColor: p.colors.textPrimary }} title="Text Primary" />
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Granular Custom Color Pickers */}
            <form
              onSubmit={(e) => {
                e.preventDefault();
                updateThemeColors({
                  ...themeColorsForm,
                  preset: 'custom',
                });
                flashNotice('Custom color theme applied live site-wide!');
              }}
              className="border border-white/15 bg-[#0B0D14] p-8 space-y-6"
            >
              <div className="border-b border-white/10 pb-3">
                <h4 className="font-display text-lg font-bold uppercase text-white">
                  Fine-Grained Color Customization
                </h4>
                <p className="font-mono text-xs text-white/50">
                  Pick any custom hex colors to tailor your studio&apos;s identity.
                </p>
              </div>

              <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
                <div className="space-y-2">
                  <label className="font-mono text-xs uppercase text-white/70 block">
                    Primary Accent Color
                  </label>
                  <div className="flex items-center gap-3">
                    <input
                      type="color"
                      value={themeColorsForm.primaryAccent}
                      onChange={(e) => setThemeColorsForm({ ...themeColorsForm, primaryAccent: e.target.value })}
                      className="h-9 w-12 bg-transparent cursor-pointer border border-white/20"
                    />
                    <input
                      type="text"
                      value={themeColorsForm.primaryAccent}
                      onChange={(e) => setThemeColorsForm({ ...themeColorsForm, primaryAccent: e.target.value })}
                      className="w-full border border-white/15 bg-[#07080A] p-2 font-mono text-xs text-white uppercase focus:border-gold outline-hidden"
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <label className="font-mono text-xs uppercase text-white/70 block">
                    Secondary Glow Accent
                  </label>
                  <div className="flex items-center gap-3">
                    <input
                      type="color"
                      value={themeColorsForm.secondaryAccent}
                      onChange={(e) => setThemeColorsForm({ ...themeColorsForm, secondaryAccent: e.target.value })}
                      className="h-9 w-12 bg-transparent cursor-pointer border border-white/20"
                    />
                    <input
                      type="text"
                      value={themeColorsForm.secondaryAccent}
                      onChange={(e) => setThemeColorsForm({ ...themeColorsForm, secondaryAccent: e.target.value })}
                      className="w-full border border-white/15 bg-[#07080A] p-2 font-mono text-xs text-white uppercase focus:border-gold outline-hidden"
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <label className="font-mono text-xs uppercase text-white/70 block">
                    Dark Background Tone
                  </label>
                  <div className="flex items-center gap-3">
                    <input
                      type="color"
                      value={themeColorsForm.bgPrimary}
                      onChange={(e) => setThemeColorsForm({ ...themeColorsForm, bgPrimary: e.target.value })}
                      className="h-9 w-12 bg-transparent cursor-pointer border border-white/20"
                    />
                    <input
                      type="text"
                      value={themeColorsForm.bgPrimary}
                      onChange={(e) => setThemeColorsForm({ ...themeColorsForm, bgPrimary: e.target.value })}
                      className="w-full border border-white/15 bg-[#07080A] p-2 font-mono text-xs text-white uppercase focus:border-gold outline-hidden"
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <label className="font-mono text-xs uppercase text-white/70 block">
                    Primary Text Color
                  </label>
                  <div className="flex items-center gap-3">
                    <input
                      type="color"
                      value={themeColorsForm.textPrimary}
                      onChange={(e) => setThemeColorsForm({ ...themeColorsForm, textPrimary: e.target.value })}
                      className="h-9 w-12 bg-transparent cursor-pointer border border-white/20"
                    />
                    <input
                      type="text"
                      value={themeColorsForm.textPrimary}
                      onChange={(e) => setThemeColorsForm({ ...themeColorsForm, textPrimary: e.target.value })}
                      className="w-full border border-white/15 bg-[#07080A] p-2 font-mono text-xs text-white uppercase focus:border-gold outline-hidden"
                    />
                  </div>
                </div>
              </div>

              {/* Live Preview Card */}
              <div 
                className="p-6 border rounded space-y-3"
                style={{ 
                  backgroundColor: themeColorsForm.bgPrimary, 
                  borderColor: themeColorsForm.primaryAccent,
                  color: themeColorsForm.textPrimary 
                }}
              >
                <div className="flex items-center justify-between">
                  <span className="font-mono text-[10px] uppercase font-bold" style={{ color: themeColorsForm.primaryAccent }}>
                    Live Preview Swatch
                  </span>
                  <span className="px-2 py-0.5 text-[9px] font-mono uppercase" style={{ border: `1px solid ${themeColorsForm.secondaryAccent}`, color: themeColorsForm.secondaryAccent }}>
                    Glow Accent
                  </span>
                </div>
                <h4 className="font-display text-xl font-bold uppercase">
                  Pethum Kashmira 3D Studio
                </h4>
                <p className="font-mono text-xs leading-relaxed" style={{ color: themeColorsForm.textMuted }}>
                  Hard-surface modeling, Cycles photorealism, and Geometry Nodes systems.
                </p>
                <button
                  type="button"
                  className="px-4 py-2 font-mono text-xs uppercase font-bold"
                  style={{ backgroundColor: themeColorsForm.primaryAccent, color: '#07080A' }}
                >
                  Action Button Preview
                </button>
              </div>

              <button
                type="submit"
                className="inline-flex items-center gap-2 bg-gold px-8 py-3.5 font-mono text-xs uppercase tracking-wider text-[#07080A] font-bold hover:shadow-[0_0_20px_rgba(212,175,55,0.4)] transition-all cursor-pointer"
              >
                <Save className="h-4 w-4" />
                <span>Save &amp; Apply Custom Colors Site-Wide</span>
              </button>
            </form>
          </div>
        )}

        {/* TAB 3: SELECTED WORKS PREVIEWS & CURATION */}
        {activeTab === 'selected-work' && (
          <div className="space-y-8">
            <div className="border border-white/15 bg-[#0B0D14] p-8 space-y-4 cad-corner-tl">
              <div className="flex items-center gap-3 border-b border-white/10 pb-4">
                <LayoutGrid className="h-5 w-5 text-emerald-400" />
                <div>
                  <h3 className="font-display text-2xl font-black uppercase text-white">
                    Selected Works Preview &amp; Homepage Showcase Manager
                  </h3>
                  <p className="font-mono text-xs text-white/50">
                    Choose which projects appear in &quot;Selected Works&quot;, customize preview modes (video/image/none), and reorder them.
                  </p>
                </div>
              </div>
            </div>

            <form
              onSubmit={(e) => {
                e.preventDefault();
                updateSelectedWork(selectedWorkForm);
                flashNotice('Selected Works settings saved live!');
              }}
              className="border border-white/15 bg-[#0B0D14] p-8 space-y-8"
            >
              {/* Global Preview Mode Setting */}
              <div className="border-b border-white/10 pb-6 space-y-4">
                <div className="flex items-center justify-between">
                  <h4 className="font-display text-base font-bold uppercase text-white">
                    Global Preview Mode for Selected Works
                  </h4>
                  <span className="font-mono text-xs text-gold uppercase">Configured</span>
                </div>

                <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
                  {[
                    {
                      id: 'hover-video' as WorkPreviewMode,
                      title: 'Hover-Video (Recommended)',
                      desc: 'Shows high-res render image by default; plays motion video loop smoothly when cursor hovers.',
                    },
                    {
                      id: 'video' as WorkPreviewMode,
                      title: 'Continuous Autoplay Video',
                      desc: 'Autoplays video reels continuously without needing user hover.',
                    },
                    {
                      id: 'image' as WorkPreviewMode,
                      title: 'High-Res Image Only',
                      desc: 'Displays the static hero render without video streaming on the cards.',
                    },
                    {
                      id: 'none' as WorkPreviewMode,
                      title: 'Minimal / No Media',
                      desc: 'Clean editorial typographic cards showing project titles, specs, and case study links.',
                    },
                  ].map((mode) => {
                    const isSelected = selectedWorkForm.previewMode === mode.id;
                    return (
                      <div
                        key={mode.id}
                        onClick={() => setSelectedWorkForm({ ...selectedWorkForm, previewMode: mode.id })}
                        className={`border p-4 space-y-2 cursor-pointer transition-all ${
                          isSelected
                            ? 'border-gold bg-gold/15 text-white shadow-[0_0_20px_rgba(212,175,55,0.25)]'
                            : 'border-white/10 bg-[#07090F] text-slate-300 hover:border-white/30'
                        }`}
                      >
                        <div className="flex items-center justify-between">
                          <span className="font-display text-sm font-bold uppercase">{mode.title}</span>
                          {isSelected && <Check className="h-4 w-4 text-gold" />}
                        </div>
                        <p className="font-mono text-[10px] text-white/50 leading-relaxed">{mode.desc}</p>
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* Headline Customizer */}
              <div className="grid sm:grid-cols-2 gap-4 border-b border-white/10 pb-6">
                <div className="space-y-1">
                  <label className="font-mono text-[10px] uppercase text-white/60 block">Section Headline</label>
                  <input
                    type="text"
                    value={selectedWorkForm.headline || ''}
                    onChange={(e) => setSelectedWorkForm({ ...selectedWorkForm, headline: e.target.value })}
                    placeholder="Selected 3D Works"
                    className="w-full border border-white/15 bg-[#07080A] p-2.5 font-mono text-xs text-white focus:border-gold outline-hidden"
                  />
                </div>
                <div className="space-y-1">
                  <label className="font-mono text-[10px] uppercase text-white/60 block">Section Subheadline</label>
                  <input
                    type="text"
                    value={selectedWorkForm.subheadline || ''}
                    onChange={(e) => setSelectedWorkForm({ ...selectedWorkForm, subheadline: e.target.value })}
                    placeholder="Hard-surface assets, commercial product animations..."
                    className="w-full border border-white/15 bg-[#07080A] p-2.5 font-mono text-xs text-white focus:border-gold outline-hidden"
                  />
                </div>
              </div>

              {/* Project Selection & Per-Item Preview Mode Matrix */}
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <span className="font-mono text-xs uppercase tracking-wider text-white/70">
                    Curate Projects in Selected Works ({selectedWorkForm.itemIds?.length || 0} selected)
                  </span>
                  <button
                    type="button"
                    onClick={() => setSelectedWorkForm({ ...selectedWorkForm, itemIds: projects.map((p) => p.id) })}
                    className="text-xs font-mono text-gold underline cursor-pointer"
                  >
                    Select All ({projects.length})
                  </button>
                </div>

                <div className="divide-y divide-white/5 border border-white/10 bg-[#07090F]">
                  {projects.map((p, idx) => {
                    const isChecked = selectedWorkForm.itemIds?.includes(p.id);
                    const itemMode = selectedWorkForm.itemPreviewModes?.[p.id] || selectedWorkForm.previewMode;

                    return (
                      <div key={p.id} className="p-4 flex flex-col sm:flex-row sm:items-center justify-between gap-4 hover:bg-white/5">
                        <div className="flex items-center gap-3">
                          <input
                            type="checkbox"
                            checked={isChecked}
                            onChange={(e) => {
                              const current = selectedWorkForm.itemIds || [];
                              const updated = e.target.checked
                                ? [...current, p.id]
                                : current.filter((id) => id !== p.id);
                              setSelectedWorkForm({ ...selectedWorkForm, itemIds: updated });
                            }}
                            className="h-4 w-4 accent-gold"
                          />
                          <div className="relative h-10 w-16 bg-black rounded overflow-hidden shrink-0 border border-white/10">
                            <Image src={p.heroImage} alt={p.title} fill className="object-cover" />
                          </div>
                          <div>
                            <h5 className="font-display text-sm font-bold uppercase text-white">{p.title}</h5>
                            <span className="font-mono text-[10px] text-white/40">{p.category} · {p.year}</span>
                          </div>
                        </div>

                        <div className="flex items-center gap-4">
                          {p.videoUrl ? (
                            <span className="font-mono text-[10px] text-emerald-400 bg-emerald-500/10 px-2 py-0.5 border border-emerald-500/30">
                              🎬 Video Reel Attached
                            </span>
                          ) : (
                            <span className="font-mono text-[10px] text-white/40">
                              Image Only
                            </span>
                          )}

                          <div className="flex items-center gap-2">
                            <label className="font-mono text-[9px] uppercase text-white/40">Preview:</label>
                            <select
                              value={itemMode}
                              onChange={(e) => {
                                const val = e.target.value as WorkPreviewMode;
                                setSelectedWorkForm({
                                  ...selectedWorkForm,
                                  itemPreviewModes: {
                                    ...(selectedWorkForm.itemPreviewModes || {}),
                                    [p.id]: val,
                                  },
                                });
                              }}
                              className="border border-white/20 bg-[#0B0D14] p-1.5 font-mono text-[10px] text-white focus:border-gold outline-hidden"
                            >
                              <option value="hover-video">Hover Video</option>
                              <option value="video">Autoplay Video</option>
                              <option value="image">Image Only</option>
                              <option value="none">No Preview (Minimal)</option>
                            </select>
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>

              <button
                type="submit"
                className="inline-flex items-center gap-2 bg-gold px-8 py-3.5 font-mono text-xs uppercase tracking-wider text-[#07080A] font-bold hover:shadow-[0_0_20px_rgba(212,175,55,0.4)] transition-all cursor-pointer"
              >
                <Save className="h-4 w-4" />
                <span>Save Selected Works &amp; Preview Modes</span>
              </button>
            </form>
          </div>
        )}

        {/* TAB 4: PAGES & SECTION BUILDER */}
        {activeTab === 'pages' && (() => {
          const allPageConfigs: Record<string, ManagedPage> = {
            ...DEFAULT_STANDARD_PAGES,
            ...(settings.pageConfigs || {}),
          };

          const standardPagesList: ManagedPage[] = Object.values(DEFAULT_STANDARD_PAGES).map((sp) => {
            return allPageConfigs[sp.id] || sp;
          });

          const customPagesList: ManagedPage[] = (settings.customPages || []).map((cp) => {
            return allPageConfigs[cp.id] || cp;
          });

          const activeManagedPage: ManagedPage = allPageConfigs[selectedPageId] || standardPagesList[0];
          const activeSections: PageSection[] = [...(activeManagedPage.sections || [])].sort((a, b) => a.order - b.order);

          const getSectionTypeColor = (type: string) => {
            switch (type) {
              case 'hero':
                return 'border-[#00F2FE]/40 bg-[#00F2FE]/10 text-[#38BDF8]';
              case 'selected-work':
              case 'work-grid':
                return 'border-gold/40 bg-gold/10 text-gold';
              case 'fiverr-hub':
              case 'fiverr-hero':
              case 'fiverr-gig':
                return 'border-emerald-500/40 bg-emerald-500/10 text-emerald-400';
              case 'ventures-ecosystem':
              case 'ventures-header':
                return 'border-purple-500/40 bg-purple-500/10 text-purple-300';
              case 'about-bio':
              case 'about-hero':
              case 'about-systems':
              case 'about-stack':
                return 'border-amber-500/40 bg-amber-500/10 text-amber-300';
              case 'journey-timeline':
              case 'journey-header':
                return 'border-blue-500/40 bg-blue-500/10 text-blue-300';
              case 'articles-preview':
              case 'articles-header':
                return 'border-teal-500/40 bg-teal-500/10 text-teal-300';
              case 'cta-banner':
                return 'border-rose-500/40 bg-rose-500/10 text-rose-300';
              case 'features-list':
                return 'border-indigo-500/40 bg-indigo-500/10 text-indigo-300';
              case 'text-content':
                return 'border-stone-400/40 bg-stone-400/10 text-stone-300';
              default:
                return 'border-white/20 bg-white/5 text-white/70';
            }
          };

          return (
            <div className="space-y-10">
              {/* Header Box */}
              <div className="border border-white/15 bg-[#0B0D14] p-8 space-y-4 cad-corner-tl">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-white/10 pb-4">
                  <div className="flex items-center gap-3">
                    <Globe className="h-6 w-6 text-[#38BDF8]" />
                    <div>
                      <h3 className="font-display text-2xl font-black uppercase text-white">
                        Site Pages &amp; Section Architecture Suite
                      </h3>
                      <p className="font-mono text-xs text-[#38BDF8] uppercase tracking-widest">
                        Full Modular Management: Add, Reorder, Edit &amp; Toggle Sections for Any Page
                      </p>
                    </div>
                  </div>

                  <button
                    type="button"
                    onClick={() => setShowCreatePageModal(!showCreatePageModal)}
                    className="inline-flex items-center gap-2 bg-gradient-to-r from-emerald-600 to-teal-600 px-5 py-2.5 font-mono text-xs uppercase tracking-wider text-white font-bold hover:from-emerald-500 hover:to-teal-500 transition-all cursor-pointer shadow-[0_0_20px_rgba(16,185,129,0.3)]"
                  >
                    <Plus className="h-4 w-4" />
                    <span>{showCreatePageModal ? 'Close Form' : 'Create Dynamic Page'}</span>
                  </button>
                </div>
                <p className="text-xs text-slate-300 font-mono leading-relaxed">
                  Manage the layout, order, and visibility of sections across your <strong>entire portfolio</strong>. Select a built-in page below (Home, About, Work, Journey, Ventures, Fiverr, Articles, Contact) or any custom dynamic page to customize its modular sections in real-time.
                </p>
              </div>

              {/* Optional Create Dynamic Page Modal/Drawer */}
              {showCreatePageModal && (
                <form onSubmit={handleCreateCustomPage} className="border border-emerald-500/40 bg-[#0B0D14] p-8 space-y-6 cad-corner-tl">
                  <div className="border-b border-white/10 pb-4 flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <Plus className="h-4 w-4 text-emerald-400" />
                      <h4 className="font-display text-lg font-bold uppercase text-white">
                        Create New Dynamic Route / Page
                      </h4>
                    </div>
                    <span className="font-mono text-[10px] text-emerald-400 uppercase tracking-wider">
                      Next.js Dynamic Route
                    </span>
                  </div>

                  <div className="grid sm:grid-cols-3 gap-4">
                    <div className="space-y-1">
                      <label className="font-mono text-[10px] uppercase text-white/60 block">Page Title *</label>
                      <input
                        type="text"
                        required
                        value={newPage.title || ''}
                        onChange={(e) => setNewPage({ ...newPage, title: e.target.value })}
                        placeholder="e.g. Commercial 3D Services"
                        className="w-full border border-white/15 bg-[#07080A] p-2.5 font-mono text-xs text-white focus:border-gold outline-hidden"
                      />
                    </div>

                    <div className="space-y-1">
                      <label className="font-mono text-[10px] uppercase text-white/60 block">URL Slug * (e.g. services)</label>
                      <input
                        type="text"
                        required
                        value={newPage.slug || ''}
                        onChange={(e) => setNewPage({ ...newPage, slug: e.target.value })}
                        placeholder="services"
                        className="w-full border border-white/15 bg-[#07080A] p-2.5 font-mono text-xs text-white focus:border-gold outline-hidden"
                      />
                    </div>

                    <div className="space-y-1">
                      <label className="font-mono text-[10px] uppercase text-white/60 block">Header Nav Label</label>
                      <input
                        type="text"
                        value={newPage.navLabel || ''}
                        onChange={(e) => setNewPage({ ...newPage, navLabel: e.target.value })}
                        placeholder="Services"
                        className="w-full border border-white/15 bg-[#07080A] p-2.5 font-mono text-xs text-white focus:border-gold outline-hidden"
                      />
                    </div>
                  </div>

                  <div className="grid sm:grid-cols-2 gap-4">
                    <div className="space-y-1">
                      <label className="font-mono text-[10px] uppercase text-white/60 block">Page Background Video</label>
                      <select
                        value={newPage.videoUrl || ''}
                        onChange={(e) => setNewPage({ ...newPage, videoUrl: e.target.value })}
                        className="w-full border border-white/20 bg-[#07080A] p-2.5 font-mono text-xs text-white focus:border-gold outline-hidden"
                      >
                        {allAvailableVideos.map((v) => (
                          <option key={v.id} value={v.path}>{v.label} ({v.path})</option>
                        ))}
                      </select>
                    </div>

                    <div className="space-y-1 flex flex-col justify-end">
                      <label className="inline-flex items-center gap-2 font-mono text-xs text-white cursor-pointer select-none">
                        <input
                          type="checkbox"
                          checked={newPage.showInNav ?? true}
                          onChange={(e) => setNewPage({ ...newPage, showInNav: e.target.checked })}
                          className="h-4 w-4 accent-gold"
                        />
                        <span>Show in Header Navigation Bar</span>
                      </label>
                    </div>
                  </div>

                  <div className="space-y-1">
                    <label className="font-mono text-[10px] uppercase text-white/60 block">Meta Description</label>
                    <textarea
                      rows={2}
                      value={newPage.description || ''}
                      onChange={(e) => setNewPage({ ...newPage, description: e.target.value })}
                      placeholder="Brief overview of this page..."
                      className="w-full border border-white/15 bg-[#07080A] p-2.5 font-mono text-xs text-white focus:border-gold outline-hidden resize-none"
                    />
                  </div>

                  <div className="flex items-center gap-3">
                    <button
                      type="submit"
                      className="inline-flex items-center gap-2 bg-gradient-to-r from-emerald-600 to-teal-600 px-6 py-3 font-mono text-xs uppercase tracking-wider text-white font-bold hover:from-emerald-500 hover:to-teal-500 transition-all cursor-pointer shadow-[0_0_20px_rgba(16,185,129,0.3)]"
                    >
                      <Plus className="h-4 w-4" />
                      <span>Create &amp; Manage Page</span>
                    </button>
                    <button
                      type="button"
                      onClick={() => setShowCreatePageModal(false)}
                      className="border border-white/20 px-4 py-3 font-mono text-xs text-white/60 hover:text-white"
                    >
                      Cancel
                    </button>
                  </div>
                </form>
              )}

              {/* Page Selector Tabs */}
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="font-mono text-xs uppercase tracking-widest text-gold font-bold flex items-center gap-2">
                    <Layers className="h-4 w-4 text-gold" />
                    <span>Select Page to Manage:</span>
                  </span>
                  <span className="font-mono text-[11px] text-white/40">
                    {standardPagesList.length} Standard · {customPagesList.length} Custom
                  </span>
                </div>

                <div className="flex flex-wrap gap-2 border-b border-white/10 pb-4">
                  {standardPagesList.map((p) => {
                    const isSelected = selectedPageId === p.id;
                    return (
                      <button
                        key={p.id}
                        type="button"
                        onClick={() => {
                          setSelectedPageId(p.id);
                          setEditingSectionId(null);
                          setIsAddingSection(false);
                        }}
                        className={`px-4 py-2 font-mono text-xs uppercase tracking-wider transition-all duration-200 border cursor-pointer ${
                          isSelected
                            ? 'border-gold bg-gold text-[#07080A] font-bold shadow-[0_0_20px_rgba(212,175,55,0.35)]'
                            : 'border-white/10 bg-[#0B0D14] text-white/70 hover:border-white/30 hover:text-white'
                        }`}
                      >
                        {p.navLabel || p.title} {p.slug ? `(/${p.slug})` : '(/)'}
                      </button>
                    );
                  })}

                  {customPagesList.map((p) => {
                    const isSelected = selectedPageId === p.id;
                    return (
                      <div key={p.id} className="inline-flex items-center">
                        <button
                          type="button"
                          onClick={() => {
                            setSelectedPageId(p.id);
                            setEditingSectionId(null);
                            setIsAddingSection(false);
                          }}
                          className={`px-4 py-2 font-mono text-xs uppercase tracking-wider transition-all duration-200 border cursor-pointer ${
                            isSelected
                              ? 'border-[#38BDF8] bg-[#38BDF8] text-[#07080A] font-bold shadow-[0_0_20px_rgba(56,189,248,0.35)]'
                              : 'border-[#38BDF8]/30 bg-[#38BDF8]/10 text-[#38BDF8] hover:border-[#38BDF8]'
                          }`}
                        >
                          ✦ {p.navLabel || p.title} (/{p.slug})
                        </button>
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* Active Page Header & Controls Bar */}
              <div className="border border-white/15 bg-[#0B0D14] p-6 space-y-6">
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-white/10 pb-4">
                  <div>
                    <div className="flex items-center gap-2">
                      <h4 className="font-display text-xl font-bold uppercase text-white">
                        {activeManagedPage.title}
                      </h4>
                      <span className={`px-2 py-0.5 font-mono text-[9px] uppercase border ${
                        activeManagedPage.isStandard
                          ? 'border-gold/30 bg-gold/10 text-gold'
                          : 'border-emerald-500/30 bg-emerald-500/10 text-emerald-400'
                      }`}>
                        {activeManagedPage.isStandard ? 'Standard System Page' : 'Dynamic Route'}
                      </span>
                    </div>
                    <span className="font-mono text-xs text-gold">
                      Route: {activeManagedPage.slug ? `/${activeManagedPage.slug}` : '/ (Homepage)'}
                    </span>
                  </div>

                  <div className="flex flex-wrap items-center gap-3">
                    <Link
                      href={activeManagedPage.slug ? `/${activeManagedPage.slug}` : '/'}
                      target="_blank"
                      className="inline-flex items-center gap-1.5 border border-white/20 bg-white/5 hover:border-white/40 px-4 py-2 font-mono text-xs text-white/80 hover:text-white transition-colors"
                    >
                      <span>Preview Live Page</span>
                      <ExternalLink className="h-3.5 w-3.5" />
                    </Link>

                    {activeManagedPage.isStandard && (
                      <button
                        type="button"
                        onClick={() => {
                          if (confirm(`Reset "${activeManagedPage.title}" layout to default built-in sections?`)) {
                            resetPageToDefault(activeManagedPage.id);
                            flashNotice(`Reset "${activeManagedPage.title}" to default layout.`);
                          }
                        }}
                        className="inline-flex items-center gap-1.5 border border-white/15 px-3 py-2 font-mono text-xs text-white/50 hover:text-amber-400 hover:border-amber-400/40 transition-colors cursor-pointer"
                        title="Reset page layout to factory defaults"
                      >
                        <RefreshCw className="h-3.5 w-3.5" />
                        <span>Reset Layout</span>
                      </button>
                    )}

                    {!activeManagedPage.isStandard && (
                      <button
                        type="button"
                        onClick={() => handleDeleteCustomPage(activeManagedPage.id)}
                        className="inline-flex items-center gap-1.5 border border-red-500/30 bg-red-500/10 px-3 py-2 font-mono text-xs text-red-400 hover:border-red-400 transition-colors cursor-pointer"
                        title="Delete custom page"
                      >
                        <Trash2 className="h-3.5 w-3.5" />
                        <span>Delete Page</span>
                      </button>
                    )}
                  </div>
                </div>

                {/* Section Architecture Sub-Panel */}
                <div className="space-y-4">
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                    <div>
                      <span className="font-mono text-xs uppercase tracking-wider text-white/80 font-bold block">
                        Modular Sections Architecture
                      </span>
                      <p className="font-mono text-[11px] text-white/40">
                        {activeSections.length} sections configured · {activeSections.filter((s) => s.enabled).length} active on live site
                      </p>
                    </div>

                    <button
                      type="button"
                      onClick={() => setIsAddingSection(!isAddingSection)}
                      className="inline-flex items-center gap-2 bg-gold px-5 py-2 font-mono text-xs uppercase tracking-wider text-[#07080A] font-bold hover:shadow-[0_0_15px_rgba(212,175,55,0.3)] transition-all cursor-pointer"
                    >
                      <Plus className="h-3.5 w-3.5" />
                      <span>{isAddingSection ? 'Cancel New Section' : 'Add Section to This Page'}</span>
                    </button>
                  </div>

                  {/* Add Section Drawer / Form */}
                  {isAddingSection && (
                    <form onSubmit={handleAddSectionToCurrentPage} className="border border-gold/40 bg-[#07080A] p-6 space-y-4">
                      <div className="border-b border-white/10 pb-3 flex items-center justify-between">
                        <span className="font-mono text-xs uppercase tracking-wider text-gold font-bold">
                          Insert New Modular Section into {activeManagedPage.title}
                        </span>
                        <span className="font-mono text-[10px] text-white/40">Appended to page flow</span>
                      </div>

                      <div className="grid sm:grid-cols-2 gap-4">
                        <div className="space-y-1">
                          <label className="font-mono text-[10px] uppercase text-white/60 block">Section Type</label>
                          <select
                            value={newSectionForm.type}
                            onChange={(e) => setNewSectionForm({ ...newSectionForm, type: e.target.value })}
                            className="w-full border border-white/20 bg-[#0B0D14] p-2.5 font-mono text-xs text-white focus:border-gold outline-hidden"
                          >
                            <option value="hero">Hero Experience &amp; 3D Video Reel</option>
                            <option value="selected-work">Selected 3D Works Grid</option>
                            <option value="features-list">Capabilities / Features Checklist</option>
                            <option value="fiverr-gig">Fiverr Gig Showcase Preview Card</option>
                            <option value="fiverr-hub">Fiverr Full Hub &amp; Service Tiers</option>
                            <option value="cta-banner">Call To Action High-Impact Banner</option>
                            <option value="text-content">Rich Text Editorial Block</option>
                            <option value="about-bio">Artist Dual-Lens Narrative</option>
                            <option value="journey-timeline">Interactive Milestone Evolution Timeline</option>
                            <option value="ventures-ecosystem">Connected Ventures (ORVEX + Filxy)</option>
                            <option value="articles-preview">Articles &amp; Technical Insights</option>
                          </select>
                        </div>

                        <div className="space-y-1">
                          <label className="font-mono text-[10px] uppercase text-white/60 block">Section Title *</label>
                          <input
                            type="text"
                            required
                            value={newSectionForm.title}
                            onChange={(e) => setNewSectionForm({ ...newSectionForm, title: e.target.value })}
                            placeholder="e.g. Commercial 3D Modeling Tiers"
                            className="w-full border border-white/15 bg-[#0B0D14] p-2.5 font-mono text-xs text-white focus:border-gold outline-hidden"
                          />
                        </div>
                      </div>

                      <div className="grid sm:grid-cols-2 gap-4">
                        <div className="space-y-1">
                          <label className="font-mono text-[10px] uppercase text-white/60 block">Subtitle / Eyebrow Badge</label>
                          <input
                            type="text"
                            value={newSectionForm.subtitle}
                            onChange={(e) => setNewSectionForm({ ...newSectionForm, subtitle: e.target.value })}
                            placeholder="e.g. Pipeline Overview · 04"
                            className="w-full border border-white/15 bg-[#0B0D14] p-2.5 font-mono text-xs text-white focus:border-gold outline-hidden"
                          />
                        </div>

                        <div className="space-y-1">
                          <label className="font-mono text-[10px] uppercase text-white/60 block">Media / Video URL (Optional)</label>
                          <input
                            type="text"
                            value={newSectionForm.mediaUrl}
                            onChange={(e) => setNewSectionForm({ ...newSectionForm, mediaUrl: e.target.value })}
                            placeholder="/videos/orvex-reel.mp4"
                            className="w-full border border-white/15 bg-[#0B0D14] p-2.5 font-mono text-xs text-white focus:border-gold outline-hidden"
                          />
                        </div>
                      </div>

                      <div className="space-y-1">
                        <label className="font-mono text-[10px] uppercase text-white/60 block">Content / Body / Feature Comma-List</label>
                        <textarea
                          rows={2}
                          value={newSectionForm.content}
                          onChange={(e) => setNewSectionForm({ ...newSectionForm, content: e.target.value })}
                          placeholder="Section description or comma-separated list of capabilities..."
                          className="w-full border border-white/15 bg-[#0B0D14] p-2.5 font-mono text-xs text-white focus:border-gold outline-hidden resize-none"
                        />
                      </div>

                      <div className="flex items-center gap-3 pt-2">
                        <button
                          type="submit"
                          className="inline-flex items-center gap-2 bg-emerald-600 px-6 py-2.5 font-mono text-xs uppercase tracking-wider text-white font-bold hover:bg-emerald-500 transition-all cursor-pointer"
                        >
                          <Plus className="h-4 w-4" />
                          <span>Insert Section Into Page</span>
                        </button>
                        <button
                          type="button"
                          onClick={() => setIsAddingSection(false)}
                          className="border border-white/20 px-4 py-2.5 font-mono text-xs text-white/60 hover:text-white cursor-pointer"
                        >
                          Cancel
                        </button>
                      </div>
                    </form>
                  )}

                  {/* List of Section Cards */}
                  <div className="space-y-3">
                    {activeSections.map((sec, idx) => {
                      const isEditing = editingSectionId === sec.id;
                      return (
                        <div
                          key={sec.id}
                          className={`border transition-all duration-200 ${
                            sec.enabled
                              ? 'border-white/15 bg-[#07080A]/90 hover:border-gold/60'
                              : 'border-white/5 bg-[#07080A]/40 opacity-60'
                          }`}
                        >
                          {/* Main Row */}
                          <div className="p-4 flex flex-col md:flex-row md:items-center justify-between gap-4">
                            {/* Left: Position & Title */}
                            <div className="flex items-center gap-3">
                              <span className="grid h-7 w-7 place-items-center border border-white/10 font-mono text-[11px] text-white/60 bg-white/5 font-bold shrink-0">
                                #{idx + 1}
                              </span>

                              {/* Visibility Toggle Button */}
                              <button
                                type="button"
                                onClick={() => {
                                  togglePageSection(activeManagedPage.id, sec.id);
                                  flashNotice(`Toggled section "${sec.title}" visibility.`);
                                }}
                                className={`inline-flex items-center gap-1.5 px-2.5 py-1 font-mono text-[10px] uppercase tracking-wider border cursor-pointer transition-all ${
                                  sec.enabled
                                    ? 'border-emerald-500/40 bg-emerald-500/10 text-emerald-400 hover:bg-emerald-500/20'
                                    : 'border-white/10 bg-white/5 text-white/40 hover:text-white/70'
                                }`}
                                title={sec.enabled ? 'Click to hide this section' : 'Click to enable this section'}
                              >
                                {sec.enabled ? (
                                  <>
                                    <Eye className="h-3.5 w-3.5" />
                                    <span>Active</span>
                                  </>
                                ) : (
                                  <>
                                    <EyeOff className="h-3.5 w-3.5" />
                                    <span>Hidden</span>
                                  </>
                                )}
                              </button>

                              {/* Section Type Badge */}
                              <span className={`px-2 py-0.5 font-mono text-[9px] uppercase border ${getSectionTypeColor(sec.type)}`}>
                                {sec.type}
                              </span>

                              {/* Titles */}
                              <div>
                                <h5 className="font-display text-sm font-bold uppercase text-white">
                                  {sec.title}
                                </h5>
                                {sec.subtitle && (
                                  <span className="font-mono text-[10px] text-white/40 block">
                                    {sec.subtitle}
                                  </span>
                                )}
                              </div>
                            </div>

                            {/* Right: Actions */}
                            <div className="flex items-center gap-1.5 self-end md:self-center">
                              {/* Reorder Up */}
                              <button
                                type="button"
                                disabled={idx === 0}
                                onClick={() => {
                                  reorderPageSection(activeManagedPage.id, sec.id, 'up');
                                  flashNotice(`Moved "${sec.title}" up.`);
                                }}
                                className="p-1.5 border border-white/10 text-white/50 hover:text-gold hover:border-gold/40 disabled:opacity-20 disabled:pointer-events-none cursor-pointer"
                                title="Move up in page flow"
                              >
                                <ArrowUp className="h-3.5 w-3.5" />
                              </button>

                              {/* Reorder Down */}
                              <button
                                type="button"
                                disabled={idx === activeSections.length - 1}
                                onClick={() => {
                                  reorderPageSection(activeManagedPage.id, sec.id, 'down');
                                  flashNotice(`Moved "${sec.title}" down.`);
                                }}
                                className="p-1.5 border border-white/10 text-white/50 hover:text-gold hover:border-gold/40 disabled:opacity-20 disabled:pointer-events-none cursor-pointer"
                                title="Move down in page flow"
                              >
                                <ArrowDown className="h-3.5 w-3.5" />
                              </button>

                              {/* Edit Button */}
                              <button
                                type="button"
                                onClick={() => {
                                  if (isEditing) {
                                    setEditingSectionId(null);
                                    setEditingSectionForm(null);
                                  } else {
                                    setEditingSectionId(sec.id);
                                    setEditingSectionForm({
                                      title: sec.title,
                                      subtitle: sec.subtitle || '',
                                      content: sec.content || '',
                                      mediaUrl: sec.mediaUrl || '',
                                    });
                                  }
                                }}
                                className={`p-1.5 border cursor-pointer transition-colors ${
                                  isEditing
                                    ? 'border-gold bg-gold text-[#07080A]'
                                    : 'border-white/10 text-white/60 hover:text-gold hover:border-gold/40'
                                }`}
                                title="Edit section details"
                              >
                                <Edit3 className="h-3.5 w-3.5" />
                              </button>

                              {/* Delete Button */}
                              <button
                                type="button"
                                onClick={() => {
                                  if (confirm(`Remove section "${sec.title}" from this page?`)) {
                                    removeSectionFromPage(activeManagedPage.id, sec.id);
                                    flashNotice(`Removed section "${sec.title}".`);
                                  }
                                }}
                                className="p-1.5 border border-white/10 text-white/40 hover:text-red-400 hover:border-red-400/40 cursor-pointer"
                                title="Delete section"
                              >
                                <Trash2 className="h-3.5 w-3.5" />
                              </button>
                            </div>
                          </div>

                          {/* Inline Edit Form */}
                          {isEditing && editingSectionForm && (
                            <div className="border-t border-white/10 bg-[#0B0D14] p-5 space-y-4">
                              <span className="font-mono text-[10px] uppercase text-gold block font-semibold">
                                Edit Section Content &amp; Meta
                              </span>

                              <div className="grid sm:grid-cols-2 gap-4">
                                <div className="space-y-1">
                                  <label className="font-mono text-[10px] uppercase text-white/60 block">Section Title</label>
                                  <input
                                    type="text"
                                    value={editingSectionForm.title || ''}
                                    onChange={(e) => setEditingSectionForm({ ...editingSectionForm, title: e.target.value })}
                                    className="w-full border border-white/15 bg-[#07080A] p-2 font-mono text-xs text-white focus:border-gold outline-hidden"
                                  />
                                </div>

                                <div className="space-y-1">
                                  <label className="font-mono text-[10px] uppercase text-white/60 block">Subtitle / Eyebrow</label>
                                  <input
                                    type="text"
                                    value={editingSectionForm.subtitle || ''}
                                    onChange={(e) => setEditingSectionForm({ ...editingSectionForm, subtitle: e.target.value })}
                                    className="w-full border border-white/15 bg-[#07080A] p-2 font-mono text-xs text-white focus:border-gold outline-hidden"
                                  />
                                </div>
                              </div>

                              <div className="space-y-1">
                                <label className="font-mono text-[10px] uppercase text-white/60 block">Section Description / Content</label>
                                <textarea
                                  rows={3}
                                  value={editingSectionForm.content || ''}
                                  onChange={(e) => setEditingSectionForm({ ...editingSectionForm, content: e.target.value })}
                                  className="w-full border border-white/15 bg-[#07080A] p-2 font-mono text-xs text-white focus:border-gold outline-hidden resize-none"
                                />
                              </div>

                              <div className="flex items-center gap-3">
                                <button
                                  type="button"
                                  onClick={() => handleSaveSectionEdit(sec.id)}
                                  className="inline-flex items-center gap-1.5 bg-gold px-5 py-2 font-mono text-xs uppercase tracking-wider text-[#07080A] font-bold hover:shadow-[0_0_15px_rgba(212,175,55,0.3)] transition-all cursor-pointer"
                                >
                                  <Save className="h-3.5 w-3.5" />
                                  <span>Save Changes</span>
                                </button>
                                <button
                                  type="button"
                                  onClick={() => {
                                    setEditingSectionId(null);
                                    setEditingSectionForm(null);
                                  }}
                                  className="border border-white/20 px-3 py-2 font-mono text-xs text-white/60 hover:text-white cursor-pointer"
                                >
                                  Cancel
                                </button>
                              </div>
                            </div>
                          )}
                        </div>
                      );
                    })}
                  </div>
                </div>
              </div>
            </div>
          );
        })()}

        {/* TAB 5: PAGE & SECTION VIDEOS */}
        {activeTab === 'videos' && (
          <div className="space-y-12">
            <div className="border border-white/15 bg-[#0B0D14] p-8 space-y-4 cad-corner-tl">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-white/10 pb-4">
                <div>
                  <div className="inline-flex items-center gap-2 font-mono text-[10px] uppercase tracking-[0.24em] text-[#38BDF8] mb-1">
                    <Video className="h-3.5 w-3.5" />
                    <span>Dynamic Video Background Engine</span>
                  </div>
                  <h3 className="font-display text-2xl font-black uppercase text-white">
                    Per-Page Background Video Settings &amp; Media Library
                  </h3>
                </div>
                <div className="flex items-center gap-3">
                  <button
                    type="button"
                    onClick={() => setActiveTab('guide')}
                    className="inline-flex items-center gap-1.5 border border-[#38BDF8]/40 bg-[#38BDF8]/10 text-[#38BDF8] px-4 py-2 font-mono text-xs uppercase hover:bg-[#38BDF8]/20 transition-colors"
                  >
                    <HelpCircle className="h-3.5 w-3.5" />
                    <span>How To Add Videos Guide</span>
                  </button>
                  <button
                    type="button"
                    onClick={() => {
                      setVideoConfig(DEFAULT_PAGE_VIDEOS);
                      updateSettings({
                        ...settings,
                        pageVideos: DEFAULT_PAGE_VIDEOS,
                      });
                      flashNotice('Reset to recommended studio videos.');
                    }}
                    className="inline-flex items-center gap-1.5 border border-white/20 px-4 py-2 font-mono text-xs uppercase text-slate-300 hover:text-white hover:border-white/40 transition-colors cursor-pointer"
                  >
                    <RefreshCw className="h-3.5 w-3.5" />
                    <span>Reset Recommended</span>
                  </button>
                </div>
              </div>
            </div>

            {/* Add New Custom Video Asset Form */}
            <form onSubmit={handleAddCustomVideo} className="border border-white/15 bg-[#0B0D14] p-8 space-y-6 cad-corner-tl">
              <div className="border-b border-white/10 pb-4 flex items-center justify-between">
                <div className="flex items-center gap-2.5">
                  <Plus className="h-4 w-4 text-emerald-400" />
                  <h4 className="font-display text-lg font-bold uppercase text-white">
                    Add New Video Asset To Library
                  </h4>
                </div>
                <span className="font-mono text-[10px] text-emerald-400 uppercase tracking-widest">
                  Custom Video Asset
                </span>
              </div>

              <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
                <div className="space-y-1 sm:col-span-2">
                  <label className="font-mono text-[10px] uppercase text-white/60 block">Video Label / Title *</label>
                  <input
                    type="text"
                    required
                    value={newVideo.label}
                    onChange={(e) => setNewVideo({ ...newVideo, label: e.target.value })}
                    placeholder="e.g. Hyper-Car Cycles Turntable"
                    className="w-full border border-white/15 bg-[#07080A] p-2.5 font-mono text-xs text-white focus:border-gold outline-hidden"
                  />
                </div>

                <div className="space-y-1">
                  <label className="font-mono text-[10px] uppercase text-white/60 block">Category</label>
                  <select
                    value={newVideo.category}
                    onChange={(e) => setNewVideo({ ...newVideo, category: e.target.value as any })}
                    className="w-full border border-white/15 bg-[#07080A] p-2.5 font-mono text-xs text-white focus:border-gold outline-hidden"
                  >
                    <option value="reel">Motion Reel</option>
                    <option value="showcase">Product Showcase</option>
                    <option value="ambient">Ambient Loop</option>
                    <option value="tutorial">Technical Breakdown</option>
                    <option value="product">Commercial Asset</option>
                  </select>
                </div>

                <div className="space-y-1">
                  <label className="font-mono text-[10px] uppercase text-white/60 block">Theme / Mood</label>
                  <input
                    type="text"
                    value={newVideo.theme}
                    onChange={(e) => setNewVideo({ ...newVideo, theme: e.target.value })}
                    placeholder="e.g. cyan-gold, emerald, scifi"
                    className="w-full border border-white/15 bg-[#07080A] p-2.5 font-mono text-xs text-white focus:border-gold outline-hidden"
                  />
                </div>
              </div>

              <div className="grid sm:grid-cols-3 gap-4">
                <div className="space-y-1 sm:col-span-2">
                  <label className="font-mono text-[10px] uppercase text-white/60 block">
                    Video File Path or Direct MP4 URL *
                  </label>
                  <input
                    type="text"
                    required
                    value={newVideo.path}
                    onChange={(e) => setNewVideo({ ...newVideo, path: e.target.value })}
                    placeholder="e.g. /videos/my-reel.mp4 or https://res.cloudinary.com/.../video.mp4"
                    className="w-full border border-white/15 bg-[#07080A] p-2.5 font-mono text-xs text-white focus:border-gold outline-hidden"
                  />
                </div>

                <div className="space-y-1">
                  <label className="font-mono text-[10px] uppercase text-white/60 block">Short Description</label>
                  <input
                    type="text"
                    value={newVideo.description}
                    onChange={(e) => setNewVideo({ ...newVideo, description: e.target.value })}
                    placeholder="e.g. 4K Cycles photoreal turntable"
                    className="w-full border border-white/15 bg-[#07080A] p-2.5 font-mono text-xs text-white focus:border-gold outline-hidden"
                  />
                </div>
              </div>

              <button
                type="submit"
                className="inline-flex items-center gap-2 bg-gradient-to-r from-emerald-600 to-teal-600 px-6 py-2.5 font-mono text-xs uppercase tracking-wider text-white font-bold transition-all shadow-[0_0_15px_rgba(16,185,129,0.3)] cursor-pointer"
              >
                <Plus className="h-4 w-4" />
                <span>Add Video Asset to Studio Library</span>
              </button>
            </form>

            {/* Video Assets Library (Built-in + Custom) */}
            <div className="space-y-4">
              <div className="flex items-center justify-between border-b border-white/10 pb-2 font-mono text-xs text-slate-400 uppercase tracking-wider">
                <span className="text-white font-bold">Studio Video Reels Library ({allAvailableVideos.length})</span>
                <span className="text-[#38BDF8]">Live Previews &amp; 1-Click Fast Assign</span>
              </div>
              <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {allAvailableVideos.map((v) => {
                  const isCustom = !AVAILABLE_VIDEOS.some((av) => av.id === v.id);
                  return (
                    <div
                      key={v.id}
                      className="border border-white/15 bg-[#0B0D14] p-4 space-y-3 group hover:border-gold transition-all"
                    >
                      <div className="relative aspect-16/9 bg-black overflow-hidden rounded border border-white/10">
                        <video
                          src={v.path}
                          autoPlay
                          loop
                          muted
                          playsInline
                          className="h-full w-full object-cover opacity-80 group-hover:opacity-100 transition-opacity"
                        />
                        <div className="absolute top-2 left-2 flex gap-1">
                          <span className="bg-black/80 px-2 py-0.5 font-mono text-[9px] uppercase tracking-wider text-gold border border-gold/30">
                            {v.category || 'Reel'}
                          </span>
                          {isCustom && (
                            <span className="bg-emerald-500/20 text-emerald-400 border border-emerald-500/40 px-2 py-0.5 font-mono text-[9px] uppercase tracking-wider">
                              Custom
                            </span>
                          )}
                        </div>
                      </div>

                      <div className="space-y-1">
                        <div className="flex items-center justify-between gap-2">
                          <h5 className="font-display text-sm font-bold uppercase text-white truncate">{v.label}</h5>
                          {isCustom && (
                            <button
                              type="button"
                              onClick={() => handleDeleteCustomVideo(v.id)}
                              className="text-white/40 hover:text-red-400 transition-colors p-1"
                              title="Delete custom video"
                            >
                              <Trash2 className="h-3.5 w-3.5" />
                            </button>
                          )}
                        </div>
                        <p className="font-mono text-[10px] text-[#38BDF8] truncate">{v.path}</p>
                      </div>

                      {/* 1-Click Fast Assign Buttons */}
                      <div className="pt-2 border-t border-white/10 space-y-1.5">
                        <span className="font-mono text-[9px] uppercase text-white/40 block tracking-widest">
                          1-Click Set As Page Background:
                        </span>
                        <div className="flex flex-wrap gap-1 font-mono text-[9px] uppercase">
                          <button
                            type="button"
                            onClick={() => handleQuickAssignVideo('home', v.path)}
                            className={`px-2 py-1 border transition-colors ${videoConfig.home === v.path ? 'border-gold bg-gold/20 text-gold font-bold' : 'border-white/15 text-white/70 hover:border-white/40 hover:text-white'}`}
                          >
                            Home
                          </button>
                          <button
                            type="button"
                            onClick={() => handleQuickAssignVideo('work', v.path)}
                            className={`px-2 py-1 border transition-colors ${videoConfig.work === v.path ? 'border-gold bg-gold/20 text-gold font-bold' : 'border-white/15 text-white/70 hover:border-white/40 hover:text-white'}`}
                          >
                            Work
                          </button>
                          <button
                            type="button"
                            onClick={() => handleQuickAssignVideo('ventures', v.path)}
                            className={`px-2 py-1 border transition-colors ${videoConfig.ventures === v.path ? 'border-gold bg-gold/20 text-gold font-bold' : 'border-white/15 text-white/70 hover:border-white/40 hover:text-white'}`}
                          >
                            Ventures
                          </button>
                          <button
                            type="button"
                            onClick={() => handleQuickAssignVideo('fiverr', v.path)}
                            className={`px-2 py-1 border transition-colors ${videoConfig.fiverr === v.path ? 'border-gold bg-gold/20 text-gold font-bold' : 'border-white/15 text-white/70 hover:border-white/40 hover:text-white'}`}
                          >
                            Fiverr
                          </button>
                          <button
                            type="button"
                            onClick={() => handleQuickAssignVideo('contact', v.path)}
                            className={`px-2 py-1 border transition-colors ${videoConfig.contact === v.path ? 'border-gold bg-gold/20 text-gold font-bold' : 'border-white/15 text-white/70 hover:border-white/40 hover:text-white'}`}
                          >
                            Contact
                          </button>
                          <button
                            type="button"
                            onClick={() => handleQuickAssignVideo('about', v.path)}
                            className={`px-2 py-1 border transition-colors ${videoConfig.about === v.path ? 'border-gold bg-gold/20 text-gold font-bold' : 'border-white/15 text-white/70 hover:border-white/40 hover:text-white'}`}
                          >
                            About
                          </button>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Per-Page Assignment Form */}
            <form
              onSubmit={(e) => {
                e.preventDefault();
                updateSettings({
                  ...settings,
                  pageVideos: videoConfig,
                });
                flashNotice('Page background videos saved live across portfolio!');
              }}
              className="border border-white/15 bg-[#0B0D14] p-8 space-y-8"
            >
              <div className="border-b border-white/10 pb-4">
                <h4 className="font-display text-lg font-bold uppercase text-white">
                  Configure Each Page&apos;s Background Video
                </h4>
              </div>

              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                {[
                  { key: 'home' as keyof PageVideos, label: '1. Home / Hero (/)', sub: 'Primary Entry' },
                  { key: 'work' as keyof PageVideos, label: '2. Work Catalog (/work)', sub: 'Gallery' },
                  { key: 'ventures' as keyof PageVideos, label: '3. Ventures (/ventures)', sub: 'ORVEX & Filxy' },
                  { key: 'fiverr' as keyof PageVideos, label: '4. Fiverr Services (/fiverr)', sub: 'Official Hub' },
                  { key: 'contact' as keyof PageVideos, label: '5. Contact (/contact)', sub: 'Commissions' },
                  { key: 'about' as keyof PageVideos, label: '6. About (/about)', sub: 'Artist Profile' },
                ].map((pg) => (
                  <div key={pg.key} className="border border-white/10 bg-[#07090F] p-5 space-y-3">
                    <div className="flex items-center justify-between border-b border-white/10 pb-2">
                      <span className="font-display text-sm font-bold uppercase text-gold">{pg.label}</span>
                      <span className="font-mono text-[10px] text-[#38BDF8] uppercase tracking-wider">{pg.sub}</span>
                    </div>
                    {videoConfig[pg.key] && (
                      <div className="aspect-16/9 bg-black rounded overflow-hidden relative">
                        <video src={videoConfig[pg.key]} autoPlay loop muted playsInline className="h-full w-full object-cover" />
                        <span className="absolute bottom-1 right-1 bg-black/80 px-1 font-mono text-[8px] text-white/70">Preview</span>
                      </div>
                    )}
                    <div className="space-y-2">
                      <select
                        value={videoConfig[pg.key]}
                        onChange={(e) => setVideoConfig({ ...videoConfig, [pg.key]: e.target.value })}
                        className="w-full border border-white/20 bg-[#0B0D14] p-2.5 font-mono text-xs text-white focus:border-gold outline-hidden"
                      >
                        {allAvailableVideos.map((v) => (
                          <option key={v.id} value={v.path}>{v.label} ({v.path})</option>
                        ))}
                      </select>
                      <input
                        type="text"
                        value={videoConfig[pg.key]}
                        onChange={(e) => setVideoConfig({ ...videoConfig, [pg.key]: e.target.value })}
                        placeholder="Or enter custom URL/path..."
                        className="w-full border border-white/15 bg-[#07080A] p-2 font-mono text-[11px] text-slate-300 focus:border-gold outline-hidden"
                      />
                    </div>
                  </div>
                ))}
              </div>

              <button
                type="submit"
                className="inline-flex items-center gap-2.5 bg-gradient-to-r from-emerald-600 via-teal-600 to-amber-500 hover:from-emerald-500 hover:to-amber-400 px-8 py-3.5 font-mono text-xs uppercase tracking-[0.2em] text-white font-bold transition-all shadow-[0_0_25px_rgba(16,185,129,0.4)] cursor-pointer"
              >
                <Save className="h-4 w-4" />
                <span>Save Video Configuration Live</span>
              </button>
            </form>
          </div>
        )}

        {/* TAB 6: 3D PROJECTS MANAGEMENT */}
        {activeTab === 'projects' && (
          <div className="space-y-12">
            <div ref={projectFormRef} className="border border-white/15 bg-[#0B0D14] p-8 space-y-6 cad-corner-tl">
              <div className="border-b border-white/10 pb-4 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                <div className="flex items-center gap-3">
                  {editingProject ? (
                    <Edit3 className="h-5 w-5 text-gold" />
                  ) : (
                    <Plus className="h-5 w-5 text-emerald-400" />
                  )}
                  <div>
                    <h3 className="font-display text-xl font-bold uppercase text-white">
                      {editingProject ? `Editing 3D Artwork: "${editingProject.title}"` : 'Add New 3D Artwork'}
                    </h3>
                    <p className="font-mono text-xs text-white/50">
                      {editingProject ? 'Modify all assets, images, video reels, polygon specs, and case study narrative' : 'Publish high-precision 3D production model to portfolio'}
                    </p>
                  </div>
                </div>

                {editingProject && (
                  <button
                    type="button"
                    onClick={handleCancelEditProject}
                    className="inline-flex items-center gap-1.5 border border-white/20 px-3 py-1.5 font-mono text-xs uppercase text-white/70 hover:text-white hover:border-white/40 cursor-pointer"
                  >
                    <X className="h-3.5 w-3.5" />
                    <span>Cancel Edit Mode</span>
                  </button>
                )}
              </div>

              <form onSubmit={editingProject ? handleSaveEditedProject : handleCreateProject} className="space-y-6">
                <div className="grid sm:grid-cols-3 gap-4">
                  <div className="space-y-1">
                    <label className="font-mono text-[10px] uppercase text-white/60 block">Project Title *</label>
                    <input
                      type="text"
                      required
                      value={editingProject ? editingProject.title : newProject.title || ''}
                      onChange={(e) => {
                        if (editingProject) {
                          setEditingProject({ ...editingProject, title: e.target.value });
                        } else {
                          setNewProject({ ...newProject, title: e.target.value });
                        }
                      }}
                      placeholder="e.g. Apex Drone MK-II"
                      className="w-full border border-white/15 bg-[#07080A] p-2.5 font-mono text-xs text-white focus:border-gold outline-hidden"
                    />
                  </div>

                  <div className="space-y-1">
                    <label className="font-mono text-[10px] uppercase text-white/60 block">Subtitle</label>
                    <input
                      type="text"
                      value={editingProject ? editingProject.subtitle : newProject.subtitle || ''}
                      onChange={(e) => {
                        if (editingProject) {
                          setEditingProject({ ...editingProject, subtitle: e.target.value });
                        } else {
                          setNewProject({ ...newProject, subtitle: e.target.value });
                        }
                      }}
                      placeholder="e.g. Autonomous Reconnaissance Quad"
                      className="w-full border border-white/15 bg-[#07080A] p-2.5 font-mono text-xs text-white focus:border-gold outline-hidden"
                    />
                  </div>

                  <div className="space-y-1">
                    <label className="font-mono text-[10px] uppercase text-white/60 block">Category</label>
                    <select
                      value={editingProject ? editingProject.category : newProject.category || 'Hard Surface'}
                      onChange={(e) => {
                        const cat = e.target.value as ProjectCategory;
                        if (editingProject) {
                          setEditingProject({ ...editingProject, category: cat });
                        } else {
                          setNewProject({ ...newProject, category: cat });
                        }
                      }}
                      className="w-full border border-white/15 bg-[#07080A] p-2.5 font-mono text-xs text-white focus:border-gold outline-hidden"
                    >
                      <option value="Hard Surface">Hard Surface</option>
                      <option value="Environment Design">Environment Design</option>
                      <option value="Abstract Art">Abstract Art</option>
                      <option value="Game Assets">Game Assets</option>
                      <option value="Character Sculpts">Character Sculpts</option>
                      <option value="Visual Design">Visual Design</option>
                    </select>
                  </div>
                </div>

                <div className="grid sm:grid-cols-4 gap-4">
                  <div className="space-y-1">
                    <label className="font-mono text-[10px] uppercase text-white/60 block">Year</label>
                    <input
                      type="text"
                      value={editingProject ? editingProject.year : newProject.year || '2026'}
                      onChange={(e) => {
                        if (editingProject) {
                          setEditingProject({ ...editingProject, year: e.target.value });
                        } else {
                          setNewProject({ ...newProject, year: e.target.value });
                        }
                      }}
                      className="w-full border border-white/15 bg-[#07080A] p-2.5 font-mono text-xs text-white focus:border-gold outline-hidden"
                    />
                  </div>

                  <div className="space-y-1">
                    <label className="font-mono text-[10px] uppercase text-white/60 block">Client / Context</label>
                    <input
                      type="text"
                      value={editingProject ? editingProject.client || '' : newProject.client || ''}
                      onChange={(e) => {
                        if (editingProject) {
                          setEditingProject({ ...editingProject, client: e.target.value });
                        } else {
                          setNewProject({ ...newProject, client: e.target.value });
                        }
                      }}
                      placeholder="e.g. Commercial Studio / ORVEX"
                      className="w-full border border-white/15 bg-[#07080A] p-2.5 font-mono text-xs text-white focus:border-gold outline-hidden"
                    />
                  </div>

                  <div className="space-y-1">
                    <label className="font-mono text-[10px] uppercase text-white/60 block">Role</label>
                    <input
                      type="text"
                      value={editingProject ? editingProject.role : newProject.role || '3D Modeler & Visual Artist'}
                      onChange={(e) => {
                        if (editingProject) {
                          setEditingProject({ ...editingProject, role: e.target.value });
                        } else {
                          setNewProject({ ...newProject, role: e.target.value });
                        }
                      }}
                      className="w-full border border-white/15 bg-[#07080A] p-2.5 font-mono text-xs text-white focus:border-gold outline-hidden"
                    />
                  </div>

                  <div className="space-y-1 flex flex-col justify-end">
                    <label className="inline-flex items-center gap-2 font-mono text-xs text-white cursor-pointer select-none">
                      <input
                        type="checkbox"
                        checked={editingProject ? editingProject.featured : newProject.featured ?? true}
                        onChange={(e) => {
                          if (editingProject) {
                            setEditingProject({ ...editingProject, featured: e.target.checked });
                          } else {
                            setNewProject({ ...newProject, featured: e.target.checked });
                          }
                        }}
                        className="h-4 w-4 accent-gold"
                      />
                      <span>Featured On Homepage</span>
                    </label>
                  </div>
                </div>

                {/* Media Section */}
                <div className="border border-white/10 bg-[#07090F] p-5 space-y-4">
                  <div className="border-b border-white/10 pb-2 flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <Film className="h-4 w-4 text-gold" />
                      <span className="font-display text-sm font-bold uppercase text-white">
                        Primary Media &amp; Motion Video Reel
                      </span>
                    </div>
                  </div>

                  <div className="grid md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <label className="font-mono text-[10px] uppercase text-white/60 block">
                        Hero Render Image URL *
                      </label>
                      <input
                        type="url"
                        required
                        value={editingProject ? editingProject.heroImage : newProject.heroImage || ''}
                        onChange={(e) => {
                          if (editingProject) {
                            setEditingProject({ ...editingProject, heroImage: e.target.value });
                          } else {
                            setNewProject({ ...newProject, heroImage: e.target.value });
                          }
                        }}
                        placeholder="https://images.unsplash.com/..."
                        className="w-full border border-white/15 bg-[#07080A] p-2.5 font-mono text-xs text-white focus:border-gold outline-hidden"
                      />
                      {(editingProject?.heroImage || newProject.heroImage) && (
                        <div className="relative aspect-16/9 bg-black rounded overflow-hidden border border-white/10 mt-2">
                          <Image
                            src={editingProject ? editingProject.heroImage : newProject.heroImage!}
                            alt="Hero preview"
                            fill
                            className="object-cover"
                          />
                        </div>
                      )}
                    </div>

                    <div className="space-y-2">
                      <label className="font-mono text-[10px] uppercase text-gold block flex items-center justify-between">
                        <span>Project Video Reel URL (Optional)</span>
                        <span className="text-white/40 text-[9px]">Autoplays on Hover &amp; Case Study</span>
                      </label>
                      <select
                        value={editingProject ? editingProject.videoUrl || '' : newProject.videoUrl || ''}
                        onChange={(e) => {
                          const val = e.target.value;
                          if (editingProject) {
                            setEditingProject({ ...editingProject, videoUrl: val });
                          } else {
                            setNewProject({ ...newProject, videoUrl: val });
                          }
                        }}
                        className="w-full border border-white/20 bg-[#0B0D14] p-2.5 font-mono text-xs text-white focus:border-gold outline-hidden"
                      >
                        <option value="">-- None / Image Only --</option>
                        {allAvailableVideos.map((v) => (
                          <option key={v.id} value={v.path}>{v.label} ({v.path})</option>
                        ))}
                      </select>
                      <input
                        type="text"
                        value={editingProject ? editingProject.videoUrl || '' : newProject.videoUrl || ''}
                        onChange={(e) => {
                          const val = e.target.value;
                          if (editingProject) {
                            setEditingProject({ ...editingProject, videoUrl: val });
                          } else {
                            setNewProject({ ...newProject, videoUrl: val });
                          }
                        }}
                        placeholder="Or custom video path: /videos/... or https://..."
                        className="w-full border border-white/15 bg-[#07080A] p-2 font-mono text-[11px] text-slate-300 focus:border-gold outline-hidden"
                      />

                      {(editingProject?.videoUrl || newProject.videoUrl) && (
                        <div className="relative aspect-16/9 bg-black rounded overflow-hidden border border-white/10 mt-2">
                          <video
                            src={editingProject ? editingProject.videoUrl : newProject.videoUrl}
                            autoPlay
                            loop
                            muted
                            playsInline
                            className="h-full w-full object-cover"
                          />
                          <span className="absolute bottom-1 right-1 bg-black/80 px-1 font-mono text-[8px] text-emerald-400">
                            Video Active
                          </span>
                        </div>
                      )}
                    </div>
                  </div>

                  <div className="grid sm:grid-cols-2 gap-4 pt-2 border-t border-white/10">
                    <div className="space-y-1">
                      <label className="font-mono text-[10px] uppercase text-white/60 block">Wireframe Render URL</label>
                      <input
                        type="url"
                        value={editingProject ? editingProject.wireframeImage || '' : newProject.wireframeImage || ''}
                        onChange={(e) => {
                          if (editingProject) {
                            setEditingProject({ ...editingProject, wireframeImage: e.target.value });
                          } else {
                            setNewProject({ ...newProject, wireframeImage: e.target.value });
                          }
                        }}
                        placeholder="https://..."
                        className="w-full border border-white/15 bg-[#07080A] p-2 font-mono text-xs text-white focus:border-gold outline-hidden"
                      />
                    </div>

                    <div className="space-y-1">
                      <label className="font-mono text-[10px] uppercase text-white/60 block">Clay / Ambient Occlusion URL</label>
                      <input
                        type="url"
                        value={editingProject ? editingProject.clayImage || '' : newProject.clayImage || ''}
                        onChange={(e) => {
                          if (editingProject) {
                            setEditingProject({ ...editingProject, clayImage: e.target.value });
                          } else {
                            setNewProject({ ...newProject, clayImage: e.target.value });
                          }
                        }}
                        placeholder="https://..."
                        className="w-full border border-white/15 bg-[#07080A] p-2 font-mono text-xs text-white focus:border-gold outline-hidden"
                      />
                    </div>
                  </div>

                  <div className="space-y-1 pt-2">
                    <label className="font-mono text-[10px] uppercase text-white/60 block">
                      Additional Gallery Images (Paste 1 image URL per line)
                    </label>
                    <textarea
                      rows={3}
                      value={galleryInput}
                      onChange={(e) => setGalleryInput(e.target.value)}
                      placeholder="https://images.unsplash.com/photo-1&#10;https://images.unsplash.com/photo-2"
                      className="w-full border border-white/15 bg-[#07080A] p-2 font-mono text-xs text-white focus:border-gold outline-hidden"
                    />
                  </div>
                </div>

                {/* Technical Specifications */}
                <div className="border border-white/10 bg-[#07090F] p-5 space-y-4">
                  <span className="font-display text-sm font-bold uppercase text-white block border-b border-white/10 pb-2">
                    Technical Topology &amp; Engine Specifications
                  </span>
                  <div className="grid sm:grid-cols-3 lg:grid-cols-6 gap-3">
                    <div className="space-y-1">
                      <label className="font-mono text-[9px] uppercase text-white/50 block">Vertices</label>
                      <input
                        type="text"
                        value={editingProject ? editingProject.technicalSpecs?.vertices : newProject.technicalSpecs?.vertices || '100,000'}
                        onChange={(e) => {
                          const val = e.target.value;
                          if (editingProject) {
                            setEditingProject({ ...editingProject, technicalSpecs: { ...editingProject.technicalSpecs, vertices: val } });
                          } else {
                            setNewProject({ ...newProject, technicalSpecs: { ...(newProject.technicalSpecs as any), vertices: val } });
                          }
                        }}
                        className="w-full border border-white/15 bg-[#07080A] p-2 font-mono text-xs text-white focus:border-gold outline-hidden"
                      />
                    </div>

                    <div className="space-y-1">
                      <label className="font-mono text-[9px] uppercase text-white/50 block">Faces / Polygons</label>
                      <input
                        type="text"
                        value={editingProject ? editingProject.technicalSpecs?.faces : newProject.technicalSpecs?.faces || '98,000'}
                        onChange={(e) => {
                          const val = e.target.value;
                          if (editingProject) {
                            setEditingProject({ ...editingProject, technicalSpecs: { ...editingProject.technicalSpecs, faces: val } });
                          } else {
                            setNewProject({ ...newProject, technicalSpecs: { ...(newProject.technicalSpecs as any), faces: val } });
                          }
                        }}
                        className="w-full border border-white/15 bg-[#07080A] p-2 font-mono text-xs text-white focus:border-gold outline-hidden"
                      />
                    </div>

                    <div className="space-y-1">
                      <label className="font-mono text-[9px] uppercase text-white/50 block">Render Engine</label>
                      <input
                        type="text"
                        value={editingProject ? editingProject.technicalSpecs?.renderEngine : newProject.technicalSpecs?.renderEngine || 'Cycles'}
                        onChange={(e) => {
                          const val = e.target.value;
                          if (editingProject) {
                            setEditingProject({ ...editingProject, technicalSpecs: { ...editingProject.technicalSpecs, renderEngine: val } });
                          } else {
                            setNewProject({ ...newProject, technicalSpecs: { ...(newProject.technicalSpecs as any), renderEngine: val } });
                          }
                        }}
                        className="w-full border border-white/15 bg-[#07080A] p-2 font-mono text-xs text-white focus:border-gold outline-hidden"
                      />
                    </div>

                    <div className="space-y-1">
                      <label className="font-mono text-[9px] uppercase text-white/50 block">Render Samples</label>
                      <input
                        type="text"
                        value={editingProject ? editingProject.technicalSpecs?.renderSamples || '2048 samples' : newProject.technicalSpecs?.renderSamples || '2048 samples'}
                        onChange={(e) => {
                          const val = e.target.value;
                          if (editingProject) {
                            setEditingProject({ ...editingProject, technicalSpecs: { ...editingProject.technicalSpecs, renderSamples: val } });
                          } else {
                            setNewProject({ ...newProject, technicalSpecs: { ...(newProject.technicalSpecs as any), renderSamples: val } });
                          }
                        }}
                        className="w-full border border-white/15 bg-[#07080A] p-2 font-mono text-xs text-white focus:border-gold outline-hidden"
                      />
                    </div>

                    <div className="space-y-1">
                      <label className="font-mono text-[9px] uppercase text-white/50 block">Texture Res</label>
                      <input
                        type="text"
                        value={editingProject ? editingProject.technicalSpecs?.textureResolution : newProject.technicalSpecs?.textureResolution || '4K PBR'}
                        onChange={(e) => {
                          const val = e.target.value;
                          if (editingProject) {
                            setEditingProject({ ...editingProject, technicalSpecs: { ...editingProject.technicalSpecs, textureResolution: val } });
                          } else {
                            setNewProject({ ...newProject, technicalSpecs: { ...(newProject.technicalSpecs as any), textureResolution: val } });
                          }
                        }}
                        className="w-full border border-white/15 bg-[#07080A] p-2 font-mono text-xs text-white focus:border-gold outline-hidden"
                      />
                    </div>

                    <div className="space-y-1">
                      <label className="font-mono text-[9px] uppercase text-white/50 block">Geometry Type</label>
                      <select
                        value={editingProject ? editingProject.technicalSpecs?.geometryType : newProject.technicalSpecs?.geometryType || 'Subdivision Quad'}
                        onChange={(e) => {
                          const val = e.target.value as any;
                          if (editingProject) {
                            setEditingProject({ ...editingProject, technicalSpecs: { ...editingProject.technicalSpecs, geometryType: val } });
                          } else {
                            setNewProject({ ...newProject, technicalSpecs: { ...(newProject.technicalSpecs as any), geometryType: val } });
                          }
                        }}
                        className="w-full border border-white/15 bg-[#07080A] p-2 font-mono text-xs text-white focus:border-gold outline-hidden"
                      >
                        <option value="Subdivision Quad">Subdivision Quad</option>
                        <option value="Game-Ready Low Poly">Game-Ready Low Poly</option>
                        <option value="Procedural Geometry">Procedural Geometry</option>
                        <option value="High-Poly Sculpt">High-Poly Sculpt</option>
                      </select>
                    </div>
                  </div>
                </div>

                {/* Narrative */}
                <div className="space-y-4">
                  <div className="space-y-1">
                    <label className="font-mono text-[10px] uppercase text-white/60 block">Project Description</label>
                    <textarea
                      rows={3}
                      value={editingProject ? editingProject.description : newProject.description || ''}
                      onChange={(e) => {
                        if (editingProject) {
                          setEditingProject({ ...editingProject, description: e.target.value });
                        } else {
                          setNewProject({ ...newProject, description: e.target.value });
                        }
                      }}
                      placeholder="Comprehensive overview of the asset and client objectives..."
                      className="w-full border border-white/15 bg-[#07080A] p-2.5 font-mono text-xs text-white focus:border-gold outline-hidden"
                    />
                  </div>

                  <div className="grid sm:grid-cols-2 gap-4">
                    <div className="space-y-1">
                      <label className="font-mono text-[10px] uppercase text-white/60 block">Engineering Challenge</label>
                      <textarea
                        rows={2}
                        value={editingProject ? editingProject.challenge || '' : newProject.challenge || ''}
                        onChange={(e) => {
                          if (editingProject) {
                            setEditingProject({ ...editingProject, challenge: e.target.value });
                          } else {
                            setNewProject({ ...newProject, challenge: e.target.value });
                          }
                        }}
                        placeholder="Topology pinch points, bevels, poly budget..."
                        className="w-full border border-white/15 bg-[#07080A] p-2 font-mono text-xs text-white focus:border-gold outline-hidden"
                      />
                    </div>

                    <div className="space-y-1">
                      <label className="font-mono text-[10px] uppercase text-white/60 block">Pipeline Process &amp; Outcome</label>
                      <textarea
                        rows={2}
                        value={editingProject ? editingProject.outcome || '' : newProject.outcome || ''}
                        onChange={(e) => {
                          if (editingProject) {
                            setEditingProject({ ...editingProject, outcome: e.target.value });
                          } else {
                            setNewProject({ ...newProject, outcome: e.target.value });
                          }
                        }}
                        placeholder="Delivered 4K textures, commercial turnaround renders..."
                        className="w-full border border-white/15 bg-[#07080A] p-2 font-mono text-xs text-white focus:border-gold outline-hidden"
                      />
                    </div>
                  </div>
                </div>

                <div className="flex items-center gap-4 pt-2 border-t border-white/10">
                  <button
                    type="submit"
                    className="inline-flex items-center gap-2 bg-gold px-8 py-3.5 font-mono text-xs uppercase tracking-wider text-[#07080A] font-bold hover:shadow-[0_0_20px_rgba(212,175,55,0.4)] transition-all cursor-pointer"
                  >
                    {editingProject ? <Save className="h-4 w-4" /> : <Plus className="h-4 w-4" />}
                    <span>{editingProject ? 'Save Changes & Update Project' : 'Publish Project to Live Portfolio'}</span>
                  </button>

                  {editingProject && (
                    <button
                      type="button"
                      onClick={handleCancelEditProject}
                      className="border border-white/20 px-6 py-3.5 font-mono text-xs uppercase text-white/70 hover:text-white transition-colors cursor-pointer"
                    >
                      Cancel
                    </button>
                  )}
                </div>
              </form>
            </div>

            {/* Existing Projects Table with Edit & Delete */}
            <div className="border border-white/10 bg-[#0B0D14] overflow-hidden">
              <div className="p-4 border-b border-white/10 font-mono text-xs uppercase tracking-wider text-white/60 flex items-center justify-between">
                <span>Active Portfolio Projects ({projects.length})</span>
                <span className="text-gold">Click &quot;Edit&quot; to modify any asset, images, or video</span>
              </div>
              <div className="divide-y divide-white/5">
                {projects.map((p) => (
                  <div key={p.id} className="p-4 flex flex-col sm:flex-row sm:items-center justify-between gap-4 hover:bg-white/5 transition-colors">
                    <div className="flex items-center gap-4">
                      <div className="relative h-14 w-24 bg-black rounded overflow-hidden border border-white/10 shrink-0">
                        <Image src={p.heroImage} alt={p.title} fill className="object-cover" />
                        {p.videoUrl && (
                          <div className="absolute top-1 left-1 bg-black/80 px-1 font-mono text-[8px] text-emerald-400 font-bold border border-emerald-500/40">
                            VIDEO
                          </div>
                        )}
                      </div>

                      <div className="space-y-0.5">
                        <div className="flex items-center gap-2">
                          <h4 className="font-display text-base font-bold uppercase text-white">{p.title}</h4>
                          {p.videoUrl && (
                            <span className="font-mono text-[9px] text-[#38BDF8] border border-[#38BDF8]/30 px-1.5 py-0.2 bg-[#38BDF8]/10">
                              Reel Active
                            </span>
                          )}
                        </div>
                        <p className="font-mono text-[11px] text-white/50">
                          {p.category} · {p.year} · {p.technicalSpecs?.faces || 'Subdivision'} Polys · {p.role}
                        </p>
                      </div>
                    </div>

                    <div className="flex items-center gap-2 shrink-0">
                      <button
                        type="button"
                        onClick={() => handleStartEditProject(p)}
                        className="inline-flex items-center gap-1.5 border border-gold/40 bg-gold/10 text-gold px-3 py-1.5 font-mono text-xs uppercase hover:bg-gold hover:text-[#07080A] transition-all cursor-pointer"
                        title="Edit project images, video, and details"
                      >
                        <Edit3 className="h-3.5 w-3.5" />
                        <span>Edit</span>
                      </button>

                      <Link
                        href={`/work/${p.slug}`}
                        target="_blank"
                        className="p-2 text-white/60 hover:text-accent-glow transition-colors border border-white/10 hover:border-white/30"
                        title="View live case study"
                      >
                        <Eye className="h-4 w-4" />
                      </Link>

                      <button
                        type="button"
                        onClick={() => handleDeleteProject(p.id)}
                        className="p-2 text-white/40 hover:text-red-400 transition-colors border border-white/10 hover:border-red-400/40 cursor-pointer"
                        title="Delete project"
                      >
                        <Trash2 className="h-4 w-4" />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* TAB 7: ARTICLES MANAGEMENT */}
        {activeTab === 'articles' && (
          <div className="space-y-12">
            <div ref={articleFormRef} className="border border-white/15 bg-[#0B0D14] p-8 space-y-6 cad-corner-tl">
              <div className="border-b border-white/10 pb-4 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                <div className="flex items-center gap-3">
                  {editingArticle ? (
                    <Edit3 className="h-5 w-5 text-accent-glow" />
                  ) : (
                    <Plus className="h-5 w-5 text-emerald-400" />
                  )}
                  <div>
                    <h3 className="font-display text-xl font-bold uppercase text-white">
                      {editingArticle ? `Editing Article: "${editingArticle.title}"` : 'Publish New Technical Article or Guide'}
                    </h3>
                  </div>
                </div>

                {editingArticle && (
                  <button
                    type="button"
                    onClick={handleCancelEditArticle}
                    className="inline-flex items-center gap-1.5 border border-white/20 px-3 py-1.5 font-mono text-xs uppercase text-white/70 hover:text-white hover:border-white/40 cursor-pointer"
                  >
                    <X className="h-3.5 w-3.5" />
                    <span>Cancel Edit Mode</span>
                  </button>
                )}
              </div>

              <form onSubmit={editingArticle ? handleSaveEditedArticle : handleCreateArticle} className="space-y-6">
                <div className="grid sm:grid-cols-3 gap-4">
                  <div className="space-y-1 sm:col-span-2">
                    <label className="font-mono text-[10px] uppercase text-white/60 block">Article Title *</label>
                    <input
                      type="text"
                      required
                      value={editingArticle ? editingArticle.title : newArticle.title || ''}
                      onChange={(e) => {
                        if (editingArticle) {
                          setEditingArticle({ ...editingArticle, title: e.target.value });
                        } else {
                          setNewArticle({ ...newArticle, title: e.target.value });
                        }
                      }}
                      placeholder="e.g. Advanced Shading in Cycles &amp; Geometry Nodes"
                      className="w-full border border-white/15 bg-[#07080A] p-2.5 font-mono text-xs text-white focus:border-gold outline-hidden"
                    />
                  </div>

                  <div className="space-y-1">
                    <label className="font-mono text-[10px] uppercase text-white/60 block">Category</label>
                    <input
                      type="text"
                      value={editingArticle ? editingArticle.category : newArticle.category || 'Educational'}
                      onChange={(e) => {
                        if (editingArticle) {
                          setEditingArticle({ ...editingArticle, category: e.target.value });
                        } else {
                          setNewArticle({ ...newArticle, category: e.target.value });
                        }
                      }}
                      className="w-full border border-white/15 bg-[#07080A] p-2.5 font-mono text-xs text-white focus:border-gold outline-hidden"
                    />
                  </div>
                </div>

                <div className="grid sm:grid-cols-3 gap-4">
                  <div className="space-y-1 sm:col-span-2">
                    <label className="font-mono text-[10px] uppercase text-white/60 block">Cover Image URL</label>
                    <input
                      type="url"
                      value={editingArticle ? editingArticle.coverImage : newArticle.coverImage || ''}
                      onChange={(e) => {
                        if (editingArticle) {
                          setEditingArticle({ ...editingArticle, coverImage: e.target.value });
                        } else {
                          setNewArticle({ ...newArticle, coverImage: e.target.value });
                        }
                      }}
                      placeholder="https://images.unsplash.com/..."
                      className="w-full border border-white/15 bg-[#07080A] p-2.5 font-mono text-xs text-white focus:border-gold outline-hidden"
                    />
                  </div>

                  <div className="space-y-1">
                    <label className="font-mono text-[10px] uppercase text-white/60 block">Read Time</label>
                    <input
                      type="text"
                      value={editingArticle ? editingArticle.readTime : newArticle.readTime || '5 min read'}
                      onChange={(e) => {
                        if (editingArticle) {
                          setEditingArticle({ ...editingArticle, readTime: e.target.value });
                        } else {
                          setNewArticle({ ...newArticle, readTime: e.target.value });
                        }
                      }}
                      className="w-full border border-white/15 bg-[#07080A] p-2.5 font-mono text-xs text-white focus:border-gold outline-hidden"
                    />
                  </div>
                </div>

                <div className="space-y-1">
                  <label className="font-mono text-[10px] uppercase text-white/60 block">Tags (Comma-separated)</label>
                  <input
                    type="text"
                    value={articleTagsInput}
                    onChange={(e) => setArticleTagsInput(e.target.value)}
                    placeholder="Blender, Cycles, Shading, Geometry Nodes"
                    className="w-full border border-white/15 bg-[#07080A] p-2 font-mono text-xs text-white focus:border-gold outline-hidden"
                  />
                </div>

                <div className="space-y-1">
                  <label className="font-mono text-[10px] uppercase text-white/60 block">Summary / Excerpt *</label>
                  <textarea
                    rows={2}
                    required
                    value={editingArticle ? editingArticle.excerpt : newArticle.excerpt || ''}
                    onChange={(e) => {
                      if (editingArticle) {
                        setEditingArticle({ ...editingArticle, excerpt: e.target.value });
                      } else {
                        setNewArticle({ ...newArticle, excerpt: e.target.value });
                      }
                    }}
                    placeholder="Short preview excerpt for card grids..."
                    className="w-full border border-white/15 bg-[#07080A] p-2.5 font-mono text-xs text-white focus:border-gold outline-hidden resize-none"
                  />
                </div>

                <div className="space-y-2">
                  <label className="font-mono text-[10px] uppercase text-white/60 block">
                    Full Article Content (Markdown Supported)
                  </label>
                  <textarea
                    rows={10}
                    required
                    value={editingArticle ? editingArticle.content : newArticle.content || ''}
                    onChange={(e) => {
                      if (editingArticle) {
                        setEditingArticle({ ...editingArticle, content: e.target.value });
                      } else {
                        setNewArticle({ ...newArticle, content: e.target.value });
                      }
                    }}
                    className="w-full border border-white/15 bg-[#07080A] p-3 font-mono text-xs text-white focus:border-gold outline-hidden leading-relaxed"
                  />
                </div>

                <div className="flex items-center gap-4 pt-2 border-t border-white/10">
                  <button
                    type="submit"
                    className="inline-flex items-center gap-2 bg-gold px-8 py-3.5 font-mono text-xs uppercase tracking-wider text-[#07080A] font-bold hover:shadow-[0_0_20px_rgba(212,175,55,0.4)] transition-all cursor-pointer"
                  >
                    {editingArticle ? <Save className="h-4 w-4" /> : <Plus className="h-4 w-4" />}
                    <span>{editingArticle ? 'Save Changes & Update Article' : 'Publish Article Live'}</span>
                  </button>

                  {editingArticle && (
                    <button
                      type="button"
                      onClick={handleCancelEditArticle}
                      className="border border-white/20 px-6 py-3.5 font-mono text-xs uppercase text-white/70 hover:text-white transition-colors cursor-pointer"
                    >
                      Cancel
                    </button>
                  )}
                </div>
              </form>
            </div>

            {/* Articles List with Edit and Delete */}
            <div className="border border-white/10 bg-[#0B0D14] overflow-hidden">
              <div className="p-4 border-b border-white/10 font-mono text-xs uppercase tracking-wider text-white/60 flex items-center justify-between">
                <span>Active Articles &amp; Insights ({articles.length})</span>
                <span className="text-gold">Click &quot;Edit&quot; to modify content or tags</span>
              </div>
              <div className="divide-y divide-white/5">
                {articles.map((a) => (
                  <div key={a.id} className="p-4 flex flex-col sm:flex-row sm:items-center justify-between gap-4 hover:bg-white/5 transition-colors">
                    <div className="flex items-center gap-4">
                      {a.coverImage && (
                        <div className="relative h-12 w-20 bg-black rounded overflow-hidden border border-white/10 shrink-0">
                          <Image src={a.coverImage} alt={a.title} fill className="object-cover" />
                        </div>
                      )}
                      <div>
                        <h4 className="font-display text-base font-bold uppercase text-white">{a.title}</h4>
                        <p className="font-mono text-[11px] text-white/40">
                          {a.category} · {a.publishedDate} · {a.readTime}
                        </p>
                      </div>
                    </div>

                    <div className="flex items-center gap-2 shrink-0">
                      <button
                        type="button"
                        onClick={() => handleStartEditArticle(a)}
                        className="inline-flex items-center gap-1.5 border border-accent-glow/40 bg-accent-glow/10 text-accent-glow px-3 py-1.5 font-mono text-xs uppercase hover:bg-accent-glow hover:text-[#07080A] transition-all cursor-pointer"
                        title="Edit article"
                      >
                        <Edit3 className="h-3.5 w-3.5" />
                        <span>Edit</span>
                      </button>

                      <Link
                        href={`/articles/${a.slug}`}
                        target="_blank"
                        className="p-2 text-white/60 hover:text-accent-glow transition-colors border border-white/10 hover:border-white/30"
                        title="View live article"
                      >
                        <Eye className="h-4 w-4" />
                      </Link>

                      <button
                        type="button"
                        onClick={() => handleDeleteArticle(a.id)}
                        className="p-2 text-white/40 hover:text-red-400 transition-colors border border-white/10 hover:border-red-400/40 cursor-pointer"
                        title="Delete article"
                      >
                        <Trash2 className="h-4 w-4" />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* TAB 8: ASSET & SOURCE ANTI-THEFT SECURITY SHIELD */}
        {activeTab === 'security' && (
          <div className="space-y-8">
            <div className="border border-white/15 bg-[#0B0D14] p-8 space-y-4 cad-corner-tl">
              <div className="flex items-center gap-3 border-b border-white/10 pb-4">
                <ShieldAlert className="h-6 w-6 text-emerald-400" />
                <div>
                  <h3 className="font-display text-2xl font-black uppercase text-white">
                    Source Code &amp; 3D Asset Anti-Theft Security Shield
                  </h3>
                  <p className="font-mono text-xs text-emerald-400 uppercase tracking-widest">
                    Protect 3D Models, Video Reels &amp; Source Code from Inspection &amp; Direct Downloads
                  </p>
                </div>
              </div>
              <p className="text-xs text-slate-300 font-mono leading-relaxed">
                Prevents casual visitors, competitor scrapers, and asset rippers from easily inspecting element source code, viewing page sources, right-clicking to save video reels, or dragging renders off your site.
              </p>
            </div>

            <form
              onSubmit={(e) => {
                e.preventDefault();
                updateSecuritySettings(securityForm);
                flashNotice('Security Shield settings updated and enforced live!');
              }}
              className="border border-white/15 bg-[#0B0D14] p-8 space-y-8"
            >
              {/* Master Toggle */}
              <div className="border-b border-white/10 pb-6 flex items-center justify-between">
                <div>
                  <h4 className="font-display text-base font-bold uppercase text-white">
                    Master Shield Activation
                  </h4>
                  <p className="font-mono text-xs text-white/50">
                    Turn on/off all anti-theft and inspection protection features site-wide.
                  </p>
                </div>
                <label className="relative inline-flex items-center cursor-pointer">
                  <input
                    type="checkbox"
                    checked={securityForm.enabled}
                    onChange={(e) => setSecurityForm({ ...securityForm, enabled: e.target.checked })}
                    className="sr-only peer"
                  />
                  <div className="w-11 h-6 bg-white/20 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-emerald-500"></div>
                </label>
              </div>

              {/* Individual Security Shields */}
              <div className="grid sm:grid-cols-2 gap-6">
                <div className="border border-white/10 bg-[#07090F] p-5 space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="font-display text-sm font-bold uppercase text-white">
                      1. Disable Right-Click Context Menu
                    </span>
                    <input
                      type="checkbox"
                      checked={securityForm.disableRightClick}
                      onChange={(e) => setSecurityForm({ ...securityForm, disableRightClick: e.target.checked })}
                      className="h-4 w-4 accent-gold"
                    />
                  </div>
                  <p className="font-mono text-xs text-slate-400 leading-relaxed">
                    Blocks right-clicking on pages and media. Shows a sleek tactical floating HUD notification informing visitors that assets are copyright protected.
                  </p>
                </div>

                <div className="border border-white/10 bg-[#07090F] p-5 space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="font-display text-sm font-bold uppercase text-white">
                      2. DevTools &amp; View Source KeyBlock
                    </span>
                    <input
                      type="checkbox"
                      checked={securityForm.disableDevToolsShortcuts}
                      onChange={(e) => setSecurityForm({ ...securityForm, disableDevToolsShortcuts: e.target.checked })}
                      className="h-4 w-4 accent-gold"
                    />
                  </div>
                  <p className="font-mono text-xs text-slate-400 leading-relaxed">
                    Intercepts shortcut keys: <code className="text-gold">F12</code>, <code className="text-gold">Ctrl+Shift+I</code>, <code className="text-gold">Ctrl+Shift+J</code>, <code className="text-gold">Ctrl+U</code> (View Source), and <code className="text-gold">Ctrl+S</code> (Save Page).
                  </p>
                </div>

                <div className="border border-white/10 bg-[#07090F] p-5 space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="font-display text-sm font-bold uppercase text-white">
                      3. Media Drag &amp; Drop Download Shield
                    </span>
                    <input
                      type="checkbox"
                      checked={securityForm.disableDragAndDrop}
                      onChange={(e) => setSecurityForm({ ...securityForm, disableDragAndDrop: e.target.checked })}
                      className="h-4 w-4 accent-gold"
                    />
                  </div>
                  <p className="font-mono text-xs text-slate-400 leading-relaxed">
                    Disables HTML5 media dragging and prevents users from dragging 3D renders or images off the website into their desktop folders.
                  </p>
                </div>

                <div className="border border-white/10 bg-[#07090F] p-5 space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="font-display text-sm font-bold uppercase text-white">
                      4. Console Anti-Scraping Banner
                    </span>
                    <input
                      type="checkbox"
                      checked={securityForm.consoleWarning}
                      onChange={(e) => setSecurityForm({ ...securityForm, consoleWarning: e.target.checked })}
                      className="h-4 w-4 accent-gold"
                    />
                  </div>
                  <p className="font-mono text-xs text-slate-400 leading-relaxed">
                    Outputs an official ASCII copyright warning banner in the developer console reminding anyone inspecting of legal intellectual property boundaries.
                  </p>
                </div>
              </div>

              <button
                type="submit"
                className="inline-flex items-center gap-2 bg-gradient-to-r from-emerald-600 to-teal-600 px-8 py-3.5 font-mono text-xs uppercase tracking-wider text-white font-bold hover:from-emerald-500 hover:to-teal-500 transition-all cursor-pointer shadow-[0_0_20px_rgba(16,185,129,0.3)]"
              >
                <Save className="h-4 w-4" />
                <span>Save &amp; Enforce Security Settings Live</span>
              </button>
            </form>
          </div>
        )}

        {/* TAB 9: VIDEO INTEGRATION GUIDE */}
        {activeTab === 'guide' && (
          <div className="space-y-8">
            <div className="border border-white/15 bg-[#0B0D14] p-8 space-y-4 cad-corner-tl">
              <div className="flex items-center gap-3 border-b border-white/10 pb-4">
                <Video className="h-6 w-6 text-[#38BDF8]" />
                <div>
                  <h3 className="font-display text-2xl font-black uppercase text-white">
                    How To Add &amp; Manage Videos (Complete Guide)
                  </h3>
                  <p className="font-mono text-xs text-[#38BDF8] uppercase tracking-widest">
                    Step-By-Step Instructions for Local MP4s, Cloud CDNs &amp; Project Hover Reels
                  </p>
                </div>
              </div>
            </div>

            <div className="border border-white/10 bg-[#07090F] p-6 space-y-4">
              <h4 className="font-display text-lg font-bold uppercase text-white">
                1. Add Local MP4 Files (Fastest &amp; Offline Ready)
              </h4>
              <div className="space-y-3 font-mono text-xs text-slate-300 leading-relaxed pl-4">
                <p>Copy your .mp4 file into the folder on your computer:</p>
                <div className="bg-[#0B0D14] border border-white/15 p-4 rounded text-[#38BDF8]">
                  <p className="font-bold select-all">c:\Users\pethu\Downloads\port 2\public\videos\</p>
                </div>
                <p>Then in Admin &gt; Page Videos &gt; Add Video Asset, enter Path as: <code className="text-emerald-400 font-bold">/videos/your-filename.mp4</code></p>
              </div>
            </div>

            <div className="border border-white/10 bg-[#07090F] p-6 space-y-4">
              <h4 className="font-display text-lg font-bold uppercase text-white">
                2. Use Cloud Hosting or CDN Links (Unlimited Storage)
              </h4>
              <div className="space-y-3 font-mono text-xs text-slate-300 leading-relaxed pl-4">
                <p>Upload video to Cloudinary, AWS S3, Supabase, or GitHub Releases and paste the direct .mp4 URL into any page or project video field.</p>
              </div>
            </div>

            <div className="border border-white/10 bg-[#07090F] p-6 space-y-4">
              <h4 className="font-display text-lg font-bold uppercase text-white">
                3. Attaching Videos to Projects for Hover Motion
              </h4>
              <div className="space-y-3 font-mono text-xs text-slate-300 leading-relaxed pl-4">
                <p>Set &quot;Project Video Reel URL&quot; on any project in the Projects tab. Hovering that project on /work automatically streams the motion reel!</p>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
