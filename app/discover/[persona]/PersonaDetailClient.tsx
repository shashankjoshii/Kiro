'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import { ArrowLeft } from 'lucide-react';
import type { Tool, Persona } from '@/lib/data';
import ToolCard from '@/components/ToolCard';

interface Props {
  persona: Persona;
  tools: Tool[];
}

export default function PersonaDetailClient({ persona, tools }: Props) {
  let headerTitle = "Top AI Tools";
  
  if (persona === "developers") {
    headerTitle = "Best AI Tools for Developers";
  } else if (persona === "students") {
    headerTitle = "Top AI Tools for Students";
  } else if (persona === "marketers") {
    headerTitle = "AI Tools Every Marketer Should Use";
  }

  return (
    <div className="px-4 py-8 sm:px-6 sm:py-16 lg:px-8">
      <div className="mx-auto max-w-6xl">
        {/* Back button */}
        <motion.div
          initial={{ opacity: 0, x: -10 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.3 }}
        >
          <Link
            href="/"
            className="mb-8 inline-flex items-center gap-2 text-sm font-semibold text-muted transition-colors hover:text-foreground"
          >
            <ArrowLeft className="h-4 w-4" />
            Back to Directory
          </Link>
        </motion.div>

        {/* Hero Section */}
        <motion.div
           initial={{ opacity: 0, y: 30 }}
           animate={{ opacity: 1, y: 0 }}
           transition={{ duration: 0.5 }}
           className="mb-12 text-center"
        >
          <h1 className="mb-4 text-4xl font-bold tracking-tight sm:text-5xl lg:text-6xl text-foreground font-serif">
            {headerTitle}
          </h1>
          <p className="mx-auto max-w-2xl text-lg text-muted font-serif">
            Hand-picked collection of {tools.length} AI tools curated specifically for {persona}. Supercharge your workflow.
          </p>
        </motion.div>

        {/* Tools Grid */}
        {tools.length > 0 ? (
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {tools.map((tool, i) => (
              <ToolCard key={tool.slug} tool={tool} index={i} />
            ))}
          </div>
        ) : (
          <div className="py-20 text-center text-muted">
            <p>No tools found for this persona yet.</p>
          </div>
        )}
      </div>
    </div>
  );
}
