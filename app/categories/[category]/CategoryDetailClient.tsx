'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import ToolCard from '@/components/ToolCard';
import Breadcrumbs from '@/components/Breadcrumbs';
import type { Tool } from '@/lib/data';

interface Props {
  category: { name: string; slug: string; icon: string; color: string };
  tools: Tool[];
}

export default function CategoryDetailClient({ category, tools }: Props) {
  return (
    <div className="px-4 py-8 sm:px-6 sm:py-12 lg:px-8">
      <div className="mx-auto max-w-7xl">
        {/* Breadcrumbs */}
        <motion.div
          initial={{ opacity: 0, x: -10 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.3 }}
        >
          <Breadcrumbs crumbs={[
            { label: 'Home', href: '/' },
            { label: 'Categories', href: '/categories' },
            { label: category.name },
          ]} />
        </motion.div>

        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="mb-10"
        >
          <div className="flex items-center gap-4">
            <div
              className={`flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-br ${category.color} text-2xl shadow-lg`}
            >
              {category.icon}
            </div>
            <div>
              <h1 className="text-3xl font-bold tracking-tight sm:text-4xl">
                {category.name}
              </h1>
              <p className="mt-1 text-muted">
                {tools.length} {tools.length === 1 ? 'tool' : 'tools'} in this category
              </p>
            </div>
          </div>
        </motion.div>

        {/* Tools grid */}
        {tools.length > 0 ? (
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {tools.map((tool, i) => (
              <ToolCard key={tool.slug} tool={tool} index={i} />
            ))}
          </div>
        ) : (
          <div className="rounded-2xl border border-white/5 bg-card p-12 text-center">
            <p className="text-lg text-muted">No tools in this category yet.</p>
            <Link
              href="/"
              className="mt-4 inline-flex items-center gap-2 text-sm text-accent-purple transition-colors hover:text-accent-blue"
            >
              Browse all tools
            </Link>
          </div>
        )}

        {/* Internal SEO Links */}
        <motion.div
           initial={{ opacity: 0, y: 20 }}
           whileInView={{ opacity: 1, y: 0 }}
           viewport={{ once: true }}
           transition={{ duration: 0.5 }}
           className="mt-16 pt-12 border-t border-border grid sm:grid-cols-3 gap-6"
        >
          <div className="rounded-2xl border border-border bg-card p-6 transition-all hover:border-accent/30 hover:shadow-sm">
            <h3 className="font-bold font-serif text-lg mb-2 text-foreground">Top Rated Tools</h3>
            <p className="text-sm text-muted mb-4">Discover the highest scoring AI tools across all categories in 2026.</p>
            <Link href="/best-ai-tools" className="text-sm font-semibold text-accent inline-flex items-center gap-1 hover:underline">
              View Best Tools <ArrowRight className="h-3 w-3" />
            </Link>
          </div>
          <div className="rounded-2xl border border-border bg-card p-6 transition-all hover:border-accent/30 hover:shadow-sm">
            <h3 className="font-bold font-serif text-lg mb-2 text-foreground">Free AI Tools</h3>
            <p className="text-sm text-muted mb-4">Find powerful AI tools with generous free tiers, no credit card required.</p>
            <Link href="/free-ai-tools" className="text-sm font-semibold text-accent inline-flex items-center gap-1 hover:underline">
              View Free Tools <ArrowRight className="h-3 w-3" />
            </Link>
          </div>
          <div className="rounded-2xl border border-border bg-card p-6 transition-all hover:border-accent/30 hover:shadow-sm">
            <h3 className="font-bold font-serif text-lg mb-2 text-foreground">Use Cases</h3>
            <p className="text-sm text-muted mb-4">Explore AI tools organized by intent — like making money or learning AI.</p>
            <Link href="/intents/make-money" className="text-sm font-semibold text-accent inline-flex items-center gap-1 hover:underline">
              Explore Use Cases <ArrowRight className="h-3 w-3" />
            </Link>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
