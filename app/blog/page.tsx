import type { Metadata } from 'next';
import Link from 'next/link';
import { ArrowRight, Calendar, User, Clock } from 'lucide-react';
import { blogPosts } from '@/lib/blog';
import Breadcrumbs from '@/components/Breadcrumbs';

const BASE_URL = process.env.NEXT_PUBLIC_APP_URL || 'https://kiro-two-tau.vercel.app';

export const metadata: Metadata = {
  title: 'KIRO AI Blog | Insights, Guides & Industry Updates',
  description: 'Read the latest insights on artificial intelligence, guides on how to use AI tools, and in-depth software comparisons by the KIRO editorial team.',
  keywords: [
    'AI blog',
    'artificial intelligence news',
    'AI tool guides',
    'ChatGPT news',
    'KIRO blog'
  ],
  alternates: { canonical: `${BASE_URL}/blog` },
};

export default function BlogIndexPage() {
  return (
    <div className="px-4 py-8 sm:px-6 sm:py-16 lg:px-8">
      <div className="mx-auto max-w-5xl">
        <Breadcrumbs crumbs={[
          { label: 'Home', href: '/' },
          { label: 'Blog' }
        ]} />

        {/* Hero */}
        <div className="mb-14">
          <span className="inline-block rounded-full bg-accent-bg px-4 py-1.5 text-sm font-semibold text-accent mb-4">
            ✍️ The Authority Layer
          </span>
          <h1 className="text-4xl font-bold font-serif text-foreground sm:text-5xl mb-6">
            KIRO Insights & Guides
          </h1>
          <p className="max-w-2xl text-lg text-muted font-sans leading-relaxed">
            Stay ahead of the curve with our expert analysis, tool roundups, and deep dives into the artificial intelligence landscape.
          </p>
        </div>

        {/* Blog Post Grid */}
        <div className="grid gap-8 sm:grid-cols-2">
          {blogPosts.map((post) => (
            <Link 
              key={post.slug} 
              href={`/blog/${post.slug}`}
              className="group flex flex-col rounded-3xl border border-border bg-card p-6 shadow-sm transition-all hover:border-accent/40 hover:-translate-y-1 hover:shadow-md"
            >
              <div className="mb-4 inline-flex w-fit items-center rounded-lg bg-sand px-3 py-1 text-xs font-semibold text-muted-foreground">
                {post.category}
              </div>
              <h2 className="text-xl font-bold font-serif text-foreground mb-3 group-hover:text-accent-dark transition-colors">
                {post.title}
              </h2>
              <p className="text-sm text-muted mb-6 flex-1 line-clamp-3 leading-relaxed">
                {post.excerpt}
              </p>
              
              <div className="flex flex-wrap items-center gap-4 text-xs font-medium text-muted mt-auto pt-4 border-t border-border/50">
                <span className="flex items-center gap-1.5">
                  <User className="h-3.5 w-3.5" /> {post.author}
                </span>
                <span className="flex items-center gap-1.5">
                  <Calendar className="h-3.5 w-3.5" /> {post.date}
                </span>
                <span className="flex items-center gap-1.5">
                  <Clock className="h-3.5 w-3.5" /> {post.readTime}
                </span>
              </div>
            </Link>
          ))}
        </div>

        {/* CTA */}
        <div className="mt-16 rounded-3xl border border-border bg-sand/30 p-10 text-center">
          <h2 className="text-2xl font-bold font-serif text-foreground mb-4">Subscribe to our Newsletter</h2>
          <p className="text-muted mb-6 max-w-md mx-auto">Get the latest AI tool reviews and roundups delivered straight to your inbox once a week.</p>
          <form className="flex max-w-sm mx-auto gap-2">
            <input 
              type="email" 
              placeholder="Enter your email" 
              className="flex-1 rounded-xl border border-border px-4 py-3 text-sm focus:border-accent outline-none"
              required
            />
            <button type="submit" className="rounded-xl bg-accent px-6 py-3 text-sm font-bold text-white hover:bg-accent-dark transition-colors">
              Subscribe
            </button>
          </form>
        </div>

      </div>
    </div>
  );
}
