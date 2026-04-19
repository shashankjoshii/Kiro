"use client";

import { motion, type Variants } from "framer-motion";
import type { Metadata } from "next";
import { ArrowUpRight, Sparkles, Heart, Eye, Minus } from "lucide-react";

// SEO metadata is exported from a separate generateMetadata or via the metadata object below.
// Since this is a client component, we handle metadata via a parallel metadata export.

const fadeUp: Variants = {
  hidden: { opacity: 0, y: 24 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: {
      delay: i * 0.1,
      duration: 0.6,
      ease: [0.25, 0.46, 0.45, 0.94] as const,
    },
  }),
};

const stagger: Variants = {
  visible: {
    transition: {
      staggerChildren: 0.12,
    },
  },
};

const principles = [
  {
    title: "Simplicity over clutter",
    description:
      "Every element earns its place. We strip away noise so you can focus on what matters.",
  },
  {
    title: "Quality over quantity",
    description:
      "We don't list every AI tool — we surface the ones worth your time, carefully reviewed and organized.",
  },
  {
    title: "Clarity over hype",
    description:
      "No buzzwords, no inflated promises. Just honest, clear descriptions of what each tool does.",
  },
];

const missions = [
  {
    icon: Sparkles,
    title: "Improve AI literacy",
    description:
      "Help everyone — from students to professionals — understand the AI landscape without feeling lost.",
  },
  {
    icon: Heart,
    title: "Better decisions with AI",
    description:
      "Empower people to choose the right tools for their specific needs, saving time and effort.",
  },
  {
    icon: Eye,
    title: "Free and accessible",
    description:
      "KIRO will always be free. Great information shouldn't be locked behind a paywall.",
  },
];

export default function AboutPage() {
  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative overflow-hidden">
        {/* Subtle background gradient */}
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            background:
              "radial-gradient(ellipse 80% 50% at 50% -20%, rgba(212,119,84,0.08), transparent)",
          }}
        />

        <div className="relative mx-auto max-w-3xl px-5 pt-24 pb-20 sm:px-8 sm:pt-32 sm:pb-28 text-center">
          <motion.div
            initial="hidden"
            animate="visible"
            variants={stagger}
          >
            <motion.div
              custom={0}
              variants={fadeUp}
              className="inline-flex items-center gap-2 rounded-full border border-border bg-card px-4 py-1.5 text-xs text-muted mb-8"
            >
              <span
                className="h-1.5 w-1.5 rounded-full"
                style={{ background: "var(--color-accent)" }}
              />
              About KIRO
            </motion.div>

            <motion.h1
              custom={1}
              variants={fadeUp}
              className="font-serif text-4xl sm:text-5xl md:text-6xl font-medium tracking-tight leading-[1.1] mb-6"
            >
              Why KIRO Exists
            </motion.h1>

            <motion.p
              custom={2}
              variants={fadeUp}
              className="text-lg sm:text-xl text-muted leading-relaxed max-w-xl mx-auto"
            >
              Making AI tools understandable and accessible for everyone
            </motion.p>
          </motion.div>
        </div>
      </section>

      {/* Divider */}
      <div className="mx-auto max-w-3xl px-5 sm:px-8">
        <div className="h-px bg-border" />
      </div>

      {/* Story Section */}
      <section className="mx-auto max-w-3xl px-5 py-20 sm:px-8 sm:py-28">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-80px" }}
          variants={stagger}
        >
          <motion.p
            custom={0}
            variants={fadeUp}
            className="text-xs uppercase tracking-[0.2em] text-accent font-medium mb-4"
          >
            The Story
          </motion.p>

          <motion.h2
            custom={1}
            variants={fadeUp}
            className="font-serif text-2xl sm:text-3xl font-medium tracking-tight mb-10 leading-snug"
          >
            AI is moving fast.
            <br />
            <span className="text-muted">Finding the right tool shouldn't be.</span>
          </motion.h2>

          <div className="space-y-6 text-base sm:text-lg text-muted leading-relaxed">
            <motion.p custom={2} variants={fadeUp}>
              Artificial intelligence is growing at an unprecedented pace. Every week,
              new tools are launched — each promising to change how we work, create,
              and think. The possibilities are genuinely exciting, but the sheer volume
              is overwhelming.
            </motion.p>

            <motion.p custom={3} variants={fadeUp}>
              Most people don't know where to start. They hear about ChatGPT, see
              threads about Midjourney, stumble upon a dozen writing assistants — and
              still have no idea which tool actually fits their needs. The noise
              drowns out the signal.
            </motion.p>

            <motion.p custom={4} variants={fadeUp}>
              That's why KIRO exists. We organize and simplify AI tool discovery,
              turning an chaotic landscape into something you can actually navigate.
              No hype, no clutter — just a clear, curated view of what's out there
              and what it's good for.
            </motion.p>
          </div>
        </motion.div>
      </section>

      {/* Divider */}
      <div className="mx-auto max-w-3xl px-5 sm:px-8">
        <div className="h-px bg-border" />
      </div>

      {/* Mission Section */}
      <section className="mx-auto max-w-3xl px-5 py-20 sm:px-8 sm:py-28">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-80px" }}
          variants={stagger}
        >
          <motion.p
            custom={0}
            variants={fadeUp}
            className="text-xs uppercase tracking-[0.2em] text-accent font-medium mb-4"
          >
            Our Mission
          </motion.p>

          <motion.h2
            custom={1}
            variants={fadeUp}
            className="font-serif text-2xl sm:text-3xl font-medium tracking-tight mb-12 leading-snug"
          >
            What we're building toward
          </motion.h2>

          <div className="grid gap-8 sm:grid-cols-3">
            {missions.map((item, i) => (
              <motion.div
                key={item.title}
                custom={i + 2}
                variants={fadeUp}
                className="group"
              >
                <div
                  className="mb-4 inline-flex h-10 w-10 items-center justify-center rounded-xl border border-border bg-card transition-colors group-hover:border-accent/30 group-hover:bg-accent-bg"
                >
                  <item.icon
                    className="h-4.5 w-4.5 text-muted transition-colors group-hover:text-accent"
                    strokeWidth={1.5}
                  />
                </div>
                <h3 className="font-serif text-base font-medium mb-2">
                  {item.title}
                </h3>
                <p className="text-sm text-muted leading-relaxed">
                  {item.description}
                </p>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </section>

      {/* Divider */}
      <div className="mx-auto max-w-3xl px-5 sm:px-8">
        <div className="h-px bg-border" />
      </div>

      {/* Principles Section */}
      <section className="mx-auto max-w-3xl px-5 py-20 sm:px-8 sm:py-28">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-80px" }}
          variants={stagger}
        >
          <motion.p
            custom={0}
            variants={fadeUp}
            className="text-xs uppercase tracking-[0.2em] text-accent font-medium mb-4"
          >
            Principles
          </motion.p>

          <motion.h2
            custom={1}
            variants={fadeUp}
            className="font-serif text-2xl sm:text-3xl font-medium tracking-tight mb-12 leading-snug"
          >
            How we think about building KIRO
          </motion.h2>

          <div className="space-y-0">
            {principles.map((principle, i) => (
              <motion.div
                key={principle.title}
                custom={i + 2}
                variants={fadeUp}
                className="group border-t border-border py-8 first:border-t-0 first:pt-0 last:pb-0"
              >
                <div className="flex items-start gap-4">
                  <div className="mt-1 flex h-6 w-6 shrink-0 items-center justify-center rounded-full border border-border text-muted transition-colors group-hover:border-accent/40 group-hover:text-accent">
                    <Minus className="h-3 w-3" strokeWidth={2} />
                  </div>
                  <div>
                    <h3 className="font-serif text-base sm:text-lg font-medium mb-1.5">
                      {principle.title}
                    </h3>
                    <p className="text-sm sm:text-base text-muted leading-relaxed">
                      {principle.description}
                    </p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </section>

      {/* Divider */}
      <div className="mx-auto max-w-3xl px-5 sm:px-8">
        <div className="h-px bg-border" />
      </div>

      {/* Creator Section */}
      <section className="mx-auto max-w-3xl px-5 py-20 sm:px-8 sm:py-28">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-80px" }}
          variants={stagger}
          className="text-center"
        >
          <motion.p
            custom={0}
            variants={fadeUp}
            className="text-xs uppercase tracking-[0.2em] text-accent font-medium mb-4"
          >
            Creator
          </motion.p>

          <motion.div
            custom={1}
            variants={fadeUp}
            className="mx-auto mb-6 flex h-16 w-16 items-center justify-center rounded-full border border-border bg-card"
          >
            <span className="font-serif text-xl font-medium text-accent">SJ</span>
          </motion.div>

          <motion.h2
            custom={2}
            variants={fadeUp}
            className="font-serif text-2xl sm:text-3xl font-medium tracking-tight mb-4"
          >
            Created by Shashank Joshi
          </motion.h2>

          <motion.p
            custom={3}
            variants={fadeUp}
            className="text-base sm:text-lg text-muted leading-relaxed max-w-md mx-auto"
          >
            Built with curiosity and the intent to simplify AI for everyone
            exploring this space.
          </motion.p>
        </motion.div>
      </section>

      {/* Footer line */}
      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8 }}
        className="mx-auto max-w-3xl px-5 pb-16 sm:px-8"
      >
        <div className="border-t border-border pt-8 text-center">
          <p className="text-xs text-muted-light tracking-wide">
            KIRO is a free platform built for learners and builders.
          </p>
        </div>
      </motion.div>
    </div>
  );
}
