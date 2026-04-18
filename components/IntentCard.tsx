'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';
import { useMascot } from '@/context/MascotContext';
import DynamicIcon from '@/components/DynamicIcon';

interface IntentCardProps {
  name: string;
  slug: string;
  icon: string;
  targetCategory: string;
  index?: number;
}

export default function IntentCard({
  name,
  slug,
  icon,
  targetCategory,
  index = 0,
}: IntentCardProps) {
  const { setMascotState } = useMascot();

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95, y: 12 }}
      animate={{ opacity: 1, scale: 1, y: 0 }}
      transition={{ duration: 0.4, delay: index * 0.05, ease: [0.21, 0.47, 0.32, 0.98] }}
    >
      <Link 
        href={`/categories/${targetCategory}`} 
        className="group block h-full"
        onMouseEnter={() => setMascotState('excited')}
        onMouseLeave={() => setMascotState('idle')}
      >
        <div className="flex h-full flex-col justify-between rounded-2xl border border-border bg-card p-6 transition-all duration-300 hover:border-accent/40 hover:bg-card/50 hover:shadow-[0_12px_40px_rgb(0,0,0,0.06)] hover:-translate-y-1">
          <div className="mb-4">
            <span className="flex h-14 w-14 items-center justify-center rounded-2xl bg-sand text-foreground shadow-sm transition-transform duration-300 group-hover:scale-110 group-hover:rotate-3 group-hover:bg-accent-bg group-hover:shadow-md group-hover:text-accent-dark">
              <DynamicIcon name={icon} className="h-7 w-7 stroke-[1.5]" />
            </span>
          </div>
          <div>
            <h3 className="mb-1 text-lg font-bold text-foreground tracking-tight transition-colors group-hover:text-accent-dark">{name}</h3>
            <span className="inline-flex items-center gap-1.5 text-[13px] font-semibold text-muted transition-colors group-hover:text-accent">
              Explore tools
              <ArrowRight className="h-3.5 w-3.5 transition-transform duration-300 group-hover:translate-x-1" />
            </span>
          </div>
        </div>
      </Link>
    </motion.div>
  );
}
