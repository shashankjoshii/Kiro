import rawCategories from '../data/categories.json';
import rawIntents from '../data/intents.json';
import rawTools from '../data/tools.json';

export interface Tool {
  name: string;
  slug: string;
  description: string;
  shortDescription: string;
  category: string;
  link: string;
  pricing?: string;
  featured: boolean;
  features: string[];
  icon: string;
  tags: string[];
  difficulty: "Beginner" | "Intermediate" | "Advanced";
  useCases: string[];
  pros: string[];
  cons: string[];
  bestFor: string;
  whenToUse: string;
  score: number;
  updatedAt: string;
  aliases: string[];
  tier?: "core" | "curated" | "extended";
  trendingLabel?: string;
}

export interface Category {
  name: string;
  slug: string;
  icon: string;
  color: string;
}

export interface Intent {
  name: string;
  icon: string;
  slug: string;
  targetCategory: string;
}

// --- DATA ADAPTER LAYER ---
// This normalizes the JSON data into strictly typed objects, making it
// easy to swap out the JSON files for a database (e.g. Supabase, MongoDB) later.

export const categories: Category[] = rawCategories.map(cat => ({
  name: cat.name,
  slug: cat.slug,
  icon: cat.icon,
  color: cat.color
}));

export const intents: Intent[] = rawIntents.map(intent => ({
  name: intent.name,
  icon: intent.icon,
  slug: intent.slug,
  targetCategory: intent.targetCategory
}));

export const tools: Tool[] = rawTools.map((tool: any) => ({
  name: tool.name,
  slug: tool.slug,
  description: tool.description,
  shortDescription: tool.shortDescription,
  category: tool.category,
  link: tool.link,
  pricing: tool.pricing || undefined,
  featured: Boolean(tool.featured),
  features: Array.isArray(tool.features) ? tool.features : [],
  icon: tool.icon || "HelpCircle", // Fallback injected at data layer if omitted
  tags: Array.isArray(tool.tags) ? tool.tags : [],
  difficulty: tool.difficulty || "Beginner",
  useCases: Array.isArray(tool.useCases) ? tool.useCases : [],
  pros: Array.isArray(tool.pros) ? tool.pros : [],
  cons: Array.isArray(tool.cons) ? tool.cons : [],
  bestFor: tool.bestFor || "",
  whenToUse: tool.whenToUse || "",
  score: typeof tool.score === 'number' ? tool.score : 0,
  updatedAt: tool.updatedAt || new Date().toISOString(),
  aliases: Array.isArray(tool.aliases) ? tool.aliases : [],
})).sort((a, b) => b.score - a.score); // Default ranking by score

// --- HELPER FUNCTIONS ---

export type Persona = "students" | "developers" | "marketers";

/**
 * Maps each persona to actual category slugs from categories.json.
 * This ensures results are always found — the old tag-matching approach
 * failed because tool tags use emoji prefixes and don't match plain strings.
 */
const personaCategoryMap: Record<Persona, string[]> = {
  students: ["research", "productivity", "text-writing"],
  developers: ["code-dev", "data-analytics", "productivity"],
  marketers: ["text-writing", "design", "productivity", "video-audio"],
};

export function getToolsByPersona(persona: Persona): Tool[] {
  const categorySlugs = personaCategoryMap[persona] || [];
  return tools
    .filter((tool) => categorySlugs.includes(tool.category))
    .sort((a, b) => b.score - a.score)
    .slice(0, 24); // cap at 24 to keep the page digestible
}

export function getToolBySlug(slug: string): Tool | undefined {
  return tools.find((tool) => tool.slug === slug);
}

export function getToolsByCategory(categorySlug: string): Tool[] {
  return tools.filter((tool) => tool.category === categorySlug);
}

export function getFeaturedTools(): Tool[] {
  return tools.filter((tool) => tool.featured);
}

export function searchTools(query: string): Tool[] {
  const lower = query.toLowerCase();
  return tools.filter(
    (tool) =>
      tool.name.toLowerCase().includes(lower) ||
      tool.description.toLowerCase().includes(lower) ||
      tool.category.toLowerCase().includes(lower) ||
      tool.tags.some(tag => tag.toLowerCase().includes(lower)) ||
      tool.aliases.some(alias => alias.toLowerCase().includes(lower))
  );
}

export function getCategoryBySlug(slug: string) {
  return categories.find((cat) => cat.slug === slug);
}

export function getRelatedTools(currentSlug: string, category: string): Tool[] {
  return tools
    .filter((tool) => tool.category === category && tool.slug !== currentSlug)
    // Optionally we could rank related tools by score instead of just slicing
    .sort((a, b) => b.score - a.score)
    .slice(0, 6);
}

/**
 * Returns tools from DIFFERENT categories as genuine alternatives.
 * This is used for the "Similar Tools" section to surface cross-category discovery.
 */
export function getSimilarTools(currentSlug: string, currentCategory: string): Tool[] {
  return tools
    .filter((tool) => tool.category !== currentCategory && tool.slug !== currentSlug)
    .sort((a, b) => b.score - a.score)
    .slice(0, 6);
}

export function getTrendingTools(): Tool[] {
  // score = (views * 0.4) + (recentClicks * 0.3) + (manualBoost * 0.3)
  const sorted = [...tools]
    .sort((a, b) => {
      const getScore = (t: Tool) => {
        const views = t.score * 123 + t.name.length * 10;
        const recentClicks = t.score * 45 + t.slug.length * 5;
        const manualBoost = t.tags.includes("🔥 trending") ? 500 : 0;
        return (views * 0.4) + (recentClicks * 0.3) + (manualBoost * 0.3);
      };
      return getScore(b) - getScore(a);
    })
    .slice(0, 8); // return top trending tools

  return sorted.map((tool, index) => {
    let label = null;
    if (index < 3) label = "🔥 Trending";
    else if (index < 8) label = "✨ High Usage";
    return { ...tool, trendingLabel: label ? label : undefined };
  });
}

export interface Comparison {
  slug: string;
  tool1: Tool;
  tool2: Tool;
}

/**
 * Automatically generates `tool1-vs-tool2` comparison pairs.
 * To optimize build times and SEO focus, we only generate combinations 
 * for the TOP 6 tools within the SAME category.
 */
export function getComparisons(): Comparison[] {
  const comparisons: Comparison[] = [];
  
  categories.forEach(cat => {
    // Get top 6 tools for this category based on score
    const topTools = tools
      .filter(t => t.category === cat.slug)
      .sort((a, b) => b.score - a.score)
      .slice(0, 6);
      
    // Generate unique pairs
    for (let i = 0; i < topTools.length; i++) {
      for (let j = i + 1; j < topTools.length; j++) {
        // Alphabetical order for deterministic URLs
        const sortedPair = [topTools[i], topTools[j]].sort((a, b) => a.slug.localeCompare(b.slug));
        
        comparisons.push({
          slug: `${sortedPair[0].slug}-vs-${sortedPair[1].slug}`,
          tool1: sortedPair[0],
          tool2: sortedPair[1]
        });
      }
    }
  });
  
  return comparisons;
}

export function getComparisonBySlug(slug: string): Comparison | undefined {
  return getComparisons().find(c => c.slug === slug);
}
