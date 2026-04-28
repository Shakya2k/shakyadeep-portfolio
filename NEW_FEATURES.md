# New Features Documentation

## Overview

Two major features have been added to your portfolio:
1. **Articles Page** - Medium article integration with server-side metadata fetching
2. **Video Introduction** - Feature-flagged video section on About page

---

## 1. Articles Page

### Location
- Route: `/articles`
- Files:
  - Page: `/app/articles/page.tsx`
  - Component: `/components/ArticleCard.tsx`
  - Utility: `/lib/fetchMediumMetadata.ts`
  - Data: `/data/articles.json`

### How It Works

The Articles page automatically fetches metadata from Medium articles (title, description, thumbnail) on the server side to avoid CORS issues.

### Adding/Updating Articles

**Edit the file:** `/data/articles.json`

```json
[
  {
    "id": "unique-article-id",
    "mediumUrl": "https://medium.com/@yourhandle/your-article",
    "overrideTitle": null,
    "overrideDescription": null
  }
]
```

**Fields:**
- `id` - Unique identifier (required)
- `mediumUrl` - Full Medium article URL (required)
- `overrideTitle` - Custom title to use instead of scraped title (optional, set to `null` to use Medium's title)
- `overrideDescription` - Custom description instead of scraped description (optional, set to `null` to use Medium's description)

**Example with overrides:**

```json
{
  "id": "my-pricing-article",
  "mediumUrl": "https://medium.com/@shakyadeep/pricing-analytics-101",
  "overrideTitle": "Pricing Analytics: A Data-Driven Approach",
  "overrideDescription": "Custom description that overrides Medium's subtitle."
}
```

### Features

- ✅ **Server-side metadata fetching** - No CORS issues
- ✅ **Automatic thumbnail extraction** - Uses Medium's og:image
- ✅ **Graceful fallbacks** - If metadata fetch fails, uses sensible defaults
- ✅ **Custom overrides** - Override title/description per article
- ✅ **Consistent design** - Matches Projects section card styling
- ✅ **Responsive grid** - 1 column mobile, 2-3 columns desktop
- ✅ **Hover effects** - Neon glow and scale animations
- ✅ **External link indicators** - Clear visual cue that links open Medium

### Navigation

The Articles link has been added to:
- ✅ Main navigation bar
- ✅ Footer quick links

---

## 2. Video Introduction (Feature-Flagged)

### Location
- Feature flag: `/config/site.ts`
- Implementation: `/app/about/page.tsx`
- Video file location (when enabled): `/public/videos/intro.mp4`

### Current Status

**⚠️ DISABLED BY DEFAULT**

The feature is fully implemented but turned off until you're ready to use it.

### How to Enable

**Step 1: Prepare your video**
1. Create or prepare your intro video
2. Recommended specs:
   - Format: MP4 (H.264 codec)
   - Resolution: 1080p or 720p
   - Duration: 1-3 minutes
   - File size: <50MB for fast loading

**Step 2: Add the video file**
1. Place your video at: `/public/videos/intro.mp4`
2. Ensure the filename is exactly `intro.mp4`

**Step 3: Enable the feature**
1. Open `/config/site.ts`
2. Change:
   ```typescript
   export const FEATURES = {
     introVideoEnabled: false, // Change this to true
   };
   ```
3. Save the file

**Step 4: Deploy**
1. Commit changes: `git add . && git commit -m "Enable video introduction"`
2. Push to GitHub: `git push origin main`
3. Vercel will auto-deploy

### Features

- ✅ **Feature flag controlled** - Easy on/off toggle
- ✅ **Autoplay on scroll** - Video plays when scrolled into view
- ✅ **Auto-pause** - Pauses when out of view
- ✅ **Browser-safe** - Handles autoplay blocking gracefully
- ✅ **Video controls** - Users can pause, seek, adjust volume
- ✅ **Loop enabled** - Video loops continuously
- ✅ **Neon border effect** - Matches site theme with glow
- ✅ **Hover effects** - Border glow intensifies on hover
- ✅ **Responsive** - Works on all screen sizes

### Video Section Design

When enabled, appears on About page with:
- **Section title**: "Video Introduction"
- **Description**: Brief explanation of video content
- **Dark futuristic styling**: Neon border with green glow
- **Placement**: Between Bio section and Likes/Dislikes

---

## Technical Details

### Articles - Metadata Fetching

The system uses regex-based HTML parsing to extract Open Graph meta tags:
- `og:title` - Article title
- `og:description` - Article subtitle/description
- `og:image` - Thumbnail image URL

**Fallback strategy:**
1. Try `og:*` meta tags first
2. Try `twitter:*` meta tags as fallback
3. If all fail, use URL as title and generic description

### Video - IntersectionObserver

The video uses IntersectionObserver API to:
1. Detect when video enters viewport (50% visible)
2. Automatically play video
3. Pause when out of view
4. Handle browser autoplay restrictions

**Browser compatibility:**
- Modern browsers: Full support
- Safari iOS: May require user interaction for autoplay with sound
- Fallback: Standard HTML5 video controls always available

---

## File Structure

```
/app/portfolio/
├── app/
│   ├── articles/
│   │   └── page.tsx              # Articles page (server component)
│   └── about/
│       └── page.tsx              # About page with video section
├── components/
│   ├── ArticleCard.tsx          # Article card component
│   ├── Navigation.tsx           # Updated with Articles link
│   └── Footer.tsx               # Updated with Articles link
├── config/
│   └── site.ts                  # Feature flags configuration
├── data/
│   └── articles.json            # Articles configuration
├── lib/
│   └── fetchMediumMetadata.ts   # Medium metadata fetcher
└── public/
    └── videos/
        └── intro.mp4            # Video file (add when ready)
```

---

## Maintenance

### Adding New Articles

1. Get the full Medium article URL
2. Edit `/data/articles.json`
3. Add new entry to the array
4. Commit and push
5. Vercel auto-deploys

**No code changes needed!**

### Updating Video

1. Replace `/public/videos/intro.mp4` with new video
2. Keep filename as `intro.mp4`
3. Commit and push

**No code changes needed!**

### Disabling Video Later

If you want to temporarily hide the video:
1. Edit `/config/site.ts`
2. Set `introVideoEnabled: false`
3. Commit and push

The video section will disappear without deleting the video file.

---

## Troubleshooting

### Articles not loading
- Check `/data/articles.json` for valid JSON syntax
- Verify Medium URLs are accessible (not paywalled/deleted)
- Check build logs for metadata fetch errors

### Video not showing
- Verify `introVideoEnabled: true` in `/config/site.ts`
- Confirm video file exists at `/public/videos/intro.mp4`
- Check browser console for errors
- Try hard refresh (Ctrl+Shift+R / Cmd+Shift+R)

### Video not autoplaying
- This is expected browser behavior
- Browsers block autoplay with sound
- Users can click play manually
- Video will still autoplay when muted in some browsers

---

## Design Consistency

Both features follow your site's design language:
- ✅ Dark futuristic theme (#0b0f17 background)
- ✅ Neon accent colors (green, blue, purple)
- ✅ Glassmorphism cards
- ✅ Hover glow effects
- ✅ Smooth animations
- ✅ Responsive layouts
- ✅ Consistent typography
- ✅ Matching spacing and padding

---

## Support

For issues or questions:
- Check build logs in Vercel dashboard
- Review browser console for JavaScript errors
- Verify JSON syntax in data files
- Ensure file paths are correct

---

**Last Updated:** $(date)
**Version:** 1.0
