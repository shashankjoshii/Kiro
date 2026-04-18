'use client';

import { useState, useMemo } from 'react';
import { motion } from 'framer-motion';
import { Filter, Search } from 'lucide-react';
import ToolCard from '@/components/ToolCard';
import Breadcrumbs from '@/components/Breadcrumbs';
import type { Tool } from '@/lib/data';

interface Props {
  tools: Tool[];
  categories: { name: string; slug: string }[];
  seoIntro: string;
}

export default function ToolDirectoryClient({ tools, categories, seoIntro }: Props) {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [selectedDifficulty, setSelectedDifficulty] = useState<string>('all');

  const filteredTools = useMemo(() => {
    return tools.filter((tool) => {
      const matchesSearch = tool.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
                            tool.description.toLowerCase().includes(searchQuery.toLowerCase());
      const matchesCategory = selectedCategory === 'all' || tool.category === selectedCategory;
      const matchesDifficulty = selectedDifficulty === 'all' || tool.difficulty === selectedDifficulty;
      
      return matchesSearch && matchesCategory && matchesDifficulty;
    });
  }, [tools, searchQuery, selectedCategory, selectedDifficulty]);

  return (
    <div className="px-4 py-8 sm:px-6 sm:py-16 lg:px-8">
      <div className="mx-auto max-w-7xl">
        <Breadcrumbs crumbs={[
          { label: 'Home', href: '/' },
          { label: 'All AI Tools' }
        ]} />

        {/* Hero & SEO Intro */}
        <div className="mb-12 max-w-4xl">
          <h1 className="text-4xl font-bold font-serif text-foreground sm:text-5xl mb-6">
            AI Tools Directory (2026)
          </h1>
          <p className="text-lg text-muted font-sans leading-relaxed">
            {seoIntro}
          </p>
        </div>

        {/* Filters */}
        <div className="mb-10 rounded-2xl border border-border bg-card p-6 shadow-sm">
          <div className="flex flex-col md:flex-row gap-6">
            
            {/* Search */}
            <div className="flex-1 relative">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-muted" />
              <input
                type="text"
                placeholder="Search tools by name or description..."
                className="w-full rounded-xl border border-border bg-background py-3 pl-12 pr-4 text-sm outline-none transition-all focus:border-accent focus:ring-1 focus:ring-accent"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>

            {/* Category Dropdown */}
            <div className="md:w-64">
              <select
                className="w-full rounded-xl border border-border bg-background px-4 py-3 text-sm outline-none transition-all focus:border-accent"
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
              >
                <option value="all">All Categories</option>
                {categories.map((c) => (
                  <option key={c.slug} value={c.slug}>{c.name}</option>
                ))}
              </select>
            </div>

            {/* Difficulty Dropdown */}
            <div className="md:w-48">
              <select
                className="w-full rounded-xl border border-border bg-background px-4 py-3 text-sm outline-none transition-all focus:border-accent"
                value={selectedDifficulty}
                onChange={(e) => setSelectedDifficulty(e.target.value)}
              >
                <option value="all">All Levels</option>
                <option value="Beginner">Beginner</option>
                <option value="Intermediate">Intermediate</option>
                <option value="Advanced">Advanced</option>
              </select>
            </div>
          </div>
        </div>

        {/* Results Info */}
        <div className="mb-6 flex items-center justify-between">
          <h2 className="text-xl font-bold font-serif text-foreground">
            {filteredTools.length} {filteredTools.length === 1 ? 'Tool' : 'Tools'} Found
          </h2>
        </div>

        {/* Dynamic Grid */}
        {filteredTools.length > 0 ? (
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {filteredTools.map((tool, i) => (
              <ToolCard key={tool.slug} tool={tool} index={i} />
            ))}
          </div>
        ) : (
          <div className="rounded-3xl border border-dashed border-border bg-card p-12 text-center">
            <Filter className="mx-auto h-12 w-12 text-muted mb-4 opacity-50" />
            <h3 className="text-xl font-bold text-foreground mb-2">No tools found</h3>
            <p className="text-muted max-w-sm mx-auto">
              We couldn't find any tools matching your exact filters. Try clearing your search or selecting a different category.
            </p>
            <button
              onClick={() => { setSearchQuery(''); setSelectedCategory('all'); setSelectedDifficulty('all'); }}
              className="mt-6 rounded-xl bg-accent px-6 py-2.5 text-sm font-semibold text-white transition-all hover:bg-accent-dark"
            >
              Clear All Filters
            </button>
          </div>
        )}

      </div>
    </div>
  );
}
