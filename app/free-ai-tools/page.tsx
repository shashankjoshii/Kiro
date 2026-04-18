import type { Metadata } from 'next';
import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import { tools, getToolsByCategory } from '@/lib/data';
import ToolCard from '@/components/ToolCard';

const BASE_URL = process.env.NEXT_PUBLIC_APP_URL || 'https://kiro-two-tau.vercel.app';

export const metadata: Metadata = {
  title: 'Best Free AI Tools (2026) – No Cost, Maximum Power',
  description:
    'Find the best free AI tools in 2026. Discover powerful AI tools with generous free tiers for writing, coding, image generation, research, and more — no credit card required.',
  keywords: [
    'free AI tools',
    'best free AI tools 2026',
    'free AI tools no credit card',
    'free ChatGPT alternatives',
    'free AI writing tools',
    'free AI image generator',
  ],
  alternates: { canonical: `${BASE_URL}/free-ai-tools` },
  openGraph: {
    title: 'Best Free AI Tools (2026) | KIRO',
    description: 'Discover powerful AI tools with free tiers. No credit card required.',
    url: `${BASE_URL}/free-ai-tools`,
    siteName: 'KIRO',
    type: 'website',
  },
};

export default function FreeAIToolsPage() {
  // Surface the highest-scoring tools from each major category (free-tier assumption for top tools)
  const writingTools = getToolsByCategory('text-writing').slice(0, 3);
  const codeTools = getToolsByCategory('code-dev').slice(0, 3);
  const imageTools = getToolsByCategory('image-generation').slice(0, 3);
  const researchTools = getToolsByCategory('research').slice(0, 3);

  return (
    <div className="px-4 py-16 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-6xl">

        {/* Hero */}
        <div className="mb-14 text-center">
          <span className="inline-block rounded-full bg-accent-bg px-4 py-1.5 text-sm font-semibold text-accent mb-5">
            🆓 Free Tiers Available · 2026
          </span>
          <h1 className="text-4xl font-bold font-serif text-foreground sm:text-5xl lg:text-6xl mb-6">
            Best Free AI Tools (2026)
          </h1>
          <p className="mx-auto max-w-3xl text-lg text-muted font-serif leading-relaxed">
            You do not need to spend a fortune to access powerful AI tools in 2026. Dozens of the
            best AI platforms offer generous free tiers that let you write, code, generate images,
            and conduct research without pulling out your credit card. From ChatGPT&apos;s free plan to
            Perplexity AI&apos;s unlimited queries, KIRO has identified the most capable free tools
            across every major category. This guide covers the best free AI tools for writing,
            coding, image creation, and research — so you can get started with AI today, at zero cost.
            Most of these tools require only an email address to sign up.
          </p>
        </div>

        {/* Free Writing Tools */}
        <section className="mb-14">
          <div className="mb-6">
            <h2 className="text-2xl font-bold font-serif text-foreground">✍️ Free AI Writing Tools</h2>
            <p className="text-muted text-sm mt-1">Write faster with AI-powered writing assistants that have free plans.</p>
          </div>
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {writingTools.map((tool, i) => <ToolCard key={tool.slug} tool={tool} index={i} />)}
          </div>
          <Link href="/category/text-writing" className="mt-4 inline-flex items-center gap-1.5 text-sm text-accent font-semibold hover:underline">
            View all writing tools <ArrowRight className="h-3.5 w-3.5" />
          </Link>
        </section>

        {/* Free Coding Tools */}
        <section className="mb-14">
          <div className="mb-6">
            <h2 className="text-2xl font-bold font-serif text-foreground">💻 Free AI Coding Tools</h2>
            <p className="text-muted text-sm mt-1">Supercharge your development workflow without a paid subscription.</p>
          </div>
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {codeTools.map((tool, i) => <ToolCard key={tool.slug} tool={tool} index={i} />)}
          </div>
          <Link href="/category/code-dev" className="mt-4 inline-flex items-center gap-1.5 text-sm text-accent font-semibold hover:underline">
            View all coding tools <ArrowRight className="h-3.5 w-3.5" />
          </Link>
        </section>

        {/* Free Image Tools */}
        <section className="mb-14">
          <div className="mb-6">
            <h2 className="text-2xl font-bold font-serif text-foreground">🎨 Free AI Image Generators</h2>
            <p className="text-muted text-sm mt-1">Create stunning visuals from text prompts — many tools offer a free quota.</p>
          </div>
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {imageTools.map((tool, i) => <ToolCard key={tool.slug} tool={tool} index={i} />)}
          </div>
          <Link href="/category/image-generation" className="mt-4 inline-flex items-center gap-1.5 text-sm text-accent font-semibold hover:underline">
            View all image tools <ArrowRight className="h-3.5 w-3.5" />
          </Link>
        </section>

        {/* Free Research Tools */}
        <section className="mb-14">
          <div className="mb-6">
            <h2 className="text-2xl font-bold font-serif text-foreground">🔍 Free AI Research Tools</h2>
            <p className="text-muted text-sm mt-1">Get cited, accurate answers to any question — for free.</p>
          </div>
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {researchTools.map((tool, i) => <ToolCard key={tool.slug} tool={tool} index={i} />)}
          </div>
          <Link href="/category/research" className="mt-4 inline-flex items-center gap-1.5 text-sm text-accent font-semibold hover:underline">
            View all research tools <ArrowRight className="h-3.5 w-3.5" />
          </Link>
        </section>

        <div className="text-center">
          <Link
            href="/best-ai-tools"
            className="inline-flex items-center gap-2 rounded-xl bg-accent px-8 py-4 text-[15px] font-bold text-white shadow-lg shadow-accent/20 transition-all hover:shadow-xl hover:-translate-y-1"
          >
            See All Best AI Tools <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
      </div>
    </div>
  );
}
