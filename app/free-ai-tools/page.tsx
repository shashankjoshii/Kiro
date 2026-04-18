import type { Metadata } from 'next';
import Link from 'next/link';
import { ArrowRight } from 'lucide-react';

export const metadata: Metadata = {
  title: 'Best Free AI Tools (2026) – No Cost, Maximum Power',
  description:
    'Find the best free AI tools in 2026. Discover powerful AI tools with free tiers for writing, coding, image generation, and more — no credit card required.',
  keywords: [
    'free AI tools',
    'free AI tools 2026',
    'best free AI tools',
    'AI tools no cost',
    'free ChatGPT alternatives',
  ],
  alternates: {
    canonical: 'https://kiro-two-tau.vercel.app/free-ai-tools',
  },
};

export default function FreeAIToolsPage() {
  return (
    <div className="px-4 py-16 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-4xl text-center">
        <span className="inline-block rounded-full bg-accent-bg px-4 py-1.5 text-sm font-semibold text-accent mb-6">
          🆓 Free Tier Available
        </span>
        <h1 className="text-4xl font-bold font-serif text-foreground sm:text-5xl mb-6">
          Best Free AI Tools of 2026
        </h1>
        <p className="text-lg text-muted font-serif mb-10 max-w-2xl mx-auto">
          This page is coming soon! We&apos;re curating the best AI tools that offer free tiers so you can start using AI without spending a dime.
        </p>
        <Link
          href="/categories"
          className="inline-flex items-center gap-2 rounded-xl bg-accent px-8 py-4 text-[15px] font-bold text-white shadow-lg shadow-accent/20 transition-all hover:shadow-xl hover:-translate-y-1"
        >
          Browse Free Tools <ArrowRight className="h-4 w-4" />
        </Link>
      </div>
    </div>
  );
}
