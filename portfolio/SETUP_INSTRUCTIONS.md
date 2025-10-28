# SETUP INSTRUCTIONS FOR SHAKYADEEP BHATTACHARYYA PORTFOLIO

## 🎉 Your Portfolio is Ready!

A production-ready Next.js 14 portfolio has been successfully built with:
- ✅ Dark futuristic design (#0b0f17 base + green/blue/purple accents)
- ✅ Animated KPI cards with count-up effects
- ✅ Interactive skills game
- ✅ STAR-format project showcase
- ✅ Formspree contact form integration
- ✅ SEO optimized (meta tags, sitemap, robots.txt)
- ✅ Fully responsive design

## 📁 Location

Your portfolio is located at: `/app/portfolio/`

## 🚀 Quick Start

### 1. Navigate to the project
```bash
cd /app/portfolio
```

### 2. Install dependencies (already done)
```bash
yarn install
```

### 3. Configure environment variables
Edit `/app/portfolio/.env.local`:

```env
# REQUIRED: Set up Formspree for contact form
NEXT_PUBLIC_FORMS_ENDPOINT=https://formspree.io/f/YOUR_FORM_ID

# OPTIONAL: Add Cloudflare Analytics
NEXT_PUBLIC_CF_ANALYTICS_TOKEN=YOUR_CF_TOKEN

# OPTIONAL: Add Google Analytics
# NEXT_PUBLIC_GA_ID=G-XXXXXXXXXX
```

**Get Formspree Endpoint:**
1. Visit https://formspree.io
2. Sign up (free plan available)
3. Create a new form
4. Copy the endpoint URL
5. Paste into .env.local

### 4. Replace placeholder images
All images are in `/app/portfolio/public/images/EDIT_ME/`:

**Required images:**
- profile.jpg (512x512px) - Your headshot
- logo-cognizant.png (200x200px)
- logo-simon-vision.png (200x200px)
- logo-iem.png (200x200px)
- project-credit-card.png (1200x630px)
- project-pricing.png (1200x630px)
- project-fraud.png (1200x630px)
- project-retention.png (1200x630px)
- project-search.png (1200x630px)
- project-crypto.png (1200x630px)

**Also replace:**
- `/app/portfolio/public/Shakyadeep_Bhattacharyya_Resume.pdf` with your actual resume

### 5. Update content (NO CODE CHANGES NEEDED!)

**Edit projects:**
```bash
nano /app/portfolio/content/projects.json
```

**Edit experience:**
```bash
nano /app/portfolio/content/experience.json
```

### 6. Run development server
```bash
yarn dev
```
Visit: http://localhost:3000

### 7. Build for production
```bash
yarn build
```

## 🌐 Deploy to Vercel

### Option 1: GitHub + Vercel (Recommended)

1. **Initialize Git:**
```bash
cd /app/portfolio
git init
git add .
git commit -m "Initial commit - Shakyadeep portfolio"
```

2. **Push to GitHub:**
```bash
# Create a new repo on GitHub first, then:
git remote add origin https://github.com/YOUR_USERNAME/YOUR_REPO.git
git branch -M main
git push -u origin main
```

3. **Deploy on Vercel:**
   - Go to https://vercel.com
   - Click "Import Project"
   - Select your GitHub repository
   - Vercel auto-detects Next.js settings
   - Add environment variables in Vercel dashboard
   - Deploy!

### Option 2: Vercel CLI

```bash
npm i -g vercel
cd /app/portfolio
vercel login
vercel
```

## 📝 Content Editing Guide

### Projects (content/projects.json)
Each project follows the STAR format:
```json
{
  "id": "unique-slug",
  "title": "Project Name",
  "category": "Academic/Professional/Consulting/Freelance/Personal",
  "organization": "Company Name",
  "thumbnail": "/images/EDIT_ME/project-image.png",
  "shortDescription": "Brief description",
  "situation": "What was the problem?",
  "task": "What needed to be done?",
  "actionNonTech": "Business/strategic actions",
  "actionTech": "Technical implementation details",
  "resultBusiness": "Business impact metrics",
  "resultTech": "Technical achievements",
  "tags": ["Tag1", "Tag2"]
}
```

### Experience (content/experience.json)
```json
{
  "id": "company-id",
  "company": "Company Name",
  "role": "Your Role",
  "department": "Department",
  "type": "Professional/Consulting/Academic",
  "startDate": "2021",
  "endDate": "2023",
  "logo": "/images/EDIT_ME/logo-company.png",
  "description": "Brief description",
  "highlights": [
    "Achievement 1",
    "Achievement 2"
  ]
}
```

## 🎨 Customization

### Change Colors
Edit `/app/portfolio/tailwind.config.ts`:
```typescript
colors: {
  background: "#0b0f17",  // Change base color
  primary: "#4ade80",     // Change green accent
  secondary: "#60a5fa",   // Change blue accent
  accent: "#9b5de5",      // Change purple accent
}
```

### Update Personal Info
- **SEO Meta Tags**: `/app/portfolio/app/layout.tsx`
- **About Page Bio**: `/app/portfolio/app/about/page.tsx`
- **Footer Links**: `/app/portfolio/components/Footer.tsx`
- **Navigation**: `/app/portfolio/components/Navigation.tsx`

## 📊 Analytics Setup

### Cloudflare Web Analytics (Free & Privacy-Friendly)
1. Go to https://www.cloudflare.com/web-analytics/
2. Add your site
3. Copy the token
4. Add to .env.local: `NEXT_PUBLIC_CF_ANALYTICS_TOKEN=your_token`
5. Redeploy

### Google Analytics (Optional)
1. Get GA4 measurement ID
2. Add to .env.local: `NEXT_PUBLIC_GA_ID=G-XXXXXXXXXX`
3. Uncomment GA code in `/app/portfolio/app/layout.tsx`
4. Redeploy

## 🔧 Troubleshooting

### Contact form not working
✅ Check .env.local has correct FORMSPREE endpoint
✅ Verify endpoint in Vercel environment variables
✅ Test form submission in production

### Images not loading
✅ Ensure images exist in /public/images/EDIT_ME/
✅ Use absolute paths starting with /
✅ Check file names match JSON content

### Build errors
✅ Run `yarn build` locally first
✅ Check for TypeScript errors
✅ Validate JSON syntax in content files

## 📚 Features Overview

### Pages
- **Home (/)**: Dashboard-style hero with animated KPIs, skills bars
- **Experience (/experience)**: Timeline of work history
- **Projects (/projects)**: Grid with category filters
- **Project Detail (/projects/[slug])**: STAR-format case studies
- **About (/about)**: Personal bio, likes/dislikes, fun facts
- **Skills Game (/skills-game)**: Match-the-cards interactive game
- **Contact (/contact)**: Formspree form + social links

### Key Features
- Count-up animations for numbers
- Scroll-triggered skill bar fills
- Framer Motion page transitions
- Mobile-responsive design
- Dark theme with neon accents
- Prefers-reduced-motion support

## 🎯 Next Steps

1. ✅ Set up Formspree endpoint
2. ✅ Replace all placeholder images
3. ✅ Add your resume PDF
4. ✅ Edit projects.json and experience.json
5. ✅ Customize About page content
6. ✅ Test locally with `yarn dev`
7. ✅ Build with `yarn build`
8. ✅ Deploy to Vercel
9. ✅ Set up analytics (Cloudflare or GA)
10. ✅ Share your portfolio!

## 📞 Support Resources

- Next.js Docs: https://nextjs.org/docs
- Vercel Deployment: https://vercel.com/docs
- Formspree Setup: https://formspree.io/guides
- Tailwind CSS: https://tailwindcss.com/docs
- Framer Motion: https://www.framer.com/motion/

---

**Your portfolio is production-ready! Just add your content and deploy.**

Good luck, Shakyadeep! 🚀
