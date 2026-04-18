import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { tools, getToolBySlug, getRelatedTools, getSimilarTools, categories } from '@/lib/data';
import ToolDetailClient from './ToolDetailClient';

const BASE_URL = process.env.NEXT_PUBLIC_APP_URL || 'https://kiro-two-tau.vercel.app';

export function generateStaticParams() {
  return tools.map((tool) => ({ slug: tool.slug }));
}

export async function generateMetadata(
  props: { params: Promise<{ slug: string }> }
): Promise<Metadata> {
  const { slug } = await props.params;
  const tool = getToolBySlug(slug);
  if (!tool) return { title: 'Tool Not Found' };

  const categoryLabel = tool.category.replace(/-/g, ' ');
  const title = `${tool.name} Review (2026): Features, Pricing & Alternatives`;
  const description = `${tool.name} is an AI tool for ${categoryLabel}. Explore features, pricing, and the best alternatives.`;
  const canonical = `${BASE_URL}/tools/${tool.slug}`;

  return {
    title,
    description,
    keywords: [
      'AI tools',
      tool.name,
      'best AI tools',
      `${categoryLabel} AI tools`,
      `${tool.name} review`,
      `${tool.name} alternatives`,
      `${tool.name} pricing`,
    ],
    alternates: {
      canonical,
    },
    openGraph: {
      title: `${title} | KIRO`,
      description,
      url: canonical,
      siteName: 'KIRO',
      type: 'website',
      locale: 'en_US',
    },
    twitter: {
      card: 'summary_large_image',
      title: `${title} | KIRO`,
      description,
    },
  };
}

export default async function ToolPage(props: { params: Promise<{ slug: string }> }) {
  const { slug } = await props.params;
  const tool = getToolBySlug(slug);

  if (!tool) notFound();

  const relatedTools = getRelatedTools(tool.slug, tool.category);
  const similarTools = getSimilarTools(tool.slug, tool.category);
  const category = categories.find((c) => c.slug === tool.category);

  return (
    <ToolDetailClient
      tool={tool}
      relatedTools={relatedTools}
      similarTools={similarTools}
      category={category}
    />
  );
}
