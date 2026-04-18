import type { Metadata } from 'next';
import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import { tools } from '@/lib/data';
import ToolCard from '@/components/ToolCard';

const BASE_URL = process.env.NEXT_PUBLIC_APP_URL || 'https://kiro-two-tau.vercel.app';

export const metadata: Metadata = {
  title: 'Best ChatGPT Alternatives (2026) – Top AI Chatbots Compared',
  description:
    'Looking for ChatGPT alternatives in 2026? Compare Claude, Gemini, Perplexity, Mistral, and more. Find the best AI chatbot for your use case — with honest features and pricing breakdowns.',
  keywords: [
    'ChatGPT alternatives',
    'best ChatGPT alternatives 2026',
    'AI chatbots 2026',
    'Claude vs ChatGPT',
    'Gemini AI alternative',
    'free ChatGPT alternatives',
    'Perplexity vs ChatGPT',
  ],
  alternates: { canonical: `${BASE_URL}/chatgpt-alternatives` },
  openGraph: {
    title: 'Best ChatGPT Alternatives (2026) | KIRO',
    description: 'Compare the top AI chatbots of 2026. Find the best ChatGPT alternative for writing, coding, and research.',
    url: `${BASE_URL}/chatgpt-alternatives`,
    siteName: 'KIRO',
    type: 'website',
  },
};

// Pinned alternatives to ChatGPT — best text/writing tools by score, excluding ChatGPT itself
const CHATGPT_ALTERNATIVES_SLUGS = ['claude', 'perplexity-ai', 'jasper', 'gemini', 'copilot', 'you-com'];

export default function ChatGPTAlternativesPage() {
  // Get top text-writing tools, filter out ChatGPT, fall back to top-scored writing tools
  const writingTools = tools.filter((t) => t.category === 'text-writing' && t.slug !== 'chatgpt');
  const pinnedAlts = CHATGPT_ALTERNATIVES_SLUGS
    .map((slug) => tools.find((t) => t.slug === slug))
    .filter(Boolean) as typeof tools;

  // Fill remaining slots from writing tools not already pinned
  const pinnedSlugs = new Set(pinnedAlts.map((t) => t.slug));
  const remaining = writingTools.filter((t) => !pinnedSlugs.has(t.slug)).slice(0, 6);
  const allAlternatives = [...pinnedAlts, ...remaining].slice(0, 12);

  return (
    <div className="px-4 py-16 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-6xl">

        {/* Hero */}
        <div className="mb-14 text-center">
          <span className="inline-block rounded-full bg-accent-bg px-4 py-1.5 text-sm font-semibold text-accent mb-5">
            💬 AI Chatbots Compared · 2026
          </span>
          <h1 className="text-4xl font-bold font-serif text-foreground sm:text-5xl lg:text-6xl mb-6">
            Best ChatGPT Alternatives (2026)
          </h1>
          <p className="mx-auto max-w-3xl text-lg text-muted font-serif leading-relaxed">
            ChatGPT is the most well-known AI assistant, but it is far from the only option in 2026.
            Depending on your needs — whether that is longer context windows, real-time web search,
            better code generation, or stricter privacy policies — there are powerful alternatives
            worth considering. Claude by Anthropic is widely praised for its nuanced writing and
            safety. Perplexity AI leads for cited, real-time research. Google Gemini excels at
            multimodal tasks. In this guide, KIRO compares the best ChatGPT alternatives with
            honest assessments of their strengths, weaknesses, pricing, and the specific use cases
            where each one outperforms ChatGPT.
          </p>
        </div>

        {/* Comparison CTA chips */}
        <div className="mb-10 flex flex-wrap justify-center gap-3">
          {['claude', 'perplexity-ai', 'gemini'].map((slug) => {
            const t = tools.find((x) => x.slug === slug);
            if (!t) return null;
            return (
              <Link
                key={slug}
                href={`/tools/${slug}`}
                className="rounded-full border border-border bg-card px-5 py-2 text-sm font-semibold text-foreground transition-all hover:border-accent/40 hover:bg-accent-bg hover:text-accent-dark"
              >
                {t.name} vs ChatGPT →
              </Link>
            );
          })}
        </div>

        {/* Alternatives Grid */}
        <section className="mb-14">
          <h2 className="text-2xl font-bold font-serif text-foreground mb-2">
            Top ChatGPT Alternatives Ranked
          </h2>
          <p className="text-muted text-sm mb-8">Sorted by KIRO score · all verified alternatives</p>
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {allAlternatives.map((tool, i) => (
              <ToolCard key={tool.slug} tool={tool} index={i} />
            ))}
          </div>
        </section>

        <div className="text-center">
          <Link
            href="/category/text-writing"
            className="inline-flex items-center gap-2 rounded-xl bg-accent px-8 py-4 text-[15px] font-bold text-white shadow-lg shadow-accent/20 transition-all hover:shadow-xl hover:-translate-y-1"
          >
            View All AI Writing Tools <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
      </div>
    </div>
  );
}
