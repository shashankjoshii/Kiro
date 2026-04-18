import type { Metadata } from 'next';
import Link from 'next/link';
import { ArrowRight } from 'lucide-react';

export const metadata: Metadata = {
  title: 'Best ChatGPT Alternatives (2026) – Top AI Chatbots Compared',
  description:
    'Looking for ChatGPT alternatives? Discover the best AI chatbots and assistants of 2026 — Claude, Gemini, Perplexity, and more. Compare features, pricing, and use cases.',
  keywords: [
    'ChatGPT alternatives',
    'best ChatGPT alternatives 2026',
    'AI chatbots',
    'Claude vs ChatGPT',
    'Gemini vs ChatGPT',
    'alternatives to ChatGPT',
  ],
  alternates: {
    canonical: 'https://kiro-two-tau.vercel.app/chatgpt-alternatives',
  },
};

export default function ChatGPTAlternativesPage() {
  return (
    <div className="px-4 py-16 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-4xl text-center">
        <span className="inline-block rounded-full bg-accent-bg px-4 py-1.5 text-sm font-semibold text-accent mb-6">
          💬 AI Chatbots Compared
        </span>
        <h1 className="text-4xl font-bold font-serif text-foreground sm:text-5xl mb-6">
          Best ChatGPT Alternatives (2026)
        </h1>
        <p className="text-lg text-muted font-serif mb-10 max-w-2xl mx-auto">
          This page is coming soon! We&apos;re building a comprehensive comparison of the best ChatGPT alternatives — with side-by-side feature breakdowns for Claude, Gemini, Perplexity, and more.
        </p>
        <Link
          href="/categories/text-writing"
          className="inline-flex items-center gap-2 rounded-xl bg-accent px-8 py-4 text-[15px] font-bold text-white shadow-lg shadow-accent/20 transition-all hover:shadow-xl hover:-translate-y-1"
        >
          Browse AI Writing Tools <ArrowRight className="h-4 w-4" />
        </Link>
      </div>
    </div>
  );
}
