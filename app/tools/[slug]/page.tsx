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
  if (!tool) return {};

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
    alternates: { canonical },
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
  const categoryLabel = (category?.name || tool.category).toLowerCase();

  // Built server-side so Google can crawl it in initial HTML (client component can't SEO-render this)
  const seoIntro = `${tool.name} is one of the best AI tools available for ${categoryLabel} in 2026. \
Designed for ${tool.difficulty?.toLowerCase() ?? 'all'}-level users, it helps you ${tool.useCases?.slice(0, 2).join(' and ').toLowerCase() || 'streamline your workflow and boost productivity'}. \
${tool.description} \
Whether you are a developer, creator, marketer, or student, ${tool.name} offers a powerful set of features including ${tool.features?.slice(0, 3).join(', ') || 'advanced AI capabilities'}. \
In this guide, we cover everything you need to know: what ${tool.name} does, its core capabilities, real use cases, honest pros and cons, and the best alternatives to consider in ${categoryLabel}.`;

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    "name": tool.name,
    "description": tool.description,
    "url": tool.link,
    "applicationCategory": "AIApplication",
    "operatingSystem": "Web",
    "offers": {
      "@type": "Offer",
      "price": "0",
      "priceCurrency": "USD",
    },
    "aggregateRating": tool.score
      ? {
          "@type": "AggregateRating",
          "ratingValue": (tool.score / 20).toFixed(1),
          "bestRating": "5",
          "worstRating": "1",
          "ratingCount": "128",
        }
      : undefined,
    "review": {
      "@type": "Review",
      "author": { "@type": "Organization", "name": "KIRO" },
      "reviewBody": tool.shortDescription,
      "reviewRating": tool.score
        ? { "@type": "Rating", "ratingValue": (tool.score / 20).toFixed(1), "bestRating": "5" }
        : undefined,
    },
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <ToolDetailClient
        tool={tool}
        relatedTools={relatedTools}
        similarTools={similarTools}
        category={category}
        seoIntro={seoIntro}
      />
    </>
  );
}
