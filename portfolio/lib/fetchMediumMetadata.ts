// Utility to fetch Medium article metadata from server-side
// This avoids CORS issues by fetching from Node environment

export interface MediumMetadata {
  title: string;
  description: string;
  imageUrl: string | null;
  url: string;
}

export interface ArticleConfig {
  id: string;
  mediumUrl: string;
  overrideTitle: string | null;
  overrideDescription: string | null;
  overrideImage?: string | null; // Optional manual image URL
}

export interface ArticleData extends MediumMetadata {
  id: string;
}

/**
 * Fetches and parses Medium article metadata from Open Graph tags
 * @param url - The Medium article URL
 * @returns MediumMetadata object with title, description, image, and URL
 */
export async function fetchMediumMetadata(url: string): Promise<MediumMetadata> {
  try {
    // Add headers to mimic a real browser and avoid bot detection
    const response = await fetch(url, {
      headers: {
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36',
        'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,*/*;q=0.8',
        'Accept-Language': 'en-US,en;q=0.9',
        'Accept-Encoding': 'gzip, deflate, br',
        'Connection': 'keep-alive',
        'Upgrade-Insecure-Requests': '1',
        'Cache-Control': 'max-age=0',
      },
      next: { revalidate: 3600 }, // Cache for 1 hour
    });

    if (!response.ok) {
      console.error(`HTTP error fetching ${url}: ${response.status}`);
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const html = await response.text();

    // Extract Open Graph metadata with improved regex patterns
    const title = 
      extractMetaTag(html, 'og:title') || 
      extractMetaTag(html, 'twitter:title') ||
      extractTitleTag(html) ||
      url;
      
    const description = 
      extractMetaTag(html, 'og:description') || 
      extractMetaTag(html, 'twitter:description') ||
      extractMetaTag(html, 'description') ||
      'View this article on Medium.';
      
    const imageUrl = 
      extractMetaTag(html, 'og:image') || 
      extractMetaTag(html, 'twitter:image') ||
      extractMetaTag(html, 'twitter:image:src') ||
      null;

    console.log(`Fetched metadata for ${url}:`, { title: title.substring(0, 50), hasImage: !!imageUrl });

    return {
      title: cleanText(title),
      description: cleanText(description),
      imageUrl,
      url,
    };
  } catch (error) {
    console.error(`Failed to fetch metadata for ${url}:`, error);
    // Graceful fallback
    return {
      title: 'Article on Medium',
      description: 'Click to read this article on Medium.',
      imageUrl: null,
      url,
    };
  }
}

/**
 * Helper function to extract meta tag content from HTML
 * @param html - HTML string to parse
 * @param property - The meta property to extract (e.g., 'og:title')
 * @returns The content value or null if not found
 */
function extractMetaTag(html: string, property: string): string | null {
  // Try multiple patterns to match different meta tag formats
  const patterns = [
    // property="og:title" content="..."
    new RegExp(`<meta[^>]*property=["']${escapeRegex(property)}["'][^>]*content=["']([^"']*)["']`, 'i'),
    // content="..." property="og:title"
    new RegExp(`<meta[^>]*content=["']([^"']*)["'][^>]*property=["']${escapeRegex(property)}["']`, 'i'),
    // name="og:title" content="..."
    new RegExp(`<meta[^>]*name=["']${escapeRegex(property)}["'][^>]*content=["']([^"']*)["']`, 'i'),
    // content="..." name="og:title"
    new RegExp(`<meta[^>]*content=["']([^"']*)["'][^>]*name=["']${escapeRegex(property)}["']`, 'i'),
  ];

  for (const pattern of patterns) {
    const match = html.match(pattern);
    if (match && match[1]) {
      return match[1];
    }
  }

  return null;
}

/**
 * Extract title from <title> tag as fallback
 */
function extractTitleTag(html: string): string | null {
  const match = html.match(/<title[^>]*>([^<]+)<\/title>/i);
  return match?.[1] || null;
}

/**
 * Escape special regex characters
 */
function escapeRegex(str: string): string {
  return str.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
}

/**
 * Clean extracted text (decode HTML entities, trim whitespace)
 */
function cleanText(text: string): string {
  return text
    .replace(/&quot;/g, '"')
    .replace(/&amp;/g, '&')
    .replace(/&lt;/g, '<')
    .replace(/&gt;/g, '>')
    .replace(/&#39;/g, "'")
    .replace(/&nbsp;/g, ' ')
    .trim();
}

/**
 * Merges fetched metadata with config overrides
 * @param config - Article configuration from JSON
 * @param metadata - Fetched metadata from Medium
 * @returns Complete ArticleData object
 */
export function mergeArticleData(
  config: ArticleConfig,
  metadata: MediumMetadata
): ArticleData {
  return {
    id: config.id,
    title: config.overrideTitle || metadata.title,
    description: config.overrideDescription || metadata.description,
    imageUrl: metadata.imageUrl,
    url: metadata.url,
  };
}
