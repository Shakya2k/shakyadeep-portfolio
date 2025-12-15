// Unified article system - supports both external (Medium) and internal (MDX) articles

import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';
import readingTime from 'reading-time';
import { fetchMediumRSSFeed } from './fetchMediumRSS';

const articlesDirectory = path.join(process.cwd(), 'content/articles');
const articlesConfigPath = path.join(process.cwd(), 'data/articles-config.json');

// Unified article interface
export interface Article {
  id: string;
  slug: string;
  title: string;
  description: string;
  heroImage: string | null;
  category: string;
  date: string;
  readTime?: string;
  tags?: string[];
  isExternal: boolean;
  url: string; // External URL for Medium articles, internal route for MDX
}

export interface InternalArticleFrontmatter {
  title: string;
  description: string;
  heroImage: string;
  category: string;
  date: string;
  tags?: string[];
  draft?: boolean;
}

/**
 * Get all internal (MDX) articles
 */
export async function getInternalArticles(): Promise<Article[]> {
  // Check if directory exists
  if (!fs.existsSync(articlesDirectory)) {
    return [];
  }

  const fileNames = fs.readdirSync(articlesDirectory);
  const mdxFiles = fileNames.filter(name => name.endsWith('.mdx'));

  const articles = mdxFiles.map(fileName => {
    const slug = fileName.replace(/\.mdx$/, '');
    const fullPath = path.join(articlesDirectory, fileName);
    const fileContents = fs.readFileSync(fullPath, 'utf8');
    const { data, content } = matter(fileContents);
    const frontmatter = data as InternalArticleFrontmatter;

    // Skip drafts
    if (frontmatter.draft) {
      return null;
    }

    // Calculate read time
    const stats = readingTime(content);

    return {
      id: slug,
      slug,
      title: frontmatter.title,
      description: frontmatter.description,
      heroImage: frontmatter.heroImage || null,
      category: frontmatter.category,
      date: frontmatter.date,
      readTime: stats.text,
      tags: frontmatter.tags || [],
      isExternal: false,
      url: `/articles/${slug}`,
    };
  }).filter(Boolean) as Article[];

  // Sort by date descending
  return articles.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
}

/**
 * Get all external (Medium) articles from config
 */
export async function getExternalArticles(): Promise<Article[]> {
  try {
    // Read config file
    const configContent = fs.readFileSync(articlesConfigPath, 'utf8');
    const config = JSON.parse(configContent);

    // Fetch Medium RSS feed
    const mediumArticles = await fetchMediumRSSFeed('shakyadeepbhattacharyya');

    // Match config with Medium data
    const articles = config
      .filter((item: any) => item.isExternal)
      .map((item: any) => {
        const mediumData = mediumArticles.find(a => 
          a.url.includes(item.slug) || item.mediumUrl.includes(item.slug)
        );

        if (!mediumData) {
          console.warn(`Medium article not found for slug: ${item.slug}`);
          return null;
        }

        return {
          id: item.id,
          slug: item.slug,
          title: mediumData.title,
          description: mediumData.description,
          heroImage: mediumData.imageUrl,
          category: item.category,
          date: mediumData.publishedDate,
          readTime: undefined,
          tags: mediumData.categories,
          isExternal: true,
          url: mediumData.url,
        };
      })
      .filter(Boolean) as Article[];

    return articles;
  } catch (error) {
    console.error('Error loading external articles:', error);
    return [];
  }
}

/**
 * Get all articles (both internal and external)
 */
export async function getAllArticles(): Promise<Article[]> {
  const [internal, external] = await Promise.all([
    getInternalArticles(),
    getExternalArticles(),
  ]);

  const allArticles = [...internal, ...external];

  // Sort by date descending
  return allArticles.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
}

/**
 * Get all unique categories from all articles
 */
export async function getAllCategories(): Promise<string[]> {
  const articles = await getAllArticles();
  const categories = new Set(articles.map(a => a.category));
  return Array.from(categories).sort();
}

/**
 * Get a single internal article by slug
 */
export async function getArticleBySlug(slug: string): Promise<{
  article: Article;
  content: string;
} | null> {
  const fullPath = path.join(articlesDirectory, `${slug}.mdx`);

  if (!fs.existsSync(fullPath)) {
    return null;
  }

  const fileContents = fs.readFileSync(fullPath, 'utf8');
  const { data, content } = matter(fileContents);
  const frontmatter = data as InternalArticleFrontmatter;

  if (frontmatter.draft) {
    return null;
  }

  const stats = readingTime(content);

  const article: Article = {
    id: slug,
    slug,
    title: frontmatter.title,
    description: frontmatter.description,
    heroImage: frontmatter.heroImage || null,
    category: frontmatter.category,
    date: frontmatter.date,
    readTime: stats.text,
    tags: frontmatter.tags || [],
    isExternal: false,
    url: `/articles/${slug}`,
  };

  return { article, content };
}
