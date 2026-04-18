import type { Metadata } from 'next';
import Link from 'next/link';
import { ArrowRight } from 'lucide-react';

export const metadata: Metadata = {
  title: 'Best AI Tools of 2026 – Top-Rated Tools for Every Use Case',
  description:
    'Explore the best AI tools of 2026 curated by KIRO. Find top-rated tools for writing, coding, design, video, and more. Updated weekly.',
  keywords: ['best AI tools', 'top AI tools 2026', 'AI tools list', 'AI tools directory'],
  alternates: {
    canonical: 'https://kiro-two-tau.vercel.app/best-ai-tools',
  },
};

export default function BestAIToolsPage() {
  return (
    <div className="px-4 py-16 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-4xl text-center">
        <span className="inline-block rounded-full bg-accent-bg px-4 py-1.5 text-sm font-semibold text-accent mb-6">
          ✨ Curated by KIRO
        </span>
        <h1 className="text-4xl font-bold font-serif text-foreground sm:text-5xl mb-6">
          Best AI Tools of 2026
        </h1>
        <p className="text-lg text-muted font-serif mb-10 max-w-2xl mx-auto">
          This page is coming soon! We&apos;re curating the definitive list of the best AI tools across every category — writing, coding, design, data, and more.
        </p>
        <Link
          href="/categories"
          className="inline-flex items-center gap-2 rounded-xl bg-accent px-8 py-4 text-[15px] font-bold text-white shadow-lg shadow-accent/20 transition-all hover:shadow-xl hover:-translate-y-1"
        >
          Browse All Categories <ArrowRight className="h-4 w-4" />
        </Link>
      </div>
    </div>
  );
}
