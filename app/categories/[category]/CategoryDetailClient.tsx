'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import { ArrowLeft } from 'lucide-react';
import ToolCard from '@/components/ToolCard';
import type { Tool } from '@/lib/data';

interface Props {
  category: { name: string; slug: string; icon: string; color: string };
  tools: Tool[];
}

export default function CategoryDetailClient({ category, tools }: Props) {
  return (
    <div className="px-4 py-8 sm:px-6 sm:py-12 lg:px-8">
      <div className="mx-auto max-w-7xl">
        {/* Back */}
        <motion.div
          initial={{ opacity: 0, x: -10 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.3 }}
        >
          <Link
            href="/categories"
            className="mb-8 inline-flex items-center gap-2 text-sm text-muted transition-colors hover:text-foreground"
          >
            <ArrowLeft className="h-4 w-4" />
            All Categories
          </Link>
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
      </div>
    </div>
  );
}
