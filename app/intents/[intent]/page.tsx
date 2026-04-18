import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import { intents, getToolsByCategory, getCategoryBySlug } from '@/lib/data';
import ToolCard from '@/components/ToolCard';
import Breadcrumbs from '@/components/Breadcrumbs';

const BASE_URL = process.env.NEXT_PUBLIC_APP_URL || 'https://kiro-two-tau.vercel.app';

// Richer descriptions for each intent for SEO content depth
const intentDescriptions: Record<string, { intro: string; tip: string }> = {
  'build-apps': {
    intro: `Building apps with AI has never been faster or more accessible. In 2026, developers of all skill levels are using AI-powered coding assistants, code editors, and API tools to ship products in record time. Whether you are building a SaaS product, a mobile app, an automation script, or a browser extension — the right AI coding tool can cut your development time in half. Below are the best AI tools for building apps, ranked by KIRO.`,
    tip: 'Pro tip: Pair a code editor like Cursor with GitHub Copilot for the fastest development loop.',
  },
  'create-content': {
    intro: `Content creation is one of the highest-impact use cases for AI in 2026. From writing blog posts, social media captions, and ad copy to full-length video scripts and email campaigns — AI writing tools have become an essential part of every creator's workflow. Whether you are a solo creator, a marketer, or a content agency, these tools will help you produce more, faster, without sacrificing quality. Below are the best AI tools for creating content.`,
    tip: 'Pro tip: Use an AI writing tool for the first draft and always add your own voice before publishing.',
  },
  'make-money': {
    intro: `AI has unlocked entirely new streams of income for entrepreneurs, freelancers, and creators in 2026. From building AI-powered SaaS products to automating client deliverables, selling AI-generated assets, or running an AI-assisted agency — the opportunities are massive. These productivity and automation tools are the most commonly used by people who are actively making money with AI today. Below are the top tools to help you monetize AI.`,
    tip: 'Pro tip: Automation tools like Zapier and Make can let you offer AI-powered services to clients without touching code.',
  },
  'design-visuals': {
    intro: `AI has transformed visual design in 2026. Image generation tools can produce stunning illustrations, mockups, social media graphics, and marketing assets in seconds — no design degree required. Whether you are a professional designer looking to speed up your workflow or a marketer who needs visuals fast, AI design tools give you a competitive edge. Below are the best AI tools for designing and generating visuals.`,
    tip: 'Pro tip: Combine Midjourney\'s artistic style with DALL·E 3\'s text accuracy for the best results.',
  },
  'learn-ai': {
    intro: `Understanding AI has become one of the most valuable skills in 2026. Whether you want to learn how large language models work, understand prompt engineering, explore AI safety, or stay up to date with the latest research — the right research and learning tools will accelerate your knowledge massively. These AI tools are used by students, researchers, and professionals who want to go beyond using AI and actually understand it.`,
    tip: 'Pro tip: Use Perplexity AI for research questions and Claude for deep reading of long papers.',
  },
  'analyze-data': {
    intro: `Data analysis has been one of the first areas to be transformed by AI — and in 2026, you no longer need a data science background to extract powerful insights from your data. AI data analytics tools let you upload spreadsheets, ask questions in plain English, visualize trends automatically, and generate clean statistical reports. Whether you are analyzing sales data, user behavior, or research datasets, these tools will do the heavy lifting for you.`,
    tip: 'Pro tip: Julius AI is the best tool for non-technical users who need to analyze CSV and Excel files instantly.',
  },
};

export function generateStaticParams() {
  return intents.map((intent) => ({ intent: intent.slug }));
}

export async function generateMetadata(
  props: { params: Promise<{ intent: string }> }
): Promise<Metadata> {
  const { intent: intentSlug } = await props.params;
  const intent = intents.find((i) => i.slug === intentSlug);
  if (!intent) return {};

  const category = getCategoryBySlug(intent.targetCategory);
  const toolCount = getToolsByCategory(intent.targetCategory).length;
  const title = `Best AI Tools to ${intent.name} (2026) – ${toolCount}+ Curated Tools`;
  const description = `Discover the best AI tools to ${intent.name.toLowerCase()} in 2026. KIRO curated ${toolCount}+ tools for ${(category?.name || intent.targetCategory).toLowerCase()} — with features, pricing, and alternatives.`;
  const canonical = `${BASE_URL}/intents/${intentSlug}`;

  return {
    title,
    description,
    keywords: [
      `AI tools to ${intent.name.toLowerCase()}`,
      `best AI for ${intent.name.toLowerCase()}`,
      `${intent.name.toLowerCase()} with AI`,
      `AI ${(category?.name || '').toLowerCase()} tools`,
      'AI tools 2026',
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

export default async function IntentPage(props: { params: Promise<{ intent: string }> }) {
  const { intent: intentSlug } = await props.params;
  const intent = intents.find((i) => i.slug === intentSlug);

  if (!intent) notFound();

  const category = getCategoryBySlug(intent.targetCategory);
  const tools = getToolsByCategory(intent.targetCategory);
  const content = intentDescriptions[intentSlug] ?? {
    intro: `Discover the best AI tools to ${intent.name.toLowerCase()} in 2026. These curated tools are ranked by quality, ease of use, and real-world value.`,
    tip: '',
  };

  return (
    <div className="px-4 py-10 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-6xl">

        <Breadcrumbs crumbs={[
          { label: 'Home', href: '/' },
          { label: 'Intents', href: '/' },
          { label: intent.name },
        ]} />

        {/* Hero */}
        <div className="mb-12 max-w-3xl">
          <span className="inline-block rounded-full bg-accent-bg px-4 py-1.5 text-sm font-semibold text-accent mb-5">
            🎯 Use Case Guide · 2026
          </span>
          <h1 className="text-4xl font-bold font-serif text-foreground sm:text-5xl mb-5">
            Best AI Tools to {intent.name} (2026)
          </h1>
          <p className="text-lg text-muted font-serif leading-relaxed mb-4">
            {content.intro}
          </p>
          {content.tip && (
            <div className="rounded-xl border border-accent/20 bg-accent-bg/50 px-5 py-3.5 text-sm text-accent-dark font-medium">
              💡 {content.tip}
            </div>
          )}
        </div>

        {/* Tools Grid */}
        <section className="mb-14">
          <h2 className="text-2xl font-bold font-serif text-foreground mb-2">
            Top Tools to {intent.name}
          </h2>
          {category && (
            <p className="text-muted text-sm mb-8">
              {tools.length} tools in the{' '}
              <Link href={`/category/${category.slug}`} className="text-accent font-semibold hover:underline">
                {category.name}
              </Link>{' '}
              category · sorted by KIRO score
            </p>
          )}
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {tools.map((tool, i) => (
              <ToolCard key={tool.slug} tool={tool} index={i} />
            ))}
          </div>
        </section>

        {/* Internal links to other intents */}
        <section className="mb-12 rounded-2xl border border-border bg-sand/30 p-8">
          <h2 className="text-xl font-bold font-serif text-foreground mb-5">Explore Other Goals</h2>
          <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
            {intents
              .filter((i) => i.slug !== intentSlug)
              .map((other) => (
                <Link
                  key={other.slug}
                  href={`/intents/${other.slug}`}
                  className="group flex items-center justify-between rounded-xl border border-border bg-card p-4 transition-all hover:border-accent/30 hover:bg-accent-bg/30"
                >
                  <span className="font-medium text-foreground group-hover:text-accent-dark transition-colors">
                    {other.name}
                  </span>
                  <ArrowRight className="h-4 w-4 text-muted group-hover:text-accent transition-colors" />
                </Link>
              ))}
          </div>
        </section>

        {/* CTA */}
        <div className="text-center">
          <Link
            href="/best-ai-tools"
            className="inline-flex items-center gap-2 rounded-xl bg-accent px-8 py-4 text-[15px] font-bold text-white shadow-lg shadow-accent/20 transition-all hover:shadow-xl hover:-translate-y-1"
          >
            Browse All 200+ AI Tools <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
      </div>
    </div>
  );
}
