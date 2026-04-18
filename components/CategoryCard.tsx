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
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay: index * 0.05, ease: [0.21, 0.47, 0.32, 0.98] }}
    >
      <Link href={`/category/${slug}`} className="group block">
        <motion.div
          whileHover={{ y: -2 }}
          transition={{ type: 'spring', stiffness: 400, damping: 25 }}
          className="flex items-center justify-between rounded-2xl border border-border bg-card/60 backdrop-blur-md p-4 transition-all duration-300 hover:border-accent/30 hover:bg-card hover:shadow-[0_8px_30px_rgb(0,0,0,0.04)]"
        >
          <div className="flex items-center gap-3.5">
            <span className="flex h-12 w-12 items-center justify-center rounded-xl bg-sand text-foreground shadow-sm transition-transform duration-300 group-hover:scale-105 group-hover:bg-accent-bg group-hover:shadow-md group-hover:text-accent-dark">
              <DynamicIcon name={icon} className="h-6 w-6 stroke-[1.5]" />
            </span>
            <div>
              <h3 className="text-sm font-semibold text-foreground tracking-tight transition-colors group-hover:text-accent-dark">{name}</h3>
              <p className="text-[13px] font-medium text-muted mt-0.5">
                {toolCount} {toolCount === 1 ? 'tool' : 'tools'}
              </p>
            </div>
          </div>
          <div className="flex h-8 w-8 items-center justify-center rounded-full bg-sand/50 transition-colors duration-300 group-hover:bg-accent/10">
            <ArrowRight className="h-4 w-4 text-muted transition-all duration-300 group-hover:translate-x-0.5 group-hover:text-accent-dark" />
          </div>
        </motion.div>
      </Link>
    </motion.div>
  );
}
