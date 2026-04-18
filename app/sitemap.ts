import { MetadataRoute } from 'next';
import { tools, categories, Persona } from '@/lib/data';

const BASE_URL = process.env.NEXT_PUBLIC_APP_URL || 'https://kiro-two-tau.vercel.app';

export default function sitemap(): MetadataRoute.Sitemap {
  // Base / priority routes
  const staticRoutes: MetadataRoute.Sitemap = [
    {
      url: BASE_URL,
      lastModified: new Date(),
      changeFrequency: 'daily',
      priority: 1,
    },
    {
      url: `${BASE_URL}/categories`,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 0.9,
    },
    // Future SEO landing pages (scaffolded for programmatic SEO)
    {
      url: `${BASE_URL}/best-ai-tools`,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 0.9,
    },
    {
      url: `${BASE_URL}/ai-tools-for-students`,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 0.85,
    },
    {
      url: `${BASE_URL}/free-ai-tools`,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 0.85,
    },
    {
      url: `${BASE_URL}/chatgpt-alternatives`,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 0.85,
    },
  ];

  // Individual tool pages — highest-value programmatic SEO pages
  const toolRoutes: MetadataRoute.Sitemap = tools.map((tool) => ({
    url: `${BASE_URL}/tools/${tool.slug}`,
    lastModified: new Date(tool.updatedAt || new Date()),
    changeFrequency: 'weekly',
    priority: 0.8,
  }));

  // Category pages
  const categoryRoutes: MetadataRoute.Sitemap = categories.map((cat) => ({
    url: `${BASE_URL}/categories/${cat.slug}`,
    lastModified: new Date(),
    changeFrequency: 'weekly',
    priority: 0.8,
  }));

  // Persona / discovery pages
  const validPersonas: Persona[] = ['students', 'developers', 'marketers'];
  const personaRoutes: MetadataRoute.Sitemap = validPersonas.map((persona) => ({
    url: `${BASE_URL}/discover/${persona}`,
    lastModified: new Date(),
    changeFrequency: 'weekly',
    priority: 0.9,
  }));

  return [...staticRoutes, ...toolRoutes, ...categoryRoutes, ...personaRoutes];
}
