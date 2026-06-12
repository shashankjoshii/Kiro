'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';
import DynamicIcon from '@/components/DynamicIcon';

interface CategoryCardProps {
  name: string;
  slug: string;
  icon: string;
  color: string;
  toolCount: number;
  index?: number;
}

export default function CategoryCard({
  name,
  slug,
  icon,
  toolCount,
  index = 0,
}: CategoryCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.35, delay: index * 0.04, ease: [0.21, 0.47, 0.32, 0.98] }}
    >
      <Link href={`/category/${slug}`} className="group block">
        <div className="flex items-center justify-between rounded-xl border border-border bg-card px-4 py-3.5 transition-all duration-200 hover:border-border-strong hover:shadow-[0_2px_12px_rgba(0,0,0,0.04)] hover:-translate-y-0.5">
          <div className="flex items-center gap-3">
            <span className="flex h-9 w-9 items-center justify-center rounded-lg bg-sand text-foreground transition-colors duration-200 group-hover:bg-sand-dark">
              <DynamicIcon name={icon} className="h-4.5 w-4.5 stroke-[1.5]" />
            </span>
            <div>
              <h3 className="text-sm font-semibold text-foreground tracking-tight">{name}</h3>
              <p className="text-[12px] text-muted mt-0.5">
                {toolCount} {toolCount === 1 ? 'tool' : 'tools'}
              </p>
            </div>
          </div>
          <ArrowRight className="h-3.5 w-3.5 text-muted transition-all duration-200 group-hover:translate-x-0.5 group-hover:text-foreground" />
        </div>
      </Link>
    </motion.div>
  );
}
