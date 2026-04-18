'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import { ArrowLeft, ExternalLink, Check, ArrowRight, X, DollarSign } from 'lucide-react';
import type { Tool } from '@/lib/data';
import ToolCard from '@/components/ToolCard';
import { useEffect } from 'react';
import { useMascot } from '@/context/MascotContext';
import DynamicIcon from '@/components/DynamicIcon';

interface Props {
  tool: Tool;
  relatedTools: Tool[];
  similarTools: Tool[];
  seoIntro: string;
  category?: { name: string; slug: string; icon: string; color: string };
}

export default function ToolDetailClient({ tool, relatedTools, similarTools, seoIntro, category }: Props) {
  const { setMascotState } = useMascot();

  // Reset mascot when viewing a tool
  useEffect(() => {
    setMascotState('idle');
  }, [setMascotState]);

  // JSON-LD Structured Data (SoftwareApplication schema)
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'SoftwareApplication',
    name: tool.name,
    applicationCategory: category?.name || tool.category,
    description: tool.description,
    url: tool.link,
    operatingSystem: 'Web',
    offers: tool.pricing
      ? { '@type': 'Offer', description: tool.pricing }
      : { '@type': 'Offer', price: '0', priceCurrency: 'USD', description: 'Free tier available' },
  };

  return (
    <>
      {/* JSON-LD Schema Markup — rendered server-side */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      <div className="px-4 py-8 sm:px-6 sm:py-16 lg:px-8">
        <div className="mx-auto max-w-5xl">
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

          {/* Hero Banner Area */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, ease: [0.21, 0.47, 0.32, 0.98] }}
            className="mb-12 relative overflow-hidden rounded-3xl border border-border bg-card/50 p-8 shadow-sm backdrop-blur-md sm:p-12"
          >
            {/* Subtle gradient background effect */}
            <div className="absolute right-0 top-0 -mt-20 -mr-20 h-64 w-64 rounded-full bg-accent/10 blur-[80px] pointer-events-none" />

            <div className="relative z-10 flex flex-col gap-8 lg:flex-row lg:items-center lg:justify-between">
              <div className="flex items-start gap-6">
                <div className="flex h-20 w-20 shrink-0 items-center justify-center rounded-2xl bg-sand text-foreground shadow-md border border-border/50">
                  <DynamicIcon name={tool.icon} className="h-10 w-10 stroke-[1.5]" />
                </div>
                <div className="pt-1">
                  <div className="mb-2 flex flex-wrap items-center gap-3">
                    <h1 className="text-3xl font-bold tracking-tight sm:text-5xl font-serif text-foreground">
                      {tool.name}
                    </h1>
                    {tool.featured && (
                      <span className="rounded-full bg-accent-bg px-3 py-1 text-[11px] font-bold uppercase tracking-widest text-accent shadow-sm">
                        Featured
                      </span>
                    )}
                  </div>

                  <div className="flex flex-wrap items-center gap-2 mb-4">
                    {category && (
                      <Link
                        href={`/categories/${category.slug}`}
                        className="inline-flex items-center gap-1.5 text-sm font-medium text-muted transition-colors hover:text-foreground bg-sand px-3 py-1 rounded-full"
                      >
                        <DynamicIcon name={category.icon} className="h-4 w-4" />
                        {category.name}
                      </Link>
                    )}
                    {tool.difficulty && (
                      <span className="inline-flex items-center gap-1.5 text-sm font-medium text-muted bg-sand px-3 py-1 rounded-full">
                        Difficulty: {tool.difficulty}
                      </span>
                    )}
                    {tool.pricing && (
                      <span className="inline-flex items-center gap-1.5 text-sm font-medium text-accent-dark bg-accent-bg px-3 py-1 rounded-full border border-accent/20">
                        <DollarSign className="h-3.5 w-3.5" />
                        {tool.pricing}
                      </span>
                    )}
                  </div>

                  <div className="flex flex-wrap gap-2">
                    {tool.tags?.map(tag => (
                      <span key={tag} className="text-xs font-semibold px-2 py-0.5 rounded border border-accent/20 bg-accent-bg text-accent-dark">
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              </div>

              <div className="shrink-0 flex flex-col sm:items-end">
                <a
                  href={tool.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 rounded-xl bg-accent px-8 py-4 text-[15px] font-bold text-white shadow-lg shadow-accent/20 transition-all hover:shadow-xl hover:shadow-accent/40 hover:-translate-y-1 active:scale-95"
                >
                  Visit {tool.name}
                  <ExternalLink className="h-4 w-4" />
                </a>
                <p className="text-xs text-muted mt-3 sm:text-right font-medium">Opens in new tab</p>
              </div>
            </div>
          </motion.div>

          {/* SEO Intro Block — server-rendered content for indexability */}
          <div className="mb-10 rounded-2xl border border-border bg-sand/40 px-8 py-6">
            <p className="text-[15px] leading-[1.85] text-muted font-sans">{seoIntro}</p>
          </div>

          {/* Two-Column Content Layout */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">

            {/* Left Column (Main Info) */}
            <div className="lg:col-span-2 space-y-8">

              {/* Visual Placeholder */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.1 }}
                className="w-full aspect-video rounded-3xl bg-sand/50 border border-border flex items-center justify-center overflow-hidden relative"
              >
                <div className="text-center p-6">
                  <span className="text-4xl block mb-4 opacity-50">👀</span>
                  <h3 className="text-lg font-bold text-foreground font-serif">Quick Demo</h3>
                  <p className="text-sm text-muted mt-1 max-w-sm mx-auto">
                    This area is reserved for an interactive demo, video, or high-res preview of {tool.name}.
                  </p>
                </div>
                {/* Decorative mock UI lines */}
                <div className="absolute left-6 top-6 right-6 bottom-6 border border-dashed border-border rounded-xl opacity-50 pointer-events-none" />
              </motion.div>

              {/* What it does */}
              <motion.section
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.2 }}
                className="rounded-3xl border border-border bg-card p-8 shadow-sm"
              >
                <h2 className="mb-4 text-2xl font-bold font-serif text-foreground">What does it do?</h2>
                <p className="text-[16px] leading-relaxed text-muted font-sans">{tool.description}</p>
              </motion.section>

              {/* Features */}
              <motion.section
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.3 }}
                className="rounded-3xl border border-border bg-card p-8 shadow-sm"
              >
                <h2 className="mb-6 text-2xl font-bold font-serif text-foreground">Core Capabilities</h2>
                <div className="grid gap-3 sm:grid-cols-2">
                  {tool.features.map((feature) => (
                    <div
                      key={feature}
                      className="flex items-start gap-4 rounded-xl bg-sand/50 px-4 py-3.5 border border-border/50 transition-colors hover:bg-sand"
                    >
                      <div className="flex h-6 w-6 shrink-0 flex-col items-center justify-center rounded-full bg-accent-bg border border-accent/20">
                        <Check className="h-3.5 w-3.5 text-accent-dark" />
                      </div>
                      <span className="text-[14px] font-medium text-foreground">{feature}</span>
                    </div>
                  ))}
                </div>
              </motion.section>

            </div>

            {/* Right Column (Sidebar) */}
            <div className="space-y-8">

              {/* Best For / Use Cases */}
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5, delay: 0.2 }}
                className="rounded-3xl border border-border bg-sand/30 p-8 shadow-sm"
              >
                <h3 className="text-sm font-bold uppercase tracking-wider text-muted mb-4 border-b border-border pb-2">Best For</h3>
                <p className="text-[15px] font-serif text-foreground leading-relaxed mb-6">
                  {tool.bestFor || 'Professionals and creators looking to enhance their workflow.'}
                </p>

                <h3 className="text-sm font-bold uppercase tracking-wider text-muted mb-4 border-b border-border pb-2">Common Use Cases</h3>
                <ul className="space-y-3">
                  {tool.useCases?.map((useCase, idx) => (
                    <li key={idx} className="flex gap-3 text-[14px] text-muted">
                      <span className="text-accent">•</span>
                      {useCase}
                    </li>
                  ))}
                </ul>
              </motion.div>

              {/* When should I use this? */}
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5, delay: 0.3 }}
                className="rounded-3xl border border-accent/20 bg-accent-bg/50 p-8 shadow-sm relative overflow-hidden"
              >
                <span className="absolute top-4 right-4 text-4xl opacity-10">💡</span>
                <h3 className="text-lg font-bold font-serif text-accent-dark mb-3">When should I use this?</h3>
                <p className="text-[15px] font-medium text-foreground/80 leading-relaxed relative z-10">
                  {tool.whenToUse || 'Whenever you need to solve complex problems within this category.'}
                </p>
              </motion.div>

              {/* Compare with — internal linking */}
              {relatedTools.length > 0 && (
                <motion.div
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.5, delay: 0.4 }}
                  className="rounded-3xl border border-border bg-card p-8 shadow-sm"
                >
                  <h3 className="text-sm font-bold uppercase tracking-wider text-muted mb-4 border-b border-border pb-2">Compare with</h3>
                  <div className="flex flex-wrap gap-2 mt-4">
                    {relatedTools.slice(0, 4).map((rt) => (
                      <Link
                        key={rt.slug}
                        href={`/tools/${rt.slug}`}
                        className="inline-flex items-center gap-1.5 text-[14px] font-medium text-foreground bg-sand hover:bg-border transition-colors px-4 py-2 rounded-xl"
                      >
                        {rt.name}
                      </Link>
                    ))}
                  </div>
                </motion.div>
              )}

            </div>
          </div>

          {/* Pros and Cons Split Section */}
          <motion.section
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.4 }}
            className="mt-12 mb-16 grid grid-cols-1 sm:grid-cols-2 gap-6"
          >
            <div className="rounded-3xl border border-green-500/10 bg-green-50/50 p-8">
              <div className="flex items-center gap-3 mb-6">
                <div className="flex h-8 w-8 items-center justify-center rounded-full bg-green-100 text-green-600">
                  <Check className="h-5 w-5" />
                </div>
                <h2 className="text-2xl font-bold font-serif text-foreground">Pros</h2>
              </div>
              <ul className="space-y-4">
                {tool.pros?.map((pro, i) => (
                  <li key={i} className="flex gap-3 text-[15px] text-muted">
                    <span className="text-green-500 mt-0.5">•</span>
                    {pro}
                  </li>
                ))}
              </ul>
            </div>

            <div className="rounded-3xl border border-red-500/10 bg-red-50/50 p-8">
              <div className="flex items-center gap-3 mb-6">
                <div className="flex h-8 w-8 items-center justify-center rounded-full bg-red-100 text-red-600">
                  <X className="h-5 w-5" />
                </div>
                <h2 className="text-2xl font-bold font-serif text-foreground">Cons</h2>
              </div>
              <ul className="space-y-4">
                {tool.cons?.map((con, i) => (
                  <li key={i} className="flex gap-3 text-[15px] text-muted">
                    <span className="text-red-500 mt-0.5">•</span>
                    {con}
                  </li>
                ))}
              </ul>
            </div>
          </motion.section>

          {/* Related Tools — same category */}
          {relatedTools.length > 0 && (
            <motion.section
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              className="pt-12 border-t border-border"
            >
              <div className="mb-8 flex flex-col gap-2">
                <h2 className="text-3xl font-bold font-serif text-foreground">Related Tools</h2>
                <p className="text-muted text-[15px]">
                  Other excellent tools in the{' '}
                  <span className="font-semibold text-foreground">{category?.name}</span> category.
                </p>
              </div>

              <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                {relatedTools.slice(0, 6).map((rt, i) => (
                  <ToolCard key={rt.slug} tool={rt} index={i} />
                ))}
              </div>
            </motion.section>
          )}

          {/* Similar Tools — cross-category discovery */}
          {similarTools.length > 0 && (
            <motion.section
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              className="pt-12 mt-12 border-t border-border"
            >
              <div className="mb-8 flex flex-col gap-2">
                <h2 className="text-3xl font-bold font-serif text-foreground">You Might Also Like</h2>
                <p className="text-muted text-[15px]">Discover more powerful AI tools across different categories.</p>
              </div>

              <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                {similarTools.slice(0, 6).map((st, i) => (
                  <ToolCard key={st.slug} tool={st} index={i} />
                ))}
              </div>

              <div className="mt-8 text-center">
                <Link
                  href="/categories"
                  className="inline-flex items-center gap-2 rounded-xl bg-sand px-6 py-3 text-sm font-semibold text-foreground transition-all hover:bg-sand-dark hover:shadow-sm"
                >
                  Explore All Categories
                  <ArrowRight className="h-4 w-4" />
                </Link>
              </div>
            </motion.section>
          )}
        </div>
      </div>
    </>
  );
}
