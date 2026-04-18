import { notFound } from 'next/navigation';
import { tools, getToolBySlug, getRelatedTools, categories } from '@/lib/data';
import ToolDetailClient from './ToolDetailClient';

export function generateStaticParams() {
  return tools.map((tool) => ({ slug: tool.slug }));
}

export async function generateMetadata(props: { params: Promise<{ slug: string }> }) {
  const { slug } = await props.params;
  const tool = getToolBySlug(slug);
  if (!tool) return { title: 'Tool Not Found — KIRO' };
  const title = `${tool.name} Review — Is It Worth It? | KIRO`;
  const description = `Explore ${tool.name}, best for ${tool.category} and ${tool.bestFor || 'various tasks'}. Discover features, pros, cons, and more in our AI tool directory.`;

  return {
    title,
    description,
    openGraph: {
      title,
      description,
    },
    twitter: {
      title,
      description,
    },
  };
}

export default async function ToolPage(props: { params: Promise<{ slug: string }> }) {
  const { slug } = await props.params;
  const tool = getToolBySlug(slug);

  if (!tool) notFound();

  const relatedTools = getRelatedTools(tool.slug, tool.category);
  const category = categories.find((c) => c.slug === tool.category);

  return (
    <ToolDetailClient tool={tool} relatedTools={relatedTools} category={category} />
  );
}
