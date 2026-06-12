'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';
import { ExternalLink, ArrowRight } from 'lucide-react';
import type { Tool } from '@/lib/data';
import DynamicIcon from '@/components/DynamicIcon';

interface ToolCardProps {
  tool: Tool;
  index?: number;
  sponsored?: boolean;
}

export default function ToolCard({ tool, index = 0, sponsored = false }: ToolCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 14 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.38, delay: index * 0.045, ease: [0.21, 0.47, 0.32, 0.98] }}
      className="group h-full"
    >
      <div className="relative flex h-full flex-col rounded-xl border border-border bg-card p-5 transition-all duration-200 hover:border-border-strong hover:shadow-[0_2px_16px_rgba(0,0,0,0.05)] hover:-translate-y-0.5 overflow-hidden">

        {/* Priority badge */}
        {sponsored ? (
          <div className="absolute right-0 top-0 rounded-bl-lg border-b border-l border-border bg-sand px-2.5 py-1 text-[10px] font-semibold tracking-widest text-muted uppercase z-10">
            Sponsored
          </div>
        ) : tool.trendingLabel ? (
          <div className="absolute right-0 top-0 rounded-bl-lg border-b border-l border-border bg-sand px-2.5 py-1 text-[10px] font-semibold tracking-widest text-muted uppercase z-10">
            {tool.trendingLabel.replace('🔥 ', '').replace('✨ ', '')}
          </div>
        ) : null}

        {/* Header */}
        <div className="mb-4 flex items-start gap-3">
          <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-sand text-foreground transition-colors duration-200 group-hover:bg-sand-dark">
            <DynamicIcon name={tool.icon} className="h-5 w-5 stroke-[1.5]" />
          </span>
          <div className="min-w-0">
            <h3 className="text-sm font-semibold text-foreground tracking-tight leading-snug">
              {tool.name}
            </h3>
            <span className="text-[11px] text-muted capitalize">
              {tool.category.replace(/-/g, ' ')}
            </span>
          </div>
          {tool.featured && !sponsored && (
            <span className="ml-auto shrink-0 text-[10px] font-semibold uppercase tracking-widest text-accent">
              Featured
            </span>
          )}
        </div>

        {/* Description */}
        <p className="mb-4 flex-1 text-[13px] leading-relaxed text-muted line-clamp-3">
          {tool.shortDescription}
        </p>

        {/* Tags */}
        <div className="mb-4 flex flex-wrap gap-1.5">
          {tool.difficulty && (
            <span className="rounded-md border border-border px-2 py-0.5 text-[11px] text-muted">
              {tool.difficulty}
            </span>
          )}
          {tool.tags?.slice(0, 2).map(tag => (
            <span key={tag} className="rounded-md border border-border px-2 py-0.5 text-[11px] text-muted">
              {tag.replace(/^[^\w\s]+\s?/, '')}
            </span>
          ))}
        </div>

        {/* Actions */}
        <div className="flex items-center gap-2 pt-4 border-t border-border">
          <Link
            href={`/tools/${tool.slug}`}
            className="flex flex-1 items-center justify-center gap-1.5 rounded-lg bg-foreground px-4 py-2.5 text-[12px] font-semibold text-background transition-opacity hover:opacity-85 active:scale-[0.98]"
          >
            Learn more
            <ArrowRight className="h-3 w-3" />
          </Link>
          <a
            href={tool.link}
            target="_blank"
            rel={sponsored ? 'sponsored noopener noreferrer' : 'noopener noreferrer'}
            className="flex h-[38px] w-[38px] items-center justify-center rounded-lg border border-border text-muted transition-all duration-150 hover:border-border-strong hover:text-foreground active:scale-[0.97]"
            aria-label={`Visit ${tool.name}`}
          >
            <ExternalLink className="h-3.5 w-3.5" />
          </a>
        </div>
      </div>
    </motion.div>
  );
}
