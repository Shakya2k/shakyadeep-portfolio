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
    const response = await fetch(url, {
      headers: {
        'User-Agent': 'Mozilla/5.0 (compatible; MetadataBot/1.0)',
      },
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const html = await response.text();

    // Extract Open Graph metadata using regex
    const title = extractMetaTag(html, 'og:title') || extractMetaTag(html, 'twitter:title') || url;
    const description = extractMetaTag(html, 'og:description') || extractMetaTag(html, 'twitter:description') || 'View this article on Medium.';
    const imageUrl = extractMetaTag(html, 'og:image') || extractMetaTag(html, 'twitter:image') || null;

    return {
      title,
      description,
      imageUrl,
      url,
    };
  } catch (error) {
    console.error(`Failed to fetch metadata for ${url}:`, error);
    // Graceful fallback
    return {
      title: url,
      description: 'View this article on Medium.',
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
  // Match both property and name attributes for maximum compatibility
  const propertyRegex = new RegExp(
    `<meta[^>]*(?:property|name)=["']${property}["'][^>]*content=["']([^"']*)["']`,
    'i'
  );
  const contentRegex = new RegExp(
    `<meta[^>]*content=["']([^"']*)["'][^>]*(?:property|name)=["']${property}["']`,
    'i'
  );

  const propertyMatch = html.match(propertyRegex);
  const contentMatch = html.match(contentRegex);

  return propertyMatch?.[1] || contentMatch?.[1] || null;
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
