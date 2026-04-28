# Hybrid Blog System Documentation

## Overview

Your portfolio now features a **hybrid blog system** that seamlessly combines:
- **External articles** from Medium (via RSS)
- **Internal articles** hosted on your site (MDX files)

Both types display as identical cards on `/articles` with category filtering.

---

## 🎯 Key Features

### 1. Unified Article Display
- All articles (external + internal) appear on `/articles` with the same card design
- Category filter bar at the top for easy browsing
- Smooth animations and hover effects
- Mobile responsive

### 2. External (Medium) Articles
- Automatically fetch from your Medium RSS feed
- Display title, description, hero image, and publish date
- Click to open on Medium in new tab
- **No manual data entry** except adding to config file

### 3. Internal (Site-Hosted) Articles
- Full blog posts with MDX support
- Rich markdown: headings, code blocks, images, tables, etc.
- Individual pages at `/articles/[slug]`
- Click to read on-site (no redirect)

### 4. Optional Enhancements
- **Comments** via Giscus (GitHub Discussions)
- **Like button** with persistent storage
- **Email subscribe** with simple JSON storage

---

## 📁 Project Structure

```
/app/portfolio/
├── app/
│   ├── articles/
│   │   ├── page.tsx              # Main articles listing (server component)
│   │   ├── ArticlesClient.tsx    # Client component with filtering
│   │   └── [slug]/
│   │       ├── page.tsx          # Article detail page (server component)
│   │       └── ArticleContent.tsx # MDX renderer (client component)
│   └── api/
│       ├── likes/[slug]/route.ts  # Likes API
│       └── subscribe/route.ts     # Subscribe API
├── components/
│   ├── CategoryFilter.tsx         # Category filter buttons
│   ├── UnifiedArticleCard.tsx     # Card for both article types
│   └── article-enhancements/
│       ├── Comments.tsx           # Giscus comments
│       ├── LikeButton.tsx         # Like/clap button
│       └── Subscribe.tsx          # Email subscribe box
├── content/
│   └── articles/
│       └── *.mdx                  # Your internal MDX articles
├── data/
│   ├── articles-config.json       # Config for external articles
│   ├── likes.json                 # Likes count (auto-generated)
│   └── subscribers.json           # Email subscribers (auto-generated)
└── lib/
    ├── articles.ts                # Core article fetching logic
    └── fetchMediumRSS.ts          # Medium RSS scraper (existing)
```

---

## ✏️ Publishing Workflow

### For External (Medium) Articles

1. **Publish on Medium** as usual
2. **Edit** `/data/articles-config.json`:
   ```json
   {
     "id": "unique-id",
     "slug": "article-slug",
     "mediumUrl": "https://medium.com/@yourname/article-url",
     "category": "SaaS",
     "isExternal": true
   }
   ```
3. **Commit and push** → Article appears automatically

**The system will:**
- Fetch title, description, and image from Medium RSS
- Display it as a card
- Link to your Medium post

---

### For Internal (Site-Hosted) Articles

1. **Create a new MDX file** in `/content/articles/`:
   ```
   /content/articles/my-new-post.mdx
   ```

2. **Add frontmatter**:
   ```mdx
   ---
   title: "My Awesome Article"
   description: "A brief summary of what this article is about."
   heroImage: "/images/blog/my-hero.jpg"
   category: "Analytics"
   date: "2025-01-15"
   tags: ["Data Science", "Pricing", "Strategy"]
   draft: false
   ---

   ## Your Content Here

   Write your article using Markdown/MDX...
   ```

3. **Write your content** using:
   - Headings (`#`, `##`, `###`)
   - Lists, tables, blockquotes
   - Code blocks with syntax highlighting
   - Images: `![alt text](/path/to/image.jpg)`
   - Links, bold, italic, etc.

4. **Commit and push** → Article appears on `/articles` and has a dedicated page at `/articles/my-new-post`

---

## 🎨 Category System

### Adding Categories

Categories are **automatically extracted** from all articles (both external and internal).

- External articles: Set `category` in `articles-config.json`
- Internal articles: Set `category` in MDX frontmatter

The filter bar updates automatically with all unique categories.

### Current Categories
- SaaS
- Fintech
- Analytics
- Pricing

Feel free to add more!

---

## 🚀 Optional Features Setup

### 1. Comments (Giscus)

**Requirements:**
- GitHub repository with Discussions enabled
- Public repository

**Setup:**
1. Go to [giscus.app](https://giscus.app)
2. Enter your repo details and get configuration values
3. Edit `/app/portfolio/app/articles/[slug]/ArticleContent.tsx`:
   ```tsx
   import Comments from "@/components/article-enhancements/Comments";

   // Inside the component, after article content:
   <Comments
     repo="yourusername/your-repo"
     repoId="YOUR_REPO_ID"
     category="Announcements"
     categoryId="YOUR_CATEGORY_ID"
   />
   ```

### 2. Like Button

**How it works:**
- Stores likes in `/data/likes.json`
- Uses localStorage to prevent duplicate likes
- Updates in real-time

**To enable:**
1. Edit `/app/portfolio/app/articles/[slug]/ArticleContent.tsx`:
   ```tsx
   import LikeButton from "@/components/article-enhancements/LikeButton";

   // Inside the component:
   <LikeButton articleSlug={article.slug} />
   ```

2. Deploy - the API routes are already set up!

### 3. Email Subscribe

**How it works:**
- Stores emails in `/data/subscribers.json`
- Simple JSON storage (can be upgraded to a service later)

**To enable:**
1. Edit `/app/portfolio/app/articles/[slug]/ArticleContent.tsx`:
   ```tsx
   import Subscribe from "@/components/article-enhancements/Subscribe";

   // Inside the component:
   <Subscribe />
   ```

2. (Optional) Integrate with email service:
   - Edit `/app/api/subscribe/route.ts`
   - Add SendGrid, Mailchimp, or other provider

---

## 🛠️ Customization

### Styling

All components use your existing Tailwind theme:
- `bg-card`, `border-border`, `text-foreground`
- `text-primary` for accents
- Dark mode support built-in

To customize:
- Edit component files in `/components/`
- Update Tailwind config for global changes

### MDX Components

Custom styling for MDX content is defined in:
```
/app/articles/[slug]/ArticleContent.tsx
```

You can customize:
- Heading sizes
- Link styles
- Code block appearance
- Image rendering
- And more

### Category Filter UI

Edit `/components/CategoryFilter.tsx` to change:
- Button styles
- Active state appearance
- Animations

---

## 📊 Data Files

### `articles-config.json`
Config for external Medium articles:
```json
[
  {
    "id": "saas-monopoly-nlp",
    "slug": "saas-monopoly-nlp",
    "mediumUrl": "https://medium.com/...",
    "category": "SaaS",
    "isExternal": true
  }
]
```

### `likes.json` (auto-generated)
Stores like counts:
```json
{
  "article-slug": 42,
  "another-article": 15
}
```

### `subscribers.json` (auto-generated)
Stores email subscribers:
```json
[
  {
    "email": "user@example.com",
    "subscribedAt": "2025-01-15T10:30:00.000Z"
  }
]
```

---

## 🧪 Testing

### Test External Articles
1. Add a Medium URL to `articles-config.json`
2. Run `yarn dev`
3. Visit `http://localhost:3000/articles`
4. Verify card displays correctly
5. Click to ensure it opens Medium in new tab

### Test Internal Articles
1. Create an MDX file in `/content/articles/`
2. Add proper frontmatter
3. Run `yarn dev`
4. Visit `http://localhost:3000/articles`
5. Click the card to visit `/articles/[slug]`
6. Verify content renders correctly

### Test Category Filter
1. Ensure articles have different categories
2. Visit `/articles`
3. Click category buttons
4. Verify filtering works

---

## 🚢 Deployment

### Vercel (Recommended)

1. **Push to GitHub**
2. **Connect to Vercel**
3. **Deploy** - all features work automatically!

### Environment Variables (Optional)

For enhanced features, you can add:
```
# Giscus Comments
NEXT_PUBLIC_GISCUS_REPO=username/repo
NEXT_PUBLIC_GISCUS_REPO_ID=...
NEXT_PUBLIC_GISCUS_CATEGORY=...
NEXT_PUBLIC_GISCUS_CATEGORY_ID=...

# Email Service (if integrating)
SENDGRID_API_KEY=...
MAILCHIMP_API_KEY=...
```

---

## 🎉 Benefits

| Feature | Before | After |
|---------|--------|-------|
| Article Types | Medium only | Medium + Internal |
| Publishing | Medium editor | MDX files in repo |
| Design Control | Medium's design | Your custom design |
| SEO | Medium owns | You own |
| Categories | None | Full filtering |
| Comments | Medium comments | GitHub Discussions |
| Analytics | Medium stats | Your own tracking |

---

## 🆘 Troubleshooting

### Articles not showing
- Check RSS feed is accessible
- Verify `articles-config.json` syntax
- Check MDX frontmatter is valid

### Images not loading
- Ensure paths are correct (`/public/images/...` → `/images/...`)
- Check `next.config.mjs` has Medium CDN domains

### Category filter not working
- Ensure categories are spelled consistently
- Check browser console for errors

### MDX not rendering
- Verify frontmatter YAML is valid
- Check for syntax errors in content
- Ensure `draft: false` is set

---

## 📝 Next Steps

1. ✅ Publish your first internal article
2. ✅ Test category filtering
3. ✅ Enable optional features (comments, likes, subscribe)
4. ✅ Customize styling to match your brand
5. ✅ Deploy to Vercel

---

**Your hybrid blog system is ready!** 🚀

You now have the flexibility of Medium with the power of owning your content.
