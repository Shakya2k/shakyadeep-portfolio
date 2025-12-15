# Configuration Guide: Hybrid Blog System

This guide explains how to configure and customize the hybrid blog system for comments, likes, subscriptions, and other features.

---

## 📧 Email Subscription

### Current Setup (File-based Storage)

By default, email subscriptions are stored in `/data/subscribers.json`:

```json
[
  {
    "email": "user@example.com",
    "subscribedAt": "2025-01-15T10:30:00.000Z"
  }
]
```

### Upgrade to Email Service Provider

To actually send emails to subscribers, integrate with a service:

#### Option 1: SendGrid

1. **Sign up** at [sendgrid.com](https://sendgrid.com)
2. **Get API key** from Settings → API Keys
3. **Add to `.env.local`**:
   ```
   SENDGRID_API_KEY=SG.your_key_here
   SENDGRID_FROM_EMAIL=noreply@yourdomain.com
   ```
4. **Install SDK**:
   ```bash
   yarn add @sendgrid/mail
   ```
5. **Update `/app/api/subscribe/route.ts`**:
   ```typescript
   import sgMail from '@sendgrid/mail';
   
   sgMail.setApiKey(process.env.SENDGRID_API_KEY!);
   
   // After adding subscriber to JSON:
   await sgMail.send({
     to: email,
     from: process.env.SENDGRID_FROM_EMAIL!,
     subject: 'Welcome to SB.data Newsletter',
     text: 'Thanks for subscribing!',
     html: '<strong>Thanks for subscribing!</strong>',
   });
   ```

#### Option 2: Mailchimp

1. **Sign up** at [mailchimp.com](https://mailchimp.com)
2. **Get API key** from Account → Extras → API keys
3. **Get Audience ID** from Audience → Settings → Audience name and defaults
4. **Add to `.env.local`**:
   ```
   MAILCHIMP_API_KEY=your_key_here
   MAILCHIMP_AUDIENCE_ID=your_audience_id
   MAILCHIMP_SERVER_PREFIX=us1
   ```
5. **Install SDK**:
   ```bash
   yarn add @mailchimp/mailchimp_marketing
   ```
6. **Update `/app/api/subscribe/route.ts`**:
   ```typescript
   import mailchimp from '@mailchimp/mailchimp_marketing';
   
   mailchimp.setConfig({
     apiKey: process.env.MAILCHIMP_API_KEY,
     server: process.env.MAILCHIMP_SERVER_PREFIX,
   });
   
   await mailchimp.lists.addListMember(process.env.MAILCHIMP_AUDIENCE_ID!, {
     email_address: email,
     status: 'subscribed',
   });
   ```

#### Option 3: ConvertKit

1. **Sign up** at [convertkit.com](https://convertkit.com)
2. **Get API key** from Settings → Advanced
3. **Create a form** and note the Form ID
4. **Add to `.env.local`**:
   ```
   CONVERTKIT_API_KEY=your_key_here
   CONVERTKIT_FORM_ID=your_form_id
   ```
5. **Update `/app/api/subscribe/route.ts`**:
   ```typescript
   const response = await fetch(
     `https://api.convertkit.com/v3/forms/${process.env.CONVERTKIT_FORM_ID}/subscribe`,
     {
       method: 'POST',
       headers: { 'Content-Type': 'application/json' },
       body: JSON.stringify({
         api_key: process.env.CONVERTKIT_API_KEY,
         email: email,
       }),
     }
   );
   ```

---

## 💬 Comments (Giscus)

Giscus uses GitHub Discussions as a comment backend. It's free, privacy-friendly, and requires no database.

### Setup Steps

1. **Enable GitHub Discussions** on your repository:
   - Go to your repo → Settings → Features → Check "Discussions"

2. **Install Giscus app**:
   - Visit [github.com/apps/giscus](https://github.com/apps/giscus)
   - Click "Install"
   - Select your repository

3. **Get configuration values**:
   - Go to [giscus.app](https://giscus.app)
   - Enter your repo name (e.g., `yourusername/portfolio`)
   - Choose page ↔️ discussions mapping: **pathname** (recommended)
   - Choose Discussion Category: **Announcements** or create "Blog Comments"
   - Copy the configuration values shown

4. **Update ArticleContent.tsx**:
   
   Edit `/app/articles/[slug]/ArticleContent.tsx`:
   
   ```tsx
   // Uncomment this import at the top
   import Comments from "@/components/article-enhancements/Comments";
   
   // Uncomment this section at the bottom, before RelatedArticles:
   <div className="container mx-auto px-6 pb-8">
     <Comments
       repo="yourusername/your-repo"           // Your GitHub repo
       repoId="R_kgDOAbCdEf"                  // From giscus.app
       category="Announcements"                // Discussion category name
       categoryId="DIC_kwDOAbCdEf4BgHij"      // From giscus.app
     />
   </div>
   ```

5. **Customize theme** (optional):
   
   In `/components/article-enhancements/Comments.tsx`, change:
   ```tsx
   theme = "dark",  // or "light", "preferred_color_scheme"
   ```

### Environment Variables (Optional)

For easier management, you can move these to `.env.local`:

```
NEXT_PUBLIC_GISCUS_REPO=yourusername/your-repo
NEXT_PUBLIC_GISCUS_REPO_ID=R_kgDOAbCdEf
NEXT_PUBLIC_GISCUS_CATEGORY=Announcements
NEXT_PUBLIC_GISCUS_CATEGORY_ID=DIC_kwDOAbCdEf4BgHij
```

Then in ArticleContent.tsx:
```tsx
<Comments
  repo={process.env.NEXT_PUBLIC_GISCUS_REPO!}
  repoId={process.env.NEXT_PUBLIC_GISCUS_REPO_ID!}
  category={process.env.NEXT_PUBLIC_GISCUS_CATEGORY!}
  categoryId={process.env.NEXT_PUBLIC_GISCUS_CATEGORY_ID!}
/>
```

---

## 👍 Likes / Reactions

The like system is already fully functional! It stores data in `/data/likes.json`.

### Current Setup (File-based)

```json
{
  "article-slug-1": 42,
  "article-slug-2": 15
}
```

**Pros:**
- ✅ No external dependencies
- ✅ Works immediately
- ✅ No API limits

**Cons:**
- ❌ Not scalable for high traffic
- ❌ Requires file system writes (not ideal for serverless)

### Upgrade to Database (Optional)

For production scale, use a lightweight database:

#### Option 1: Upstash Redis

1. **Sign up** at [upstash.com](https://upstash.com)
2. **Create a Redis database**
3. **Get credentials** from Details tab
4. **Add to `.env.local`**:
   ```
   UPSTASH_REDIS_REST_URL=https://your-db.upstash.io
   UPSTASH_REDIS_REST_TOKEN=your_token_here
   ```
5. **Install SDK**:
   ```bash
   yarn add @upstash/redis
   ```
6. **Update `/app/api/likes/[slug]/route.ts`**:
   ```typescript
   import { Redis } from '@upstash/redis';
   
   const redis = Redis.fromEnv();
   
   // GET
   const count = await redis.get<number>(`likes:${params.slug}`) || 0;
   
   // POST
   const newCount = await redis.incr(`likes:${params.slug}`);
   ```

#### Option 2: Vercel KV (Upstash-powered)

1. **In Vercel dashboard**, go to Storage → Create Database → KV
2. **Connect to your project**
3. **Vercel auto-adds** `KV_*` environment variables
4. **Install SDK**:
   ```bash
   yarn add @vercel/kv
   ```
5. **Update `/app/api/likes/[slug]/route.ts`**:
   ```typescript
   import { kv } from '@vercel/kv';
   
   // GET
   const count = await kv.get<number>(`likes:${params.slug}`) || 0;
   
   // POST
   const newCount = await kv.incr(`likes:${params.slug}`);
   ```

---

## 🎨 Customizing Author Section

Edit `/components/article-enhancements/AuthorSection.tsx` or pass props:

### Default Values

```tsx
export default function AuthorSection({
  name = "Shakyadeep Bhattacharyya",
  tagline = "Data Scientist | Turning analytics into measurable growth",
  avatar = "/images/profile.jpg",
  github = "https://github.com/Shakya2k",
  linkedin = "https://linkedin.com/in/shakyadeep",
  email = "/contact",
}: AuthorSectionProps)
```

### Using Custom Values

In `ArticleContent.tsx`:
```tsx
<AuthorSection
  name="Your Name"
  tagline="Your custom tagline"
  avatar="/path/to/your/avatar.jpg"
  github="https://github.com/yourname"
  linkedin="https://linkedin.com/in/yourname"
  email="mailto:you@example.com"
/>
```

### Adding More Social Links

Edit `AuthorSection.tsx` to add Twitter, website, etc.:

```tsx
import { Twitter, Globe } from "lucide-react";

// In the component:
{twitter && (
  <a
    href={twitter}
    target="_blank"
    rel="noopener noreferrer"
    className="text-foreground/60 hover:text-primary transition-colors"
  >
    <Twitter size={20} />
  </a>
)}
```

---

## 🎯 Related Articles Algorithm

Currently, related articles are selected by **matching category**. You can customize this logic.

### Edit Algorithm

In `/app/articles/[slug]/page.tsx`:

**Current (by category):**
```tsx
const relatedArticles = allArticles.filter(a => 
  a.category === article.category && a.slug !== article.slug
).slice(0, 3);
```

**By tags (similarity):**
```tsx
const relatedArticles = allArticles
  .filter(a => a.slug !== article.slug)
  .map(a => ({
    article: a,
    score: a.tags?.filter(tag => article.tags?.includes(tag)).length || 0,
  }))
  .sort((a, b) => b.score - a.score)
  .slice(0, 3)
  .map(item => item.article);
```

**By recency:**
```tsx
const relatedArticles = allArticles
  .filter(a => a.slug !== article.slug)
  .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
  .slice(0, 3);
```

**Mixed (category + recency):**
```tsx
const sameCategory = allArticles.filter(a => 
  a.category === article.category && a.slug !== article.slug
).slice(0, 2);

const recent = allArticles
  .filter(a => 
    a.slug !== article.slug && 
    !sameCategory.find(c => c.slug === a.slug)
  )
  .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
  .slice(0, 1);

const relatedArticles = [...sameCategory, ...recent];
```

---

## 🔔 Article Notifications

To notify subscribers when you publish a new article:

### Manual Approach

1. Get subscriber list from `/data/subscribers.json`
2. Manually send email via your ESP (SendGrid, Mailchimp, etc.)
3. Include article link and excerpt

### Automated Approach

Create a deployment hook script:

**`scripts/notify-subscribers.js`**:
```javascript
const fs = require('fs');
const sgMail = require('@sendgrid/mail');

sgMail.setApiKey(process.env.SENDGRID_API_KEY);

// Get latest article from content/articles
// Get subscribers from data/subscribers.json
// Send email to all subscribers

// Run this as a GitHub Action on push to main
```

Add to `.github/workflows/notify.yml`:
```yaml
name: Notify Subscribers
on:
  push:
    branches: [main]
    paths:
      - 'content/articles/**'
jobs:
  notify:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      - run: node scripts/notify-subscribers.js
```

---

## 📊 Analytics

### Tracking Article Views

Add view tracking to `/app/articles/[slug]/page.tsx`:

```tsx
// Track view on page load
useEffect(() => {
  fetch(`/api/views/${article.slug}`, { method: 'POST' });
}, [article.slug]);
```

Create `/app/api/views/[slug]/route.ts`:
```typescript
import { NextRequest, NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';

const viewsFilePath = path.join(process.cwd(), 'data', 'views.json');

export async function POST(
  request: NextRequest,
  { params }: { params: { slug: string } }
) {
  const views = JSON.parse(fs.readFileSync(viewsFilePath, 'utf8'));
  views[params.slug] = (views[params.slug] || 0) + 1;
  fs.writeFileSync(viewsFilePath, JSON.stringify(views, null, 2));
  
  return NextResponse.json({ views: views[params.slug] });
}
```

### Display View Count

In `ArticleContent.tsx`:
```tsx
const [views, setViews] = useState(0);

useEffect(() => {
  fetch(`/api/views/${article.slug}`)
    .then(res => res.json())
    .then(data => setViews(data.views));
}, []);

// Display in meta section:
<div className="flex items-center gap-1">
  <Eye size={16} />
  <span>{views} views</span>
</div>
```

---

## 🚀 Performance Optimization

### Image Optimization

For internal article images, use Next.js Image component with proper sizing:

In MDX:
```mdx
![Hero](/articles/my-article/hero.jpg)
```

Gets rendered as:
```tsx
<Image
  src="/articles/my-article/hero.jpg"
  alt="Hero"
  width={800}
  height={400}
  className="rounded-lg w-full"
/>
```

### Caching Strategy

In `/lib/fetchMediumRSS.ts`, adjust cache duration:

```typescript
next: { revalidate: 3600 }, // 1 hour

// For more frequent updates:
next: { revalidate: 600 },  // 10 minutes

// For less frequent:
next: { revalidate: 86400 }, // 24 hours
```

---

## 🔒 Security Best Practices

### Rate Limiting (for likes/subscribe)

Install `express-rate-limit` equivalent for Next.js:

```bash
yarn add @upstash/ratelimit
```

In API routes:
```typescript
import { Ratelimit } from '@upstash/ratelimit';
import { Redis } from '@upstash/redis';

const ratelimit = new Ratelimit({
  redis: Redis.fromEnv(),
  limiter: Ratelimit.slidingWindow(10, '1 m'), // 10 requests per minute
});

const { success } = await ratelimit.limit(
  request.headers.get('x-forwarded-for') || 'anonymous'
);

if (!success) {
  return NextResponse.json({ error: 'Rate limit exceeded' }, { status: 429 });
}
```

### Email Validation

In `/app/api/subscribe/route.ts`, add validation:

```typescript
const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

if (!emailRegex.test(email)) {
  return NextResponse.json({ error: 'Invalid email' }, { status: 400 });
}

// Check for disposable email domains
const disposableDomains = ['tempmail.com', 'guerrillamail.com'];
const domain = email.split('@')[1];
if (disposableDomains.includes(domain)) {
  return NextResponse.json({ error: 'Disposable emails not allowed' }, { status: 400 });
}
```

---

## 🎨 Theming & Styling

All components use Tailwind CSS with your existing color variables:

- `bg-card` - Card backgrounds
- `border-border` - Borders
- `text-foreground` - Primary text
- `text-primary` - Accent color
- `bg-background` - Page background

To customize, edit `tailwind.config.ts`:

```typescript
colors: {
  primary: '#your-accent-color',
  foreground: '#your-text-color',
  // ...
}
```

---

**Need help with configuration?** Check `HYBRID_BLOG_SYSTEM.md` and `PUBLISHING_GUIDE.md` for more details.
