'use client';

import { useState, useEffect } from 'react';
import { 
  Project, 
  Article, 
  JourneyItem, 
  SiteSettings, 
  SelectedWorkConfig, 
  ThemeColorsConfig, 
  SecuritySettings, 
  CustomPage, 
  VideoAsset, 
  PageVideos,
  PageSection,
  ManagedPage,
  WorkPreviewMode
} from '@/types';
import { INITIAL_PROJECTS } from '@/data/projects';
import { INITIAL_ARTICLES } from '@/data/articles';
import { INITIAL_JOURNEY } from '@/data/journey';
import { 
  SITE_CONFIG, 
  DEFAULT_SELECTED_WORK, 
  DEFAULT_THEME_COLORS, 
  DEFAULT_SECURITY, 
  DEFAULT_CUSTOM_PAGES,
  DEFAULT_STANDARD_PAGES
} from '@/data/siteConfig';

const STORAGE_KEYS = {
  PROJECTS: 'pk_studio_projects_v1',
  ARTICLES: 'pk_studio_articles_v1',
  JOURNEY: 'pk_studio_journey_v1',
  SETTINGS: 'pk_studio_settings_v1',
};

export function useStudioStore() {
  const [projects, setProjects] = useState<Project[]>(INITIAL_PROJECTS);
  const [articles, setArticles] = useState<Article[]>(INITIAL_ARTICLES);
  const [journey, setJourney] = useState<JourneyItem[]>(INITIAL_JOURNEY);
  const [settings, setSettings] = useState<SiteSettings>(SITE_CONFIG);
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    try {
      const storedProjects = localStorage.getItem(STORAGE_KEYS.PROJECTS);
      if (storedProjects) {
        setProjects(JSON.parse(storedProjects));
      } else {
        localStorage.setItem(STORAGE_KEYS.PROJECTS, JSON.stringify(INITIAL_PROJECTS));
      }

      const storedArticles = localStorage.getItem(STORAGE_KEYS.ARTICLES);
      if (storedArticles) {
        setArticles(JSON.parse(storedArticles));
      } else {
        localStorage.setItem(STORAGE_KEYS.ARTICLES, JSON.stringify(INITIAL_ARTICLES));
      }

      const storedJourney = localStorage.getItem(STORAGE_KEYS.JOURNEY);
      if (storedJourney) {
        setJourney(JSON.parse(storedJourney));
      } else {
        localStorage.setItem(STORAGE_KEYS.JOURNEY, JSON.stringify(INITIAL_JOURNEY));
      }

      const storedSettings = localStorage.getItem(STORAGE_KEYS.SETTINGS);
      if (storedSettings) {
        const parsed = JSON.parse(storedSettings);
        setSettings({
          ...SITE_CONFIG,
          ...parsed,
          pageVideos: {
            ...SITE_CONFIG.pageVideos,
            ...(parsed.pageVideos || {}),
          },
          selectedWork: {
            ...DEFAULT_SELECTED_WORK,
            ...(parsed.selectedWork || {}),
          },
          themeColors: {
            ...DEFAULT_THEME_COLORS,
            ...(parsed.themeColors || {}),
          },
          security: {
            ...DEFAULT_SECURITY,
            ...(parsed.security || {}),
          },
          pageConfigs: {
            ...DEFAULT_STANDARD_PAGES,
            ...(parsed.pageConfigs || {}),
          },
          customPages: parsed.customPages || DEFAULT_CUSTOM_PAGES,
        });
      } else {
        localStorage.setItem(STORAGE_KEYS.SETTINGS, JSON.stringify(SITE_CONFIG));
      }
    } catch (e) {
      console.warn('Storage read error, using initial data:', e);
    } finally {
      setIsLoaded(true);
    }
  }, []);

  const updateProjects = (newProjects: Project[]) => {
    setProjects(newProjects);
    try {
      localStorage.setItem(STORAGE_KEYS.PROJECTS, JSON.stringify(newProjects));
    } catch (e) {
      console.error('Failed to save projects:', e);
    }
  };

  const addProject = (project: Project) => {
    const updated = [project, ...projects];
    updateProjects(updated);
  };

  const editProject = (updatedProject: Project) => {
    const updated = projects.map((p) => p.id === updatedProject.id ? updatedProject : p);
    updateProjects(updated);
  };

  const deleteProject = (projectId: string) => {
    const updated = projects.filter((p) => p.id !== projectId);
    updateProjects(updated);
  };

  const updateArticles = (newArticles: Article[]) => {
    setArticles(newArticles);
    try {
      localStorage.setItem(STORAGE_KEYS.ARTICLES, JSON.stringify(newArticles));
    } catch (e) {
      console.error('Failed to save articles:', e);
    }
  };

  const addArticle = (article: Article) => {
    const updated = [article, ...articles];
    updateArticles(updated);
  };

  const editArticle = (updatedArticle: Article) => {
    const updated = articles.map((a) => a.id === updatedArticle.id ? updatedArticle : a);
    updateArticles(updated);
  };

  const deleteArticle = (articleId: string) => {
    const updated = articles.filter((a) => a.id !== articleId);
    updateArticles(updated);
  };

  const updateJourney = (newJourney: JourneyItem[]) => {
    setJourney(newJourney);
    try {
      localStorage.setItem(STORAGE_KEYS.JOURNEY, JSON.stringify(newJourney));
    } catch (e) {
      console.error('Failed to save journey:', e);
    }
  };

  const updateSettings = (newSettings: SiteSettings) => {
    setSettings(newSettings);
    try {
      localStorage.setItem(STORAGE_KEYS.SETTINGS, JSON.stringify(newSettings));
    } catch (e) {
      console.error('Failed to save settings:', e);
    }
  };

  const updatePageVideo = (pageKey: keyof PageVideos, videoPath: string) => {
    const updatedSettings: SiteSettings = {
      ...settings,
      pageVideos: {
        ...(settings.pageVideos || SITE_CONFIG.pageVideos!),
        [pageKey]: videoPath,
      },
    };
    updateSettings(updatedSettings);
  };

  const addCustomVideo = (video: VideoAsset) => {
    const existing = settings.customVideos || [];
    const updated = [video, ...existing.filter((v) => v.id !== video.id)];
    updateSettings({
      ...settings,
      customVideos: updated,
    });
  };

  const deleteCustomVideo = (videoId: string) => {
    const existing = settings.customVideos || [];
    const updated = existing.filter((v) => v.id !== videoId);
    updateSettings({
      ...settings,
      customVideos: updated,
    });
  };

  // Selected Work Controls
  const updateSelectedWork = (selectedWork: SelectedWorkConfig) => {
    updateSettings({
      ...settings,
      selectedWork,
    });
  };

  const addProjectToSelectedWork = (projectId: string, mode?: WorkPreviewMode) => {
    const current = settings.selectedWork?.itemIds || [];
    if (current.includes(projectId)) return;
    const updatedIds = [projectId, ...current];
    const previewModes = { ...(settings.selectedWork?.itemPreviewModes || {}) };
    if (mode) previewModes[projectId] = mode;
    updateSettings({
      ...settings,
      selectedWork: {
        ...(settings.selectedWork || DEFAULT_SELECTED_WORK),
        itemIds: updatedIds,
        itemPreviewModes: previewModes,
      },
    });
  };

  const removeProjectFromSelectedWork = (projectId: string) => {
    const current = settings.selectedWork?.itemIds || [];
    const updatedIds = current.filter((id) => id !== projectId);
    const previewModes = { ...(settings.selectedWork?.itemPreviewModes || {}) };
    delete previewModes[projectId];
    updateSettings({
      ...settings,
      selectedWork: {
        ...(settings.selectedWork || DEFAULT_SELECTED_WORK),
        itemIds: updatedIds,
        itemPreviewModes: previewModes,
      },
    });
  };

  const reorderSelectedWork = (projectId: string, direction: 'up' | 'down') => {
    const current = [...(settings.selectedWork?.itemIds || [])];
    const index = current.indexOf(projectId);
    if (index === -1) return;
    if (direction === 'up' && index > 0) {
      const temp = current[index - 1];
      current[index - 1] = current[index];
      current[index] = temp;
    } else if (direction === 'down' && index < current.length - 1) {
      const temp = current[index + 1];
      current[index + 1] = current[index];
      current[index] = temp;
    }
    updateSettings({
      ...settings,
      selectedWork: {
        ...(settings.selectedWork || DEFAULT_SELECTED_WORK),
        itemIds: current,
      },
    });
  };

  const setProjectPreviewMode = (projectId: string, mode: WorkPreviewMode) => {
    updateSettings({
      ...settings,
      selectedWork: {
        ...(settings.selectedWork || DEFAULT_SELECTED_WORK),
        itemPreviewModes: {
          ...(settings.selectedWork?.itemPreviewModes || {}),
          [projectId]: mode,
        },
      },
    });
  };

  // Theme Colors Controls
  const updateThemeColors = (themeColors: ThemeColorsConfig) => {
    updateSettings({
      ...settings,
      themeColors,
    });
  };

  // Security Controls
  const updateSecuritySettings = (security: SecuritySettings) => {
    updateSettings({
      ...settings,
      security,
    });
  };

  // Custom Pages Controls
  const addCustomPage = (page: CustomPage) => {
    const existing = settings.customPages || [];
    const updated = [...existing.filter((p) => p.id !== page.id && p.slug !== page.slug), page];
    updateSettings({
      ...settings,
      customPages: updated,
    });
  };

  const editCustomPage = (updatedPage: CustomPage) => {
    const existing = settings.customPages || [];
    const updated = existing.map((p) => p.id === updatedPage.id ? updatedPage : p);
    updateSettings({
      ...settings,
      customPages: updated,
    });
  };

  const deleteCustomPage = (pageId: string) => {
    const existing = settings.customPages || [];
    const updated = existing.filter((p) => p.id !== pageId);
    updateSettings({
      ...settings,
      customPages: updated,
    });
  };

  // Standard & Dynamic Page Sections Management
  const updatePageSection = (pageId: string, sectionId: string, updates: Partial<PageSection>) => {
    const configs = { ...DEFAULT_STANDARD_PAGES, ...(settings.pageConfigs || {}) };
    const targetPage = configs[pageId];
    if (!targetPage) return;

    const updatedSections = (targetPage.sections || []).map((sec) =>
      sec.id === sectionId ? { ...sec, ...updates } : sec
    );

    updateSettings({
      ...settings,
      pageConfigs: {
        ...configs,
        [pageId]: {
          ...targetPage,
          sections: updatedSections,
        },
      },
    });
  };

  const togglePageSection = (pageId: string, sectionId: string) => {
    const configs = { ...DEFAULT_STANDARD_PAGES, ...(settings.pageConfigs || {}) };
    const targetPage = configs[pageId];
    if (!targetPage) return;

    const updatedSections = (targetPage.sections || []).map((sec) =>
      sec.id === sectionId ? { ...sec, enabled: !sec.enabled } : sec
    );

    updateSettings({
      ...settings,
      pageConfigs: {
        ...configs,
        [pageId]: {
          ...targetPage,
          sections: updatedSections,
        },
      },
    });
  };

  const reorderPageSection = (pageId: string, sectionId: string, direction: 'up' | 'down') => {
    const configs = { ...DEFAULT_STANDARD_PAGES, ...(settings.pageConfigs || {}) };
    const targetPage = configs[pageId];
    if (!targetPage) return;

    const sections = [...(targetPage.sections || [])].sort((a, b) => a.order - b.order);
    const index = sections.findIndex((s) => s.id === sectionId);
    if (index === -1) return;

    const targetIndex = direction === 'up' ? index - 1 : index + 1;
    if (targetIndex < 0 || targetIndex >= sections.length) return;

    const currentOrder = sections[index].order;
    const targetOrder = sections[targetIndex].order;
    sections[index].order = targetOrder;
    sections[targetIndex].order = currentOrder;

    updateSettings({
      ...settings,
      pageConfigs: {
        ...configs,
        [pageId]: {
          ...targetPage,
          sections,
        },
      },
    });
  };

  const addSectionToPage = (pageId: string, section: PageSection) => {
    const configs = { ...DEFAULT_STANDARD_PAGES, ...(settings.pageConfigs || {}) };
    const targetPage = configs[pageId];
    if (!targetPage) return;

    const existingSections = targetPage.sections || [];
    const maxOrder = existingSections.reduce((max, s) => Math.max(max, s.order || 0), 0);
    const newSection = {
      ...section,
      order: section.order || maxOrder + 1,
    };

    updateSettings({
      ...settings,
      pageConfigs: {
        ...configs,
        [pageId]: {
          ...targetPage,
          sections: [...existingSections, newSection],
        },
      },
    });
  };

  const removeSectionFromPage = (pageId: string, sectionId: string) => {
    const configs = { ...DEFAULT_STANDARD_PAGES, ...(settings.pageConfigs || {}) };
    const targetPage = configs[pageId];
    if (!targetPage) return;

    const updatedSections = (targetPage.sections || []).filter((s) => s.id !== sectionId);

    updateSettings({
      ...settings,
      pageConfigs: {
        ...configs,
        [pageId]: {
          ...targetPage,
          sections: updatedSections,
        },
      },
    });
  };

  const resetPageToDefault = (pageId: string) => {
    if (DEFAULT_STANDARD_PAGES[pageId]) {
      const configs = { ...DEFAULT_STANDARD_PAGES, ...(settings.pageConfigs || {}) };
      updateSettings({
        ...settings,
        pageConfigs: {
          ...configs,
          [pageId]: { ...DEFAULT_STANDARD_PAGES[pageId] },
        },
      });
    }
  };

  const updatePageMeta = (pageId: string, updates: Partial<ManagedPage>) => {
    const configs = { ...DEFAULT_STANDARD_PAGES, ...(settings.pageConfigs || {}) };
    const targetPage = configs[pageId];
    if (!targetPage) return;

    updateSettings({
      ...settings,
      pageConfigs: {
        ...configs,
        [pageId]: {
          ...targetPage,
          ...updates,
        },
      },
    });
  };

  // Backup & Export / Import
  const exportPortfolioData = () => {
    const payload = {
      exportedAt: new Date().toISOString(),
      version: '1.0.0',
      projects,
      articles,
      journey,
      settings,
    };
    return JSON.stringify(payload, null, 2);
  };

  const importPortfolioData = (jsonString: string): boolean => {
    try {
      const data = JSON.parse(jsonString);
      if (data.projects) updateProjects(data.projects);
      if (data.articles) updateArticles(data.articles);
      if (data.journey) updateJourney(data.journey);
      if (data.settings) updateSettings(data.settings);
      return true;
    } catch (e) {
      console.error('Failed to import portfolio data:', e);
      return false;
    }
  };

  const resetToDefaults = () => {
    setProjects(INITIAL_PROJECTS);
    setArticles(INITIAL_ARTICLES);
    setJourney(INITIAL_JOURNEY);
    setSettings(SITE_CONFIG);
    try {
      localStorage.setItem(STORAGE_KEYS.PROJECTS, JSON.stringify(INITIAL_PROJECTS));
      localStorage.setItem(STORAGE_KEYS.ARTICLES, JSON.stringify(INITIAL_ARTICLES));
      localStorage.setItem(STORAGE_KEYS.JOURNEY, JSON.stringify(INITIAL_JOURNEY));
      localStorage.setItem(STORAGE_KEYS.SETTINGS, JSON.stringify(SITE_CONFIG));
    } catch (e) {
      console.error(e);
    }
  };

  return {
    projects,
    articles,
    journey,
    settings,
    isLoaded,
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
    updatePageVideo,
    addCustomVideo,
    deleteCustomVideo,
    updateSelectedWork,
    addProjectToSelectedWork,
    removeProjectFromSelectedWork,
    reorderSelectedWork,
    setProjectPreviewMode,
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
  };
}
