import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { categories, getToolsByCategory, getCategoryBySlug } from '@/lib/data';
import CategoryDetailClient from './CategoryDetailClient';

const BASE_URL = process.env.NEXT_PUBLIC_APP_URL || 'https://kiro-two-tau.vercel.app';

export function generateStaticParams() {
  return categories.map((cat) => ({ category: cat.slug }));
}

export async function generateMetadata(
  props: { params: Promise<{ category: string }> }
): Promise<Metadata> {
  const { category } = await props.params;
  const cat = getCategoryBySlug(category);
  if (!cat) return {};

  const toolCount = getToolsByCategory(cat.slug).length;
  const title = `Best ${cat.name} AI Tools (2026) – ${toolCount}+ Curated Tools`;
  const description = `Explore the best ${cat.name.toLowerCase()} AI tools of 2026. KIRO has curated ${toolCount}+ top-rated tools with honest reviews, features, pricing, and alternatives.`;
  const canonical = `${BASE_URL}/categories/${cat.slug}`;

  return {
    title,
    description,
    keywords: [
      `${cat.name} AI tools`,
      `best ${cat.name.toLowerCase()} tools`,
      `AI tools for ${cat.name.toLowerCase()}`,
      `${cat.name.toLowerCase()} tools 2026`,
      'AI tools directory',
      'KIRO',
    ],
    alternates: { canonical },
    openGraph: {
      title: `${title} | KIRO`,
      description,
      url: canonical,
      siteName: 'KIRO',
      type: 'website',
    },
    twitter: {
      card: 'summary_large_image',
      title: `${title} | KIRO`,
      description,
    },
  };
}

export default async function CategoryPage(props: { params: Promise<{ category: string }> }) {
  const { category } = await props.params;
  const cat = getCategoryBySlug(category);

  if (!cat) notFound();

  const categoryTools = getToolsByCategory(cat.slug);

  return <CategoryDetailClient category={cat} tools={categoryTools} />;
}
