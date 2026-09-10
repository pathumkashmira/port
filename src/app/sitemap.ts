import { MetadataRoute } from 'next';
import { INITIAL_PROJECTS } from '@/data/projects';
import { INITIAL_ARTICLES } from '@/data/articles';

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = 'https://pethum.dev';

  const staticPages = [
    '',
    '/work',
    '/about',
    '/journey',
    '/articles',
    '/ventures',
    '/fiverr',
    '/contact',
  ].map((route) => ({
    url: `${baseUrl}${route}`,
    lastModified: new Date(),
    changeFrequency: 'weekly' as const,
    priority: route === '' ? 1.0 : 0.8,
  }));

  const projectPages = INITIAL_PROJECTS.map((project) => ({
    url: `${baseUrl}/work/${project.slug}`,
    lastModified: new Date(),
    changeFrequency: 'monthly' as const,
    priority: 0.9,
  }));

  const articlePages = INITIAL_ARTICLES.map((article) => ({
    url: `${baseUrl}/articles/${article.slug}`,
    lastModified: new Date(),
    changeFrequency: 'monthly' as const,
    priority: 0.7,
  }));

  return [...staticPages, ...projectPages, ...articlePages];
}
