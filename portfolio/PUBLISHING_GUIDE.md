# Publishing Guide: How to Add Articles

This guide explains how to add both **internal** (site-hosted) and **external** (Medium) articles to your portfolio.

---

## 📝 Publishing an Internal Article

Internal articles are hosted on your site as MDX files with full control over content and design.

### Step 1: Create the MDX File

Create a new file in `/content/articles/` with a descriptive filename:

```
/content/articles/my-article-slug.mdx
```

### Step 2: Add Frontmatter

Every MDX article **must** start with YAML frontmatter containing these fields:

```yaml
---
slug: "my-article-slug"
title: "Your Article Title"
subtitle: "Optional catchy subtitle or tagline"
date: "2025-12-20"
category: "Fintech"
tags: ["credit cards", "pricing", "product strategy"]
heroImage: "/articles/my-article/hero.jpg"
heroImageAlt: "Description of hero image for accessibility"
readingTimeMinutes: 12
isExternal: false
excerpt: "A brief 1-2 sentence summary that appears on the articles page card."
draft: false
---
```

**Field Descriptions:**

| Field | Required | Description |
|-------|----------|-------------|
| `slug` | ✅ Yes | URL-safe identifier (e.g., `my-article-slug`) |
| `title` | ✅ Yes | Main article title |
| `subtitle` | ❌ No | Secondary heading shown below title |
| `date` | ✅ Yes | Publication date (YYYY-MM-DD format) |
| `category` | ✅ Yes | Category for filtering (e.g., "SaaS", "Fintech", "Analytics") |
| `tags` | ❌ No | Array of topic tags |
| `heroImage` | ✅ Yes | Path to hero image (relative to `/public/`) |
| `heroImageAlt` | ❌ No | Alt text for hero image (for accessibility) |
| `readingTimeMinutes` | ❌ No | Estimated reading time (auto-calculated if omitted) |
| `isExternal` | ✅ Yes | Must be `false` for internal articles |
| `excerpt` | ❌ No | Custom excerpt (uses first paragraph if omitted) |
| `draft` | ❌ No | Set to `true` to hide from production |

### Step 3: Write Your Content

After the frontmatter, write your article using Markdown/MDX:

```mdx
---
# ... frontmatter above ...
---

## Introduction

Your article content starts here. Use standard Markdown formatting:

### Subheadings

- Bullet points
- Another point

1. Numbered lists
2. Another item

**Bold text** and *italic text*.

> Blockquotes for emphasis

\`\`\`javascript
// Code blocks with syntax highlighting
const example = "Hello, World!";
\`\`\`

![Image caption](/articles/my-article/image.jpg)

[External links](https://example.com)

## Conclusion

Wrap up your thoughts here.
```

**Supported Markdown Features:**
- Headings (`#`, `##`, `###`)
- Bold, italic, code
- Lists (ordered and unordered)
- Blockquotes
- Code blocks with syntax highlighting
- Images
- Links
- Tables
- And more via [GitHub Flavored Markdown](https://github.github.com/gfm/)

### Step 4: Add Images (Optional)

If your article includes images, organize them in a folder:

```
/public/articles/my-article-slug/
  hero.jpg
  diagram-1.png
  screenshot.png
```

Reference them in your MDX:

```mdx
![Diagram showing X](/articles/my-article-slug/diagram-1.png)
```

### Step 5: Preview Locally

```bash
yarn dev
```

Navigate to `http://localhost:3000/articles` to see your card, then click it to view the full article at `/articles/my-article-slug`.

### Step 6: Deploy

```bash
git add content/articles/my-article-slug.mdx public/articles/
git commit -m "Add article: My Article Title"
git push origin main
```

Vercel will automatically deploy your changes. Your article will appear on the live site within minutes.

---

## 🔗 Publishing an External (Medium) Article

External articles are hosted on Medium but displayed on your portfolio with automatic metadata fetching.

### Step 1: Publish on Medium

Write and publish your article on Medium as usual. Copy the full URL.

Example:
```
https://medium.com/@shakyadeepbhattacharyya/breaking-a-saas-monopoly-123abc
```

### Step 2: Add to Configuration File

Edit `/data/articles-config.json` and add a new entry:

```json
[
  {
    "id": "unique-id",
    "slug": "breaking-a-saas-monopoly-123abc",
    "mediumUrl": "https://medium.com/@shakyadeepbhattacharyya/breaking-a-saas-monopoly-123abc",
    "category": "SaaS",
    "isExternal": true
  }
]
```

**Field Descriptions:**

| Field | Required | Description |
|-------|----------|-------------|
| `id` | ✅ Yes | Unique identifier (e.g., `saas-monopoly`) |
| `slug` | ✅ Yes | URL slug from Medium (used for matching) |
| `mediumUrl` | ✅ Yes | Full Medium article URL |
| `category` | ✅ Yes | Category for filtering |
| `isExternal` | ✅ Yes | Must be `true` |

**What Happens Automatically:**
- ✅ Title fetched from Medium
- ✅ Hero image fetched from Medium
- ✅ Excerpt/description fetched from Medium
- ✅ Publish date fetched from Medium
- ✅ Tags fetched from Medium

### Step 3: Deploy

```bash
git add data/articles-config.json
git commit -m "Add external article: Article Title"
git push origin main
```

The article card will appear on `/articles` with all metadata from Medium. Clicking it opens the Medium post in a new tab.

---

## 🎨 Categories

Categories are **automatically generated** from all articles (both internal and external). The category filter bar updates dynamically.

### Current Categories
- SaaS
- Fintech
- Analytics
- Pricing

### Adding a New Category

Just use it in your article's frontmatter or config:

```yaml
category: "Machine Learning"
```

It will automatically appear in the filter bar.

---

## 🧪 Testing Checklist

Before deploying, verify:

### For Internal Articles:
- [ ] Frontmatter is valid YAML
- [ ] All required fields are present
- [ ] `slug` is URL-safe (no spaces, special chars)
- [ ] `heroImage` path is correct and image exists
- [ ] `date` is in YYYY-MM-DD format
- [ ] `isExternal` is `false`
- [ ] `draft` is `false` or omitted
- [ ] Article renders correctly at `/articles/[slug]`
- [ ] Images load properly
- [ ] Markdown formatting looks good

### For External Articles:
- [ ] Article is published on Medium
- [ ] `mediumUrl` is correct and accessible
- [ ] `slug` matches part of the Medium URL
- [ ] `isExternal` is `true`
- [ ] Card appears on `/articles` with correct data
- [ ] Clicking card opens Medium in new tab

---

## 🔧 Optional Features

### Enabling Comments (Giscus)

1. Enable GitHub Discussions on your repository
2. Go to [giscus.app](https://giscus.app) and get your config values
3. Edit `/app/articles/[slug]/ArticleContent.tsx`:

```tsx
// Uncomment the Comments import at the top
import Comments from "@/components/article-enhancements/Comments";

// Uncomment the Comments section and add your values:
<Comments
  repo="yourusername/your-repo"
  repoId="YOUR_REPO_ID_FROM_GISCUS"
  category="Announcements"
  categoryId="YOUR_CATEGORY_ID_FROM_GISCUS"
/>
```

### Customizing the Author Section

Edit `/components/article-enhancements/AuthorSection.tsx` or pass props:

```tsx
<AuthorSection
  name="Your Name"
  tagline="Your tagline"
  avatar="/path/to/avatar.jpg"
  github="https://github.com/username"
  linkedin="https://linkedin.com/in/username"
/>
```

### Email Subscribe Integration

The subscribe form currently stores emails in `/data/subscribers.json`.

To integrate with a service:

1. Sign up for SendGrid, Mailchimp, or ConvertKit
2. Edit `/app/api/subscribe/route.ts`
3. Add API calls to your email service
4. Set environment variables for API keys

---

## 📊 File Structure

```
/app/portfolio/
├── content/
│   └── articles/
│       ├── article-1.mdx        # Your internal articles
│       ├── article-2.mdx
│       └── ...
├── data/
│   ├── articles-config.json      # External articles config
│   ├── likes.json                # Auto-generated likes
│   └── subscribers.json          # Auto-generated subscribers
├── public/
│   └── articles/
│       ├── article-1/            # Article images
│       │   ├── hero.jpg
│       │   └── diagram.png
│       └── ...
```

---

## 🚨 Troubleshooting

### Article not showing on /articles

**Internal:**
- Check frontmatter is valid (no syntax errors)
- Ensure `draft` is `false` or omitted
- Verify `isExternal` is `false`
- Check file is in `/content/articles/`

**External:**
- Verify Medium URL is accessible
- Check `isExternal` is `true`
- Ensure Medium RSS feed is working
- Try clearing build cache: `yarn build`

### Images not loading

- Ensure path starts with `/` (e.g., `/articles/my-article/hero.jpg`)
- Verify image exists in `/public/` directory
- Check `next.config.mjs` has correct image domains

### Build failing

- Run `yarn build` locally to see errors
- Check all MDX frontmatter for syntax errors
- Ensure all dates are in YYYY-MM-DD format
- Verify no special characters in slugs

---

## 🎉 Quick Start Examples

### Internal Article Template

```mdx
---
slug: "my-new-article"
title: "My Amazing Article"
subtitle: "A deep dive into something interesting"
date: "2025-12-20"
category: "Analytics"
tags: ["data", "insights", "strategy"]
heroImage: "/articles/my-new-article/hero.jpg"
heroImageAlt: "Hero image description"
readingTimeMinutes: 8
isExternal: false
excerpt: "This article explores the fascinating world of X and Y."
draft: false
---

## Introduction

Start writing your article here...
```

### External Article Entry

```json
{
  "id": "my-medium-post",
  "slug": "my-medium-post-slug-from-url",
  "mediumUrl": "https://medium.com/@yourname/full-url-here",
  "category": "Fintech",
  "isExternal": true
}
```

---

**Happy publishing!** 🚀

For more details, see `HYBRID_BLOG_SYSTEM.md`.
