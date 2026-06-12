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
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.38, delay: index * 0.05, ease: [0.21, 0.47, 0.32, 0.98] }}
    >
      <Link
        href={`/category/${targetCategory}`}
        className="group block h-full"
        onMouseEnter={() => setMascotState('excited')}
        onMouseLeave={() => setMascotState('idle')}
      >
        <div className="flex h-full flex-col justify-between rounded-xl border border-border bg-card p-6 transition-all duration-200 hover:border-border-strong hover:shadow-[0_2px_16px_rgba(0,0,0,0.05)] hover:-translate-y-0.5">
          <div className="mb-5">
            <span className="flex h-11 w-11 items-center justify-center rounded-lg bg-sand text-foreground transition-colors duration-200 group-hover:bg-sand-dark">
              <DynamicIcon name={icon} className="h-5.5 w-5.5 stroke-[1.5]" />
            </span>
          </div>
          <div>
            <h3
              className="mb-2 text-xl font-light text-foreground tracking-tight"
              style={{ fontFamily: 'var(--font-source-serif), Georgia, serif', letterSpacing: '-0.025em', lineHeight: '1.1' }}
            >
              {name}
            </h3>
            <span className="inline-flex items-center gap-1.5 text-[13px] text-muted transition-colors group-hover:text-foreground">
              Explore tools
              <ArrowRight className="h-3.5 w-3.5 transition-transform duration-200 group-hover:translate-x-0.5" />
            </span>
          </div>
        </div>
      </Link>
    </motion.div>
  );
}
