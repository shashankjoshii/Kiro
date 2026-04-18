'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';
import { ExternalLink, ArrowRight } from 'lucide-react';
import type { Tool } from '@/lib/data';
import DynamicIcon from '@/components/DynamicIcon';

interface ToolCardProps {
  tool: Tool;
  index?: number;
}

export default function ToolCard({ tool, index = 0 }: ToolCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay: index * 0.05, ease: [0.21, 0.47, 0.32, 0.98] }}
      className="group h-full"
    >
      <div className="relative flex h-full flex-col rounded-2xl border border-border bg-card/60 backdrop-blur-md p-6 transition-all duration-300 hover:border-accent/30 hover:bg-card hover:shadow-[0_8px_30px_rgb(0,0,0,0.04)] hover:-translate-y-1 overflow-hidden">
        {tool.trendingLabel && (
          <div className="absolute right-0 top-0 rounded-bl-xl bg-accent-bg/80 border-b border-l border-accent/20 px-3 py-1 text-[11px] font-bold tracking-wide text-accent-dark shadow-sm backdrop-blur-sm z-10">
            {tool.trendingLabel}
          </div>
        )}
        {/* Header */}
        <div className="mb-4 flex items-start justify-between">
          <div className="flex items-center gap-3.5">
            <span className="flex h-12 w-12 items-center justify-center rounded-xl bg-sand text-foreground shadow-sm transition-transform duration-300 group-hover:scale-105 group-hover:bg-accent-bg group-hover:shadow-md group-hover:text-accent-dark">
              <DynamicIcon name={tool.icon} className="h-6 w-6 stroke-[1.5]" />
            </span>
            <div>
              <h3 className="text-base font-semibold text-foreground tracking-tight transition-colors group-hover:text-accent-dark">
                {tool.name}
              </h3>
              <span className="text-xs font-medium text-muted">
                {tool.category.replace('-', ' & ').replace('dev', 'Dev')}
              </span>
            </div>
          </div>
          {tool.featured && (
            <span className="rounded-full bg-accent-bg/80 px-2.5 py-1 text-[10px] font-bold uppercase tracking-widest text-accent shadow-sm backdrop-blur-sm">
              Featured
            </span>
          )}
        </div>

        {/* Description */}
        <p className="mb-4 flex-1 text-[14px] leading-relaxed text-muted line-clamp-3">
          {tool.shortDescription}
        </p>

        {/* Tags & Difficulty */}
        <div className="mb-6 flex flex-wrap items-center gap-2">
          {tool.difficulty && (
            <span className="rounded-md bg-sand px-2 py-1 text-[11px] font-medium text-muted-foreground border border-border/50">
              {tool.difficulty}
            </span>
          )}
          {tool.tags?.map(tag => (
            <span key={tag} className="rounded-md bg-accent-bg/50 text-accent-dark px-2 py-1 text-[11px] font-medium border border-accent/10">
              {tag}
            </span>
          ))}
        </div>

        {/* Actions */}
        <div className="flex items-center gap-2.5 pt-4 border-t border-border/50">
          <Link
            href={`/tools/${tool.slug}`}
            className="flex flex-1 items-center justify-center gap-2 rounded-xl bg-sand/50 px-4 py-2.5 text-[13px] font-semibold text-foreground transition-all duration-200 hover:bg-sand hover:text-accent-dark active:scale-[0.98]"
          >
            Learn More
            <ArrowRight className="h-3.5 w-3.5 transition-transform duration-300 group-hover:translate-x-1" />
          </Link>
          <a
            href={tool.link}
            target="_blank"
            rel="noopener noreferrer"
            className="flex h-[42px] w-[42px] items-center justify-center rounded-xl bg-background border border-border text-muted transition-all duration-200 hover:border-accent/30 hover:bg-accent-bg hover:text-accent active:scale-[0.98]"
            aria-label={`Visit ${tool.name}`}
          >
            <ExternalLink className="h-4 w-4" />
          </a>
        </div>
      </div>
    </motion.div>
  );
}
