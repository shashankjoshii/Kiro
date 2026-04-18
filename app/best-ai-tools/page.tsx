import type { Metadata } from 'next';
import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import { tools, categories, getToolsByCategory } from '@/lib/data';
import ToolCard from '@/components/ToolCard';

const BASE_URL = process.env.NEXT_PUBLIC_APP_URL || 'https://kiro-two-tau.vercel.app';

export const metadata: Metadata = {
  title: 'Best AI Tools (2026) – Top 200+ Free & Paid Tools',
  description:
    'Discover the best AI tools of 2026 curated by KIRO. 200+ top-rated tools for developers, designers, students, and creators — updated weekly with honest reviews.',
  keywords: [
    'best AI tools',
    'top AI tools 2026',
    'AI tools directory',
    'best AI tools list',
    'free and paid AI tools',
    'AI productivity tools',
  ],
  alternates: { canonical: `${BASE_URL}/best-ai-tools` },
  openGraph: {
    title: 'Best AI Tools (2026) – Top 200+ Free & Paid Tools | KIRO',
    description: 'Discover the best AI tools of 2026. 200+ curated tools for every use case.',
    url: `${BASE_URL}/best-ai-tools`,
    siteName: 'KIRO',
    type: 'website',
  },
};

export default function BestAIToolsPage() {
  // Top 12 tools by score across all categories
  const topTools = [...tools].sort((a, b) => b.score - a.score).slice(0, 12);

  return (
    <div className="px-4 py-16 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-6xl">

        {/* Hero */}
        <div className="mb-14 text-center">
          <span className="inline-block rounded-full bg-accent-bg px-4 py-1.5 text-sm font-semibold text-accent mb-5">
            ✨ Curated by KIRO · Updated 2026
          </span>
          <h1 className="text-4xl font-bold font-serif text-foreground sm:text-5xl lg:text-6xl mb-6">
            Best AI Tools of 2026
          </h1>
          <p className="mx-auto max-w-3xl text-lg text-muted font-serif leading-relaxed">
            The AI tools landscape has exploded in 2026, making it harder than ever to find tools
            that are genuinely useful. KIRO curates 200+ AI tools for developers, designers,
            students, marketers, and creators — scoring each one on quality, ease of use, and real
            value. Below are the highest-rated AI tools across every category this year.
            Whether you are looking for the best AI writing assistant, the most powerful code
            generator, a stunning image creator, or a research tool that actually cites sources —
            this is your definitive starting point.
          </p>
        </div>

        {/* Top Tools Grid */}
        <section className="mb-16">
          <h2 className="text-2xl font-bold font-serif text-foreground mb-2">
            🏆 Top-Rated AI Tools
          </h2>
          <p className="text-muted text-sm mb-8">Ranked by KIRO score across all categories</p>
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {topTools.map((tool, i) => (
              <ToolCard key={tool.slug} tool={tool} index={i} />
            ))}
          </div>
        </section>

        {/* Browse by Category */}
        <section className="mb-12">
          <h2 className="text-2xl font-bold font-serif text-foreground mb-8">Browse by Category</h2>
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {categories.map((cat) => {
              const count = getToolsByCategory(cat.slug).length;
              return (
                <Link
                  key={cat.slug}
                  href={`/category/${cat.slug}`}
                  className="group rounded-2xl border border-border bg-card p-6 transition-all hover:border-accent/30 hover:shadow-md hover:-translate-y-0.5"
                >
                  <h3 className="font-bold text-foreground group-hover:text-accent-dark transition-colors mb-1">
                    {cat.name}
                  </h3>
                  <p className="text-sm text-muted">{count} tools →</p>
                </Link>
              );
            })}
          </div>
        </section>

        <div className="text-center">
          <Link
            href="/category"
            className="inline-flex items-center gap-2 rounded-xl bg-accent px-8 py-4 text-[15px] font-bold text-white shadow-lg shadow-accent/20 transition-all hover:shadow-xl hover:-translate-y-1"
          >
            Explore All 200+ Tools <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
      </div>
    </div>
  );
}
