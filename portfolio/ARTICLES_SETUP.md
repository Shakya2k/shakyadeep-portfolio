# Articles Page - Medium RSS Integration

## Overview
The Articles page now dynamically fetches your Medium articles using your public RSS feed. This approach is more reliable than web scraping individual article pages, as Medium provides RSS feeds for all public profiles.

## How It Works

### Technical Implementation
- **RSS Feed URL**: `https://medium.com/feed/@{your-username}`
- **Libraries Used**: 
  - `xml2js` for parsing RSS XML
  - `cheerio` for HTML parsing (extracting images from article content)
- **Caching**: Articles are cached for 1 hour using Next.js's `revalidate` option

### What Gets Fetched
For each article, the system automatically extracts:
- ✅ **Title**: Full article title
- ✅ **Description**: First 200 characters of article content
- ✅ **Thumbnail Image**: First image from the article
- ✅ **URL**: Direct link to the Medium article
- ✅ **Categories/Tags**: Article topics
- ✅ **Publish Date**: When the article was published

## Configuration

### Update Your Medium Username
The username is currently set in `/app/portfolio/app/articles/page.tsx`:

```typescript
const MEDIUM_USERNAME = "shakyadeepbhattacharyya";
```

To change it, simply update this constant to your Medium username (without the @ symbol).

### Customization Options

1. **Change Cache Duration**
   In `/app/portfolio/lib/fetchMediumRSS.ts`, modify the `revalidate` value:
   ```typescript
   next: { revalidate: 3600 }, // 1 hour (in seconds)
   ```

2. **Filter Articles**
   You can filter articles by category, date, or other criteria in the `getArticles()` function in `articles/page.tsx`.

3. **Adjust Description Length**
   In `/app/portfolio/lib/fetchMediumRSS.ts`, change the description truncation:
   ```typescript
   return text.length > 200 ? text.substring(0, 200) + '...' : text;
   ```

## Adding More Articles
**No action needed!** The page automatically fetches all articles from your Medium profile. When you publish a new article on Medium, it will appear on your portfolio within 1 hour (or immediately after the cache expires).

To force a refresh, restart the Next.js dev server or rebuild the site.

## Troubleshooting

### Articles Not Showing
1. Verify your Medium username is correct
2. Check that your Medium profile is public
3. Ensure you have published articles on Medium
4. Check the browser console and terminal for errors

### Images Not Loading
1. The Medium CDN domains are already configured in `next.config.mjs`
2. If using custom images, add their domains to the `remotePatterns` array

### Deployment Considerations
- **Vercel**: Works out of the box (RSS fetching is supported)
- **Static Export**: Articles will be fetched at build time, not runtime
- **ISR (Incremental Static Regeneration)**: Recommended for keeping articles fresh without rebuilding

## Files Modified/Created

### Created:
- `/lib/fetchMediumRSS.ts` - RSS feed fetching and parsing logic
- `ARTICLES_SETUP.md` - This documentation

### Modified:
- `/app/articles/page.tsx` - Switched to RSS feed approach
- `/components/ArticleCard.tsx` - Updated interface
- `/next.config.mjs` - Added Medium CDN domains for images

### Deprecated (can be removed):
- `/data/articles.json` - No longer needed
- `/lib/fetchMediumMetadata.ts` - Old scraping approach

## Benefits Over Previous Approach

| Feature | Old (Scraping) | New (RSS Feed) |
|---------|---------------|----------------|
| Reliability | ❌ Blocked by Medium | ✅ Official API |
| Images | ❌ Failed to fetch | ✅ Extracted from content |
| Descriptions | ❌ Fallback text only | ✅ Real article excerpt |
| Maintenance | ❌ Manual overrides needed | ✅ Fully automatic |
| Performance | ⚠️ Slow (403 errors) | ✅ Fast and cached |

## Future Enhancements
- Add pagination for many articles
- Add article search/filtering by category
- Display publication date on cards
- Add reading time estimates
