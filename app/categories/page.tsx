'use client';

import { motion } from 'framer-motion';
import CategoryCard from '@/components/CategoryCard';
import ToolCard from '@/components/ToolCard';
import { categories, tools, getToolsByCategory } from '@/lib/data';

export default function CategoriesPage() {
  return (
    <div className="px-4 py-8 sm:px-6 sm:py-12 lg:px-8">
      <div className="mx-auto max-w-7xl">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="mb-10"
        >
          <h1 className="text-3xl font-bold tracking-tight sm:text-4xl">
            Browse <span className="gradient-text">Categories</span>
          </h1>
          <p className="mt-2 text-muted">
            Explore AI tools organized by what they do best
          </p>
        </motion.div>

        {/* Category grid */}
        <div className="mb-16 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
          {categories.map((cat, i) => (
            <CategoryCard
              key={cat.slug}
              name={cat.name}
              slug={cat.slug}
              icon={cat.icon}
              color={cat.color}
              toolCount={getToolsByCategory(cat.slug).length}
              index={i}
            />
          ))}
        </div>

        {/* All tools */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.3 }}
        >
          <h2 className="mb-6 text-2xl font-bold tracking-tight">
            All Tools ({tools.length})
          </h2>
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {tools.map((tool, i) => (
              <ToolCard key={tool.slug} tool={tool} index={i} />
            ))}
          </div>
        </motion.div>
      </div>
    </div>
  );
}
