import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import { ArrowLeft, Calendar, User, Clock, Share2 } from 'lucide-react';
import { blogPosts, getPostBySlug } from '@/lib/blog';
import Breadcrumbs from '@/components/Breadcrumbs';

const BASE_URL = process.env.NEXT_PUBLIC_APP_URL || 'https://kiro-two-tau.vercel.app';

export function generateStaticParams() {
  return blogPosts.map((post) => ({ slug: post.slug }));
}

export async function generateMetadata(
  props: { params: Promise<{ slug: string }> }
): Promise<Metadata> {
  const { slug } = await props.params;
  const post = getPostBySlug(slug);
  if (!post) return {};

  const canonical = `${BASE_URL}/blog/${slug}`;

  return {
    title: `${post.title} | KIRO Blog`,
    description: post.excerpt,
    alternates: { canonical },
    openGraph: {
      title: post.title,
      description: post.excerpt,
      url: canonical,
      siteName: 'KIRO',
      type: 'article',
      publishedTime: new Date(post.date).toISOString(),
      authors: [post.author],
    },
    twitter: {
      card: 'summary_large_image',
      title: post.title,
      description: post.excerpt,
    },
  };
}

export default async function BlogPostPage(props: { params: Promise<{ slug: string }> }) {
  const { slug } = await props.params;
  const post = getPostBySlug(slug);

  if (!post) notFound();

  // Basic markdown-like rendering for the mock content
  const renderedContent = post.content
    .split('\n\n')
    .map((paragraph, idx) => {
      if (paragraph.startsWith('## ')) {
        return <h2 key={idx} className="text-2xl font-bold font-serif text-foreground mt-10 mb-4">{paragraph.replace('## ', '')}</h2>;
      }
      return <p key={idx} className="text-[17px] leading-[1.8] text-muted font-sans mb-6">{paragraph}</p>;
    });

  return (
    <article className="px-4 py-8 sm:px-6 sm:py-16 lg:px-8">
      <div className="mx-auto max-w-3xl">

        <Breadcrumbs crumbs={[
          { label: 'Home', href: '/' },
          { label: 'Blog', href: '/blog' },
          { label: post.title },
        ]} />

        {/* Article Header */}
        <header className="mb-12">
          <div className="mb-6 inline-flex items-center rounded-lg bg-accent-bg px-3 py-1 text-xs font-bold text-accent-dark">
            {post.category}
          </div>
          <h1 className="text-3xl font-bold font-serif text-foreground sm:text-4xl md:text-5xl leading-tight mb-6">
            {post.title}
          </h1>
          
          <div className="flex flex-wrap items-center gap-6 text-sm font-medium text-muted py-6 border-y border-border">
            <div className="flex items-center gap-2">
              <div className="h-8 w-8 rounded-full bg-sand flex items-center justify-center text-foreground">✍️</div>
              <span>{post.author}</span>
            </div>
            <div className="flex items-center gap-1.5 opacity-80">
              <Calendar className="h-4 w-4" /> {post.date}
            </div>
            <div className="flex items-center gap-1.5 opacity-80">
              <Clock className="h-4 w-4" /> {post.readTime}
            </div>
            <div className="ml-auto">
              <button aria-label="Share article" className="flex items-center gap-2 text-accent hover:text-accent-dark transition-colors">
                <Share2 className="h-4 w-4" /> Share
              </button>
            </div>
          </div>
        </header>

        {/* Content */}
        <div className="prose prose-lg dark:prose-invert max-w-none">
          {renderedContent}
        </div>

        {/* Author Bio Footer */}
        <footer className="mt-16 rounded-3xl border border-border bg-sand/30 p-8 flex flex-col sm:flex-row gap-6 items-center sm:items-start text-center sm:text-left">
          <div className="h-20 w-20 shrink-0 rounded-full bg-card border border-border flex items-center justify-center text-3xl shadow-sm">
            🦊
          </div>
          <div>
            <h3 className="text-lg font-bold font-serif text-foreground mb-2">Written by {post.author}</h3>
            <p className="text-sm text-muted leading-relaxed mb-4">
              The KIRO editorial team spends hundreds of hours testing and verifying AI software so you don't have to. Our mission is to filter out the noise and bring you only the tools that work.
            </p>
            <Link href="/tools" className="text-sm font-semibold text-accent hover:underline">
              Browse all AI tools →
            </Link>
          </div>
        </footer>

      </div>
    </article>
  );
}
