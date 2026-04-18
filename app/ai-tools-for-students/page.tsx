import type { Metadata } from 'next';
import Link from 'next/link';
import { ArrowRight } from 'lucide-react';

export const metadata: Metadata = {
  title: 'Best AI Tools for Students (2026) – Study Smarter with AI',
  description:
    'Discover the best AI tools for students in 2026. From AI writing assistants to research tools, find everything you need to study smarter and faster.',
  keywords: [
    'AI tools for students',
    'best AI for studying',
    'AI study tools',
    'student AI tools 2026',
    'free AI tools for students',
  ],
  alternates: {
    canonical: 'https://kiro-two-tau.vercel.app/ai-tools-for-students',
  },
};

export default function AIToolsForStudentsPage() {
  return (
    <div className="px-4 py-16 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-4xl text-center">
        <span className="inline-block rounded-full bg-accent-bg px-4 py-1.5 text-sm font-semibold text-accent mb-6">
          🎓 For Students
        </span>
        <h1 className="text-4xl font-bold font-serif text-foreground sm:text-5xl mb-6">
          Best AI Tools for Students (2026)
        </h1>
        <p className="text-lg text-muted font-serif mb-10 max-w-2xl mx-auto">
          This page is coming soon! We&apos;re putting together the ultimate AI toolkit for students — from essay writers to AI tutors and research assistants.
        </p>
        <Link
          href="/discover/students"
          className="inline-flex items-center gap-2 rounded-xl bg-accent px-8 py-4 text-[15px] font-bold text-white shadow-lg shadow-accent/20 transition-all hover:shadow-xl hover:-translate-y-1"
        >
          Explore Student Tools Now <ArrowRight className="h-4 w-4" />
        </Link>
      </div>
    </div>
  );
}
