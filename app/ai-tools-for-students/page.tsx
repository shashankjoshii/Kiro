import type { Metadata } from 'next';
import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import { tools, getToolsByCategory } from '@/lib/data';
import ToolCard from '@/components/ToolCard';

const BASE_URL = process.env.NEXT_PUBLIC_APP_URL || 'https://kiro-two-tau.vercel.app';

export const metadata: Metadata = {
  title: 'Best AI Tools for Students (2026) – Study Smarter with AI',
  description:
    'Discover the best AI tools for students in 2026. From AI writing assistants to research tools and study aids — find free and affordable tools to supercharge your learning.',
  keywords: [
    'AI tools for students',
    'best AI for studying',
    'AI study tools 2026',
    'free AI tools for students',
    'AI homework helper',
    'AI research tool for students',
  ],
  alternates: { canonical: `${BASE_URL}/ai-tools-for-students` },
  openGraph: {
    title: 'Best AI Tools for Students (2026) | KIRO',
    description: 'Top AI tools for studying, research, writing, and productivity — curated for students.',
    url: `${BASE_URL}/ai-tools-for-students`,
    siteName: 'KIRO',
    type: 'website',
  },
};

export default function AIToolsForStudentsPage() {
  // Pull tools from student-relevant categories
  const researchTools = getToolsByCategory('research').slice(0, 4);
  const writingTools = getToolsByCategory('text-writing').slice(0, 4);
  const productivityTools = getToolsByCategory('productivity').slice(0, 4);

  return (
    <div className="px-4 py-16 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-6xl">

        {/* Hero */}
        <div className="mb-14 text-center">
          <span className="inline-block rounded-full bg-accent-bg px-4 py-1.5 text-sm font-semibold text-accent mb-5">
            🎓 For Students · Updated 2026
          </span>
          <h1 className="text-4xl font-bold font-serif text-foreground sm:text-5xl lg:text-6xl mb-6">
            Best AI Tools for Students (2026)
          </h1>
          <p className="mx-auto max-w-3xl text-lg text-muted font-serif leading-relaxed">
            AI has become one of the most powerful study companions a student can have in 2026.
            The right tools can help you understand complex topics faster, write better essays,
            summarize research papers in seconds, and stay on top of deadlines without burning out.
            From free AI chatbots like ChatGPT and Claude to specialized research assistants like
            Perplexity AI, this guide covers the best AI tools for students across every subject
            and academic level. Whether you are in high school, university, or graduate school,
            these tools will help you learn smarter — not harder.
          </p>
        </div>

        {/* Research Tools */}
        <section className="mb-14">
          <div className="mb-6">
            <h2 className="text-2xl font-bold font-serif text-foreground">🔍 Best AI Research Tools for Students</h2>
            <p className="text-muted text-sm mt-1">Find cited, accurate answers and summarize papers instantly.</p>
          </div>
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {researchTools.map((tool, i) => <ToolCard key={tool.slug} tool={tool} index={i} />)}
          </div>
          <Link href="/category/research" className="mt-4 inline-flex items-center gap-1.5 text-sm text-accent font-semibold hover:underline">
            View all research tools <ArrowRight className="h-3.5 w-3.5" />
          </Link>
        </section>

        {/* Writing Tools */}
        <section className="mb-14">
          <div className="mb-6">
            <h2 className="text-2xl font-bold font-serif text-foreground">✍️ Best AI Writing Tools for Students</h2>
            <p className="text-muted text-sm mt-1">Write better essays, reports, and summaries with AI assistance.</p>
          </div>
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {writingTools.map((tool, i) => <ToolCard key={tool.slug} tool={tool} index={i} />)}
          </div>
          <Link href="/category/text-writing" className="mt-4 inline-flex items-center gap-1.5 text-sm text-accent font-semibold hover:underline">
            View all writing tools <ArrowRight className="h-3.5 w-3.5" />
          </Link>
        </section>

        {/* Productivity Tools */}
        <section className="mb-14">
          <div className="mb-6">
            <h2 className="text-2xl font-bold font-serif text-foreground">⚡ Best AI Productivity Tools for Students</h2>
            <p className="text-muted text-sm mt-1">Organize your notes, manage time, and stay on top of assignments.</p>
          </div>
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {productivityTools.map((tool, i) => <ToolCard key={tool.slug} tool={tool} index={i} />)}
          </div>
          <Link href="/category/productivity" className="mt-4 inline-flex items-center gap-1.5 text-sm text-accent font-semibold hover:underline">
            View all productivity tools <ArrowRight className="h-3.5 w-3.5" />
          </Link>
        </section>

        <div className="text-center">
          <Link
            href="/discover/students"
            className="inline-flex items-center gap-2 rounded-xl bg-accent px-8 py-4 text-[15px] font-bold text-white shadow-lg shadow-accent/20 transition-all hover:shadow-xl hover:-translate-y-1"
          >
            See Full Student Toolkit <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
      </div>
    </div>
  );
}
