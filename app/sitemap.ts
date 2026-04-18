import { MetadataRoute } from 'next';
import { tools, categories, Persona } from '@/lib/data';

const baseUrl = process.env.NEXT_PUBLIC_APP_URL || 'https://kiro-ai.vercel.app';

export default function sitemap(): MetadataRoute.Sitemap {
  // Base routes
  const routes = [
    {
      url: `${baseUrl}`,
      lastModified: new Date(),
      changeFrequency: 'daily' as const,
      priority: 1,
    },
    {
      url: `${baseUrl}/categories`,
      lastModified: new Date(),
      changeFrequency: 'weekly' as const,
      priority: 0.8,
    },
  ];

  // Tool routes
  const toolRoutes = tools.map((tool) => ({
    url: `${baseUrl}/tools/${tool.slug}`,
    lastModified: new Date(tool.updatedAt || new Date()),
    changeFrequency: 'weekly' as const,
    priority: 0.7,
  }));

  // Category routes
  const categoryRoutes = categories.map((cat) => ({
    url: `${baseUrl}/categories/${cat.slug}`,
    lastModified: new Date(),
    changeFrequency: 'weekly' as const,
    priority: 0.8,
  }));

  // Persona routes
  const validPersonas: Persona[] = ["students", "developers", "marketers"];
  const personaRoutes = validPersonas.map((persona) => ({
    url: `${baseUrl}/discover/${persona}`,
    lastModified: new Date(),
    changeFrequency: 'weekly' as const,
    priority: 0.9,
  }));

  return [...routes, ...toolRoutes, ...categoryRoutes, ...personaRoutes];
}
