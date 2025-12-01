// Utility to fetch Medium articles from RSS feed
// More reliable than scraping individual article pages

import { parseStringPromise } from 'xml2js';

export interface MediumArticle {
  title: string;
  description: string;
  imageUrl: string | null;
  url: string;
  publishedDate: string;
  categories: string[];
}

/**
 * Extracts the first image URL from HTML content
 * @param htmlContent - HTML content string
 * @returns Image URL or null if not found
 */
function extractFirstImage(htmlContent: string): string | null {
  // Look for <img> tags in the content
  const imgMatch = htmlContent.match(/<img[^>]+src=["']([^"']+)["']/i);
  if (imgMatch && imgMatch[1]) {
    // Filter out tracking pixels (width="1" or height="1")
    if (!imgMatch[0].includes('width="1"') && !imgMatch[0].includes('height="1"')) {
      return imgMatch[1];
    }
  }
  
  // Look for <figure> with image
  const figureMatch = htmlContent.match(/<figure[^>]*>.*?<img[^>]+src=["']([^"']+)["'].*?<\/figure>/is);
  if (figureMatch && figureMatch[1]) {
    return figureMatch[1];
  }
  
  return null;
}

/**
 * Strips HTML tags and extracts plain text description
 * @param htmlContent - HTML content string
 * @returns Plain text description
 */
function extractPlainTextDescription(htmlContent: string): string {
  // Remove HTML tags
  let text = htmlContent.replace(/<[^>]+>/g, ' ');
  
  // Decode common HTML entities
  text = text
    .replace(/&quot;/g, '"')
    .replace(/&amp;/g, '&')
    .replace(/&lt;/g, '<')
    .replace(/&gt;/g, '>')
    .replace(/&#39;/g, "'")
    .replace(/&nbsp;/g, ' ')
    .replace(/\s+/g, ' ')
    .trim();
  
  // Return first 200 characters as description
  return text.length > 200 ? text.substring(0, 200) + '...' : text;
}

/**
 * Fetches articles from a Medium user's RSS feed
 * @param mediumUsername - The Medium username (e.g., "@shakyadeepbhattacharyya")
 * @returns Array of MediumArticle objects
 */
export async function fetchMediumRSSFeed(mediumUsername: string): Promise<MediumArticle[]> {
  try {
    // Remove @ if present
    const username = mediumUsername.replace('@', '');
    const rssUrl = `https://medium.com/feed/@${username}`;
    
    console.log(`📡 Fetching Medium RSS feed from: ${rssUrl}`);
    
    const response = await fetch(rssUrl, {
      headers: {
        'User-Agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36',
        'Accept': 'application/rss+xml, application/xml, text/xml, */*',
      },
      next: { revalidate: 3600 }, // Cache for 1 hour
    });
    
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    
    const xmlData = await response.text();
    const parsedData = await parseStringPromise(xmlData);
    
    const items = parsedData.rss?.channel?.[0]?.item || [];
    
    const articles: MediumArticle[] = items.map((item: any) => {
      const title = item.title?.[0] || 'Untitled Article';
      const link = item.link?.[0] || '';
      const pubDate = item.pubDate?.[0] || '';
      const categories = item.category || [];
      const contentEncoded = item['content:encoded']?.[0] || '';
      
      // Extract image from content
      const imageUrl = extractFirstImage(contentEncoded);
      
      // Extract description from content
      const description = extractPlainTextDescription(contentEncoded);
      
      return {
        title,
        description,
        imageUrl,
        url: link,
        publishedDate: pubDate,
        categories: categories.map((cat: any) => typeof cat === 'string' ? cat : cat._),
      };
    });
    
    console.log(`✅ Successfully fetched ${articles.length} articles from Medium RSS`);
    
    return articles;
  } catch (error) {
    console.error(`❌ Failed to fetch Medium RSS feed:`, error);
    return [];
  }
}

/**
 * Fetches a single article's metadata from the RSS feed by matching URL
 * @param articleUrl - The full Medium article URL
 * @param mediumUsername - The Medium username
 * @returns MediumArticle or null if not found
 */
export async function fetchSingleArticleFromRSS(
  articleUrl: string,
  mediumUsername: string
): Promise<MediumArticle | null> {
  const articles = await fetchMediumRSSFeed(mediumUsername);
  
  // Find article by URL match
  const article = articles.find(a => a.url.includes(articleUrl) || articleUrl.includes(a.url));
  
  return article || null;
}
