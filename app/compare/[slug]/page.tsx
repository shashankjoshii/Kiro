import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import { ArrowRight, Check, X } from 'lucide-react';
import { getComparisons, getComparisonBySlug, getCategoryBySlug } from '@/lib/data';
import Breadcrumbs from '@/components/Breadcrumbs';

const BASE_URL = process.env.NEXT_PUBLIC_APP_URL || 'https://kiro-two-tau.vercel.app';

export function generateStaticParams() {
  return getComparisons().map((c) => ({ slug: c.slug }));
}

export async function generateMetadata(
  props: { params: Promise<{ slug: string }> }
): Promise<Metadata> {
  const { slug } = await props.params;
  const comp = getComparisonBySlug(slug);
  if (!comp) return {};

  const { tool1, tool2 } = comp;
  const title = `${tool1.name} vs ${tool2.name} (2026) – Which is Better?`;
  const description = `In-depth comparison between ${tool1.name} and ${tool2.name}. Compare features, pricing, pros, cons, and use cases to see which AI tool is best for you in 2026.`;
  const canonical = `${BASE_URL}/compare/${slug}`;

  return {
    title,
    description,
    keywords: [
      `${tool1.name} vs ${tool2.name}`,
      `${tool1.name} alternatives`,
      `${tool2.name} alternatives`,
      `compare ${tool1.name} and ${tool2.name}`,
      'AI tools comparison',
    ],
    alternates: { canonical },
    openGraph: {
      title: `${title} | KIRO`,
      description,
      url: canonical,
      siteName: 'KIRO',
      type: 'article',
    },
    twitter: {
      card: 'summary_large_image',
      title: `${title} | KIRO`,
      description,
    },
  };
}

export default async function ComparePage(props: { params: Promise<{ slug: string }> }) {
  const { slug } = await props.params;
  const comp = getComparisonBySlug(slug);

  if (!comp) notFound();

  const { tool1, tool2 } = comp;
  const category = getCategoryBySlug(tool1.category);

  // Auto-generate a verdict based on score and attributes
  let verdictTitle = '';
  let verdictText = '';

  if (tool1.score > tool2.score + 10) {
    verdictTitle = `${tool1.name} wins for most use cases`;
    verdictText = `Both are excellent tools, but ${tool1.name} edges out ${tool2.name} due to its comprehensive feature set (${tool1.features.length} core features) and strong overall reputation. If you need a robust, field-tested solution for ${category?.name.toLowerCase()}, ${tool1.name} is the safer bet.`;
  } else if (tool2.score > tool1.score + 10) {
    verdictTitle = `${tool2.name} wins for most use cases`;
    verdictText = `While ${tool1.name} is a strong contender, ${tool2.name} takes the lead with superior capabilities and value. It is highly optimized for ${tool2.bestFor?.toLowerCase() || 'professional use'}, making it the top recommendation in the ${category?.name.toLowerCase()} category.`;
  } else {
    verdictTitle = `It's a tie — choose based on your specific needs`;
    verdictText = `${tool1.name} and ${tool2.name} are incredibly closely matched. Choose ${tool1.name} if you prioritize ${tool1.features[0]?.toLowerCase()}, and choose ${tool2.name} if you care more about ${tool2.features[0]?.toLowerCase()}. Both will serve you extremely well.`;
  }

  return (
    <div className="px-4 py-8 sm:px-6 sm:py-16 lg:px-8">
      <div className="mx-auto max-w-5xl">

        <Breadcrumbs crumbs={[
          { label: 'Home', href: '/' },
          { label: 'Comparisons' },
          { label: `${tool1.name} vs ${tool2.name}` },
        ]} />

        {/* Hero */}
        <div className="mb-14 text-center">
          <span className="inline-block rounded-full bg-accent-bg px-4 py-1.5 text-sm font-semibold text-accent mb-5">
            ⚔️ AI Tool Showdown · 2026
          </span>
          <h1 className="text-4xl font-bold font-serif text-foreground sm:text-5xl lg:text-6xl mb-6">
            {tool1.name} vs {tool2.name}
          </h1>
          <p className="mx-auto max-w-3xl text-[17px] text-muted font-sans leading-relaxed">
            Trying to choose between <strong>{tool1.name}</strong> and <strong>{tool2.name}</strong>? 
            Both are highly-rated tools in the {category?.name || 'AI'} category, but they excel at different things. 
            In this guide, we break down their features, pricing, pros, and cons so you can make the right decision for your specific workflow.
          </p>
        </div>

        {/* Side-by-side Overview */}
        <div className="mb-16 grid gap-8 md:grid-cols-2">
          {/* Tool 1 Card */}
          <div className="rounded-3xl border border-border bg-card p-8 text-center shadow-sm relative overflow-hidden group">
            <div className="text-5xl mb-4 opacity-50 group-hover:scale-110 transition-transform">🤖</div>
            <h2 className="text-2xl font-bold font-serif text-foreground mb-3">{tool1.name}</h2>
            <p className="text-sm text-muted mb-6">{tool1.shortDescription}</p>
            <div className="mb-6 inline-flex flex-wrap items-center justify-center gap-2">
              <span className="rounded-md bg-sand px-2 py-1 text-xs font-medium text-muted-foreground border border-border/50">
                {tool1.difficulty}
              </span>
              <span className="rounded-md bg-accent-bg/50 px-2 py-1 text-xs font-medium text-accent-dark border border-accent/20">
                {tool1.pricing || 'Check Pricing'}
              </span>
            </div>
            <a
              href={tool1.link}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center w-full gap-2 rounded-xl bg-sand/50 px-4 py-3 text-sm font-semibold text-foreground transition-all hover:bg-sand"
            >
              Visit {tool1.name}
            </a>
          </div>

          {/* Tool 2 Card */}
          <div className="rounded-3xl border border-border bg-card p-8 text-center shadow-sm relative overflow-hidden group">
            <div className="text-5xl mb-4 opacity-50 group-hover:scale-110 transition-transform">✨</div>
            <h2 className="text-2xl font-bold font-serif text-foreground mb-3">{tool2.name}</h2>
            <p className="text-sm text-muted mb-6">{tool2.shortDescription}</p>
            <div className="mb-6 inline-flex flex-wrap items-center justify-center gap-2">
              <span className="rounded-md bg-sand px-2 py-1 text-xs font-medium text-muted-foreground border border-border/50">
                {tool2.difficulty}
              </span>
              <span className="rounded-md bg-accent-bg/50 px-2 py-1 text-xs font-medium text-accent-dark border border-accent/20">
                {tool2.pricing || 'Check Pricing'}
              </span>
            </div>
            <a
              href={tool2.link}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center w-full gap-2 rounded-xl bg-sand/50 px-4 py-3 text-sm font-semibold text-foreground transition-all hover:bg-sand"
            >
              Visit {tool2.name}
            </a>
          </div>
        </div>

        {/* Feature Comparison Table */}
        <section className="mb-16">
          <h2 className="text-2xl font-bold font-serif text-foreground mb-6">Key Features Compared</h2>
          <div className="rounded-3xl border border-border bg-card overflow-hidden">
            <div className="grid grid-cols-2 divide-x divide-border">
              <div className="p-8">
                <h3 className="text-lg font-bold text-foreground mb-4">{tool1.name} Features</h3>
                <ul className="space-y-3">
                  {tool1.features.map((f, i) => (
                    <li key={i} className="flex gap-3 text-sm text-muted">
                      <Check className="h-4 w-4 text-accent mt-0.5 shrink-0" />
                      {f}
                    </li>
                  ))}
                </ul>
              </div>
              <div className="p-8">
                <h3 className="text-lg font-bold text-foreground mb-4">{tool2.name} Features</h3>
                <ul className="space-y-3">
                  {tool2.features.map((f, i) => (
                    <li key={i} className="flex gap-3 text-sm text-muted">
                      <Check className="h-4 w-4 text-accent mt-0.5 shrink-0" />
                      {f}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </section>

        {/* Pros & Cons Split */}
        <section className="mb-16">
          <div className="grid gap-8 md:grid-cols-2">
            
            <div className="space-y-6">
              <div className="rounded-3xl border border-green-500/10 bg-green-50/50 p-6">
                <h3 className="text-lg font-bold text-foreground mb-4">{tool1.name} Pros</h3>
                <ul className="space-y-2">
                  {tool1.pros?.map((p, i) => (
                    <li key={i} className="flex gap-2 text-sm text-muted"><span className="text-green-500">•</span> {p}</li>
                  ))}
                </ul>
              </div>
              <div className="rounded-3xl border border-red-500/10 bg-red-50/50 p-6">
                <h3 className="text-lg font-bold text-foreground mb-4">{tool1.name} Cons</h3>
                <ul className="space-y-2">
                  {tool1.cons?.map((p, i) => (
                    <li key={i} className="flex gap-2 text-sm text-muted"><span className="text-red-500">•</span> {p}</li>
                  ))}
                </ul>
              </div>
            </div>

            <div className="space-y-6">
              <div className="rounded-3xl border border-green-500/10 bg-green-50/50 p-6">
                <h3 className="text-lg font-bold text-foreground mb-4">{tool2.name} Pros</h3>
                <ul className="space-y-2">
                  {tool2.pros?.map((p, i) => (
                    <li key={i} className="flex gap-2 text-sm text-muted"><span className="text-green-500">•</span> {p}</li>
                  ))}
                </ul>
              </div>
              <div className="rounded-3xl border border-red-500/10 bg-red-50/50 p-6">
                <h3 className="text-lg font-bold text-foreground mb-4">{tool2.name} Cons</h3>
                <ul className="space-y-2">
                  {tool2.cons?.map((p, i) => (
                    <li key={i} className="flex gap-2 text-sm text-muted"><span className="text-red-500">•</span> {p}</li>
                  ))}
                </ul>
              </div>
            </div>

          </div>
        </section>

        {/* Final Verdict */}
        <section className="mb-12 rounded-3xl border border-accent/20 bg-accent-bg/30 p-10 text-center relative overflow-hidden">
          <div className="absolute -left-10 -top-10 text-9xl opacity-5">⚖️</div>
          <h2 className="text-2xl font-bold font-serif text-accent-dark mb-4 relative z-10">
            Final Verdict: {verdictTitle}
          </h2>
          <p className="max-w-2xl mx-auto text-[16px] text-foreground/80 leading-relaxed font-sans relative z-10">
            {verdictText}
          </p>
        </section>

        {/* Internal Linking Footer */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <Link
            href={`/tools/${tool1.slug}`}
            className="w-full sm:w-auto text-center rounded-xl bg-sand px-6 py-3 text-sm font-semibold text-foreground transition-all hover:bg-border"
          >
            Read {tool1.name} Full Review
          </Link>
          <Link
            href={`/tools/${tool2.slug}`}
            className="w-full sm:w-auto text-center rounded-xl bg-sand px-6 py-3 text-sm font-semibold text-foreground transition-all hover:bg-border"
          >
            Read {tool2.name} Full Review
          </Link>
          {category && (
            <Link
              href={`/category/${category.slug}`}
              className="w-full sm:w-auto text-center rounded-xl bg-accent px-6 py-3 text-sm font-semibold text-white transition-all hover:opacity-90"
            >
              See all {category.name} tools
            </Link>
          )}
        </div>

      </div>
    </div>
  );
}
