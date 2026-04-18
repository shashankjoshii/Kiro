import type { Metadata } from 'next';
import { tools, categories } from '@/lib/data';
import ToolDirectoryClient from './ToolDirectoryClient';

const BASE_URL = process.env.NEXT_PUBLIC_APP_URL || 'https://kiro-two-tau.vercel.app';

export const metadata: Metadata = {
  title: 'AI Tools Directory (2026) – Browse 200+ Best Tools by Category',
  description: 'The ultimate AI tools directory for 2026. Explore and filter 200+ of the best artificial intelligence tools for writing, coding, marketing, and more.',
  keywords: [
    'AI tools directory',
    'all AI tools',
    'best AI software',
    'AI tools list 2026',
    'discover AI tools'
  ],
  alternates: { canonical: `${BASE_URL}/tools` },
  openGraph: {
    title: 'AI Tools Directory (2026) | KIRO',
    description: 'Browse 200+ curated AI tools across all categories.',
    url: `${BASE_URL}/tools`,
    siteName: 'KIRO',
    type: 'website',
  },
};

export default function ToolDirectoryPage() {
  const seoIntro = `Welcome to the KIRO AI Tools Directory, your definitive database for discovering the best artificial intelligence software in 2026. With the rapid acceleration of AI technology, finding reliable, high-quality tools can be overwhelming. We've categorized and scored over 200 of the most powerful AI applications — from advanced coding assistants and text generators to innovative image creation and data analysis platforms. Whether you are a student looking for a free tutor, a developer seeking a faster workflow, or a business owner aiming to automate operations, our directory makes it easy to find exactly what you need. Use the filters below to explore tools by category, compare pricing, and read our in-depth reviews and comparison guides. Every tool listed here has been evaluated for real-world utility, so you can stop searching and start building.`;

  return <ToolDirectoryClient tools={tools} categories={categories} seoIntro={seoIntro} />;
}
