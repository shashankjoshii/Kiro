'use client';

import { motion } from 'framer-motion';
import { ArrowRight, Bot, GraduationCap, Briefcase } from 'lucide-react';
import Link from 'next/link';
import SearchBar from '@/components/SearchBar';
import ToolCard from '@/components/ToolCard';
import CategoryCard from '@/components/CategoryCard';
import IntentCard from '@/components/IntentCard';
import KiroHero from '@/components/KiroHero';
import { categories, getFeaturedTools, getToolsByCategory, intents, getTrendingTools } from '@/lib/data';

const statItems = [
  { value: '500+', label: 'Curated tools' },
  { value: '11', label: 'Categories' },
  { value: 'Free', label: 'Always' },
  { value: 'Weekly', label: 'Updates' },
];

function SectionHeading({ eyebrow, title, subtitle }: { eyebrow?: string; title: string; subtitle?: string }) {
  return (
    <div>
      {eyebrow && <p className="text-eyebrow text-muted mb-3">{eyebrow}</p>}
      <h2
        className="text-3xl sm:text-4xl text-foreground"
        style={{ fontFamily: 'var(--font-source-serif), Georgia, serif', fontWeight: 400, letterSpacing: '-0.025em', lineHeight: '1.1' }}
      >
        {title}
      </h2>
      {subtitle && <p className="mt-3 text-base text-muted leading-relaxed">{subtitle}</p>}
    </div>
  );
}

export default function HomePage() {
  const featuredTools = getFeaturedTools();
  const trendingTools = getTrendingTools();
  const agentTools = getToolsByCategory('ai-agents').slice(0, 4);
  const educationTools = getToolsByCategory('education').slice(0, 4);
  const businessTools = getToolsByCategory('business').slice(0, 4);

  return (
    <div>

      {/* ── HERO ─────────────────────────────────────────── */}
      <section className="px-4 pb-12 pt-20 sm:px-6 sm:pt-24 lg:px-8 lg:pt-28">
        <div className="mx-auto max-w-6xl">
          <div className="flex flex-col items-center justify-between gap-10 lg:flex-row lg:gap-8">

            {/* Left */}
            <div className="flex-1 text-center lg:text-left pt-4 max-w-2xl">
              <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.45 }}>
                <span className="badge mb-8 inline-flex">
                  <span className="relative flex h-1.5 w-1.5">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-accent opacity-60" />
                    <span className="relative inline-flex rounded-full h-1.5 w-1.5 bg-accent" />
                  </span>
                  500+ AI tools, curated for you
                </span>
              </motion.div>

              <motion.h1
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.07 }}
                className="mb-6 text-foreground"
                style={{
                  fontFamily: 'var(--font-source-serif), Georgia, serif',
                  fontSize: 'clamp(2.75rem, 6vw, 4.5rem)',
                  fontWeight: 300,
                  letterSpacing: '-0.03em',
                  lineHeight: '1.05',
                }}
              >
                AI tools, <br className="hidden sm:block" />
                <em style={{ fontStyle: 'italic' }}>actually</em> useful.
              </motion.h1>

              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.14 }}
                className="mx-auto mb-10 max-w-lg text-[16px] leading-relaxed text-muted lg:mx-0"
              >
                Curated, categorized, no fluff. Find the best AI tools based on what you actually want to build or create.
              </motion.p>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.21 }}
                className="max-w-md mx-auto lg:mx-0"
              >
                <SearchBar />
              </motion.div>
            </div>

            {/* Right — mascot */}
            <motion.div
              initial={{ opacity: 0, scale: 0.8, x: 16 }}
              animate={{ opacity: 1, scale: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.25, type: 'spring', bounce: 0.35 }}
              className="flex shrink-0 items-center justify-center lg:w-[420px]"
            >
              <KiroHero />
            </motion.div>
          </div>

          {/* Stats strip */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.45 }}
            className="mt-14 grid grid-cols-2 gap-px sm:grid-cols-4 rounded-xl overflow-hidden border border-border bg-border"
          >
            {statItems.map((s) => (
              <div key={s.label} className="bg-card px-5 py-4 text-center">
                <div
                  className="text-2xl font-light text-foreground"
                  style={{ fontFamily: 'var(--font-source-serif), Georgia, serif', letterSpacing: '-0.02em' }}
                >
                  {s.value}
                </div>
                <div className="text-[11px] text-muted mt-0.5 font-medium tracking-widest uppercase">{s.label}</div>
              </div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* ── RULE ─────────────────────────────────────────── */}
      <div className="rule" />

      {/* ── INTENTS ──────────────────────────────────────── */}
      <section className="px-4 py-20 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-6xl">
          <motion.div
            initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
            className="mb-10"
          >
            <SectionHeading
              eyebrow="By goal"
              title="What do you want to do?"
              subtitle="Select your goal and we'll find the right tools for the job."
            />
          </motion.div>
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {intents.map((intent, i) => (
              <IntentCard key={intent.slug} name={intent.name} slug={intent.slug}
                icon={intent.icon} targetCategory={intent.targetCategory} index={i} />
            ))}
          </div>
        </div>
      </section>

      {/* ── RULE ─────────────────────────────────────────── */}
      <div className="rule" />

      {/* ── TRENDING MARQUEE ─────────────────────────────── */}
      <section className="py-20 overflow-hidden">
        <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8 mb-8">
          <motion.div
            initial={{ opacity: 0, x: -16 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }}
          >
            <SectionHeading eyebrow="Right now" title="Trending tools" />
          </motion.div>
        </div>
        <div
          className="relative flex w-full overflow-hidden"
          style={{ maskImage: 'linear-gradient(to right, transparent, black 6%, black 94%, transparent)', WebkitMaskImage: 'linear-gradient(to right, transparent, black 6%, black 94%, transparent)' }}
        >
          <div className="flex gap-5 pr-5 shrink-0 animate-marquee">
            {[...trendingTools, ...trendingTools, ...trendingTools, ...trendingTools].map((tool, i) => (
              <div key={`${tool.slug}-${i}`} className="w-[300px] sm:w-[340px] shrink-0">
                <ToolCard tool={tool} index={0} />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── RULE ─────────────────────────────────────────── */}
      <div className="rule" />

      {/* ── AI AGENTS SPOTLIGHT ──────────────────────────── */}
      <section className="px-4 py-20 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-6xl">
          <motion.div
            initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
            className="mb-10 flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4"
          >
            <SectionHeading
              eyebrow="New category"
              title="AI Agents"
              subtitle="Autonomous AI that plans, acts, and delivers."
            />
            <Link href="/category/ai-agents" className="btn-secondary shrink-0 text-sm">
              All Agent tools <ArrowRight className="h-3.5 w-3.5" />
            </Link>
          </motion.div>
          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {agentTools.map((tool, i) => (
              <motion.div
                key={tool.slug}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.06 }}
              >
                <ToolCard tool={tool} index={i} />
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── RULE ─────────────────────────────────────────── */}
      <div className="rule" />

      {/* ── DISCOVER BY ROLE ─────────────────────────────── */}
      <section className="px-4 py-20 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-6xl">
          <motion.div initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="mb-10">
            <SectionHeading eyebrow="By persona" title="Discover by role" subtitle="Tailored AI collections for your specific work." />
          </motion.div>
          <div className="grid gap-4 sm:grid-cols-3">
            {[
              { href: '/discover/students', icon: '🎓', title: 'Students', desc: 'Study smarter, write better, learn faster.' },
              { href: '/discover/developers', icon: '💻', title: 'Developers', desc: 'Build apps, automate workflows, ship faster.' },
              { href: '/discover/marketers', icon: '📈', title: 'Marketers', desc: 'Grow faster with AI-powered campaigns.' },
            ].map(({ href, icon, title, desc }) => (
              <Link
                key={href}
                href={href}
                className="group block rounded-xl border border-border bg-card p-7 transition-all duration-200 hover:border-border-strong hover:shadow-[0_2px_16px_rgba(0,0,0,0.05)] hover:-translate-y-0.5"
              >
                <div className="mb-4 text-2xl">{icon}</div>
                <h3
                  className="text-xl text-foreground mb-2"
                  style={{ fontFamily: 'var(--font-source-serif), Georgia, serif', fontWeight: 400, letterSpacing: '-0.02em' }}
                >
                  {title}
                </h3>
                <p className="text-[13px] text-muted leading-relaxed">{desc}</p>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* ── RULE ─────────────────────────────────────────── */}
      <div className="rule" />

      {/* ── EDUCATION & BUSINESS ─────────────────────────── */}
      <section className="px-4 py-20 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-6xl">
          <div className="grid gap-16 lg:grid-cols-2">
            {/* Education */}
            <div>
              <motion.div initial={{ opacity: 0, y: 14 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="mb-8 flex items-end justify-between">
                <div className="flex items-center gap-2.5">
                  <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-sand">
                    <GraduationCap className="h-4 w-4 text-foreground" />
                  </span>
                  <SectionHeading title="Education" eyebrow="" />
                </div>
                <Link href="/category/education" className="flex items-center gap-1 text-sm text-muted hover:text-foreground transition-colors">
                  See all <ArrowRight className="h-3.5 w-3.5" />
                </Link>
              </motion.div>
              <div className="grid gap-4 sm:grid-cols-2">
                {educationTools.map((tool, i) => (
                  <motion.div key={tool.slug} initial={{ opacity: 0, y: 14 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.05 }}>
                    <ToolCard tool={tool} index={i} />
                  </motion.div>
                ))}
              </div>
            </div>

            {/* Business */}
            <div>
              <motion.div initial={{ opacity: 0, y: 14 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="mb-8 flex items-end justify-between">
                <div className="flex items-center gap-2.5">
                  <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-sand">
                    <Briefcase className="h-4 w-4 text-foreground" />
                  </span>
                  <SectionHeading title="Business & Sales" eyebrow="" />
                </div>
                <Link href="/category/business" className="flex items-center gap-1 text-sm text-muted hover:text-foreground transition-colors">
                  See all <ArrowRight className="h-3.5 w-3.5" />
                </Link>
              </motion.div>
              <div className="grid gap-4 sm:grid-cols-2">
                {businessTools.map((tool, i) => (
                  <motion.div key={tool.slug} initial={{ opacity: 0, y: 14 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.05 }}>
                    <ToolCard tool={tool} index={i} />
                  </motion.div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── RULE ─────────────────────────────────────────── */}
      <div className="rule" />

      {/* ── CATEGORIES ───────────────────────────────────── */}
      <section className="px-4 py-20 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-6xl">
          <motion.div initial={{ opacity: 0, y: 14 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="mb-10 flex items-end justify-between gap-4">
            <SectionHeading eyebrow="Browse" title="All categories" />
            <Link href="/category" className="flex items-center gap-1.5 text-sm text-muted hover:text-foreground transition-colors shrink-0">
              View all <ArrowRight className="h-3.5 w-3.5" />
            </Link>
          </motion.div>
          <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
            {categories.map((cat, i) => (
              <CategoryCard key={cat.slug} name={cat.name} slug={cat.slug}
                icon={cat.icon} color={cat.color} toolCount={getToolsByCategory(cat.slug).length} index={i} />
            ))}
          </div>
        </div>
      </section>

      {/* ── RULE ─────────────────────────────────────────── */}
      <div className="rule" />

      {/* ── TOP PICKS ────────────────────────────────────── */}
      <section className="px-4 py-20 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-6xl">
          <motion.div initial={{ opacity: 0, y: 14 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="mb-10 flex items-end justify-between gap-4">
            <SectionHeading eyebrow="Editor's pick" title="KIRO's top picks" />
            <Link href="/category" className="btn-secondary text-sm shrink-0">
              View all <ArrowRight className="h-3.5 w-3.5" />
            </Link>
          </motion.div>
          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {featuredTools.slice(0, 8).map((tool, i) => (
              <ToolCard key={tool.slug} tool={tool} index={i} />
            ))}
          </div>
        </div>
      </section>

      {/* ── CTA ──────────────────────────────────────────── */}
      <section className="px-4 py-24 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-4xl">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.55 }}
            className="rounded-2xl bg-foreground px-10 py-16 sm:px-16 text-center"
          >
            <p className="text-eyebrow text-background/50 mb-5">discover</p>
            <h2
              className="mb-5 text-background"
              style={{
                fontFamily: 'var(--font-source-serif), Georgia, serif',
                fontSize: 'clamp(2rem, 4vw, 3rem)',
                fontWeight: 300,
                letterSpacing: '-0.03em',
                lineHeight: '1.08',
              }}
            >
              Can't find what you're<br />looking for?
            </h2>
            <p className="mb-10 text-[15px] text-background/60 max-w-md mx-auto leading-relaxed">
              We curate new tools every week. 500+ tools and growing — no fluff, no noise.
            </p>
            <Link
              href="/category"
              className="inline-flex items-center gap-2 rounded-lg bg-background text-foreground px-8 py-3.5 text-[14px] font-semibold transition-opacity hover:opacity-90 active:scale-[0.98]"
            >
              Browse all 500+ tools
              <ArrowRight className="h-4 w-4" />
            </Link>
          </motion.div>
        </div>
      </section>

    </div>
  );
}
