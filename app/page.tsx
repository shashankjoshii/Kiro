'use client';

import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';
import Link from 'next/link';
import SearchBar from '@/components/SearchBar';
import ToolCard from '@/components/ToolCard';
import CategoryCard from '@/components/CategoryCard';
import IntentCard from '@/components/IntentCard';
import KiroHero from '@/components/KiroHero';
import { tools, categories, getFeaturedTools, getToolsByCategory, intents, getTrendingTools } from '@/lib/data';

export default function HomePage() {
  const featuredTools = getFeaturedTools();
  const trendingTools = getTrendingTools();

  return (
    <div className="relative">
      {/* Hero Section */}
      <section className="relative overflow-hidden px-4 pb-16 pt-20 sm:px-6 sm:pt-24 lg:px-8 lg:pt-32">
        {/* Floating Background Effects */}
        <div className="pointer-events-none absolute left-[10%] top-20 h-72 w-72 rounded-full bg-accent/5 blur-[100px]" />
        <div className="pointer-events-none absolute right-[10%] top-40 h-80 w-80 rounded-full bg-orange-400/5 blur-[120px]" />

        <div className="relative mx-auto max-w-6xl">
          <div className="flex flex-col items-center justify-between gap-12 lg:flex-row lg:gap-8">
            {/* Left Column */}
            <div className="flex-1 text-center lg:text-left pt-8">
              <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
                <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-border bg-card/60 px-4 py-1.5 text-sm font-semibold text-accent backdrop-blur-sm shadow-sm">
                  <span>✨ Meet KIRO: Your AI Assistant</span>
                </div>
              </motion.div>

              <motion.h1
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.1 }}
                className="mb-6 text-5xl font-bold tracking-tight sm:text-6xl lg:text-7xl leading-[1.1] text-foreground"
              >
                AI tools, but <br className="hidden lg:block"/>
                <span className="text-accent">actually useful.</span>
              </motion.h1>

              <motion.p
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.2 }}
                className="mx-auto mb-10 max-w-xl text-lg leading-relaxed text-muted lg:mx-0 font-serif"
              >
                Curated, categorized, no fluff. Find the best AI tools based on what you actually want to build or create.
              </motion.p>
              
              <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.3 }} className="max-w-md mx-auto lg:mx-0">
                 <SearchBar />
              </motion.div>

            </div>

            {/* Right Column (Mascot) */}
            <motion.div
              initial={{ opacity: 0, scale: 0.8, x: 20 }}
              animate={{ opacity: 1, scale: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.3, type: "spring", bounce: 0.4 }}
              className="flex shrink-0 items-center justify-center lg:w-[450px]"
            >
              <KiroHero />
            </motion.div>
          </div>
        </div>
      </section>

      {/* Discovery by Intent */}
      <section className="px-4 py-20 sm:px-6 lg:px-8 bg-card/30 border-y border-border/50">
        <div className="mx-auto max-w-6xl">
          <div className="mb-12 text-center sm:text-left">
            <motion.h2 
              initial={{ opacity: 0, y: 20 }} 
              whileInView={{ opacity: 1, y: 0 }} 
              viewport={{ once: true }} 
              className="text-3xl font-bold tracking-tight sm:text-4xl text-foreground font-serif"
            >
              What do you want to do?
            </motion.h2>
            <motion.p 
              initial={{ opacity: 0, y: 20 }} 
              whileInView={{ opacity: 1, y: 0 }} 
              viewport={{ once: true }} 
              transition={{ delay: 0.1 }}
              className="mt-3 text-lg text-muted font-serif"
            >
              Select your goal and we'll show you the exact tools for the job.
            </motion.p>
          </div>

          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {intents.map((intent, i) => (
              <IntentCard
                key={intent.slug}
                name={intent.name}
                slug={intent.slug}
                icon={intent.icon}
                targetCategory={intent.targetCategory}
                index={i}
              />
            ))}
          </div>
        </div>
      </section>

      {/* WOW SECTION: Trending Right Now Marquee */}
      <section className="py-24 overflow-hidden">
         <style dangerouslySetInnerHTML={{__html: `
            @keyframes marquee {
              0% { transform: translateX(0%); }
              100% { transform: translateX(-50%); }
            }
            .animate-marquee {
              animation: marquee 40s linear infinite;
            }
            @media (hover: hover) and (pointer: fine) {
              .animate-marquee:hover {
                animation-play-state: paused;
              }
            }
         `}} />
         <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 mb-10">
            <motion.div 
               initial={{ opacity: 0, x: -20 }}
               whileInView={{ opacity: 1, x: 0 }}
               viewport={{ once: true }}
               className="flex items-center gap-3"
            >
               <span className="text-3xl">🔥</span>
               <h2 className="text-3xl font-bold tracking-tight sm:text-4xl font-serif">Trending Right Now</h2>
            </motion.div>
         </div>
         
         {/* Marquee Container */}
         <div 
           className="relative flex w-full overflow-hidden group"
           style={{ 
             maskImage: 'linear-gradient(to right, transparent, black 10%, black 90%, transparent)',
             WebkitMaskImage: 'linear-gradient(to right, transparent, black 10%, black 90%, transparent)'
           }}
         >
            <div 
               className="flex gap-6 pr-6 shrink-0 animate-marquee"
            >
               {/* Duplicate tools multiple times for infinite scroll effect */}
               {[...trendingTools, ...trendingTools, ...trendingTools, ...trendingTools].map((tool, i) => (
                 <div key={`${tool.slug}-${i}`} className="w-[320px] sm:w-[350px] shrink-0">
                    <ToolCard tool={tool} index={0} />
                 </div>
               ))}
            </div>
         </div>
      </section>

      {/* Personalized Discovery */}
      <section className="px-4 py-20 sm:px-6 lg:px-8 bg-card/50 border-t border-border/50">
        <div className="mx-auto max-w-6xl">
          <div className="mb-12 text-center sm:text-left">
            <h2 className="text-3xl font-bold tracking-tight sm:text-4xl font-serif text-foreground">Personalized Discovery</h2>
            <p className="mt-3 text-lg text-muted font-serif">
              Tailored AI tools collections curated exclusively for your role.
            </p>
          </div>

          <div className="grid gap-6 sm:grid-cols-3">
            <Link href="/discover/students" className="group rounded-2xl border border-border bg-card p-8 transition-all hover:bg-sand hover:border-accent/30 hover:shadow-lg hover:-translate-y-1 block">
              <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-accent-bg text-2xl shadow-sm mb-4">
                🎓
              </div>
              <h3 className="text-xl font-bold text-foreground mb-2 group-hover:text-accent-dark transition-colors">Students</h3>
              <p className="text-sm text-muted">Tools to study smarter and faster</p>
            </Link>

            <Link href="/discover/developers" className="group rounded-2xl border border-border bg-card p-8 transition-all hover:bg-sand hover:border-accent/30 hover:shadow-lg hover:-translate-y-1 block">
              <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-accent-bg text-2xl shadow-sm mb-4">
                💻
              </div>
              <h3 className="text-xl font-bold text-foreground mb-2 group-hover:text-accent-dark transition-colors">Developers</h3>
              <p className="text-sm text-muted">Build apps, automate workflows</p>
            </Link>

            <Link href="/discover/marketers" className="group rounded-2xl border border-border bg-card p-8 transition-all hover:bg-sand hover:border-accent/30 hover:shadow-lg hover:-translate-y-1 block">
              <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-accent-bg text-2xl shadow-sm mb-4">
                📈
              </div>
              <h3 className="text-xl font-bold text-foreground mb-2 group-hover:text-accent-dark transition-colors">Marketers</h3>
              <p className="text-sm text-muted">Grow faster with AI marketing tools</p>
            </Link>
          </div>
        </div>
      </section>

      {/* Categories */}
      <section className="px-4 py-20 sm:px-6 lg:px-8 bg-sand/30 border-t border-border/50">
        <div className="mx-auto max-w-6xl">
          <div className="mb-12">
            <h2 className="text-3xl font-bold tracking-tight sm:text-4xl font-serif">Explore Categories</h2>
          </div>

          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {categories.map((cat, i) => (
              <CategoryCard
                key={cat.slug}
                name={cat.name}
                slug={cat.slug}
                icon={cat.icon}
                color={cat.color}
                toolCount={getToolsByCategory(cat.slug).length}
                index={i}
              />
            ))}
          </div>
        </div>
      </section>

      {/* Featured Tools as Fallback Discovery */}
      <section className="px-4 py-20 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-6xl">
          <div className="mb-12 flex items-center justify-between">
            <h2 className="text-3xl font-bold tracking-tight sm:text-4xl font-serif">Mascot&apos;s Top Picks</h2>
            <Link
              href="/category"
              className="hidden items-center gap-1.5 rounded-xl bg-sand/50 px-4 py-2.5 text-sm font-semibold text-muted transition-all hover:bg-sand hover:text-foreground sm:flex"
            >
              View All Tools
              <ArrowRight className="h-4 w-4" />
            </Link>
          </div>

          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {featuredTools.slice(0, 8).map((tool, i) => (
              <ToolCard key={tool.slug} tool={tool} index={i} />
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="px-4 py-24 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-4xl text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="rounded-3xl border border-accent/20 bg-accent-bg/50 p-12 sm:p-16 relative overflow-hidden"
          >
            <div className="relative z-10">
               <h2 className="mb-4 text-3xl font-bold sm:text-4xl text-foreground font-serif">
                 Can&apos;t find what you&apos;re looking for?
               </h2>
               <p className="mb-8 text-lg text-muted max-w-xl mx-auto font-serif">
                 We curate new tools manually every week so you don't have to sift through the noise.
               </p>
               <Link
                 href="/category"
                 className="inline-flex items-center gap-2 rounded-xl bg-accent px-8 py-4 text-[15px] font-bold text-white shadow-lg shadow-accent/20 transition-all hover:shadow-xl hover:shadow-accent/40 hover:-translate-y-1 active:scale-95"
               >
                 Discover All Tools
                 <ArrowRight className="h-4 w-4" />
               </Link>
            </div>
            
            {/* Decorative background circle */}
            <div className="absolute top-0 right-0 -mr-20 -mt-20 w-64 h-64 rounded-full bg-accent/5 blur-3xl pointer-events-none" />
          </motion.div>
        </div>
      </section>
    </div>
  );
}
