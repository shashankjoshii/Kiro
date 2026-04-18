import { notFound } from 'next/navigation';
import { categories, getToolsByCategory, getCategoryBySlug } from '@/lib/data';
import CategoryDetailClient from './CategoryDetailClient';

export function generateStaticParams() {
  return categories.map((cat) => ({ category: cat.slug }));
}

export async function generateMetadata(props: { params: Promise<{ category: string }> }) {
  const { category } = await props.params;
  const cat = getCategoryBySlug(category);
  if (!cat) return { title: 'Category Not Found — KIRO' };
  return {
    title: `${cat.name} AI Tools — KIRO`,
    description: `Discover the best AI tools in the ${cat.name} category.`,
  };
}

export default async function CategoryPage(props: { params: Promise<{ category: string }> }) {
  const { category } = await props.params;
  const cat = getCategoryBySlug(category);

  if (!cat) notFound();

  const categoryTools = getToolsByCategory(cat.slug);

  return <CategoryDetailClient category={cat} tools={categoryTools} />;
}
