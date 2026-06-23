import { MetadataRoute } from 'next';
import { tools, categories, intents, getComparisons, Persona } from '@/lib/data';
import { blogPosts } from '@/lib/blog';

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
      url: `${BASE_URL}/category`,
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
    {
      url: `${BASE_URL}/about`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.6,
    },
    {
      url: `${BASE_URL}/tools`,
      lastModified: new Date(),
      changeFrequency: 'daily',
      priority: 0.95,
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
    url: `${BASE_URL}/category/${cat.slug}`,
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

  // Blog pages
  const blogRoutes: MetadataRoute.Sitemap = [
    {
      url: `${BASE_URL}/blog`,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 0.9,
    },
    ...blogPosts.map((post) => ({
      url: `${BASE_URL}/blog/${post.slug}`,
      lastModified: new Date(post.date),
      changeFrequency: 'monthly',
      priority: 0.8,
    }))
  ] as MetadataRoute.Sitemap;

  // Comparison pages (Category scoped showdowns)
  const compareRoutes: MetadataRoute.Sitemap = getComparisons().map((comp) => ({
    url: `${BASE_URL}/compare/${comp.slug}`,
    lastModified: new Date(),
    changeFrequency: 'monthly',
    priority: 0.7,
  }));

  // Intent / use-case pages
  const intentRoutes: MetadataRoute.Sitemap = intents.map((intent) => ({
    url: `${BASE_URL}/intents/${intent.slug}`,
    lastModified: new Date(),
    changeFrequency: 'weekly',
    priority: 0.85,
  }));

  return [
    ...staticRoutes, 
    ...toolRoutes, 
    ...categoryRoutes, 
    ...personaRoutes,
    ...blogRoutes,
    ...compareRoutes,
    ...intentRoutes,
  ];
}
